function bombPlaceCasesCheck (arr, x, y, loopEnd, ifArg1, ifArg2, varToChange) {

	for (let k = 0; k < loopEnd; k++) {
		if (ifArg1 == (ifArg2)) {
			break;
		}
		if (arr[x][y] == "W") {
			break;
		} else if (arr[x][y] == "E") {
			targets[num].targetsCount += 1;
		}
		varToChange;
	}
}
function game(arr){
	var num = 0, targets = [];
	let bombThrowPlaces = []; 
	// Find the empty ( 0 ) spaces in the input
	for (let i = 0; i < arr.length; i++) {
		for (let j = 0; j < arr[i].length; j++) {
			if(arr[i][j] == "0"){
				bombThrowPlaces[num] = {};
				bombThrowPlaces[num] = {row: i, col: j}; 
				num++;
			}
		}
	}
	num = 0;
	// Check every case in which the bomb can be planted somewhere
	for (let ind in bombThrowPlaces) {
		let x = bombThrowPlaces[ind].row, y = bombThrowPlaces[ind].col;

		targets[num] = {targetsCount: 0};
		// Search for rnrmy in a row (form let to rigth) => x is not changing
		bombPlaceCasesCheck(arr, x, y, arr[0].length, y, arr[0].length, y++);


		// for (let k = 0; k < arr[0].length; k++) {
		// 	// Check if y is equal to the end of the row and make it 0 (zero)
		// 	if (y == (arr[0].length)) {
		// 		break;
		// 	}
		// 	if (arr[x][y] == "W") {
		// 		break;
		// 	} else if (arr[x][y] == "E") {
		// 		targets[num].targetsCount += 1;
		// 	}
		// 	y++;
		// }

		// Set the value again so not to be changed after the previous activities with them
		x = bombThrowPlaces[ind].row, y = bombThrowPlaces[ind].col;

		// Searching for enemy in a cols (form top to down) => y is not changing.
		bombPlaceCasesCheck(arr, x, y, arr.length, x, arr.length, x++);
		// for (let l = 0; l < arr.length; l++) {
		// 	// Check if x is equal to the end of the col and make it 0 (zero)
		// 	if (x == (arr.length)) {
		// 		break;
		// 	}
		// 	if (arr[x][y] == "W") {
		// 		break;
		// 	} else if (arr[x][y] == "E") {
		// 		targets[num].targetsCount += 1;
		// 	}
		// 	x++;
		// }
		// Set the value again so not to be changed after the previous activities with them
		x = bombThrowPlaces[ind].row, y = bombThrowPlaces[ind].col;

		// Search for rnrmy in a row (form rigth to left) => x is not changing
		bombPlaceCasesCheck(arr, x, y, arr[0].length, y, -1, y--);
		// for (let m = 0; m < arr[0].length; m++) {
		// 	// Check if y is equal to the end of the row and make it 0 (zero)
		// 	if (y == -1) {
		// 		break;
		// 	}
		// 	if (arr[x][y] == "W") {
		// 		break;
		// 	} else if (arr[x][y] == "E") {
		// 		targets[num].targetsCount += 1;
		// 	}
		// 	y--;
		// }

		// Set the value again so not to be changed after the previous activities with them
		x = bombThrowPlaces[ind].row, y = bombThrowPlaces[ind].col;
		
		// Searching for enemy in a cols (form down to top) => y is not changing
		bombPlaceCasesCheck(arr, x, y, arr.length, x,  -1, x--);
		// for (let h = 0; h < arr.length; h++) {
		// 	// Check if x is equal to the end of the col and make it 0 (zero)
		// 	if (x == -1) {
		// 		break;
		// 	}
		// 	if (arr[x][y] == "W") {
		// 		break;
		// 	} else if (arr[x][y] == "E") {
		// 		targets[num].targetsCount += 1;
		// 	}
		// 	x--;
		// }

		num++;
	}

	// Find the biggest number of died enemies
	let mostTargetsDown = [], maxTargetsDown = 0, maxTargetsDownArr = [];
	num = 0;

	// Store the values in array
	for (let o = 0; o < targets.length; o++) {
		maxTargetsDownArr.push(targets[o].targetsCount);
	}

	maxTargetsDown = Math.max(...maxTargetsDownArr);

	// Search for biggest number/s of died enemies
	for (let g = 0; g < targets.length; g++) {
		if (targets[g].targetsCount == maxTargetsDown) {
			mostTargetsDown[num] = {
				value: targets[g].targetsCount,
				rowToDrop: bombThrowPlaces[g].row,
				colToDrop: bombThrowPlaces[g].col
			};
			num++;
		}
	}

	return mostTargetsDown;
}

// let input = [
// 	["0", "0", "E", "0"],
// 	["W", "0", "W", "E"],
// 	["0", "E", "0", "W"],
// 	["0", "W", "0", "E"]
// ];

// let input = [
// 	["0", "E", "0", "0"],
// 	["E", "0", "W", "E"],
// 	["0", "E", "0", "0"]
// ];


// let input = [
// 	["0", "E"]
// ];

// let input = [
// 	["0", "E", "0", "W"]
// ];

// let input = [
// 	["W"],
// 	["E"],
// 	["W"],
// 	["0"],
// 	["E"]
// ]

// let input = [
// 	["0", "W", "E", "w"]
// ];

// let input = [
// 	["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
// 	["E", "E", "E", "E", "E", "E", "E", "E", "E", "E"]
// ];

// let input = [
// 	["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
// 	["E", "E", "E", "E", "E", "E", "E", "E", "E", "E"],
// 	["W", "W", "W", "W", "W", "W", "W", "W", "W", "W"]
// ];

// let input = [
// 	["E", "E", "E", "E", "E", "E", "E", "E", "E", "E"],
// 	["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
// 	["E", "E", "E", "E", "E", "E", "E", "E", "E", "E"]
// ]

// let input = [
// 	["0", "E", "0", "0"],
// 	["E", "0", "W", "E"],
// 	["E", "0", "W", "0"]
// ];

// let input = [
// 	["W", "W", "W", "W"],
// 	["W", "0", "W", "E"],
// 	["E", "W", "0", "W"]
// ];

// let input = [
// 	["0", "E", "E", "0"],
// 	["E", "W", "W", "E"],
// 	["E", "W", "W", "E"],
// 	["0", "E", "E", "0"]
// ]

// let input = [];

// let input = [[]];

// let input =[
// 	["E"],
// 	["E"],
// 	["E"]
// ];

// let input = [
// 	["0"],
// 	["W"],
// 	["0"]
// ]

// let input = [
// 	["0"],
// 	["E",  "W"]
// ]

let input = [
	["P"],
	["E"],
	["W"],
	["0"]
]

//console.log(game(input));


function checkIfInputArrIsEmpty(arr){
	if (arr.length == 0) {
		return false;
	}else{
		return true;
	}
}

// console.log(checkIfInputArrIsEmpty(input));


function checkIfInputSubArrIsEmpty (arr) {
	if (arr[0].length == 0) {
		return false;
	}else{
		return true;
	}
}

// console.log(checkIfInputSubArrIsEmpty(input));


function checkIfInputDoesNotContain0 (arr) {
	for (let ii = 0; ii < arr.length; ii++) {
		if (arr[ii].includes("0")) {
			return true;
		}
	}
	return false;
}

// console.log(checkIfInputDoesNotContain0(input));

function checkIfInputDoesNotContainEnemies (arr) {
	for (let ij = 0; ij < arr.length; ij++) {
		if (arr[ij].includes("E")) {
			return true;
		}
	}
	return false;
}

// console.log(checkIfInputDoesNotContainEnemies(input));


function checkIfInputSubArrLengthIsNotEqual(arr){
	let lengthsOfSubarr = [];
	for (let ik = 0; ik < arr.length; ik++) {
		lengthsOfSubarr.push(arr[ik].length);
	}

	for (let il = 0; il < lengthsOfSubarr.length-1; il++) {
		if (lengthsOfSubarr[il] != lengthsOfSubarr[il+1]) {
			return false;
		}
	}
	return true;
}

// console.log(checkIfInputSubArrLengthIsNotEqual(input));

function checkIfTheInputIsCorrect(arr){
	for (let im = 0; im < arr.length; im++) {
		for (var ip = 0; ip < arr[im].length; ip++) {
			if (arr[im][ip] != String.fromCharCode(69) && arr[im][ip] != String.fromCharCode(48) && arr[im][ip] != String.fromCharCode(87)) {
				return false;
			}
		}
	}
	return true;
}

// console.log(checkIfTheInputIsCorrect(input));