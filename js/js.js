function game(arr) {
	let num = 0, targets = [];
		targets[num] = {targetsCount: 0};
	for (let i = 0; i < arr.length; i++) {
		for (let j = 0; j < arr[i].length; j++) {
			if (arr[i][j] == "W") {
				num++;
			targets[num] = {
				// row: i,
				targetsCount: 0
			};
			} else if (arr[i][j] == "E") {
				targets[num].targetsCount += 1;
			}
		}

	}
	return targets;
}


let input = [
	["0", "0", "E", "0"],
	["W", "0", "W", "E"],
	["0", "E", "0", "W"],
	["0", "W", "0", "E"]
];


console.log(game(input));