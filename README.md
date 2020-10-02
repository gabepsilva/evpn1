# Evpn1

A Graphical interface for expressvpn client.

Although this application is using the logo from expressvpn.com this application is independent and open source project.


### Auto startup
The easiest way to automatically start this app is by adding this command to **~/.bashrc**
```shell
# Execute as a regular binary file
./evpn1-1.0.0.AppImage
```

### Execute from source
```shell
git clone https://github.com/gabrielpsilva/evpn1.git
cd evpn1
npm install
npm run dist
cd dist
./evpn1-1.0.0.AppImage
```

### Download Binary:
https://github.com/gabrielpsilva/evpn1/releases/download/1.0.1/evpn1-1.0.0.AppImage

### Adding the binary as a Gnome application

To be able to access and launch the app directly from the Gnome application launcher, you may want to create a `.desktop` file.

To do that, just download the `evpn1.desktop` file, change the path of the `EXEC` part to the path of where the AppImage is and move the file to your `~/.local/share/applications/` directory. If your AppImage is inside your Downloads folder, you only need to change the `YOUR_USERNAME` part of its contents to your Gnome session's username and you're set!

Then, remember to download the `assets/evpc.png` file, so you have a proper icon, and change the `ICON` part of the .desktop file to point to where the icon is.

### Screenshots

![alt text](https://github.com/gabrielpsilva/evpn1/blob/master/screenshots/s1.png)


![alt text](https://github.com/gabrielpsilva/evpn1/blob/master/screenshots/s3.png)
