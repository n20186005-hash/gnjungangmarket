@echo off
set NODE_OPTIONS=
set CODEBUDDY_SAFE_DELETE_SHIM_DIR=
set GENIE_TRASH_DIR=
set PATH=C:\Users\dcc\.workbuddy\binaries\node\versions\22.12.0;%PATH%
cd /d h:\GitHub\gnjungangmarket
echo START %DATE% %TIME% > install_prod.log
call C:\Users\dcc\.workbuddy\binaries\node\versions\22.12.0\pnpm.cmd install --offline --config.node-linker=hoisted --config.concurrent=1 --config.package-import-method=hardlink --config.network-concurrency=1 --prod >> install_prod.log 2>&1
echo DONE_EXIT_%ERRORLEVEL% >> install_prod.log
