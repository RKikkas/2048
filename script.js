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

        console.log("up");
        if(!compare(arr, newArr)){
            addToEmptySpot();
        }
    } else if (key === "d" || key === "D" || key === "ArrowRight"){
        console.log("right");
        addToEmptySpot();
    } else if (key === "s" || key === "S" || key === "ArrowDown"){
        console.log("down");
        addToEmptySpot();
    } else if (key === "a" || key === "A" || key === "ArrowLeft"){
        console.log("left");
        addToEmptySpot();
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

    // Inserts the new array values on to the grid
    for (let i = 1; i < 5; i++){
        let j = 1;
            for (let x = (i - 1) * 4; x < i * 4 ; x++){
                document.getElementById("row" + i + "col" + j).innerHTML = newArr[x];
                j++;
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