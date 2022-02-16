var bunnies = [
    'bunny1',
    'bunny2',
    'bunny3',
    'bunny4',
    'bunny5',
    'bunny6',
    'bunny7',
    'bunny8',
]

var bunnyButtons = [
    'clickbutton1',
    'clickbutton2',
    'clickbutton3',
    'clickbutton4',
    'clickbutton5',
    'clickbutton6',
    'clickbutton7',
    'clickbutton8',
];

var isPlaying = false;
var currButton = 0;

function pickBun(evt, bunnyName) {
    var i, bunnycontent, bunnylinks, currentBun;
    bunnycontent = document.getElementsByClassName("bunnycontent");
    for (i = 0; i < bunnycontent.length; i++) {
      bunnycontent[i].style.display = "none";
    }
    bunnylinks = document.getElementsByClassName("bunnylinks");
    for (i = 0; i < bunnylinks.length; i++) {
      bunnylinks[i].className = bunnylinks[i].className.replace(" active", "");
    }
    
    currentBun = document.getElementById(bunnyName).id;
    document.getElementById(bunnyName).style.display = "block";
    evt.currentTarget.className += " active";

    bunnies.forEach(function(value, index) {
        if(value == currentBun) {
            currButton = index;
        }
    });
}

window.onload = function() {
    document.getElementById('clickbutton1').click()
}

function pauseButtonPressed() {
    if (isPlaying) {
        isPlaying = false;
        console.log("paused")
    } 
}

function playButtonPressed() {
    isPlaying = true;
    if (isPlaying) {
        console.log('started');
        var setIntervalId = setInterval(function() {
            if(currButton<7) {
                document.getElementById(bunnyButtons[currButton + 1]).click();
            } else {
                document.getElementById(bunnyButtons[0]).click();
            } 
            if(!isPlaying) {
                clearInterval(setIntervalId)
            }
        }, 150)
    }
}

document.getElementById("playBtn").addEventListener("click", playButtonPressed)
document.getElementById("pauseBtn").addEventListener("click", pauseButtonPressed)