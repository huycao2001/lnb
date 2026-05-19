@echo off
cd /d "%~dp0"
echo.
echo  Lis n Bliss - local server (port 3000)
echo  Hub:  http://localhost:3000/phoneme/
echo  Test: http://localhost:3000/phoneme/test1?level=easy
echo.
echo  Press Ctrl+C to stop.
echo.
npm exec --yes --package serve -- serve . -l 3000
