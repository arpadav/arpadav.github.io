:: gets a directory, creates a json file for said directory
:: in the following format:
:: folders[] - holds an indexed list of all folders
:: folders[i]['name'] - holds the folder name
:: folders[i]['files'][] -	holds an indexed list of all files
:: 							within the directory (minus title.txt
::							and comments.txt)
:: folders[i]['files'][j]['dir'] - file name + extension
:: folders[i]['title'] - 	holds title of notes/project to be
::							displayed in certain circumstances,
::							given by title.txt within the folder
:: folders[i]['comments'] - holds comments about notes/project
::							to be displayed in cirtain
::							circumstances, given by comments.txt
::							in the folder

@ECHO OFF

TITLE %~n0%~x0
SETLOCAL EnableDelayedExpansion
SET files_in_dir=0

SET title_file=title.txt
SET title_in_dir=0

SET comments_file=comments.txt
SET comments_in_dir=0

SET main_dir=%~dp0
SET json_to=views\partials\

:: FIRST json dir
SET json_from1=%main_dir%resources\notes\school\
SET json_to1=notes_school.json
:: THIRD json dir
SET json_from3=%main_dir%resources\projects\school\
SET json_to3=projects_school.json
:: FOURTH json dir
SET json_from4=%main_dir%resources\projects\personal\
SET json_to4=projects_personal.json
:: FIFTH json dir
SET json_from5=%main_dir%resources\projects\professional\
SET json_to5=projects_professional.json

:: FIRST json folder
SET jsonf_from1=%main_dir%resources\projects\
SET jsonf_to1=sidebar.json

:: json generation for FIRST, then save
CALL :get_json_files json_raw "%json_from1%"
ECHO %json_raw% > "%main_dir%%json_to%%json_to1%"
:: json generation for THIRD, then save
CALL :get_json_files json_raw "%json_from3%"
ECHO %json_raw% > "%main_dir%%json_to%%json_to3%"
:: json generation for FOURTH, then save
CALL :get_json_files json_raw "%json_from4%"
ECHO %json_raw% > "%main_dir%%json_to%%json_to4%"
:: json generation for FIFTH, then save
CALL :get_json_files json_raw "%json_from5%"
ECHO %json_raw% > "%main_dir%%json_to%%json_to5%"

:: json generation for FIFTH, then save
CALL :get_json_folders json_raw "%jsonf_from1%"
ECHO %json_raw% > "%main_dir%%json_to%%jsonf_to1%"

GOTO :EOF

:get_json_files
::get_json_files(return_value, dir)
::CALL :get_json_files json_raw %dir%
SET #dir=%2%
SET return_json={^"folders^":[

CD %#dir%

FOR /d %%d IN (*.*) DO (
	SET return_json=!return_json!{^"name^":^"%%d^",^"files^":[
	CD %%d

	SET files_in_dir=0
	SET title_in_dir=0
	SET comments_in_dir=0
	FOR /r %%f IN (*.*) DO (
		IF NOT %%~nxf==!title_file! IF NOT %%~nxf==!comments_file! (
			SET files_in_dir=1
			SET return_json=!return_json!{^"dir^":^"%%~nxf^"},
		)
		IF %%~nxf==!title_file! (
			SET title_in_dir=1
		)
		IF %%~nxf==!comments_file! (
			SET comments_in_dir=1
		)
	)
	IF !files_in_dir!==1 (
		SET return_json=!return_json:~0,-1!]
	) ELSE (
		SET return_json=!return_json!]
	)
	IF !title_in_dir!==1 (
		SET /p title=<!title_file!
		SET return_json=!return_json!,^"title^":^"!title!^"
	) ELSE (
		SET return_json=!return_json!,^"title^":^"^"
	)
	IF !comments_in_dir!==1 (
		SET /p comments=<!comments_file!
		SET return_json=!return_json!,^"comments^":^"!comments!^"
	) ELSE (
		SET return_json=!return_json!,^"comments^":^"^"
	)
	SET return_json=!return_json!},
	CD ..
)
SET return_json=!return_json:~0,-1!]}

REM ECHO !return_json!
REM PAUSE

SET "%~1=!return_json!"
GOTO :EOF

:get_json_folders
::get_json_folders(return_value, dir)
::CALL :get_json_folders json_raw %dir%
SET #dir=%2%
SET return_json={^"parents^":[

CD %#dir%

FOR /d %%d IN (*.*) DO (
	SET return_json=!return_json!{^"name^":^"%%d^",^"children^":[
	CD %%d

	SET title_in_dir=0
	FOR /d %%d IN (*.*) DO (
		SET return_json=!return_json!{
		CD %%d

		FOR /r %%f IN (*.*) DO (
			IF %%~nxf==!title_file! (
				SET title_in_dir=1
				SET /p title=<!title_file!
				SET return_json=!return_json!^"title^":^"!title!^",
			)
		)
		IF !title_in_dir!==1 (
			SET return_json=!return_json!^"dir^":^"%%d^"
		)
		CD ..
		SET return_json=!return_json!},
	)
	SET return_json=!return_json:~0,-1!]},
	CD ..
)
SET return_json=!return_json:~0,-1!]}

REM ECHO !return_json!
REM PAUSE

SET "%~1=!return_json!"
GOTO :EOF
