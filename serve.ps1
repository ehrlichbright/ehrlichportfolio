# Minimal static file server using built-in .NET — no Node or Python required.
# Usage:  powershell -ExecutionPolicy Bypass -File serve.ps1
# Then open http://localhost:8080/  and press Ctrl+C here to stop.

param([int]$Port = 8080)

$root = $PSScriptRoot
$prefix = "http://localhost:$Port/"

$mime = @{
  ".html" = "text/html; charset=utf-8"
  ".css"  = "text/css; charset=utf-8"
  ".js"   = "text/javascript; charset=utf-8"
  ".json" = "application/json; charset=utf-8"
  ".svg"  = "image/svg+xml"
  ".png"  = "image/png"
  ".jpg"  = "image/jpeg"
  ".jpeg" = "image/jpeg"
  ".webp" = "image/webp"
  ".gif"  = "image/gif"
  ".ico"  = "image/x-icon"
  ".pdf"  = "application/pdf"
  ".woff2" = "font/woff2"
}

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($prefix)

try {
  $listener.Start()
} catch {
  Write-Host "Could not start on port $Port. Try another: .\serve.ps1 -Port 8090" -ForegroundColor Red
  Write-Host $_.Exception.Message
  exit 1
}

Write-Host ""
Write-Host "  Serving $root" -ForegroundColor DarkGray
Write-Host "  Open  $($prefix)preview/index.html" -ForegroundColor Green
Write-Host "  Ctrl+C to stop." -ForegroundColor DarkGray
Write-Host ""

while ($listener.IsListening) {
  try {
    $ctx = $listener.GetContext()
  } catch { break }

  $res = $ctx.Response
  $rel = [System.Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath).TrimStart('/')

  if ([string]::IsNullOrWhiteSpace($rel)) { $rel = "preview/index.html" }

  $path = Join-Path $root ($rel -replace '/', '\')

  # Directory -> index.html inside it
  if ((Test-Path $path) -and (Get-Item $path).PSIsContainer) {
    $path = Join-Path $path "index.html"
  }

  # Keep requests inside the project folder
  $full = [System.IO.Path]::GetFullPath($path)
  if (-not $full.StartsWith([System.IO.Path]::GetFullPath($root), [StringComparison]::OrdinalIgnoreCase)) {
    $res.StatusCode = 403
    $res.Close()
    continue
  }

  if (Test-Path $full -PathType Leaf) {
    $bytes = [System.IO.File]::ReadAllBytes($full)
    $ext = [System.IO.Path]::GetExtension($full).ToLower()
    $res.ContentType = if ($mime.ContainsKey($ext)) { $mime[$ext] } else { "application/octet-stream" }
    $res.Headers.Add("Cache-Control", "no-store")
    $res.ContentLength64 = $bytes.Length
    $res.OutputStream.Write($bytes, 0, $bytes.Length)
    Write-Host "200  /$rel" -ForegroundColor DarkGray
  } else {
    $msg = [System.Text.Encoding]::UTF8.GetBytes("404 - not found: /$rel")
    $res.StatusCode = 404
    $res.ContentType = "text/plain; charset=utf-8"
    $res.ContentLength64 = $msg.Length
    $res.OutputStream.Write($msg, 0, $msg.Length)
    Write-Host "404  /$rel" -ForegroundColor DarkYellow
  }

  $res.Close()
}

$listener.Stop()
