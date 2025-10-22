
var buttonColors = ["red", "blue", "green", "yellow"]
var gamePattern = [];
var userClickPattern= [];
var level = 0;
var started = false;
 

function nextSequence(){
    userClickPattern= [];

    level++;
    $("h1").text("LEVEL "+level);
    
    var randomNumber = Math.floor(Math.random()*4);

    var randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    var audio = new Audio(randomChosenColor + ".mp3");
    audio.play();

}
// Button click handler (outside nextSequence)
$(".btn").on("click", function() {
  var userChosenColor = $(this).attr("id");
  
  // Animate the button the user clicked
  $("#" + userChosenColor).fadeOut(100).fadeIn(100);
  animatePress(userChosenColor);
  var audio = new Audio(+userChosenColor+".mp3");
  audio.play(); 
  userClickPattern.push(userChosenColor);
  checkAnswer(userClickPattern.length-1);
});

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

$(document).keydown(function(){
  if (!started) {
    $("h1").text("Level " + level);
    nextSequence();
    started = true;
  }
});


function checkAnswer(currentLevel){

    if(gamePattern[currentLevel]===userClickPattern[currentLevel])
    {
        console.log("SUCCESS");

        if(gamePattern.length === userClickPattern.length)
        {
            setTimeout(function () {
            nextSequence();
            }, 1000);
        }

        
    }   

    else{
            console.log("Wrong");

            var wrongAudio = new Audio("wrong.mp3");
    wrongAudio.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
        }
    
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}







