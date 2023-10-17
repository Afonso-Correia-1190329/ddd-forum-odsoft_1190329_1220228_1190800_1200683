@echo off

git restore .
git pull
git checkout master

set DOC_TYPE=%1

if "%DOC_TYPE%"=="" (
    echo Need to provide DOC_TYPE as input (unit_coverage/api_coverage^)
    exit /b 1
)

if not "%DOC_TYPE%" == "unit_coverage" (
    if NOT "%DOC_TYPE%"=="api_coverage" (
        echo Invalid DOC_TYPE value (unit_coverage/api_coverage^)
        exit /b 1
    )
)

@REM Get timestamp
for /f %%x in ('wmic path win32_utctime get /format:list ^| findstr "="') do (
    set %%x)
set /a z=(14-100%Month%%%100)/12, y=10000%Year%%%10000-z
set /a ut=y*365+y/4-y/100+y/400+(153*(100%Month%%%100+12*z-3)+2)/5+Day-719469
set /a UNIX_TIMESTAMP=ut*86400+100%Hour%%%100*3600+100%Minute%%%100*60+100%Second%%%100

set "DESTINATION=docs\%DOC_TYPE%\%UNIX_TIMESTAMP%"

@REM # Copy artifacts to destination folder
mkdir %DESTINATION%
robocopy coverage %DESTINATION% /E

@REM # Add entry on readme file
echo. >> docs/%DOC_TYPE%/readme.md
echo [Report from timestamp: %UNIX_TIMESTAMP%](./%UNIX_TIMESTAMP%/index.html) >> docs/%DOC_TYPE%/readme.md

git add docs/%DOC_TYPE%/*

git commit -m "[JENKINS] - Publishing New Coverage Report At %DESTINATION%"

git push
