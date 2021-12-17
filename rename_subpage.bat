:: renames a subpage (where it matters):
:: subpage category (e.g. 'projects') - cat
:: old name - oldname
:: renaming to new name - newname
:: steps
:: 1. search ROOT\{cat}\ dir, find {oldname} folder, enter
:: 		a. open index.html, parse + rename {oldname} instances -> {newname}, save to index.html
::		b. leave back to ROOT\{cat}\, rename {oldname} folder -> {newname}
:: 2. search ROOT\views\pages\subpages\, find {oldname}.html, enter
::		a. parse + rename {oldname} instances -> {newname}, save to {oldname}.html
::		b. rename {oldname}.html -> {newname}.html
:: 3. search ROOT\resources\{cat}\*\ dirs, rename {oldname} folder -> {newname}

@ECHO OFF

TITLE %~n0%~x0
SETLOCAL EnableDelayedExpansion

SET main_dir=%~dp0
REM SET main_dir=%main_dir%TEST\play\

SET revert_changes=0
SET reverting=0

:: add more here if necessary
ECHO 1: projects
SET /p cat_idx="enter category num: "
SET cat=""
IF %cat_idx%==1 (
	SET cat=projects
) ELSE (
	GOTO :EOF
)
::ECHO 2: bruh
:: ELSE IF %cat_idx%==2 (
::	SET cat=bruh
::)

SET cat_rename_dir=%main_dir%%cat%\
SET subpage_rename_dir=%main_dir%views\pages\subpages\
SET resources_rename_dir=%main_dir%resources\%cat%\

CD %cat_rename_dir%
FOR /d %%d IN (*) DO (
	ECHO %%d
)
CD %main_dir%

:repeat_prompt
ECHO ctrl+z/x/c then y to exit
SET /p oldname="enter old subpage name: "
SET /p newname="enter new subpage name: "

:call_again
:: ROOT/{cat}/ index.html renaming
CALL :cat_rename "%cat_rename_dir%" %oldname% %newname%
:: ROOT\views\pages\subpages\ renaming
CALL :subpage_rename "%subpage_rename_dir%" %oldname% %newname%
:: ROOT\resources\{cat}\*\ renaming
CALL :resources_rename "%resources_rename_dir%" %oldname% %newname%

IF !revert_changes!==1 IF !reverting!==0 (
	SET reverting=1
	ECHO REVERTING CHANGES...
	GOTO :call_again
)
GOTO :repeat_prompt
GOTO :EOF

:: search ROOT\{cat}\ dir, find {oldname} folder, enter
:: 		a. open index.html, parse + rename {oldname} instances -> {newname}, save to index.html
::		b. leave back to ROOT\{cat}\, rename {oldname} folder -> {newname}
:cat_rename
SET #dir=%1%
SET #old=%2%
SET #new=%3%
IF !revert_changes!==1 (
	IF !reverting!==1 (
		SET #old=%3%
		SET #new=%2%
	)
) ELSE (
	IF !reverting!==1 (
		GOTO :EOF
	)
)
SET new_dir=%#dir:~0,-1%%#new%\"
SET pot_dir=%#dir:~0,-1%%#old%\"
SET pot_file=%pot_dir:~0,-1%index.html"
IF NOT EXIST %new_dir% (
	IF EXIST %pot_file% (
		CD %pot_dir%
		CALL :FindReplace %#old% %#new% index.html
	) ELSE (
		ECHO ERROR: INDEX.HTML file not found - .\%cat%\%#old%\index.html
		SET revert_changes=1
	)
	IF EXIST %pot_dir% (
		CD %pot_dir%
		CD ..
		REN %#old% %#new%
	) ELSE (
		ECHO ERROR: Directory not found - .\%cat%\%#old%\
		SET revert_changes=1
	)
) ELSE (
	ECHO ERROR: Rename directory already exists - .\%cat%\%#old%\-^>%#new%
	SET revert_changes=1
)
CD %main_dir%
GOTO :EOF

:: search ROOT\views\pages\subpages\, find {oldname}.html, enter
::		a. parse + rename {oldname} instances -> {newname}, save to {oldname}.html
::		b. rename {oldname}.html -> {newname}.html
:subpage_rename
SET #dir=%1%
SET #old=%2%
SET #new=%3%
IF !revert_changes!==1 (
	IF !reverting!==1 (
		SET #old=%3%
		SET #new=%2%
	)
) ELSE (
	IF !reverting!==1 (
		GOTO :EOF
	)
)
CD %#dir%
SET pot_file=%#old%.html
SET new_file=%#new%.html
SET pot_file_full=%#dir:~0,-1%%old_file%"
SET new_file_full=%#dir:~0,-1%%new_file%"
IF NOT EXIST %new_file_full% (
	IF EXIST %pot_file_full% (
		CALL :FindReplace %#old% %#new% %pot_file%
	) ELSE (
		ECHO ERROR: %#old%.HTML file not found - .\views\pages\subpages\%#old%.html
		SET revert_changes=1
	)
	REN %pot_file% %new_file%
) ELSE (
	ECHO ERROR: Rename file already exists - .\views\pages\subpages\%#old%.html-^>%#new%.html
	SET revert_changes=1
)
CD %main_dir%
GOTO :EOF

:: search ROOT\resources\{cat}\*\ dirs, rename {oldname} folder -> {newname}
:resources_rename
SET #dir=%1%
SET #old=%2%
SET #new=%3%
IF !revert_changes!==1 (
	IF !reverting!==1 (
		SET #old=%3%
		SET #new=%2%
	)
) ELSE (
	IF !reverting!==1 (
		GOTO :EOF
	)
)
CD %#dir%
SET found=0
FOR /d %%d IN (*) DO (
	CD %%d
	IF NOT EXIST %#new%\ (
		IF EXIST %#old%\ (
			REN %#old% %#new%
			SET found=1
		)
	) ELSE (
		ECHO ERROR: Rename directory already exists - .\resources\%cat%\^*\%#old%-^>%#new%
		SET revert_changes=1
	)
	CD ..
)
IF !found!==0 IF !revert_changes!==1 (
	ECHO ERROR: .\resources\%cat%\^*\%#old% not found
	SET revert_changes=1
)
CD %main_dir%
GOTO :EOF

:: from: https://stackoverflow.com/questions/23087463/batch-script-to-find-and-replace-a-string-in-text-file-within-a-minute-for-files
:: ONLY WORKS WHEN CALLED IN SAME DIRECTORY, file / %3% is {fname}.{ext} only
:FindReplace <findstr> <replstr> <file>
SET tmp="%temp%\tmp.txt"
IF NOT EXIST %temp%\_.vbs CALL :MakeReplace
FOR /f "tokens=*" %%a IN ('DIR "%3" /s /b /a-d /on') DO (
  FOR /f "usebackq" %%b IN (`findstr /mic:"%~1" "%%a"`) DO (
    REM ECHO(&ECHO Replacing "%~1" with "%~2" IN file %%~nxa
    <%%a cscript //nologo %temp%\_.vbs "%~1" "%~2">%tmp%
    IF EXIST %tmp% MOVE /Y %tmp% "%%~dpnxa">nul
  )
)
DEL %temp%\_.vbs
EXIT /b
GOTO :EOF
:: from: https://stackoverflow.com/questions/23087463/batch-script-to-find-and-replace-a-string-in-text-file-within-a-minute-for-files
:MakeReplace
>%temp%\_.vbs ECHO with Wscript
>>%temp%\_.vbs ECHO set args=.arguments
>>%temp%\_.vbs ECHO .StdOut.Write _
>>%temp%\_.vbs ECHO Replace(.StdIn.ReadAll,args(0),args(1),1,-1,1)
>>%temp%\_.vbs ECHO end with
GOTO :EOF

