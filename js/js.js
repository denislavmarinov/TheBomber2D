function game(arr){
	let num = 0, targets = [], bombThrowPlaces = []; 
	for (let i = 0; i < arr.length; i++) {
		bombThrowPlaces[num] = {}; 
		for (let j = 0; j < arr.length; j++) {
			if(arr[i][j] == "0"){
				bombThrowPlaces[num] = {row: i, col: j}; 
				num++;
			}
		}
	}

	num = 0;

	for (ind in bombThrowPlaces) {
		let x = bombThrowPlaces[ind].row, y = bombThrowPlaces[ind].col;
		
		targets[num] = {targetsCount: 0};
		// Search for rnrmy in a row => x is not changing
		for (let k = 0; k < arr.length; k++) {
			// Check if y is equal to the end of the row and make it 0 (zero)
			if (y == arr.length) {
				y = 0;
			}
			if (arr[x][y] == "W") {
				break;
			} else if (arr[x][y] == "E") {
				targets[num].targetsCount += 1;
			}
			y++;
		}

		
		// Searching for enemy in a cols => y is not changing
		for (l = 0; l < arr.length; l++) {
			// Check if x is equal to the end of the col and make it 0 (zero)
			if (x == arr.length) {
				x = 0;
			}
			if (arr[x][y] == "W") {
				break;
			} else if (arr[x][y] == "E") {
				targets[num].targetsCount += 1;
			}
			x++;
		}
		num++;
	}
	console.log(bombThrowPlaces);
	console.log(targets);
}

let input = [
	["0", "0", "E", "0"],
	["W", "0", "W", "E"],
	["0", "E", "0", "W"],
	["0", "W", "0", "E"]
];


game(input);