const {app, Menu, Tray, dialog, BrowserWindow} = require('electron');
const {exec} = require('child_process');
const path = require('path');




let trayIcon;

app.on('ready', () => {

  trayIcon = new Tray(path.join(__dirname, disconnectedIcon));
  setTrayIcon();
});

// TRAY ICON VARIABLES & FUNCTIONS
let disconnectedIcon = 'assets/evpc1r.png';
let waitingIcon = 'assets/evpc1y.png';
let connectedIcon = 'assets/evpc1g.png';

// clear interval function is not working in Electron. This is an workaround
let abort = false;


//
let contextMenu;
//
let coloredCleanGlobal;

// options for the message box
const options = {
  type: 'question',
  buttons: ['OK'],
  defaultId: 0,
  title: 'Ops',
  message: 'Error executing expressvpn command line tool',
  detail: 'Make sure expressvpn is installed and activated then try again',
  icon: path.join(__dirname, disconnectedIcon)
};


// eVpnCommand executes the expressvpn commands with the parameters sent. Also be sure to
// to disconnect before connecting to another server when VPN is connected
function eVpnCommand(param) {
  console.log("Executing: expressvpn " + param);
  trayIcon.setImage(path.join(__dirname, waitingIcon));

  exec('expressvpn ' + param, (err, stdout, stderr) => {
    if (err) {
      let opts = JSON.parse(JSON.stringify(options));
      coloredClean(stderr);
      opts.message = coloredCleanGlobal;
      opts.detail = "";
      dialog.showMessageBox(null, opts);
      console.log(`stderr: ${stderr}`);
      console.log('DONE ERROR!');
      return;
    }

    console.log(`stdout: ${stdout}`);
    console.log('SUCCESS!');
  });
}


// getConnectionStatusOrDie does the monitoring of vpns status and enbles other function to
// update the UI. If it cannot check the connection status it will close the app
function getConnectionStatusOrDie() {

  if (abort)
    return;


  exec('expressvpn status', (err, stdout, stderr) => {
    if (err) {
      abort = true;
      dialog.showMessageBox(null, options);
      app.quit()
    }

    coloredClean(stdout);
    if (coloredCleanGlobal.startsWith('Connected')) {
      trayIcon.setImage(path.join(__dirname, connectedIcon));
      return;
    }
    if (coloredCleanGlobal.startsWith('Not connected') || coloredCleanGlobal.startsWith('Disconnected')) {
      trayIcon.setImage(path.join(__dirname, disconnectedIcon));
      return;
    }
    if (coloredCleanGlobal.startsWith('Connecting') || coloredCleanGlobal.startsWith('Disconnecting') || coloredCleanGlobal.startsWith('Reconnecting')) {
      trayIcon.setImage(path.join(__dirname, waitingIcon));
      return;
    }

    console.log("BUG, code should never reach here, probably new status. => ", coloredCleanGlobal);
    return false;

  });
}


// setTrayIcon will initialize the tray icon and set a timer to update the status in case
// the vpn connection status is changed outside this application
function setTrayIcon() {

  disconnect = () => { eVpnCommand("disconnect") };
  smart = () => { eVpnCommand("connect smart") };
  inmu1 = () => { eVpnCommand("connect inmu1") };
  jpto3 = () => { eVpnCommand("connect jpto3") };
  ukel = () => { eVpnCommand("connect ukel") };
  usnj1 = () => { eVpnCommand("connect usnj1") };
  usla3 = () => { eVpnCommand("connect usla3") };
  cato2 = () => { eVpnCommand("connect cato2") };
  br2 = () => {   eVpnCommand("connect br2") };

  contextMenu = Menu.buildFromTemplate([
    {label: 'Disconnect', click: disconnect},
    {label: 'Smart Location', click: smart},
    {label: 'USA - Los Angeles - 3', click: usla3},
    {label: 'USA - New Jersey - 1', click: usnj1},
    {label: 'Canada Toronto 2', click: cato2},
    {label: 'Brazil 2', click: br2},
    {label: 'UK - East London', click: ukel},
    {label: 'Japan - Tokyo - 3', click: jpto3},
    {label: 'India - Mumbai - 1', click: inmu1},
    {type: 'separator'},
    {
      label: 'Quit', click: () => {
        app.quit()
      }
    },
  ]);

  setInterval(getConnectionStatusOrDie, 2000);
  trayIcon.setContextMenu(contextMenu);
}


function coloredClean(msg) {

  coloredCleanGlobal = msg.toString().split('\n')[0].replace(
    /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '');

  console.log(coloredCleanGlobal);
}
