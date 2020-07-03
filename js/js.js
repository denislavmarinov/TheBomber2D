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
		let x = bombThrowPlaces[ind].row;
		
		targets[num] = {targetsCount: 0};

		for (let y = 0; y < arr.length; y++) {
			if (arr[x][y] == "W") {
				break;
			} else if (arr[x][y] == "E") {
				targets[num].targetsCount += 1;
			}
		}

		y = bombThrowPlaces[ind].col;
		x = 0;
		
		for (x = 0; x < arr.length; x++) {
			if (arr[x][y] == "W") {
				break;
			} else if (arr[x][y] == "E") {
				targets[num].targetsCount += 1;
			}
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