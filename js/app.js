/*
 * Global variables related to memory game
 */
let icons = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o",
    "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"
];
let openedCards = [];
let matchedCards = [];
let firstClick = true;
let flippedCount = 0;
let star = `<li><i class="fa fa-star"></i></li>`;
let live = 0;
let totalTime = 0;

document.querySelector(".stars").innerHTML = star + star + star;
document.querySelector(".timer").innerHTML = totalTime + 's';
document.querySelector(".moves").innerHTML = 0;

// Action when clicking restart button
document.querySelector(".restart").addEventListener("click", function() {
    document.querySelector(".deck").innerHTML = "";
    reset();
    init();
});

/**
 * Executing onload functions
 */
shuffle(icons);
init();

/**
 * List of functions
 */
// Onload function to init the game
function init() {
    for (let i = 0; i < icons.length; i++) {
        let card = document.createElement("li");
        card.classList.add("card");
        card.innerHTML = `<i class="${icons[i]}"></i>`;
        document.querySelector(".deck").appendChild(card);
        click(card);
    }
}

// Adding click functionality to each card
function click(card) {

    card.addEventListener("click", function() {

        let currentCard = this;
        let openedCard = openedCards[0];

        if (openedCard == currentCard) {
            return;
        }

        if (openedCards.length >= 2) {
            return;
        }

        if (firstClick) {
            startTimer();
            firstClick = false;
        }

        if (openedCards.length === 1) {
            card.classList.add("open", "show", "disable");
            openedCards.push(this);
            matching(currentCard, openedCard);
        } else {
            currentCard.classList.add("open", "show", "disable");
            openedCards.push(this);
        }
    });
}

// Compare to match the current selected card and the opened card
function matching(currentCard, openedCard) {

    flippedCount++;
    document.querySelector(".moves").innerHTML = flippedCount;

    if (flippedCount < 10) {
        document.querySelector(".stars").innerHTML = star + star + star;
    } else if (flippedCount < 20) {
        document.querySelector(".stars").innerHTML = star + star;
    } else if (flippedCount < 30) {
        document.querySelector(".stars").innerHTML = star;
    } else {
        clearInterval(live);
        alert("Game Over!");
        document.querySelector(".deck").innerHTML = "";
        reset();
        init();
    }

    // Checking if two cards match
    if (currentCard.innerHTML === openedCard.innerHTML) {

        currentCard.classList.add("match");
        openedCard.classList.add("match");
        matchedCards.push(currentCard, openedCard);

        openedCards = [];

        // Check if the user finishes the game
        if (matchedCards.length === icons.length) {
            clearInterval(live);
            alert("Congratulations!!");
        }

    } else {
        // Waiting for 0.5 sec to flip back the cards
        setTimeout(function() {
            currentCard.classList.remove("open", "show", "disable");
            openedCard.classList.remove("open", "show", "disable");
        }, 500);

        openedCards = [];
    }
}

// Timer function
function startTimer() {
    live = setInterval(function() {
        totalTime++;
        document.querySelector(".timer").innerHTML = totalTime + 's';
    }, 1000);
}

// Reset all variables of the memory game
function reset() {

    shuffle(icons);

    matchedCards = [];

    flippedCount = 0;
    document.querySelector(".moves").innerHTML = 0;
    document.querySelector(".stars").innerHTML = star + star + star;

    clearInterval(live);
    firstClick = true;
    totalTime = 0;
    document.querySelector(".timer").innerHTML = totalTime + "s";
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}