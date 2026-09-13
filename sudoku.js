
var numSelected = null;
var tileSelected = null;

var errors = 0;




var board = [
    "-8-542-76-",
    "--7-69-8-",
    "4--8--2-5",
    "9--635--4",
    "346-8-597",
    "--59746-3",
    "-38--6--9",
    "61-493758",
    "794-5836-"
]

var solution = [
    "183542976",
    "257369481",
    "469817235",
    "971635824",
    "346281597",
    "825974613",
    "538726149",
    "612493758",
    "794158362"
]


const backBtn = document.getElementById("backBtn");


window.onload = function () {
    setGame();

    const popup = document.getElementById("popup");
    const closeBtn = document.getElementById("closePopup");

    const sharePopup = document.getElementById("sharePopup");
    const shareBtn = document.getElementById("share");
    const confirmShare = document.getElementById("confirmShare");
    const closeShare = document.getElementById("closeShare");

    const donePopup = document.getElementById("donePopup");
    const closeDone = document.getElementById("closeDone");

    //close popup
    closeBtn.addEventListener("click", () => {
        popup.classList.remove("visible");
    });

    //opens share preview
    shareBtn.addEventListener("click", () =>{
        document.getElementById("shareMistakes").textContent = errors;

        popup.classList.remove("visible");
        sharePopup.classList.add("visible");
    });

    closeShare.addEventListener("click", () => {
        sharePopup.classList.remove("visible");
    });

    closeShare.addEventListener("click", () => {
        sharePopup.classList.remove("visible");
        popup.classList.add("visible");
    });

    //confirm share
    confirmShare.addEventListener("click", () => {

        const shareData = {
            mistakes: errors,
            time: new Date().toLocaleTimeString(),
            message: "I just solved this Sudoku!"
        };

        localStorage.setItem("latestSudokushare", JSON.stringify(shareData));

        sharePopup.classList.remove("visible");
        donePopup.classList.add("visible");
    });

    closeDone.addEventListener("click", () => {
        donePopup.classList.remove("visible");
    });
}

function setGame() {
    //digits
    for (let i = 1; i <= 9; i++) {
        //creates a divtag <div> </div>
        let number = document.createElement("div");
        number.id = i;
        number.innerText = i;
        number.addEventListener("click", selectNumber);
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);

    }

    for (let r = 0; r < 9; r++){
        for(let c = 0; c < 9; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            if (board[r][c] != "-"){
                tile.innerText = board[r][c];
            }
            if(r == 2 || r == 5) {
                tile.classList.add("horizontal-line");
            }
            if (c ==2 || c == 5) {
                tile.classList.add("vertical-line");

            }

            if (r % 3 == 0 && r != 0) tile.classList.add("thick-top");
            if (c % 3 == 0 && c != 0) tile.classList.add("thick-left");

            tile.addEventListener("click", selectTile);
            tile.classList.add("tile");
            document.getElementById("board").appendChild(tile);
        }
    }

    tileSelected = document.getElementById("0-0");
    tileSelected.classList.add("tile-selected");


}

function selectNumber(){

    if(numSelected != null){
        numSelected.classList.remove("number-selected");
    }
    numSelected = this;
    numSelected.classList.add("number-selected");

    if (tileSelected == null) return;

    let coords = tileSelected.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    if (solution[r][c] === numSelected.id) {
        tileSelected.innerText = numSelected.id;
    } else {
        tileSelected.classList.add("error");
        errors++;
        document.getElementById("errors").innerText = errors;

        setTimeout(() => {
            tileSelected.classList.remove("error");
        }, 500);
    }

       let allCorrect = true;

        for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.getElementById(r + "-" + c);
            if (tile.innerText !== solution[r][c]) {
                allCorrect = false;
                break;
            }
        }
    }

    if (allCorrect) {
        popup.classList.add("visible");
        fireConfetti();

  // wait two seconds before reset
        setTimeout(() => {
        resetBoard();
        }, 2000);          
    } 

}


function selectDigits(){
    if(tileSelected != null){
        numSelected.classList.remove("number-selected");
    }
    tileSelected = this;
    tileSelected.classList.add("tile-selected");
}

function selectTile(){
    if(tileSelected != null){
        tileSelected.classList.remove("tile-selected");
    }
    
    tileSelected = this;
    tileSelected.classList.add("tile-selected");


}

function fireConfetti() {
    var duration = 1500;
    var end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
        });
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    })();
}

function autoComplete() {
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.getElementById(r + "-" + c);
            tile.innerText = solution[r][c];
        }
    }

    // Vis popup og konfetti etter at alt er fylt inn
    popup.classList.add("visible");
    fireConfetti();
}

function resetBoard() {
    // Reset tile values
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.getElementById(r + "-" + c);

            tile.classList.remove("error");

            tile.innerText = board[r][c] === "-" ? "" : board[r][c];
        }
    }

    // Reset selected num
    if (numSelected) {
        numSelected.classList.remove("number-selected");
    }
    numSelected = null;

    // Reset selected tile
    if (tileSelected) {
        tileSelected.classList.remove("tile-selected");
    }

    tileSelected = document.getElementById("0-0");
    tileSelected.classList.add("tile-selected");

    // Reset errors
    errors = 0;
    document.getElementById("errors").innerText = 0;
}





