buttonColours = ["red", "blue", "green", "yellow"];
gamePattern = [];
userClickedPattern = [];
var level = 0;
var started = false;

// Contineously check the status of started variable
$("body").keypress(function () {
  // If its false when we pressesd the first key,
  //it call the next sequence and sets the level to 0 and started to true
  if (!started) {
    level = 0;
    $("h1").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// its main purpose is to detect the button click and determine the its id
//and then call required functions
$(".btn").click(function () {
  //the current colour id, matches with the buttoncolours array and pushes it in
  //userclickedpatter array and the call sound, animate fuctions and check answer function
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  //Clears the user input array so they for the level user has to start with pattern from the
  //beginning
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
  level = level + 1;
  $("h1").text("Level " + level);
}

function playSound(name) {
  var sound = new Audio("./sounds/" + name + ".mp3");
  sound.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

//uses the user input to matchits elements with the game pattern array on every click
//
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("h1").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 500);
    startOver();
  }
}

function startOver() {
  level = 0;
  started = false;
}
