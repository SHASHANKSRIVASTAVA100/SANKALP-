 = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
 = 'C:\Users\shash\OneDrive\Desktop\SANKALP\public\sih_assets'
if (-not (Test-Path )) { New-Item -ItemType Directory -Path  -Force }

Write-Host 'Capturing 1. Citizen Dashboard...'
Start-Process  -ArgumentList '--headless=new', '--disable-gpu', '--screenshot=C:\Users\shash\OneDrive\Desktop\SANKALP\public\sih_assets\screen_citizen_dash.png', '--window-size=1280,800', 'http://localhost:5173/?role=citizen' -Wait

Write-Host 'Capturing 2. Report Modal...'
Start-Process  -ArgumentList '--headless=new', '--disable-gpu', '--screenshot=C:\Users\shash\OneDrive\Desktop\SANKALP\public\sih_assets\screen_report_modal.png', '--window-size=1280,850', 'http://localhost:5173/?role=citizen&modal=report' -Wait

Write-Host 'Capturing 3. Timeline Modal...'
Start-Process  -ArgumentList '--headless=new', '--disable-gpu', '--screenshot=C:\Users\shash\OneDrive\Desktop\SANKALP\public\sih_assets\screen_timeline_modal.png', '--window-size=1280,850', 'http://localhost:5173/?role=citizen&timeline=true' -Wait

Write-Host 'Capturing 4. Supervisor Dashboard...'
Start-Process  -ArgumentList '--headless=new', '--disable-gpu', '--screenshot=C:\Users\shash\OneDrive\Desktop\SANKALP\public\sih_assets\screen_supervisor.png', '--window-size=1280,800', 'http://localhost:5173/?role=supervisor' -Wait

Write-Host 'Capturing 5. EPR Portal...'
Start-Process  -ArgumentList '--headless=new', '--disable-gpu', '--screenshot=C:\Users\shash\OneDrive\Desktop\SANKALP\public\sih_assets\screen_epr_portal.png', '--window-size=1280,800', 'http://localhost:5173/?role=epr' -Wait

Write-Host 'All screenshots captured successfully!'
