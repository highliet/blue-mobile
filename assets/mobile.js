var mobile = document.querySelector("#mobile");
var W = mobile.querySelector("iframe").contentWindow;
var btns = mobile.querySelectorAll("button");
btns.forEach(function(btn) {
 btn.onclick = e => {
  var type = e.target.id;
  type = type.replace('key', '');
  var l = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  if(l.includes(Number(type))) {
   // Number key pressed
   W.input(Number(type));
  }
  else if(
   W.keypress[type] &&
   W.keypress[type][W.currentScreen]
  ) {
   // Any other key pressed
   W.keypress[type][W.currentScreen]();
  }
 }
});

// Greeting program
var greetedUser = W.localStorage.getItem("greeteduser");
if(greetedUser == "" || greetedUser == null) {
 var uname = prompt("Hi User! Welcome to BlueOS. May I know your name?");
 if(uname != '' || uname != null) {
  W.localStorage.setItem("greeteduser", uname);
  greetedUser = W.localStorage.getItem("greeteduser");
 }
 else {
  alert("Please enter your name to continue.");
 }
}