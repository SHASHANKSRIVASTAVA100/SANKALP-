Add-Type -AssemblyName System.Drawing
 = C:\Users\shash\.gemini\antigravity\scratch\sih-waste-management\public\logo.png
 = [System.Drawing.Bitmap]::FromFile()
Write-Host Original:  .Width x .Height

 = New-Object System.Drawing.Bitmap(.Width, .Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
for ( = 0;  -lt .Height; ++) {
    for ( = 0;  -lt .Width; ++) {
         = .GetPixel(, )
        if (.R -gt 242 -and .G -gt 242 -and .B -gt 242) {
            .SetPixel(, , [System.Drawing.Color]::FromArgb(0, 255, 255, 255))
        } else {
            .SetPixel(, , )
        }
    }
}
 = C:\Users\shash\.gemini\antigravity\scratch\sih-waste-management\public\logo-transparent.png
.Save(, [System.Drawing.Imaging.ImageFormat]::Png)
Write-Host Saved transparent version to 

 = .Width
 = 0
 = .Height
 = 0
for ( = 0;  -lt 300; ++) {
    for ( = 0;  -lt .Width; ++) {
         = .GetPixel(, )
        if (.R -lt 240 -or .G -lt 240 -or .B -lt 240) {
            if ( -lt ) {  =  }
            if ( -gt ) {  =  }
            if ( -lt ) {  =  }
            if ( -gt ) {  =  }
        }
    }
}

 = 16
 = ( - ) + ( * 2)
 = ( - ) + ( * 2)
 = [Math]::Max(, )

 = New-Object System.Drawing.Bitmap(, , [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
 = [System.Drawing.Graphics]::FromImage()
.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic

 = [int](( - ( - )) / 2)
 = [int](( - ( - )) / 2)
 = New-Object System.Drawing.Rectangle(, , ( - ), ( - ))
 = New-Object System.Drawing.Rectangle(, , ( - ), ( - ))

.DrawImage(, , , [System.Drawing.GraphicsUnit]::Pixel)
.Dispose()

 = C:\Users\shash\.gemini\antigravity\scratch\sih-waste-management\public\logo-emblem.png
.Save(, [System.Drawing.Imaging.ImageFormat]::Png)
Write-Host Saved emblem to 

function Resize-Bmp(, , , ) {
     = New-Object System.Drawing.Bitmap(, , [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
     = [System.Drawing.Graphics]::FromImage()
    .SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    .InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    .DrawImage(, 0, 0, , )
    .Dispose()
    .Save(, [System.Drawing.Imaging.ImageFormat]::Png)
    .Dispose()
}

Resize-Bmp  192 192 C:\Users\shash\.gemini\antigravity\scratch\sih-waste-management\public\icon-192.png
Resize-Bmp  512 512 C:\Users\shash\.gemini\antigravity\scratch\sih-waste-management\public\icon-512.png
Resize-Bmp  64 64 C:\Users\shash\.gemini\antigravity\scratch\sih-waste-management\public\favicon.png

Copy-Item  C:\Users\shash\.gemini\antigravity\scratch\sih-waste-management\src\assets\logo-transparent.png -Force
Copy-Item  C:\Users\shash\.gemini\antigravity\scratch\sih-waste-management\src\assets\logo-emblem.png -Force

.Dispose()
.Dispose()
.Dispose()
Write-Host ALL DONE!
