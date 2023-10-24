var apps = [
 {
  name: 'Dialer',
  icon: 'fa fa-phone',
  appid: 'dialer'
 },
 {
  name: 'About',
  icon: 'fa fa-info',
 },
 {
  name: 'Clock',
  icon: 'fa fa-clock-o',
  appid: 'clock'
 },
 {
  name: 'Music Player',
  icon: 'fa fa-music',
  appid: 'music'
 },
 {
  name: 'Multimedia',
  icon: 'fa fa-play-circle',
 },
 {
  name: 'Camera',
  icon: 'fa fa-camera',
 },
 {
  name: 'Settings',
  icon: 'fa fa-cog',
 },
 {
  name: 'Browser',
  icon: 'fa fa-globe',
 },
 {
  name: 'Apps & Games',
  icon: 'fa fa-fa',
 },
];

for(let i=0; i<apps.length; i++) {
 var _id = (apps[i].appid) ? apps[i].appid : '';
 var _col = (apps[i].color) ? apps[i].color : '';
 var _bgcol = (apps[i].bgcolor) ? apps[i].bgcolor : '';

 createAppBlock(
  apps[i].name,
  apps[i].icon,
  _id, _col, _bgcol);
}

window.appBlockI = 0;
selectAppBlock(appBlockI);


// BLUE App: Music Player

createApp('music', `
 <style>
  main {
   color: #333;
   padding: 5px;
  }

  #icon {
   float: left;
   width: 50px;
   height: 50px;
   margin-right: 5px;
   display: inline-block;
  }

  span#icon {
   color: #fff;
   padding: 5px;
   font-size: 25px;
   background-color: #ddd;
  }

  #val {
   -webkit-appearance: none;
   width: 100%;
   height: 8px;
   border-radius: 5px;  
   background: #999;
   outline: none;
   opacity: 0.7;
   -webkit-transition: .2s;
   transition: opacity .2s;
  }

  #val::-webkit-slider-thumb {
   -webkit-appearance: none;
   appearance: none;
   width: 15px;
   height: 15px;
   border-radius: 50%; 
   background: #00a2e8;
   cursor: pointer;
  }
 </style>
 <header>Music Player</header>
 <main>
  <audio id="music" src="./files/Tobu-Candyland.mp3" type="audio/mpeg"></audio>
  <div class="ui-clearfix">
   <img src="./files/Tobu-Candyland.jpg" id="icon" />
   <aside>
    <strong>Candyland</strong><br />
    <small>Tobu</small>
   </aside>
  </div>
  <div class="ui-clearfix">
   <input type="range" id="val" value="0" max="100" /><br />
   <small class="ui-pull-left" id="current">--:--</small>
   <small class="ui-pull-right" id="total">--:--</small>
  </div>
 </main>
 <footer>
  <span class="ui-pull-left">Background</span>
  <span id="pptxt">Play</span>
  <span class="ui-pull-right">Back</span>
 </footer>
`);

var playing = false;
var plyr = music[1];
window.keypress.ok['music'] = () => {
 if(playing == false) {
  playing = true;
  plyr.play();
  pptxt.innerText = "Pause";
 }
 else {
  playing = false;
  plyr.pause();
  pptxt.innerText = "Play";
 }
}

window.keypress.left['music'] = () => window.setScreen('home');
window.keypress.num['music'] = n => {
 switch(n) {
  case 4:
   plyr.currentTime = (plyr.currentTime - 5);
   break;
  case 6:
   plyr.currentTime = (plyr.currentTime + 5);
   break;
 }
}

enableToExit('music');


plyr.ontimeupdate = e => {
 var _c = e.target.currentTime;
 var _d = e.target.duration;
 var percent = (_c / _d) * 100;
 var _cMin = ('0' + Math.floor(_c / 60)).slice(-2);
 var _cSec = ('0' + Math.floor(_c % 60)).slice(-2);
 var _dMin = ('0' + Math.floor(_d / 60)).slice(-2);
 var _dSec = ('0' + Math.floor(_d % 60)).slice(-2);
 $$("val").value = (_c / _d) * 100;
 $$("current").innerText = `${_cMin}:${_cSec}`;
 $$("total").innerText = `${_dMin}:${_dSec}`;

 // Stops the player when music ends.
 if(_c === _d) {
  playing = false;
  plyr.pause();
  pptxt.innerText = "Play";
 }
}
window.keypress.ast['music'] = () => {
 try {
 var v = plyr.volume - 0.1;
 plyr.volume = v;
 Notify(`Audio volume: ${Math.round(v * 100) + '%'}`)
 }
 catch(e){}
}

window.keypress.hash['music'] = () => {
 try {
 var v = plyr.volume + 0.1;
 plyr.volume = v;
 Notify(`Audio volume: ${Math.floor(v * 100) + '%'}`)
 }
 catch(e){}
}


// BLUE App: Clock

createApp('clock', `
 <header>Clock</header>
 <main>
  <time class="widget">
   <span id="time">00:00</span>
   <span id="date">Sat, 01 Jan 2022</span>
  </time>
 </main>
 <footer>
  <span class="ui-pull-right">Back</span>
 </footer>
`);

enableToExit('clock');
setRealTimeData();