@echo off
setlocal EnableExtensions
rem ===========================================================
rem  AI-Tools-Hub launcher
rem  Usage: double-click to run the built portable exe,
rem         or fall back to dev mode (npx electron .)
rem ===========================================================
chcp 65001 >nul

set "ROOT=%~dp0"
set "EXE=%ROOT%dist\AI-Tools-Hub-1.5.0.exe"

if exist "%EXE%" (
    echo [AI-Tools-Hub] Starting: %EXE%
    start "" "%EXE%"
    exit /b 0
)

rem --- portable exe not found, try any exe in dist ---
for %%F in ("%ROOT%dist\AI-Tools-Hub-*.exe") do (
    echo [AI-Tools-Hub] Starting: %%~fF
    start "" "%%~fF"
    exit /b 0
)

rem --- no build output, run from source ---
echo [AI-Tools-Hub] No dist build found, starting dev mode...
if not exist "%ROOT%node_modules" (
    echo Installing dependencies...
    pushd "%ROOT%"
    call npm install
    popd
)
start "" cmd /c "cd /d "%ROOT%" && npx electron ."
exit /b 0
