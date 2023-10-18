@echo off

git restore .
git checkout master
git pull

@REM Get timestamp
for /f %%x in ('wmic path win32_utctime get /format:list ^| findstr "="') do (
    set %%x)
set /a z=(14-100%Month%%%100)/12, y=10000%Year%%%10000-z
set /a ut=y*365+y/4-y/100+y/400+(153*(100%Month%%%100+12*z-3)+2)/5+Day-719469
set /a UNIX_TIMESTAMP=ut*86400+100%Hour%%%100*3600+100%Minute%%%100*60+100%Second%%%100

set "DESTINATION=docs\tsdoc\%UNIX_TIMESTAMP%"

@REM # Copy artifacts to destination folder
mkdir %DESTINATION%
robocopy tsdoc %DESTINATION% /E

@REM # Add entry on readme file
echo. >> docs/tsdoc/readme.md
echo [Report from timestamp: %UNIX_TIMESTAMP%](./%UNIX_TIMESTAMP%/index.html) >> docs/tsdoc/readme.md

git add docs/tsdoc/*

git commit -m "[JENKINS] - Publishing New TSDoc At %DESTINATION%"

git push
