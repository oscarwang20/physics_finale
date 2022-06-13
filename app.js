var start = Date.now();

console.log("hello world");

let w = document.getElementById("angular_velocity");
let r = document.getElementById("resistivity");
let n = document.getElementById("num_coils");
let b = document.getElementById("b_field");
let a = document.getElementById("coil_area");

let running = false;

let results = [];

let numBtnClicked = 0;

let getTime = () => {
    let timeNow = Date.now();
    let elapsed = timeNow - start;
    return parseFloat(elapsed / 1000);
}

let sum = (arr) => {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum;
}

let calculate = () => {
    let angular_velocity = parseFloat(w.value);
    // console.log(angular_velocity);
    let resistivity = parseFloat(r.value) * 1171.38;
    // console.log(resistivity);
    let num_coils = parseFloat(n.value);
    // console.log(num_coils);
    let b_field = parseFloat(b.value) * 1.6e-6; 
    // console.log(b_field);
    let area = parseFloat(a.value);
    // console.log(area);
    // console.log(getTime());
    let result = Math.abs(((num_coils ** 2)*(b_field ** 2)*(area ** 2)*(angular_velocity ** 2)*(Math.sin(angular_velocity * getTime()))) / resistivity);
    // console.log("time is: " + getTime());
    // console.log(result);

    //displays result
    document.getElementById("output_power").placeholder = result;

    // calculate average value
    results.push(result);
    numBtnClicked++;
    document.getElementById("average_power").placeholder = sum(results) / numBtnClicked;
}

let calcbtn = document.getElementById("calculate");
calcbtn.addEventListener("click", calculate);

let pauseplay = document.getElementById("pauseplay");
pauseplay.addEventListener("click", function () {
    if (running === true) {
        running = false;
        pauseplay.value = "Resume";
        clearInterval(init);
    } else {
        running = true;
        pauseplay.value = "Pause";
        init = setInterval(calculate, 100);
    }
});

document.onload = function() {
    clearInterval(init);
    init = setInterval(calculate, 100);
}