:: creates a page / subpage based off _template files

@ECHO OFF

TITLE %~n0%~x0
SETLOCAL EnableDelayedExpansion

SET main_dir=%~dp0
SET template_dir=%main_dir%_templates\
SET replace_str=_base

ECHO 0: page
ECHO 1: subpage
SET /p select=""
SET /p name="enter name: "
IF %select%==0 (
	GOTO :page
) ELSE IF %select%==1 (
	GOTO :subpage
) ELSE (
	GOTO :EOF
)
GOTO :EOF

:: create page from template
:page
SET src_dir=%template_dir%_page
SET dst_dir=%main_dir%%name%

SET src_htm=%template_dir%_page.html
SET dst_htm=%main_dir%views\pages
SET dst_htm_fname=%name%.html

IF NOT EXIST "%dst_dir%" (
	robocopy "%src_dir%" "%dst_dir%" /E /NFL /NDL /NJH /NJS /NC /NS /NP
	CD "%dst_dir%"
	CALL :FindReplace %replace_str% %name% index.html
	CD "%main_dir%"
) ELSE (
	ECHO ERROR: Page directory already exists - .\%name%
	PAUSE
	GOTO :EOF
)
IF NOT EXIST "%dst_htm%\%dst_htm_fname%" (
	xcopy "%src_htm%" "%dst_htm%" > NUL
	CD "%dst_htm%"
	REN _page.html %dst_htm_fname%
	CALL :FindReplace %replace_str% %name% %name%.html
	CD "%main_dir%"
) ELSE (
	ECHO ERROR: Page view already exists - .\views\pages\%name%.html
	PAUSE
	GOTO :EOF
)
GOTO :EOF

:: create subpage from template
:subpage
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
SET src_dir=%template_dir%_subpage
SET dst_dir=%main_dir%%cat%\%name%

SET src_htm=%template_dir%_subpage.html
SET dst_htm=%main_dir%views\pages\subpages
SET dst_htm_fname=%name%.html

SET src_rsc=%template_dir%_subpage_rsc
SET dst_rsc=%main_dir%resources\%cat%\%name%

IF NOT EXIST "%dst_dir%" (
	robocopy "%src_dir%" "%dst_dir%" /E /NFL /NDL /NJH /NJS /NC /NS /NP
	CD "%dst_dir%"
	CALL :FindReplace %replace_str% %name% index.html
	CD "%main_dir%"
) ELSE (
	ECHO ERROR: Subpage directory already exists - .\%cat%\%name%
	PAUSE
	GOTO :EOF
)
IF NOT EXIST "%dst_htm%\%dst_htm_fname%" (
	xcopy "%src_htm%" "%dst_htm%" > NUL
	CD "%dst_htm%"
	REN _subpage.html %dst_htm_fname%
	CALL :FindReplace %replace_str% %name% %name%.html
	CD "%main_dir%"
) ELSE (
	ECHO ERROR: Subpage view already exists - .\views\pages\subpages\%name%.html
	PAUSE
	GOTO :EOF
)
IF NOT EXIST "%dst_rsc%" (
	robocopy "%src_rsc%" "%dst_rsc%" /E /NFL /NDL /NJH /NJS /NC /NS /NP
) ELSE (
	ECHO ERROR: Subpage resource dir already exists - .\resources\%cat%\%name%
	PAUSE
	GOTO :EOF
)
ECHO REMEMBER TO MOVE .\resources\%cat%\%name% INTO A SUBCATEGORY
PAUSE 
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

