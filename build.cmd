@echo off
electron-packager . "Gerador de Carteirinhas - SENAI" --platform=win32 --arch=all --asar=true --app-version=2.0.0 --app-copyright="Copyright (C) 2015 CarlosEDBA Softwares. All rights reserved." --version-string.CompanyName="CarlosEDBA Softwares." --version-string.FileDescription="Gerador de Carteirinhas - SENAI" --version-string.ProductName="Gerador de Carteirinhas - SENAI" --version-string.InternalName="MagicalCards" --overwrite --version="1.2.3" --ignore="outros"
pause