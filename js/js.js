function game(arr) {
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
}


let input = [
	["0", "0", "E", "0"],
	["W", "0", "W", "E"],
	["0", "E", "0", "W"],
	["0", "W", "0", "E"]
];


console.log(game(input));