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
        console.log("up");
        addToEmptySpot();
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
            if (arr[i] === ""){
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
};