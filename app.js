var start = Date.now();

console.log("hello world");

let w = document.getElementById("angular_velocity"); // rad per sec
let r = document.getElementById("resistivity");
let n = document.getElementById("num_coils");
let b = document.getElementById("b_field");
let a = document.getElementById("coil_area");
let splrng = true;

let split_ring = document.getElementById("split_ring");
split_ring.addEventListener("click", function() {
    if (splrng === true) {
        document.getElementById("split_ring").value = "add split-ring commutator";
        splrng = false;
    }
    else {
        document.getElementById("split_ring").value = "remove split-ring commutator";
        splrng = true;
    }
});

let motor = document.getElementById('rotate');
let angle = 0;

let running = false;

let results = [];

let numBtnClicked = 0;

let rot = () => {
    let angular_velocity = parseFloat(w.value) * 100; // adjusted for 10 millisecond refresh rate
    angle += angular_velocity * (180 / Math.PI);
    motor.style.transform = "rotate(" + angle + "deg)" 
}

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
    let result = (((num_coils ** 2)*(b_field ** 2)*(area ** 2)*(angular_velocity ** 2)*(Math.sin(angular_velocity * getTime()))) / resistivity);
    if (splrng) {
        result = Math.abs(result);
    } 
    // console.log("time is: " + getTime());
    // console.log(result);

    //rotates the motor
    rot();

    //displays result
    document.getElementById("output_power").placeholder = result;

    // calculate average value
    results.push(result);
    numBtnClicked++;
    document.getElementById("average_power").placeholder = sum(results) / numBtnClicked;
}

let calcbtn = document.getElementById("calculate");
calcbtn.addEventListener("click", function() {
    results = [];
    numBtnClicked = 0;
    calculate();
});

let pauseplay = document.getElementById("pauseplay");
pauseplay.addEventListener("click", function () {
    if (running === true) {
        running = false;
        pauseplay.value = "Resume simulation";
        clearInterval(init);
    } else {
        running = true;
        pauseplay.value = "Pause simulation";
        init = setInterval(calculate, 100);
    }
});

///////////////////////////////
// --------  drag  --------- //
///////////////////////////////

(function() {
    var rotinit,
        start, stop, move,
        _x, _y,
        active = false,
        drag = document.getElementById('drag'),
        d = document.getElementById('draggable'),
        con = document.getElementById('container');
    
    rotinit = function() {
      // Mouse Events
      drag.addEventListener('mousedown', start, false);
      $(document).bind('mousemove', function(event) {
        if (active === true) {
          move(event);
        }
      });
      $(document).bind('mouseup', function(event) {
        stop(event.originalEvent);
      });
    };
  
    start = function(e) {
      e.preventDefault();
      // mouse pos
      var Mx = e.clientX,
          My = e.clientY,
          l = d.getBoundingClientRect().left,
          t = d.getBoundingClientRect().top;
      // offset 
      _x = Mx - l;
      _y = My - t;
      return active = true;
    };
  
    move = function(e) {
      e.preventDefault();
      var Mx = e.clientX,
          My = e.clientY,
          l = d.getBoundingClientRect().left,
          t = d.getBoundingClientRect().top,
          w = d.getBoundingClientRect().width,
          h = d.getBoundingClientRect().height,
          _l = con.getBoundingClientRect().left,
          _t = con.getBoundingClientRect().top,
          _w = con.getBoundingClientRect().width,
          _h = con.getBoundingClientRect().height,
          x, y;
    //check to see if mouse is inside container
    if (Mx - _x > _l && Mx + w - _l < _w + _x) {
    // x = mouseX - offsetX - containerX
    x = Mx - _x - _l ;
    }
    if (My - _y > _t && My + h - _t < _h + _y) {
    // y = mouseY - offsetY - containerY
    y = My - _y - _t;
    }
    return d.style.left = x + 'px', d.style.top = y + 'px';
};
  
stop = function() {
    return active = false;
};

rotinit();
  
}).call(this);
  
///////////////////////////////
// -------  rotate  -------- //
///////////////////////////////

(function() {
var rotinit, rotate, start, stop,
    active = false,
    angle = 0,
    rotation = 0,
    startAngle = 0,
    center = {
    x: 0,
    y: 0
    },
    R2D = 180 / Math.PI,
    rot = document.getElementById('rotate');

rotinit = function() {
    rot.addEventListener("mousedown", start, false);
    $(document).bind('mousemove', function(event) {
    if (active === true) {
        event.preventDefault();
        drag_rotate(event);
    }
    });
    $(document).bind('mouseup', function(event) {
    event.preventDefault();
    stop(event);
    });
};

start = function(e) {
    e.preventDefault();
    var bb = this.getBoundingClientRect(),
    t = bb.top,
    l = bb.left,
    h = bb.height,
    w = bb.width,
    x, y;
    center = {
    x: l + (w / 2),
    y: t + (h / 2)
    };
    x = e.clientX - center.x;
    y = e.clientY - center.y;
    startAngle = R2D * Math.atan2(y, x);
    return active = true;
};

// rotates the motor by dragging
drag_rotate = function(e) {
    e.preventDefault();
    var x = e.clientX - center.x,
    y = e.clientY - center.y,
    d = R2D * Math.atan2(y, x);
    rotation = d - startAngle;
    return rot.style.transform = "rotate(" + (angle + rotation) + "deg)";
};

stop = function() {
    angle += rotation;
    return active = false;
};

rotinit();

}).call(this);

// calculates the pwoer output and rotates the motor every 10 milliseconds
document.onload = function() {
    clearInterval(init);
    init = setInterval(function() {
        calculate();
    }, 10);
}