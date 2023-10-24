// script.js of BlueOS.

window.setScreen('lock');
Notify(`Welcome, ${localStorage.getItem('greeteduser')}!`);
setInterval(setRealTimeData, 500);

Object.assign(window.keypress.left, {
 "lock": () => unlock(0),
 "lockarea": () => {
  if(box.value.length == 4) {
   unlock(1);
  }
 },
 "home": () => window.setScreen("appmenu"),
});

Object.assign(window.keypress.right, {
 "lockarea": () => {
  var p = $$("pinbox");
  if(p.value != "") { bsp(); }
  else {
   window.setScreen('lock');
   window.activeInputEl = null;
   window.activeInputType = null;
  }
 },
 "home": () => window.setScreen("notifications"),
 "notifications": () => window.setScreen("home"),
 "appmenu": () => window.setScreen("home"),
 "dialer": () => {
  var p = $$("phonebox");
  if(p.value != "") { bsp(); }
  else {
   window.setScreen('home');
   window.activeInputEl = null;
   window.activeInputType = null;
  }
 },
});

Object.assign(window.keypress.ok, {
 "home": () => window.setScreen("appmenu"),
 "appmenu": () => openApp()
});

Object.assign(window.keypress.call, {
 "home": () => {
  window.setScreen("dialer");
  window.activeInputEl = $$('phonebox');
  window.activeInputType = 'num';
 },
 "dialer": () => call($$("phonebox").value),
});

Object.assign(window.keypress.end, {
 "home": () => {
   lock();
 },
 "appmenu": () => window.setScreen("home"),
 "dialer": () => window.setScreen("home")
});

var _wpc = 1;
Object.assign(window.keypress.num, {
 "home": n => {
  switch(n) {
   case 5:
    var x = document.body.style;
    if(_wpc == 1) {
     _wpc = 2;
     Notify("Wallpaper changed to 'Wallpaper 2'");
     x.setProperty('--wallpaper', 'url(../files/wallpaper1.jpeg)');
    }
    else {
     _wpc = 1;
     Notify("Wallpaper changed to 'Wallpaper 1'");
     x.removeProperty('--wallpaper');
    }
    break;
   default:
    Notify(`No shortcut assigned with number ${n}`);
    break;
  }
 },
 "appmenu": n => {
  var i = window.appBlockI;
  switch(n) {
   case 2:
    selectAppBlock(i - 3);
    break;
   case 4:
    selectAppBlock(i - 1);
    break;
   case 6:
    selectAppBlock(i + 1);
    break;
   case 8:
    selectAppBlock(i + 3);
    break;
  }
 },
});

Object.assign(window.keypress.ast, {
 "dialer": () => input('*')
});

Object.assign(window.keypress.hash, {
 "dialer": () => input('#')
});

function numTask(n) {
 var x = window.currentScreen;
 if(keypress['num'][x]) {
  window.keypress['num'][x](n);
 }
}

var appL = document.querySelector("#appmenu ul");
function plusApp(n) {
 var appList = appL.querySelectorAll("li");
 appIndex = appIndex + n;
 if(appIndex >= appList.length) { appIndex = 0; }
 if(appIndex < 0) { appIndex = appList.length - 1; }
 appList.forEach(li => li.removeAttribute('data-active'));
 appList[appIndex].setAttribute('data-active', '');
}


var counter = $$("pincounter");
var box = $$("pinbox");
box.oninput = function() {
 changeIb(box, $$("ib1"));

 if(box.value.length >= 4) {
  $$("unlocker").classList.remove('ui-hidden');
 }
 else {
  $$("unlocker").classList.add('ui-hidden');
 }

 if(box.value.length >= 6) {
  box.value = box.value.slice(0, 6);
 }
 counter.innerText = 6 - Number(box.value.length);
}

var pbox = $$("phonebox");
pbox.oninput = function() {
 changeIb(pbox, $$("ib2"));
}

