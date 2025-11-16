# PowerShell script to replace all Image components with img tags
$componentsPath = "c:\Users\cfisk\OneDrive\Desktop\sportendorse\new-website\components"

Get-ChildItem -Path $componentsPath -Filter "*.tsx" | ForEach-Object {
    $filePath = $_.FullName
    $content = Get-Content $filePath -Raw
    
    # Replace Image tags with img tags
    $content = $content -replace '<Image\s+', '<img '
    
    # Remove Next.js specific props that don't exist on img tags
    $content = $content -replace '\s*fill\s*,?\s*', ''
    $content = $content -replace '\s*priority\s*,?\s*', ''
    $content = $content -replace '\s*sizes="[^"]*"\s*,?\s*', ''
    
    # Clean up any extra commas or spaces
    $content = $content -replace ',\s*\}', ' }'
    $content = $content -replace ',\s*/>', ' />'
    
    Set-Content -Path $filePath -Value $content -NoNewline
    Write-Host "Updated: $($_.Name)"
}

Write-Host "All Image components have been replaced with img tags!"