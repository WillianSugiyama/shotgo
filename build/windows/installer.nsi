!include "MUI2.nsh"

Name "ShotGo"
OutFile "..\..\build\bin\shotgo-amd64-installer.exe"
InstallDir "$PROGRAMFILES64\ShotGo"
RequestExecutionLevel admin

!insertmacro MUI_PAGE_WELCOME
!insertmacro MUI_PAGE_DIRECTORY
!insertmacro MUI_PAGE_INSTFILES
!insertmacro MUI_PAGE_FINISH

!insertmacro MUI_UNPAGE_CONFIRM
!insertmacro MUI_UNPAGE_INSTFILES

!insertmacro MUI_LANGUAGE "English"

Section "Install"
  SetOutPath "$INSTDIR"
  File "..\..\build\bin\shotgo.exe"

  CreateDirectory "$SMPROGRAMS\ShotGo"
  CreateShortcut "$SMPROGRAMS\ShotGo\ShotGo.lnk" "$INSTDIR\shotgo.exe"
  CreateShortcut "$DESKTOP\ShotGo.lnk" "$INSTDIR\shotgo.exe"

  WriteUninstaller "$INSTDIR\uninstall.exe"

  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\ShotGo" \
    "DisplayName" "ShotGo"
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\ShotGo" \
    "UninstallString" "$\"$INSTDIR\uninstall.exe$\""
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\ShotGo" \
    "Publisher" "ShotGo Contributors"
SectionEnd

Section "Uninstall"
  Delete "$INSTDIR\shotgo.exe"
  Delete "$INSTDIR\uninstall.exe"
  RMDir "$INSTDIR"

  Delete "$SMPROGRAMS\ShotGo\ShotGo.lnk"
  RMDir "$SMPROGRAMS\ShotGo"
  Delete "$DESKTOP\ShotGo.lnk"

  DeleteRegKey HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\ShotGo"
SectionEnd
