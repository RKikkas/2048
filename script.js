window.onload = function() {
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
};

window.onkeyup = function(e) {
    let key = e.key;
    let arr = [];

    for (let i = 1; i < 5; i++){
        for (let j = 1; j < 5; j++){
            let value = document.getElementById("row" + i + "col" + j).innerHTML;
            arr.push(value);
        }
    }

    let newArr = [...arr];

    if (key === "w" || key === "W" || key === "ArrowUp"){

        playRound(newArr);

        if(!compare(arr, newArr)){
            addToEmptySpot();
        }

    } else if (key === "d" || key === "D" || key === "ArrowRight"){

        // Rotate 90 degrees clockwise
        newArr = rotateArray(newArr, arr, 3, 7, 11, 15, 2, 6, 10,
            14, 1, 5, 9, 13, 0, 4, 8, 12);

        playRound(newArr);

        // Rotate it back
        newArr = rotateArray(newArr, newArr, 12, 8, 4, 0, 13, 9, 5,
            1, 14, 10, 6, 2, 15, 11, 7, 3);

        if(!compare(arr, newArr)){
            addToEmptySpot();
        }

    } else if (key === "s" || key === "S" || key === "ArrowDown"){

        // Rotate 180 degrees, in other words reverse it.
        newArr = arr.reverse();

        playRound(newArr);

        // Rotate/reverse it back
        newArr = newArr.reverse();

        if(!compare(arr, newArr)){
            addToEmptySpot();
        }

    } else if (key === "a" || key === "A" || key === "ArrowLeft"){

        // Rotate 90 degrees anticlockwise
        newArr = rotateArray(newArr, arr, 12, 8, 4, 0, 13, 9, 5,
            1, 14, 10, 6, 2, 15, 11, 7, 3);

        playRound(newArr);

        // Rotate it back
        newArr = rotateArray(newArr, newArr, 3, 7, 11, 15, 2, 6, 10,
            14, 1, 5, 9, 13, 0, 4, 8, 12);

        if(!compare(arr, newArr)){
            addToEmptySpot();
        }
    }

    // Inserts the new array values on to the grid
    for (let i = 1; i < 5; i++){
        let j = 1;
        for (let x = (i - 1) * 4; x < i * 4 ; x++){
            document.getElementById("row" + i + "col" + j).innerHTML = newArr[x];
            j++;
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

    function rotateArray(arr1, arr2, num0, num1, num2, num3, num4, num5, num6, num7, num8, num9, num10, num11, num12, num13, num14, num15){
        arr1 = [arr2[num0], arr2[num1], arr2[num2], arr2[num3], arr2[num4], arr2[num5], arr2[num6], arr2[num7],
            arr2[num8], arr2[num9], arr2[num10], arr2[num11], arr2[num12], arr2[num13], arr2[num14], arr2[num15]];
        return arr1;
    }

    // Checks empty slots on the grid, then assigns either a 2 or a 4 to a random empty slot
    function addToEmptySpot(){
        let emptySlots = [];
        let emptySlotsNum = 1;
        let randomSlot = 0;

        for (let i = 0; i < arr.length; i++){
            if (newArr[i] === ""){
                emptySlots.push([emptySlotsNum, i]);
                emptySlotsNum++;
            }
        }

        if (emptySlots.length) {
            randomSlot = Math.floor(Math.random() * emptySlots.length);
            newArr[emptySlots[randomSlot][1]] = Math.random() <= 0.5 ? "2" : "4";
        }
    }

    function compare(arr1, arr2){

        let result = true;

        for (let i = 0; i < arr.length; i++){
            if(arr1[i] !== arr2[i]){
                result = false;
                return result;
            }
        }

        return result;

    }
};