window.onkeyup = function(e) {
    let key = e.key;
    let arr = [];

    for (let i = 1; i < 5; i++){
        for (let j = 1; j < 5; j++){
            let value = document.getElementById("row" + i + "col" + j).innerHTML;
            arr.push(value);
        }
    }
    console.log(arr);

    let newArr = arr.reverse();

    // ["16", "15", "14", "13", "12", "11", "10", "9", "8", "7", "6", "5", "4", "3", "2", "1"]

    if (key === "w" || key === "W" || key === "ArrowUp"){
        console.log("up");
    } else if (key === "d" || key === "D" || key === "ArrowRight"){
        console.log("right");
    } else if (key === "s" || key === "S" || key === "ArrowDown"){
        console.log("down");
    } else if (key === "a" || key === "A" || key === "ArrowLeft"){
        console.log("left");
    }

    for (let i = 1; i < 5; i++){
        let j = 1;
            for (let x = (i - 1) * 4; x < i * 4 ; x++){
                document.getElementById("row" + i + "col" + j).innerHTML = newArr[x];
                j++;
            }
    }

    // Function that adds new number to a random empty spot
};