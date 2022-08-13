const {app, BrowserWindow, ipcMain} = require('electron');
const electron = require('electron');
global.share= {electron,ipcMain};

const url = require('url');
const path = require('path');   


const {autoUpdater} = require('electron-updater');
const log = require('electron-log');

// configure logging
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');



app.disableHardwareAcceleration();


let win;

const onReady = () => {   
	// Create the browser window.  
	win = new BrowserWindow({
		width: 900, 
		height: 6700,
		nativeWindowOpen:true,
		nodeIntegration:true,
	    webPreferences: {
			nodeIntegration: true,
			contextIsolation:false,
			//enableRemoteModule: true,
		}	  
	}) 
	
	// Load the index.html of the app.
	win.loadURL(url.format({      
		pathname: path.join(
			__dirname,
			'dist/electronangular/index.html'),       
		protocol: 'file:',      
		slashes: true     
	}))   

	// Open the DevTools.
	win.webContents.openDevTools()
	console.log('cargado todo');


	// trigger autoupdate check
	autoUpdater.checkForUpdates();


} 

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// This method is equivalent to 'app.on('ready', function())'
app.on('ready', onReady);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
	// On macOS it is common for applications and their menu bar
	// To stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
	  app.quit()
	}
  })
	
  
  

app.on('activate', () => {
	// On macOS it's common to re-create a window in the  
	// app when the dock icon is clicked and there are no 
	// other windows open.
	/*
	if (BrowserWindow.getAllWindows().length === 0) {
	  createWindow()
	}
	*/

	if (win === null) {
		createWindow();
	  }
	
  })

//====================================================//
/*
ipcMain.on('synchronous-message', (event, arg) => {
	console.log(arg) // prints "ping"
	event.returnValue = 'pong'
  })

  ipcMain.on('asynchronous-message', (event, arg) => {
	console.log(arg) // prints "ping"
	event.reply('asynchronous-reply', 'pong')
})  
*/
require(path.join(__dirname,'server','test.js'));


//-------------------------------------------------------------------
// Auto updates
//-------------------------------------------------------------------
const sendStatusToWindow = (text) => {
	log.info(text);
	if (win) {
	  win.webContents.send('message', text);
	}
  };
  
  autoUpdater.on('checking-for-update', () => {
	sendStatusToWindow('Checking for update...');
  });
  autoUpdater.on('update-available', info => {
	sendStatusToWindow('Update available.');
  });
  autoUpdater.on('update-not-available', info => {
	sendStatusToWindow('Update not available.');
  });
  autoUpdater.on('error', err => {
	sendStatusToWindow(`Error in auto-updater: ${err.toString()}`);
  });
  autoUpdater.on('download-progress', progressObj => {
	sendStatusToWindow(
	  `Download speed: ${progressObj.bytesPerSecond} - Downloaded ${progressObj.percent}% (${progressObj.transferred} + '/' + ${progressObj.total} + )`
	);
  });
  autoUpdater.on('update-downloaded', info => {
	sendStatusToWindow('Update downloaded; will install now');
  });
  
  autoUpdater.on('update-downloaded', info => {
	// Wait 5 seconds, then quit and install
	// In your application, you don't need to wait 500 ms.
	// You could call autoUpdater.quitAndInstall(); immediately
	autoUpdater.quitAndInstall();
  });
  