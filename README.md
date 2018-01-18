# m-days-angular
just learning angular 1.x, take no notice

#How to install
```npm i```

**Then install [GraphicsMagick](http://www.graphicsmagick.org)**

Windows: https://sourceforge.net/projects/graphicsmagick/files/graphicsmagick-binaries/1.3.27/

Unix-like: http://www.graphicsmagick.org/INSTALL-unix.html

PPA: 
```
sudo add-apt-repository ppa:dhor/myway
sudo apt-get update
sudo apt-get install graphicsmagick
```

**And install [exiftool](https://www.sno.phy.queensu.ca/~phil/exiftool/index.html)**

Windows/MacOS: There is usual procedure.

Linux:
```
cd <your download directory>
gzip -dc Image-ExifTool-10.75.tar.gz | tar -xf -
cd Image-ExifTool-10.75
perl Makefile.PL
sudo make install
``` 

Then make build ```npm run build``` 

and start server ```npm run server```.

Or just ```npm run start```.

For run webpack-dev-server use ```npm run start-dev```