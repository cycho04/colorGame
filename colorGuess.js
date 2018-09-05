var boxes = document.querySelectorAll(".box"); //selects each box
var title = document.getElementById("colorDisplay"); //selects the title color display
var bot = document.querySelectorAll(".bot"); // selects bot 3 boxes for easy mode
var h1 = document.querySelector("h1"); //selects title
var newGame = document.getElementById("newGame"); //selects new game button
var easy = document.getElementById("easy"); // easy button
var hard = document.getElementById("hard"); // hard button
var tryAgain = document.getElementById("tryAgain"); //try again 

//used to disable certain buttons/functions when won.
var gameOver = false;
//used to check which mode. (for buttons and which stays highlighted)
var mode = "hard";



//----------------------------------------------------
//Game initialization. randomizes colors and answer.
//----------------------------------------------------

//assigns colors,answer, and # of boxes based on difficulty. 3 = easy 6 = hard
assign(6);

//hides try again message
tryAgain.style.visibility = "hidden";




//----------------------------------------------
//Event Listeners: click
//-----------------------------------------------

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
	mode = "easy";
	//check if game is over, then player must press new game to continue
	if (gameOver == false) {
		//hides bottom 3 boxes
		for (i = 0; i < bot.length; i++) {
			bot[i].style.visibility = "hidden";
		}
		//reassigns color and answer in case answer was bot 3 boxes.
		assign(3);
		easy.classList.add("selected");
		hard.classList.remove("selected");
	}
	else {
		hard.classList.remove("selected"); //added to fix the button bug where
	}									   // when gameover, both buttons were both highlighted not just one
});


// Hard Button(default mode)
hard.addEventListener("click", function(){
	mode = "hard";
	if (gameOver == false) {
		//reveals all 6 boxes in case coming from easy mode
		for (i = 0; i < bot.length; i++) {
			bot[i].style.visibility = "visible";
		}
		assign(6);
		hard.classList.add("selected");
		easy.classList.remove("selected");
	}
	else {
		easy.classList.remove("selected"); //see easy^
	}
});


//Hovering effects
easy.addEventListener("mouseover", function(){
	easy.classList.add("selected");
});
easy.addEventListener("mouseout", function(){
	// checks which mode. If easy, then dont remove highlight.
	if (mode == "hard") {
		easy.classList.remove("selected");
	}	
})
hard.addEventListener("mouseover", function(){
	hard.classList.add("selected");
});
hard.addEventListener("mouseout", function(){
	// checks which mode. If hard, then dont remove highlight.
	if (mode == "easy") {
		hard.classList.remove("selected");
	}
});
newGame.addEventListener("mouseover", function(){
	newGame.classList.add("selected");
});
newGame.addEventListener("mouseout", function(){
	newGame.classList.remove("selected");
});








//---------------------------------------------------------------
//Functions
//---------------------------------------------------------------

//assigns a random color to each box and one of those for the answer.
function assign(n) {
	// n = 3 = easy. n=6=hard
	for (i = 0; i < n; i++) {
		boxes[i].style.backgroundColor = randomize(255);
	}
	//assigns one of the randomly generated color boxes to the title as the answer
	title.textContent = boxes[choose(n-1)].style.backgroundColor;
}


// EVENT LISTENER~~~~~~When a box is clicked...changes all color boxes and banner
// n = the position of the current boxes[n]
function clicked(n) {
	//if it is the answer...
	//toUpperCase used to comply with title RGB not rgb
	if (boxes[n].style.backgroundColor === title.textContent) {
		// game over. hard/easy buttons shouldnt work anymore
		gameOver = true;
		//try again -> thats correct
		tryAgain.textContent = "That's Correct!"
		tryAgain.style.visibility = "visible";
		// turns banner background into the answer color
		h1.style.backgroundColor = boxes[n].style.backgroundColor;
		//bcuz of correct answer, change all boxes to answer color
		for (i = 0; i < boxes.length; i++) {
			boxes[i].style.backgroundColor = title.textContent;
		}
	}
	// if not the answer...
	else {
		tryAgain.style.visibility = "visible";
		//wrong answer clicked. change box to black
		boxes[n].style.backgroundColor = "#222222";
	}
}


//Returns a random whole number between 0 and max. used to choose answer
function choose(max) {
	return Math.floor(Math.random() * max);
};


//Returns the rgb format using choose(max). max is used at 255 for rgb.
function randomize(max) {
	return "RGB(" + choose(max) + ", " + choose(max) + ", " + choose(max) + ")";
};