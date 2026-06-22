var gamePattern = [];

var userClickedPattern=[];

var level=0;

var randomColors = ["red", "blue", "green", "yellow"];

function nextSequence() {

    userClickedPattern=[];
    level++;

    $("#level-title").text("level : "+level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = randomColors[randomNumber];

    gamePattern.push(randomChosenColor);

    //animatePress(randomChosenColor);

     //Animate
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    
    // Play Sound
    //var audio = new Audio("./sounds/" + randomChosenColor + ".mp3");
    //audio.play();

    playSound(randomChosenColor);

}

// Example trigger
//document.getElementById('playButton').addEventListener('click', function() {
   // nextSequence();
//});

$(".btn").click(handler);

function handler()
{
    var userChosenColor = $(this).attr("id");

    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);

    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
}

function playSound(name)
{
    var audio=new Audio("sounds/" + name + ".mp3");
    audio.play();

}

function animatePress(currentColor)
{
    $("#" + currentColor).addClass("pressed");

    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

var started=0;

$(document).on("keypress", function() {
    if(!started)
    {
        $("#level-title").text("Level : "+level);
        nextSequence();
        started=true;
    }
//this is to ensure that it will happen only at the time when the game has first began
});



function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel]==userClickedPattern[currentLevel])
        {
            if(userClickedPattern.length === gamePattern.length)
            {
                setTimeout(function () {
                    nextSequence();
                                }, 1000);
        }
    }

    else
        {
            $("#level-title").text("Game Over, Press Any Key to Restart");

            playSound("wrong");

            $("body").addClass("game-over");

            setTimeout(function(){
                $("body").removeClass("game-over");
            }, 200);

        startOver();

        }
}

function startOver()
{
    level=0;
    gamePattern=[];
    started=0;
}
