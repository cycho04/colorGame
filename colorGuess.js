var boxes = document.querySelectorAll(".box"); //selects each box
var title = document.getElementById("colorDisplay"); //selects the title color display
var bot = document.querySelectorAll(".bot"); // selects bot 3 boxes for easy mode
var h1 = document.querySelector("h1"); //selects title
var newGame = document.getElementById("newGame"); //selects new game button
var easy = document.getElementById("easy"); // easy button
var hard = document.getElementById("hard"); // hard button
var tryAgain = document.getElementById("tryAgain"); //try again 






//Game initialization. randomizes colors and answer.

//assigns a random color to each box
for (i = 0; i < boxes.length; i++) {
	boxes[i].style.backgroundColor = randomize(255);
}

//assigns one of the randomly generated color boxes to the title as the answer
//toUpperCase used to display RGB not rgb
title.textContent = boxes[choose(5)].style.backgroundColor.toUpperCase(); // use style.backgroundColor to access the rgb. else it returns the whole div

//hides try again message
tryAgain.style.visibility = "hidden";


//used to disable certain buttons/functions when won.
gameOver = false;




//Event Listeners: click

//clicking boxes
boxes[0].addEventListener("click", function() {
	clicked(0);
});
boxes[1].addEventListener("click", function() {
	clicked(1);
});
boxes[2].addEventListener("click", function() {
	clicked(2);
});
boxes[3].addEventListener("click", function() {
	clicked(3);
});
boxes[4].addEventListener("click", function() {
	clicked(4);
});
boxes[5].addEventListener("click", function() {
	clicked(5);
});

// New game button
newGame.addEventListener("click", function(){
	location.reload(); //reloads the page
});

// Easy button
easy.addEventListener("click", function(){
	if (gameOver == false) {
		for (i = 0; i < bot.length; i++) {
			bot[i].style.visibility = "hidden";
		}
	}
});

// Hard Button(default mode)
hard.addEventListener("click", function(){
	if (gameOver == false) {
		for (i = 0; i < bot.length; i++) {
			bot[i].style.visibility = "visible";
		}
	}
});








//Functions

// EVENT LISTENER~~~~~~When a box is clicked...changes all color boxes and banner
// n = the position of the current boxes[n]
function clicked(n) {
	//If it is the answer
	//toUpperCase used to comply with title RGB not rgb
	if (boxes[n].style.backgroundColor.toUpperCase() === title.textContent) {
		// game over. hard/easy buttons shouldnt work anymore
		gameOver = true;
		//try again -> thats correct
		tryAgain.textContent = "That's Correct!"
		// turns banner background into the answer color
		h1.style.backgroundColor = boxes[n].style.backgroundColor.toUpperCase();
		for (i = 0; i < boxes.length; i++) {
			//bcuz of correct answer, change all boxes to answer color
			boxes[i].style.backgroundColor = title.textContent;
		}
	}
	// if not the answer
	else {
		tryAgain.style.visibility = "visible";
		//change box to black
		boxes[n].style.backgroundColor = "black";
	}
}

//Returns a random whole number between 0 and max
function choose(max) {
	return Math.floor(Math.random() * max);
};

//Returns the rgb format using choose(max). max is used at 255 for rgb.
function randomize(max) {
	return "RGB(" + choose(max) + ", " + choose(max) + ", " + choose(max) + ")";
};