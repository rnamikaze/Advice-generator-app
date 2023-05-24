let cachedData = null;
let randomID = 1;

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function fetchData() {
    if (cachedData) {
        return Promise.resolve(cachedData);
    }

    randomID = getRandomInt(1, 221);    
    // Make the API call
    return fetch('https://api.adviceslip.com/advice/'+randomID)
        .then(response => response.json())
        .then(data => {
            cachedData = data; // Update the cached data

            console.log(cachedData);

            document.getElementById('slip_id').innerText = cachedData.slip.id;
            document.getElementById('slip_advice').innerText = "\"" + cachedData.slip.advice + "\"";
        });
}

function refreshData() {
    cachedData = null; // Clear the cached data
    fetchData(); // Make a new API call to populate the cache
}

// First Call
refreshData();

let diceBtn = document.getElementById('dice_button');

diceBtn.onclick = function () {
    setTimeout(function () {
        refreshData();
        diceBtn.setAttribute("class", "animate__animated animate__flip");
    }, 500);
    diceBtn.setAttribute("class", "");
}