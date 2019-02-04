window.onload = function() {
    resizeGrid();

    let startArr = [];

    for (let i = 0; i < 16; i++){
        startArr.push("");
    }

    let randomNum1;
    let randomNum2;

    do {
        randomNum1 = Math.floor(Math.random() * 15);
        randomNum2 = Math.floor(Math.random() * 15);
    } while (randomNum1 === randomNum2);


    startArr[randomNum1] = Math.random() <= 0.5 ? "2" : "4";
    startArr[randomNum2] = "2";

    for (let i = 1; i < 5; i++){
        let j = 1;
        for (let x = (i - 1) * 4; x < i * 4 ; x++){
            document.getElementById("row" + i + "col" + j).innerHTML = startArr[x];
            j++;
        }
    }

    addColor();
};

window.onkeyup = function(e) {
    let key = e.key;

    if (key === "w" || key === "W" || key === "ArrowUp"){

        makeMoves("up");

    } else if (key === "d" || key === "D" || key === "ArrowRight"){

        makeMoves("right");

    } else if (key === "s" || key === "S" || key === "ArrowDown"){

        makeMoves("down");

    } else if (key === "a" || key === "A" || key === "ArrowLeft"){

        makeMoves("left");

    }
};
window.onresize = function() {
    resizeGrid();
};

function makeMoves(move) {

    let arr = [];

    for (let i = 1; i < 5; i++){
        for (let j = 1; j < 5; j++){
            let value = document.getElementById("row" + i + "col" + j).innerHTML;
            arr.push(value);
        }
    }

    let newArr = [...arr];

    switch (move) {
        case "up":

            playRound(newArr);

            if(!compare(arr, newArr)){
                addToEmptySpot(newArr);
            }
            break;
        case "right":

            // Rotate 90 degrees clockwise
            newArr = rotateArray(newArr, arr, 3, 7, 11, 15, 2, 6, 10,
                14, 1, 5, 9, 13, 0, 4, 8, 12);

            playRound(newArr);

            // Rotate it back
            newArr = rotateArray(newArr, newArr, 12, 8, 4, 0, 13, 9, 5,
                1, 14, 10, 6, 2, 15, 11, 7, 3);

            if(!compare(arr, newArr)){
                addToEmptySpot(newArr);
            }
            break;
        case "down":
            // Rotate 180 degrees, in other words reverse it.
            newArr = [...arr].reverse();

            playRound(newArr);

            // Rotate/reverse it back
            newArr.reverse();

            if(!compare(arr, newArr)){
                addToEmptySpot(newArr);
            }
            break;
        case "left":

            // Rotate 90 degrees anticlockwise
            newArr = rotateArray(newArr, arr, 12, 8, 4, 0, 13, 9, 5,
                1, 14, 10, 6, 2, 15, 11, 7, 3);

            playRound(newArr);

            // Rotate it back
            newArr = rotateArray(newArr, newArr, 3, 7, 11, 15, 2, 6, 10,
                14, 1, 5, 9, 13, 0, 4, 8, 12);

            if(!compare(arr, newArr)){
                addToEmptySpot(newArr);
            }
            break;
    }

    insertToGrid(newArr);
}

// Resize grid slots when window size changes
function resizeGrid() {
    for (let i = 1; i < 5; i++){
        for (let j = 1; j < 5; j++){
            let width = document.getElementById("row" + i + "col" + j).offsetWidth;
            document.getElementById("row" + i + "col" + j).style.height = width + "px";
            document.getElementById("row" + i + "col" + j).style.lineHeight = width + "px";
        }
    }
}

// Inserts the new array values to the grid
function insertToGrid(arr) {
    for (let i = 1; i < 5; i++){
        let j = 1;
        for (let x = (i - 1) * 4; x < i * 4 ; x++){
            document.getElementById("row" + i + "col" + j).innerHTML = arr[x];
            j++;
        }
    }
    addColor();
}

// Adds classes based on value to add color
function addColor(){
    for (let i = 1; i < 5; i++){
        for (let j = 1; j < 5; j++){
            let element = document.getElementById("row" + i + "col" + j);
            let parent = element.parentElement;
            let value = element.innerHTML;
            let className = parent.classList;
            const classValues = ["num2", "num4", "num8", "num16", "num32", "num64", "num128", "num256", "num512",
                "num1024", "num2048", "num4096", "num8192", "num16384", "num32768", "num65536"];
            switch (value) {
                case "2":
                    className.remove(...classValues);
                    className.add("num2");
                    break;
                case "4":
                    className.remove(...classValues);
                    className.add("num4");
                    break;
                case "8":
                    className.remove(...classValues);
                    className.add("num8");
                    break;
                case "16":
                    className.remove(...classValues);
                    className.add("num16");
                    break;
                case "32":
                    className.remove(...classValues);
                    className.add("num32");
                    break;
                case "64":
                    className.remove(...classValues);
                    className.add("num64");
                    break;
                case "128":
                    className.remove(...classValues);
                    className.add("num128");
                    break;
                case "256":
                    className.remove(...classValues);
                    className.add("num256");
                    break;
                case "512":
                    className.remove(...classValues);
                    className.add("num512");
                    break;
                case "1024":
                    className.remove(...classValues);
                    className.add("num1024");
                    break;
                case "2048":
                    className.remove(...classValues);
                    className.add("num2048");
                    break;
                case "4096":
                    className.remove(...classValues);
                    className.add("num4096");
                    break;
                case "8192":
                    className.remove(...classValues);
                    className.add("num8192");
                    break;
                case "16384":
                    className.remove(...classValues);
                    className.add("num16384");
                    break;
                case "32768":
                    className.remove(...classValues);
                    className.add("num32768");
                    break;
                case "65536":
                    className.remove(...classValues);
                    className.add("num65536");
                    break;
                default:
                    className.remove(...classValues);
                    break;
            }
        }
    }
}

function playRound(newArr){

    // array for slots that have already been used this keypress
    let usedSlots = [];

    for (let i = 4; i < newArr.length; i++) {

        let value = newArr[i];
        let upperValue = newArr[i - 4];
        let upperValue2 = newArr[i - 8];
        let upperValue3 = newArr[i - 12];
        if (value !== "") {
            if (upperValue === "") {
                // checks if its 3rd row
                if (upperValue2 !== undefined) {
                    // checks if its 4th row
                    if (upperValue3 !== undefined) {
                        // 4th row
                        if (upperValue2 === "" && upperValue3 === "") {
                            moveNumbers(i, 3, value, "move");
                        } else if (upperValue2 === "" && upperValue3) {
                            if (upperValue3 === value) {
                                if (usedSlots.includes(i - 12)) {
                                    moveNumbers(i, 2, value, "move");
                                } else {
                                    moveNumbers(i, 3, value, "add", upperValue3);
                                }
                            } else {
                                moveNumbers(i, 2, value, "move");
                            }
                        } else if (upperValue2 && upperValue3) {
                            if (upperValue2 === value) {
                                if (usedSlots.includes(i - 8)) {
                                    moveNumbers(i, 1, value, "move");
                                } else {
                                    moveNumbers(i, 2, value, "add", upperValue2);
                                }
                            } else {
                                moveNumbers(i, 1, value, "move");
                            }
                        }
                    } // 3rd row
                    else {
                        if (upperValue2 === "") {
                            moveNumbers(i, 2, value, "move");
                        } else if (upperValue2 === value) {
                            if (usedSlots.includes(i - 8)) {
                                moveNumbers(i, 1, value, "move");
                            } else {
                                moveNumbers(i, 2, value, "add", upperValue2);
                            }
                        } else {
                            moveNumbers(i, 1, value, "move");
                        }
                    }
                } else {
                    moveNumbers(i, 1, value, "move");
                }
            } else if (value === upperValue) {
                moveNumbers(i, 1, value, "add", upperValue);
            }
        }
    }

    function moveNumbers(loopIndex, moveSlotsNum, value, useCase, value2) {
        let arrPos = loopIndex - (moveSlotsNum * 4);
        switch(useCase) {
            case "move":
                newArr[arrPos] = value;
                newArr[loopIndex] = "";
                break;
            case "add":
                newArr[arrPos] = (parseInt(value) + parseInt(value2)).toString();
                newArr[loopIndex] = "";
                usedSlots.push(arrPos);
                break;
        }
    }
}

// Rotates arrays to allow playRound to use them correctly
function rotateArray(arr1, arr2, num0, num1, num2, num3, num4, num5, num6, num7, num8, num9, num10, num11, num12, num13, num14, num15){
    arr1 = [arr2[num0], arr2[num1], arr2[num2], arr2[num3], arr2[num4], arr2[num5], arr2[num6], arr2[num7],
        arr2[num8], arr2[num9], arr2[num10], arr2[num11], arr2[num12], arr2[num13], arr2[num14], arr2[num15]];
    return arr1;
}

// Checks empty slots on the grid, then assigns either a 2 or a 4 to a random empty slot
function addToEmptySpot(arr){
    let emptySlots = [];
    let emptySlotsNum = 1;
    let randomSlot = 0;

    for (let i = 0; i < arr.length; i++){
        if (arr[i] === ""){
            emptySlots.push([emptySlotsNum, i]);
            emptySlotsNum++;
        }
    }

    if (emptySlots.length) {
        randomSlot = Math.floor(Math.random() * emptySlots.length);
        arr[emptySlots[randomSlot][1]] = Math.random() <= 0.5 ? "2" : "4";
    }
}

// Compares whether any changes were made with the keypress
function compare(arr1, arr2){

    let result = true;

    for (let i = 0; i < arr1.length; i++){
        if(arr1[i] !== arr2[i]){
            result = false;
            return result;
        }
    }

    return result;
}

// Checks for swipe inputs and processes them
document.addEventListener('touchstart', process_touchstart, false);
document.addEventListener('touchend', process_touchend, false);

let xStart;
let yStart;

function process_touchstart(e) {
    xStart = e.touches[0].clientX;
    yStart = e.touches[0].clientY;
}

function process_touchend(e) {
    let xEnd = e.changedTouches[0].clientX;
    let yEnd = e.changedTouches[0].clientY;

    let xDiff = xStart - xEnd;
    let yDiff = yStart - yEnd;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
            makeMoves("left");
        } else {
            makeMoves("right");
        }
    } else {
        if (yDiff > 0) {
            makeMoves("up");
        } else {
            makeMoves("down");
        }
    }
}