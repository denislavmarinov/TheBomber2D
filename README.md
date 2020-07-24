# TheBomber2D

1. Pages
	* index.html\
		Countains information about the rules of the game and sample input / output

	* pages/game.html\
		Page where user can play the game\. There are two ways of entering the input data:
		1. By selecting from select lists
				User have 4 buttons \- to add row, to add column, to delete row and to delete column\. Once when you are ready, you may hit the button Play, after input checks, if everything is OK,  the web app will redirect you to the output page \(*pages/game_result.html*\)\.
        
		2. By direct input
				If user chose this way, he/she should write real JS array\. The input will be checked and if everything is OK, you will be redirected to the output page \(*pages/game_result.html*\)\.

	* pages/game_result.html\
		Page where the result of the input is shown\. With table/s the possible ways are displayed and the enemies \(E\), which could be hit is with background colored in red and the start possition in blue \. On the top of the page the max amount of enemies, which could be hit is shown, also and the ways you have to hit max amount of enemies\.

2. Logic\
The logic is placed in 3 js files\.
	* js/js.js\
		    There is stored the logic of the app\. This file contains almost all checks for the input and the *game* function, which get the input and return the output\.

	* js/game_page.js\
		    There is stored all the code which could be used in the *pages/game.html* page\. In this file the logic, whick stands behind the all kind of inputs, checks for correct input, and also return errors in case of incorrect input\.
        
	* js/game_result.js\
		    In this file all code which make the tables in the output is stored\. Also the *game* function and all other functions which returns result are called\.