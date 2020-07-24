$("#typingDiv").hide();
let inputTypes = $("input[name=inputing]");
$(inputTypes).each(function(ind, el){
    $(this).on('change', function(e) {
        let divToShow = $(this).val()+"Div";
        $("#selectionDiv").hide();
        $("#typingDiv").hide();
        $("#"+divToShow).show();
    });
});

// For inputing using selects
let newRow = $("#newRow"), row = 0, col = 1;
$(newRow).on("click", addRow);
// Add new col html code
function newColHtmlCode(col){
    let htmlToAdd = "";
    htmlToAdd = "<div class='inputCol col"+col+"'>"
    htmlToAdd += "<span>[</span>";
    htmlToAdd += "<select name='col"+col+"'>";
    htmlToAdd += "<option value='E'>E</option>";
    htmlToAdd += "<option value='0'>0</option>";
    htmlToAdd += "<option value='W'>W</option>";
    htmlToAdd += "</select>";
    htmlToAdd += "<span>] ,</span>";
    htmlToAdd += "</div>";

    return htmlToAdd;
}
// Add a row
function addRow(){
    row++;
    let htmlToAdd = "<div class='inputRow' id='row"+row+"'>";
    if (col == 1) {
        htmlToAdd += newColHtmlCode(1);
    }else if (col > 1) {
        htmlToAdd += "<div class='inputCol col"+col+"'>"
        htmlToAdd += "<span>[</span>";
        for (let i = 1; i <= col; i++) {
            if (i == 1) {
                htmlToAdd += "<select name='col"+i+"'>";
                htmlToAdd += "<option value='E'>E</option>";
                htmlToAdd += "<option value='0'>0</option>";
                htmlToAdd += "<option value='W'>W</option>";
                htmlToAdd += "</select>";
            }else{
                htmlToAdd += "<span>, </span>";
                htmlToAdd += "<select name='col"+i+"'>";
                htmlToAdd += "<option value='E'>E</option>";
                htmlToAdd += "<option value='0'>0</option>";
                htmlToAdd += "<option value='W'>W</option>";
                htmlToAdd += "</select>";
            }
        }
        htmlToAdd += "<span>] ,</span>";
        htmlToAdd += "</div>";
    }
    htmlToAdd += "</div><p class='rowP"+row+"'></p>";
    $("#inputEnd").before(htmlToAdd);
}

let addCol = $("#newField");
// Add a col
$(addCol).on("click", function(){
    // Check if there are no rows
    if ($("#selectionContainer").children("div").length <= 0) {
        addRow();
    }else{
        let inputCol = $(".inputCol");
        // If in the code have some rows add to all of them 1 more column
        $(inputCol).each(function(ind) {
            let htmlToAdd = "<span>, </span>", whereToAdd = $(this).find("select[name='col"+col+"']");
            htmlToAdd += "<select name='col"+(col+1)+"'>";
            htmlToAdd += "<option value='E'>E</option>";
            htmlToAdd += "<option value='0'>0</option>";
            htmlToAdd += "<option value='W'>W</option>";
            htmlToAdd += "</select>";

            $(whereToAdd).after(htmlToAdd);
        });
        col++;
    }
});
// Delete a row
let deleteRow = $("#deleteRow");
$(deleteRow).on('click', function() {
    // Select all rows
    if (row == 1) {
        let id = "#row"+row, classRowP = ".rowP"+row;
        col = 1;
        row = 0;
        $(id).remove();
        $(classRowP).remove();
    } else if (row > 1) {
        let id = "#row"+row, classRowP = ".rowP"+row;
        $(id).remove();
        $(classRowP).remove();
        row--;
    }
    else{
        alert("There are no rows to be deleted!");
    }
});
// Delete a col
let deleteCol = $("#deleteField");
$(deleteCol).on("click", function () {
    if (col > 1) {
        let lastCol = "select[name='col"+col+"']";
        $("#selectionContainer").find(lastCol).prev().remove();
        $("#selectionContainer").find(lastCol).remove();
        col--;
    }else if(col === 1){
        $(".inputRow").each(function(ind) {
            $(this).remove();
            let classRowP = ".rowP"+(ind+1);
            $(classRowP).remove();
            row--;
        });
    }
})
// Submit the selecting form
let btnSubmit = $("#submitSelecting");
$(btnSubmit).on("click", function(){
    let num = 0, inputData = [];
    inputData[0] = [];
    $("select").each(function(ind, el){
        if ((ind)%col == 0 && ind !=0) {
            // New line
            num++;
            inputData[num] = [];
            let str = $(this).val();
            inputData[num].push(str);
        }else{
            let str = $(this).val();
            inputData[num].push(str);
        }

    });
    checkInputForErrors(inputData);
});
// Check the input for errors
function checkInputForErrors(inputData){
    if (checkIfInputSubArrLengthIsNotEqual(inputData)) {
        if (checkIfTheInputIsCorrect(inputData)) {
            // Save the data in localStorage
            localStorage.setItem("inputData", JSON.stringify(inputData));
            setTimeout(function () {
                window.location.href = "game_result.html";
            }, 100 );
            
        }else{
            // If there are previous errors remove them 
            if ($(".alert-danger").length != 0) {
                $(".alert-danger").remove();
            }
            // Add error message
            let error = "<p class='alert-danger'>Input includes characters different the the allowed!!!</p>";
            $("#selectionDiv").before(error);
        }
    }else{
        // If there are previous errors remove them
        if ($(".alert-danger").length != 0) {
                $(".alert-danger").remove();
            }
        // Add error message
        let error = "<p class='alert-danger'>The number of columns in each rows is different!!!</p>";
        $("#selectionDiv").before(error);
    }
}
// Check for correct brackts in direct input
function correctBrackets(inputData) {
    let splittedData = inputData.split("");

    for(let ic in splittedData){
        if (splittedData[ic] != "[" && splittedData[ic] != "]" && splittedData[ic] != "\'" && splittedData[ic] != "\"" &&  splittedData[ic] != "E" && splittedData[ic] != "0" && splittedData[ic] != "W" && splittedData[ic] != "\," && splittedData[ic] != " " && !splittedData[ic].match(/\n+/) && splittedData[ic] != String.fromCharCode(9)) {
            return ic;
        }
    }
    return true;
}
// Check for open/close brackets
function openCloseBrackets(inputData){
    let splittedData = inputData.split(""), openBracket = 0, closeBracket = 0; 

    for(let ia in splittedData){
        if (splittedData[ia] == "[") {
            openBracket += 1;
        }
        if (splittedData[ia] == "]") {
            closeBracket += 1;
        }
    }
    if (openBracket == closeBracket) {
        return true;
    }else{
        return false;
    }
}
// Direct typing array option
let btnSubmitTyping = $("#submitTyping");
$(btnSubmitTyping).on("click", function(){
    let  inputData = $("#inputData").val(), finalData = [], correctInputData;
    if (correctBrackets(inputData.toUpperCase()) != true || !openCloseBrackets(inputData)) {
        $(".alert-danger").remove();
        if (!openCloseBrackets(inputData)) {
            let newError = "<p class='alert-danger'>Brackets are not correctly placed!!!</p>";
            $("#inputData").before(newError);
        }
        if (correctBrackets(inputData) != true) {
            let splittedData = inputData.split(""), charNum = correctBrackets(inputData), newElement = "<p class='alert-danger'>This charcter <span class='font-weight-bold text-muted h4'>"+splittedData[charNum]+"</span> is not allowed!!! Use only E, W, 0</p>";
            $("#inputData").before(newElement);
        }
        // If the function return false
        alert("Inputted data is not correct!");
    }else{
        correctInputData = inputData.toUpperCase();
        function isJSONString(correctInputData){
            try {
                JSON.parse(correctInputData);
            } catch (e) {
                let newError = "<p class='alert-danger'>Input is not correct!!!</p>";
                $("#inputData").before(newError);
                return false;
            }
            return true;
        }
        if (isJSONString(correctInputData)) {
            finalData = JSON.parse(correctInputData);

            // Add a check for correct brackets
            checkInputForErrors(finalData);
        }
    }
});