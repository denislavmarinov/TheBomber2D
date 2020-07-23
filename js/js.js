function bombPlaceCasesCheck(arr, x, y, num, targets, loopEnd, ifArg1, ifArg2, varToChange) {
    let rowNum = x,
        colNum = y, arg1New;

    for (let k = 0; k < loopEnd; k++) {
        if (ifArg1 == "x") {
            ifArg1New = rowNum;
        } else if (ifArg1 == "y") {
            ifArg1New = colNum;
        }
        if ((+ifArg1New) == (+ifArg2)) {
            break;
        }
        // console.log(rowNum, colNum);
        // console.log(arr[rowNum][colNum]);
        if (arr[rowNum][colNum] == "W") {
            break;
        } else if (arr[rowNum][colNum] == "E") {
            targets[num].targetsCount += 1;
        }
        switch (varToChange) {
            case 0:
                colNum++;
                break;
            case 1:
                rowNum++;
                break;
            case 2:
                colNum--;
                break;
            case 3:
                rowNum--;
                break;
        }
    }
    return targets;
}

function game(arr) {
    let num = 0, targets = [], bombThrowPlaces = [];
    // Find the empty ( 0 ) spaces in the input
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (arr[i][j] == "0") {
                bombThrowPlaces[num] = {};
                bombThrowPlaces[num] = { row: i, col: j };
                num++;
            }
        }
    }
    num = 0;
    // Check every case in which the bomb can be planted somewhere
    for (let ind in bombThrowPlaces) {

        targets[num] = { targetsCount: 0 };

        // Search for rnrmy in a row (form let to rigth) => x is not changing
        bombPlaceCasesCheck(arr, bombThrowPlaces[ind].row, bombThrowPlaces[ind].col, num, targets, arr[0].length, "y", arr[0].length, 0);

        // Searching for enemy in a cols (form top to down) => y is not changing.
        bombPlaceCasesCheck(arr, bombThrowPlaces[ind].row, bombThrowPlaces[ind].col, num, targets, arr.length, "x", arr.length, 1);

        // Search for rnrmy in a row (form rigth to left) => x is not changing
        bombPlaceCasesCheck(arr, bombThrowPlaces[ind].row, bombThrowPlaces[ind].col, num, targets, arr[0].length, "y", -1, 2);

        // Searching for enemy in a cols (form down to top) => y is not changing
        bombPlaceCasesCheck(arr, bombThrowPlaces[ind].row, bombThrowPlaces[ind].col, num, targets, arr.length, "x", -1, 3);

        num++;
    }

    // Find the biggest number of died enemies
    let mostTargetsDown = [],
        maxTargetsDown = 0,
        maxTargetsDownArr = [];
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

function checkIfInputArrIsEmpty(arr) {
    if (arr.length == 0) {
        return false;
    } else {
        return true;
    }
}

function checkIfInputSubArrIsEmpty(arr) {
    if (arr[0].length == 0) {
        return false;
    } else {
        return true;
    }
}

function checkIfInputDoesNotContain0(arr) {
    for (let ii = 0; ii < arr.length; ii++) {
        if (arr[ii].includes("0")) {
            return true;
        }
    }
    return false;
}

function checkIfInputDoesNotContainEnemies(arr) {
    for (let ij = 0; ij < arr.length; ij++) {
        if (arr[ij].includes("E")) {
            return true;
        }
    }
    return false;
}

function checkIfInputSubArrLengthIsNotEqual(arr) {
    let lengthsOfSubarr = [];
    for (let ik = 0; ik < arr.length; ik++) {
        lengthsOfSubarr.push(arr[ik].length);
    }

    for (let il = 0; il < lengthsOfSubarr.length - 1; il++) {
        if (lengthsOfSubarr[il] != lengthsOfSubarr[il + 1]) {
            return false;
        }
    }
    return true;
}

function checkIfTheInputIsCorrect(arr) {
    for (let im = 0; im < arr.length; im++) {
        for (var ip = 0; ip < arr[im].length; ip++) {
            if (arr[im][ip] != String.fromCharCode(69) && arr[im][ip] != String.fromCharCode(48) && arr[im][ip] != String.fromCharCode(87)) {
                return false;
            }
        }
    }
    return true;
}