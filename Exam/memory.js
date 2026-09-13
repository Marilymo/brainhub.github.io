
var firstCard = null;
var secondCard = null;
var lockBoard = false;
var moves = 0;

var cards = ["A","A","B","B","C","C","D","D"];
cards = shuffle(cards);

window.onload = function() {
    const board = document.getElementById("memory-board");
    cards.forEach((card, index) => {
        let tile = document.createElement("div");
        tile.classList.add("tile");
        tile.dataset.value = card;
        tile.addEventListener("click", flipCard);
        board.appendChild(tile);
    });

    const popup = document.getElementById("popup");
    const closeBtn = document.getElementById("closePopup");
    const sharePopup = document.getElementById("sharePopup");
    const confirmShare = document.getElementById("confirmShare");
    const closeShare = document.getElementById("closeShare");
    const donePopup = document.getElementById("donePopup");
    const closeDone = document.getElementById("closeDone");

    closeBtn.addEventListener("click", () => popup.classList.remove("visible"));
    confirmShare.addEventListener("click", () => {
        const shareData = { moves: moves, time: new Date().toLocaleTimeString() };
        localStorage.setItem("latestMemoryShare", JSON.stringify(shareData));
        sharePopup.classList.remove("visible");
        donePopup.classList.add("visible");
    });

    closeShare.addEventListener("click", () => sharePopup.classList.remove("visible"));
    closeDone.addEventListener("click", () => donePopup.classList.remove("visible"));
}

function flipCard(){
    if(lockBoard || this === firstCard) return;

    this.classList.add("flipped");
    this.innerText = this.dataset.value;

    if(!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    moves++;

    if(firstCard.dataset.value === secondCard.dataset.value) {
        firstCard.removeEventListener("click", flipCard);
        secondCard.removeEventListener("click", flipCard);
        resetBoard();
        checkWin();
    } else {
        lockboard = true;
        setTimeout(()=>{
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            firstCard.innerText = "";
            secondCard.innerText = "";
            resetBoard();
        }, 1000);
    }
}

function resetBoard() {
    
}