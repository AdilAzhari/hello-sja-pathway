# Fix CSS script for stylelint issues

# Function to balance opening and closing curly braces in CSS content
function Balance-CurlyBraces {
    param (
        [string]$content
    )
    
    # If content is empty, return empty
    if ([string]::IsNullOrWhiteSpace($content)) {
        return $content
    }
    
    # Count opening and closing braces
    $openCount = ($content.ToCharArray() | Where-Object { $_ -eq '{' } | Measure-Object).Count
    $closeCount = ($content.ToCharArray() | Where-Object { $_ -eq '}' } | Measure-Object).Count
    
    # Remove extra closing braces if any
    if ($closeCount -gt $openCount) {
        $excess = $closeCount - $openCount
        for ($i = 0; $i -lt $excess; $i++) {
            $lastBraceIndex = $content.LastIndexOf('}')
            if ($lastBraceIndex -gt 0) {
                $content = $content.Remove($lastBraceIndex, 1)
            }
        }
    }
    
    # Add missing closing braces at the end if needed
    if ($openCount -gt $closeCount) {
        $missing = $openCount - $closeCount
        for ($i = 0; $i -lt $missing; $i++) {
            if ($content.TrimEnd().EndsWith(";")) {
                # Add a newline before closing brace if content ends with a semicolon
                $content = $content.TrimEnd() + "`n}"
            } else {
                # Just append the closing brace
                $content = $content.TrimEnd() + "}"
            }
            
            # Add newline after each added closing brace
            $content += "`n"
        }
    }
    
    return $content
}

$cssFiles = @(
    "css/animations.css",
    "css/style.css",
)

foreach ($file in $cssFiles) {
    Write-Host "Processing $file..."
    
    # Read file content
    $content = Get-Content -Path $file -Raw
    
    # Handle empty files
    if ([string]::IsNullOrWhiteSpace($content)) {
        # Add a comment for empty stylesheets with a newline
        Set-Content -Path $file -Value "/* Empty stylesheet */`n" -NoNewline
        Write-Host "Added empty stylesheet comment to $file"
        continue
    }
    
    # 1. Fix indentation - replace 4 or more spaces with 2 spaces
    $content = $content -replace '(\n[ \t]*?)    +', '$1  '
    
    # 2. Convert hex colors to lowercase
    $content = $content -replace '#([0-9A-F]{3,6})', { "#" + $args[0].Groups[1].Value.ToLower() }
    
    # 3. Fix comment whitespace
    $content = $content -replace '/\*(?!\s)', '/* '
    $content = $content -replace '(?<!\s)\*/', ' */'
    
    # 4. Add empty lines before rules where needed
    $content = $content -replace '([;}])\s*\n([^@\s/\n{])', "$1`n`n$2"
    
    # 5. Balance curly braces to fix unclosed blocks
    $content = Balance-CurlyBraces -content $content
    
    # 6. Ensure newline at end of file
    if (-not $content.EndsWith("`n")) {
        $content += "`n"
    }
    
    # 7. Handle h1, h2, h3, etc. selectors in base.css
    if ($file -eq "css/base.css") {
        $content = $content -replace 'h1, h2, h3, h4, h5, h6 \{', "h1,`nh2,`nh3,`nh4,`nh5,`nh6 {"
    }
    
    # Write content back to file
    Set-Content -Path $file -Value $content -NoNewline
}

Write-Host "CSS fixing complete!"
Write-Host "Run stylelint to verify fixes: npx stylelint 'css/**/*.css'"

