/**
 * 
 * Core functions
 */
// takes the id and plays corresponding sound
function playSound(buttonId) {
  console.log("In fn playSound: btnId - " + buttonId);
  switch (buttonId) {
    case "green":
      var audio = new Audio("sounds/green.mp3");
      audio.play();
      break;

    case "red":
      var audio = new Audio("sounds/red.mp3");
      audio.play();
      break;

    case "yellow":
      var audio = new Audio("sounds/yellow.mp3");
      audio.play();
      break;

    case "blue":
      var audio = new Audio("sounds/blue.mp3");
      audio.play();
      break;

    default:
      console.log("unknown event click: " + buttonId);
  }
}

// takes the id and toggles highlighting animation
function highlight(buttonId) {
  console.log("In fn highlight: btnId - " + buttonId);

  $("#" + buttonId).addClass("pressed");

  setTimeout(function () {
    $("#" + buttonId).removeClass("pressed");
  }, 500);
}


function generateRandomNumber() {
  return Math.floor(Math.random() * 4);
}

// Environment Variables
var tiles = ["green", "red", "yellow", "blue"];
var simonArray = [],
  userUpdateCount = 0;
var playerLevel = 1;
var t = 0;

/**
 * Utility functions
 */
function logEnvStatus() {
  console.log("Player level: " + playerLevel);
  console.log("tiles: " + tiles);
  console.log("SimonArray: " + simonArray);
  console.log("userUpdCount: " + userUpdateCount);
  console.log("t: " + t);
}

function setTitle(str) {
  $("#level-title").text(str);
}

function levelClearSequence() {
  playerLevel++;
  t=0;
  simonArray = [];
  userUpdateCount = 0;
}

function gameOverSequence() {
  setTitle("Oh uh!");
  new Audio("sounds/wrong.mp3").play();
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
    setTitle("Press A key to start");
  }, 700);

  t=0;
  simonArray = [];
  userUpdateCount = 0;
  playerLevel = 1;
}
function activateClicks() {
  $(".btn").click(function(evt) {
    playSound(this.id);
    highlight(this.id);
    onUserClick(this.id);
  });
}

function onUserClick(evt) {
  console.log(evt);
  if ( evt != simonArray[t++]){
    gameOverSequence();
    deactivateClicks();
    initGame();
  }

  if( t === playerLevel ) {
    levelClearSequence();
    deactivateClicks();
    setTimeout(startTheGame, 500);
  }
}
function deactivateClicks() {
  $(".btn").unbind("click");
}
function displaySimonSequence() {
  setTimeout(function () {
    if (t < playerLevel) {
      highlight(simonArray[t]);
      playSound(simonArray[t]);  
      t++;
      displaySimonSequence(t);
    } else {
      t = 0;
    }
  }, 1000);
}

function startTheGame() {
  setTitle("🚩 level " + playerLevel);
  playSimonSequence();
  playUserSequence();
}

function playSimonSequence() {
  for (let i = 0; i < playerLevel; i++) {
    let rng = generateRandomNumber();
    simonArray.push(tiles[rng]);
  }
  displaySimonSequence();
}

function playUserSequence() {
    activateClicks();
}


// init
function initGame() {
  $(document).keypress(function (event) {
    if (event.key === "A" || event.key === "a") {
      console.log("game begun");
      $(document).unbind("keypress");
      startTheGame();
    } else {
      console.log("wrong key");
    }
  });
}

initGame();