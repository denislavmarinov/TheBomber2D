if (localStorage.getItem("inputData") == null) {
    window.location.href = "game.html";
}
let inputData = localStorage.getItem("inputData");
if (inputData.length > 0) {
    localStorage.removeItem("inputData");
    inputData = JSON.parse(inputData);
}

function whereToColor(inputData, x, y, targets, loopEnd, ifArg1, ifArg2, varToChange){
    let rowNum = x,
        colNum = y, ifArg1New;

    for (let k = 0; k < loopEnd; k++) {
        if (ifArg1 == "x") {
            ifArg1New = rowNum;
        }else if (ifArg1 == "y"){
            ifArg1New == colNum;
        } 
        if ((+ifArg1New) == (+ifArg2)) {
            break;
        }
        if (inputData[rowNum][colNum] == "W") {
            break;
        } else {
            targets.row.push(rowNum);
            targets.col.push(colNum);
        }
        switch(varToChange) {
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
function playGame(inputData){
    if (checkIfInputArrIsEmpty(inputData)) {
        if (checkIfInputSubArrIsEmpty(inputData)) {
            if (checkIfInputDoesNotContain0(inputData)) {
                if (checkIfInputDoesNotContainEnemies(inputData)) {
                    return game(inputData);
                }else{
                    return 0;
                }
            }else{
                return 0;
            }
        }else{
            return 0;
        }
    }else{
        return 0;
    }
}
let result = playGame(inputData), strToAppend = "";
if (result) {
    $(".green").text(result[0].value);
    $("#ways").text(result.length);
    for (let ind in result) {
        strToAppend = "";
        strToAppend += "<hr><div class='way"+(+ind+1)+"'>";
        strToAppend += "<p>You will hit " +result[0].value+ " enemies </p>";
        strToAppend += "<p>You may drop the bomb on the <span style='color:#1E90FF'>blue</span> and will hit the enemies in <span style='color:#B22222'>red</span></p>";
        strToAppend += "<table class='table table-striped' border='1'>";
        let targets = {};
        targets.row = [];
        targets.col = [];

        // Search for rnrmy in a row (form let to rigth) => x is not changing
        whereToColor(inputData, result[ind].rowToDrop, result[ind].colToDrop, targets, inputData[0].length, "y", inputData[0].length, 0);

        // Searching for enemy in a cols (form top to down) => y is not changing
        whereToColor(inputData, result[ind].rowToDrop, result[ind].colToDrop, targets, inputData.length, "x", inputData.length, 1);

        // Search for rnrmy in a row (form rigth to left) => x is not changing
        whereToColor(inputData, result[ind].rowToDrop, result[ind].colToDrop, targets, inputData[0].length, "y", -1, 2);
        
        // Searching for enemy in a cols (form down to top) => y is not changing
        whereToColor(inputData, result[ind].rowToDrop, result[ind].colToDrop, targets, inputData.length, "x", -1, 3);

        for (let i = 0; i < inputData.length; i++) {
            strToAppend += "<tr>";
            for (let j = 0; j < inputData[i].length; j++) {
                strToAppend += "<td>" + inputData[i][j] + "</td>";
            }
            strToAppend += "</tr>";
        }
        strToAppend += "</table>";
        strToAppend += "</div>";
        $("section").append(strToAppend);
        for (let index in targets.row) {
            let tr = ".way"+(+ind+1)+" table tr:nth-of-type("+(+targets.row[index]+1)+")", td = "td:nth-of-type("+(+targets.col[index]+1)+")";
            if (result[ind].rowToDrop == targets.row[index] && result[ind].colToDrop == targets.col[index]) {
                $(tr).children(td).attr("class", "blueTd");
            }else{
                $(tr).children(td).attr("class", "redTd");
            }
        }
    }
}else{
    // If result is equal to 0 display it
    $(".green").text(result);
    $("p:last").remove();
    let divContent = "";
    divContent = "<div class='result'>";
    divContent += "<table class='table table-striped' border='1'>";
    for (let i = 0; i < inputData.length; i++) {
        divContent += "<tr>";
        for (let j = 0; j < inputData[i].length; j++) {
            divContent += "<td>" + inputData[i][j] + "</td>";
        }
        divContent += "</tr>";
    }
    divContent += "</table>";
    divContent += "</div>";
    $("p:last").after(divContent);
}