const {app, BrowserWindow, ipcMain} = require('electron');
const electron = require('electron');
global.share= {electron,ipcMain};

const url = require('url');
const path = require('path');   

app.disableHardwareAcceleration();



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
	if (BrowserWindow.getAllWindows().length === 0) {
	  createWindow()
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

  