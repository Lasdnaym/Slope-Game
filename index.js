// Constants
let cardOne, cardTwo;
let hasFlipped = false;
let lock = false;
const cards = document.querySelectorAll('.card');

/* When a card is clicked it should "flip". Each card when "face down"
displays a Phenomena logo. When clicked it should flip over and display
either a graph or a equation. */
function flipC() {
    if(lock) {
        return;
    }
    if(this === cardOne) {
        return;
    }
    this.classList.add('flip');
    if(!hasFlipped) {
        hasFlipped = true;
        cardOne = this;
        return;
    }
    cardTwo = this;
    matchCheck();
}

/* Once two cards have been flipped, the game needs to see if they match.
In index.html each card has been assigned a data-framework. If the two
cards have the same data-framework then they are a match. If not, they
need to be unflipped. */
function matchCheck() {
    let isMatch = cardOne.dataset.framework === cardTwo.dataset.framework;
    isMatch ? disableC() : unflipC();
}

/* The cards need to be registered as no longer active. They are no longer
selected. */
function disableC() {
    cardOne.removeEventListener('click', flipC);
    cardTwo.removeEventListener('click', flipC);
    resetBoard();
}

/* Only two cards should be flipped up at a time per traditional memory game
fashion. Once two cards are flipped and if they do not share the same
data-framework, they should be unflipped and hidden again. */
function unflipC() {
    lock = true;
    setTimeout(() => {
        cardOne.classList.remove('flip');
        cardTwo.classList.remove('flip');
        resetBoard();
    }, 3000);
}

/* Resets the board. */
function resetBoard() {
    [hasFlipped, lock] = [false, false];
    [cardOne, cardTwo] = [null, null];
}

/* Shuffles the board. Triggers on launch and refresh. Cards are sorted randomly. 
Determined using Math.random. */
(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipC));
