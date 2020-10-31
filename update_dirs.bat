@ECHO OFF

TITLE %~n0%~x0
SETLOCAL EnableDelayedExpansion

SET main_dir=%~dp0
SET json_to=views\partials\

:: first json dir
SET json_from1=%main_dir%resources\notes\school\
SET json_to1=notes_school.json

:: start json generation for 1
CALL :get_json json_raw "%json_from1%"
ECHO %json_raw% > "%main_dir%%json_to%%json_to1%"

:: start json generation for 2
REM CALL :get_json json_raw %json_from2%
REM ECHO %json_raw% > "%main_dir%%json_to%%json_to2%"

:get_json
::get_json(return_value, dir)
::CALL :get_json json_raw %dir%
SET #dir=%2%
SET return_json={^"folders^":[

CD %#dir%

FOR /d %%d IN (*.*) DO (
	SET return_json=!return_json!{^"name^":^"%%d^",^"files^":[
	CD %%d
	FOR /r %%f IN (*.*) DO (
		SET return_json=!return_json!{^"dir^":^"%%~nxf^"},
	)
	SET return_json=!return_json:~0,-1!]},
	CD ..
)
SET return_json=!return_json:~0,-1!]}
ECHO %return_json%

SET "%~1=%return_json%"
GOTO :EOF
