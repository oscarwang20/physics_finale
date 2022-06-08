var start = Date.now();

console.log("hello world");

let w = document.getElementById("angular_velocity");
let r = document.getElementById("resistivity");
let n = document.getElementById("num_coils");
let b = document.getElementById("b_field");
let a = document.getElementById("coil_area");


let getTime = () => {
    let timeNow = Date.now();
    let elapsed = timeNow - start;
    return parseFloat(elapsed / 1000);
}

let calculate = () => {
    let angular_velocity = parseFloat(w.value);
    // console.log(angular_velocity);
    let resistivity = parseFloat(r.value);
    // console.log(resistivity);
    let num_coils = parseFloat(n.value);
    // console.log(num_coils);
    let b_field = parseFloat(b.value);
    // console.log(b_field);
    let area = parseFloat(a.value);
    // console.log(area);
    // console.log(getTime());
    let result = ((num_coils ** 2) * (b_field ** 2) * (area ** 2) * (angular_velocity ** 2) * (Math.sin(angular_velocity * getTime()) ** 2)) / resistivity
    console.log(getTime());
    console.log(result);
    document.getElementById("output_power").placeholder = result;
}

let btn = document.getElementById("calculate");
btn.addEventListener("click", calculate);