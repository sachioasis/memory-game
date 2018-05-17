/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
var numberOfClicks = 0;
document.getElementById("stars").innerHTML = '<li><i class="fa fa-star"></i></li>' 
    + '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';
var startTime = null;
var endTime = null;

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
// Adding event to each cell
var openedCards = [];
var matchedCards = [];

var matchingTable = {
    "cell1": "pic1",
    "cell2": "pic2",
    "cell3": "pic3",
    "cell4": "pic4",
    "cell5": "pic5",
    "cell6": "pic6",
    "cell7": "pic7",
    "cell8": "pic8",
    "cell9": "pic9",
    "cell10": "pic10",
    "cell11": "pic11",
    "cell12": "pic12",
    "cell13": "pic13",
    "cell14": "pic14",
    "cell15": "pic15",
    "cell16": "pic16",
}

// called by onclick="cellClick(this)""
// element == 'this' from index.html
// 'this' means 'document.getElementById(cellID);'
function cellClick(element) {

    // Increasing num of clicks
    numberOfClicks++;
    if (numberOfClicks == 1) {
        startTime = new Date();
    }

    // Display stars based on # of clicks
    if (numberOfClicks <= 30){
        document.getElementById("stars").innerHTML = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';
    } else if (31 <= numberOfClicks && numberOfClicks <= 40) {
        document.getElementById("stars").innerHTML = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i</li>';
        document.getElementById("movesID").innerHTML = 2;
    } else {
        document.getElementById("stars").innerHTML = '<li><i class="fa fa-star"></i></li>';
        document.getElementById("movesID").innerHTML = 1;
    }

    // if opened: class = "card open show"
    // if matched: class = "card match"

    // If no card is opened yet
    if (openedCards.length == 0) {
        element.className = "card open show";
        openedCards.push(element);
        //alert(openedCards.length);
    } 
    // If one caed is already opened
    else if (openedCards.length == 1) {
        var card = openedCards[0];
        //alert(card.id);
        var picID1 = matchingTable[card.id];
        var picID2 = matchingTable[element.id];
        //alert(picID);
        var picCell1 = document.getElementById(picID1);
        var picCell2 = document.getElementById(picID2);

        if (picCell1.className == picCell2.className) {
            card.className = "card match";
            element.className = "card match";
            openedCards = [];
            matchedCards.push(card);
            matchedCards.push(element);

            // If all the cards matched
            // matchedCards.length == 16
            // Then game finished
        } else {
            openedCards = [];
            element.className = "card open show";
            setTimeout(function wait() {
                card.className = "card";
                element.className = "card";
            }, 1000);
        }


    }
    else {
        // error?
    }

    if (matchedCards.length == 16) {
        endTime = new Date();
        var delta = (endTime - startTime)/1000;
        alert("Game finished Time is " + delta);

    }
}

// Called by onclick="restart()"
function restart() {
    //alert("restarting");
    numberOfClicks = 0;
    startTime = null;
    document.getElementById("stars").innerHTML = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';
    document.getElementById("movesID").innerHTML = 3;
    //var matchedCards = document.getElementsByClassName("card match"); //els matched =mcard
    for (var i = 0; i < matchedCards.length; i++) {
        matchedCards[i].className = "card";
    }
    openedcell = [];
    matchedCards = [];

}

// 