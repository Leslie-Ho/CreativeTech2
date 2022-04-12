
let ioLimit = "1000";
let redData;
let greenData;
let blueData;
let lightData;
let redValues =[];
let greenValues = [];
let blueValues = [];
let lightValues = [];

let w; // Width of entire wave
let theta = 0.0; // Start angle at 0
let period = 1000.0; // How many pixels before the wave repeats
let yvalues; // Using an array to store height values for the wave

       
function setup() {
  createCanvas(1600, 900);
  w = width + 2000;
}

function draw() {
  background('hsla(360, 100%, 0%, 0.01)');
  for (let i = 0; i < 1000; i+= 50) {  
    calcWave(i);
    renderWave(i);
  }
  yvalues = [];
}

function calcWave(i) {
  let xspacing = map(lightValues[i], 500, 4000, 4, 200);
  let dx = (TWO_PI / (period * map(lightValues[i], 500, 4000, 1, 200))) * xspacing;
  let x = theta * map(lightValues[i], 500, 4000, 0, 100);
  let amplitude = map(lightValues[i], 500, 4000, 80, 400);
  yvalues = new Array(floor(w / 5));
  theta += map(lightValues[i], 500, 4000, 0, 0.01);
  
  for (let j = 0; j < 1000; j+=50) {
    yvalues[j] = sin(x) * amplitude;
    x += dx;
  }
}

function renderWave(i) {
  noStroke();
  let xspacing = map(lightValues[i], 500, 4000, 2, 8);
  fill(redValues[i], greenValues[i] * 2, blueValues[i] * 2);
  for (let x = 0; x < yvalues.length; x+=50) {
    ellipse(x * xspacing, height / 2 + yvalues[x], 8, 8);
  }
}

// let xspacing; // Distance between each horizontal location
// let w; // Width of entire wave
// let theta = 0.0; // Start angle at 0
// let period = 1000.0; // How many pixels before the wave repeats
// let yvalues; // Using an array to store height values for the wave

// function setup() {
//   createCanvas(710, 400);
//   w = width + 2000;
// }

// function draw() {
//   // background(0);
//   background('hsla(0, 0%, 0%, 0.01)');
//   for (let i = 0; i < 10; i++) {   
//     calcWave(i);
//     renderWave(i);
//   }
//   yvalues = [];
// }

// function calcWave(i) {
//   let xspacing = map(lightValues[i], 500, 4000, 8, 20);
//   let dx = (TWO_PI / (period * map(lightValues[i], 500, 4000, 1, 4))) * xspacing;
//   let x = theta * map(lightValues[i], 500, 4000, -1, 1);
//   let amplitude = map(lightValues[i], 500, 4000, 40, 200);
//   yvalues = new Array(floor(w / 5));
//   theta += map(lightValues[i], 500, 4000, 0, 0.01);
  
//   for (let i = 0; i < yvalues.length; i++) {
//     yvalues[i] = sin(x) * amplitude;
//     x += dx ;
//   }
// }

// function renderWave(i) {
//   noStroke();
//   let xspacing = map(lightValues[i], 500, 4000, 2, 8);
//   fill(redValues[i], greenValues[i]*2, blueValues[i]*2);
//   for (let x = 0; x < yvalues.length; x++) {
//     ellipse(x * xspacing, height / 2 + yvalues[x], 1.5, 1.5);
//   }
// }


//////pull Data////
function preload() {
    fetchRedData();
    fetchGreenData();
    fetchBlueData();
    fetchLightData();
}

function fetchRedData() {
    console.log("fetching");
    let assembledURL = "https://io.adafruit.com/api/v2/lilolo/feeds/rfeed/data?limit="+ioLimit+"include=value";
    redData = loadJSON(assembledURL, redDataHandler, errorHandler);
}

function fetchGreenData() {
    console.log("fetching");
    let assembledURL = "https://io.adafruit.com/api/v2/lilolo/feeds/gfeed/data?limit="+ioLimit+"include=value";
    greenData = loadJSON(assembledURL, greenDataHandler, errorHandler);
}

function fetchBlueData() {
    console.log("fetching");
    let assembledURL = "https://io.adafruit.com/api/v2/lilolo/feeds/bfeed/data?limit="+ioLimit+"include=value";
    blueData = loadJSON(assembledURL, blueDataHandler, errorHandler);
}

function fetchLightData() {
    console.log("fetching");
    let assembledURL = "https://io.adafruit.com/api/v2/lilolo/feeds/lightfeed/data?limit="+ioLimit+"include=value"
    lightData = loadJSON(assembledURL, lightDataHandler, errorHandler);
}

function redDataHandler(redData) {
    redValues = [];
    redData.forEach((element, i) => {
        redValues[i] = element.value;
    })
}

function greenDataHandler(greenData) {
    greenValues = [];
    greenData.forEach((element, i) => {
        greenValues[i] = element.value;
    })
}

function blueDataHandler(blueData) {
    blueValues = [];
    blueData.forEach((element, i) => {
        blueValues[i] = element.value;
    })
}

function lightDataHandler(lightData) {
    lightValues = [];
    lightData.forEach((element, i) => {
        lightValues[i] = element.value;
    })
}

function errorHandler(ioError) {
    console.log(ioError);
}