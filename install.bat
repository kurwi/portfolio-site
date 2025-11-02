@echo off
setlocal
set "PATH=C:\Program Files\nodejs;%PATH%"
call "C:\Program Files\nodejs\npm.cmd" install
exit /b %ERRORLEVEL%
