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

        // array for slots that have already been used this keypress
        let usedSlots = [];

        for (let i = 4; i < newArr.length; i++){

            let value = newArr[i];
            let upperValue = newArr[i - 4];
            let upperValue2 = newArr[i - 8];
            let upperValue3 = newArr[i - 12];
            if (value !== ""){
                if (upperValue === ""){
                    // checks if its 3rd row
                    if (upperValue2 !== undefined){
                        // checks if its 4th row
                        if (upperValue3 !== undefined){
                            // 4th row
                            if (upperValue2 === "" && upperValue3 === ""){
                                newArr[i - 12] = value;
                                newArr[i] = "";
                            } else if (upperValue2 === "" && upperValue3){
                                if (upperValue3 === value){
                                    if (usedSlots.includes(i - 12)){
                                        newArr[i - 8] = value;
                                        newArr[i] = "";
                                    } else {
                                        newArr[i - 12] = (parseInt(value) + parseInt(upperValue3)).toString();
                                        newArr[i] = "";
                                        usedSlots.push(i - 12);
                                    }
                                } else {
                                    newArr[i - 8] = value;
                                    newArr[i] = "";
                                }
                            } else if (upperValue2 && upperValue3){
                                if (upperValue2 === value){
                                    if (usedSlots.includes(i - 8)){
                                        newArr[i - 4] = value;
                                        newArr[i] = "";
                                    } else {
                                        newArr[i - 8] = (parseInt(value) + parseInt(upperValue2)).toString();
                                        newArr[i] = "";
                                        usedSlots.push(i - 8);
                                    }
                                } else {
                                    newArr[i - 4] = value;
                                    newArr[i] = "";
                                }
                            }
                        } // 3rd row
                        else {
                            if (upperValue2 === ""){
                                newArr[i - 8] = value;
                                newArr[i] = "";
                            } else if (upperValue2 === value){
                                if (usedSlots.includes(i - 8)){
                                    newArr[i - 4] = value;
                                    newArr[i] = "";
                                } else {
                                    newArr[i - 8] = (parseInt(value) + parseInt(upperValue2)).toString();
                                    newArr[i] = "";
                                    usedSlots.push(i - 8);
                                }
                            } else {
                                newArr[i - 4] = value;
                                newArr[i] = "";
                            }
                        }
                    } else {
                        newArr[i - 4] = value;
                        newArr[i] = "";
                    }
                } else if (value === upperValue){
                    newArr[i - 4] = (parseInt(value) + parseInt(upperValue)).toString();
                    newArr[i] = "";
                    usedSlots.push(i - 4);
                }
            }
        }

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