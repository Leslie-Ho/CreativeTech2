let ioURL = "https://io.adafruit.com/api/v2/lilolo/feeds/";
let ioLimitQ = "/data?limit="; 
let ioLimitN = 1000; 
let ioLimitInclude = "include=value";
let data;
let values;

function fetchData(ioFeed) {
    console.log("fetching");
    let assembledURL = ioURL + ioFeed + ioLimitQ + ioLimitN + ioLimitInclude;
    data = loadJSON(assembledURL, dataHandler, errorHandler);
    return values;
}

function dataHandler(data) {
    values = [];
    data.forEach((element, i) => {
        values[i] = element.value;
    })
}

function errorHandler(ioError) {
    console.log(ioError);
}

// export {fetchData}