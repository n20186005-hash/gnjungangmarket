@echo off
set NODE_OPTIONS=
set CODEBUDDY_SAFE_DELETE_SHIM_DIR=
set GENIE_TRASH_DIR=
set PATH=C:\Users\dcc\.workbuddy\binaries\node\versions\22.12.0;%PATH%
cd /d h:\GitHub\gnjungangmarket
echo START %DATE% %TIME% > install_iso.log
call C:\Users\dcc\.workbuddy\binaries\node\versions\22.12.0\pnpm.cmd install --offline --config.node-linker=isolated --config.network-concurrency=1 --prod >> install_iso.log 2>&1
echo DONE_EXIT_%ERRORLEVEL% >> install_iso.log
