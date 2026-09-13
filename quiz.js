function toggleQuiz (num) {

    const msg = document.getElementById("message" + num);
    const btn = event.target;

    const answers = {
        1: "Mercury",
        2: "Hogwarts",
        3: "Olaf",
        4: "Blue Whale",
        5: "The Avengers",
        6: "2469 meters",
        7: "Orange",
        8: "Copenhagen",
        9: "Africa",
        10: "Leonardo DaVinci"
    };

    if(msg.style.display === "none" || msg.style.display === ""){
        //show answer
        msg.innerText = answers[num];
        msg.style.display = "block";
        btn.innerText = "Hide";
    } else {
        //hide answer
        msg.style.display = "none";
        btn.innerText = "Show";
    }


}

function submitScore(scoreRange) {
    // First popup (confirm sharing)
    const popup = document.createElement("div");
    popup.classList.add("popup", "visible");
    popup.innerHTML = `
        <div class="popup-content">
            <h3>Share your score?</h3>
            <p>You scored ${scoreRange}. Do you want to share your result?</p>
            <div class="popup-buttons">
                <button id="cancelBtn">Cancel</button>
                <button id="shareBtn">Share</button>
            </div>
        </div>
    `;
    document.body.appendChild(popup);

    // Cancel closes popup
    popup.querySelector("#cancelBtn").addEventListener("click", () => {
        popup.remove();
    });

    // Share opens the actual sharing popup
    popup.querySelector("#shareBtn").addEventListener("click", () => {
        popup.remove(); // close the first popup
        openSharePopup(scoreRange);
    });
}



document.addEventListener("DOMContentLoaded", () => {

    const popup = document.getElementById("popup");           // første popup
   // const sharePopup = document.getElementById("sharePopup"); // share-popup
    const donePopup = document.getElementById("donePopup");   // ferdig-popup

    const share = document.getElementById("share");
    const closePopup = document.getElementById("closePopup");
    const closeDone = document.getElementById("closeDone");

    //const cancelShare = document.getElementById("cancelShare");
    //const confirmShare = document.getElementById("confirmShare");

    const scoreBtn1 = document.getElementById("score1");
    const scoreBtn2 = document.getElementById("score2");
    const scoreBtn3 = document.getElementById("score3");

    const extraMessage = document.getElementById("extraMessage");


    function openShare(scoreRange) {
        extraMessage.textContent = `You scored: ${scoreRange}`;
        popup.classList.add("visible");
        //sharePopup.classList.add("visible");
    }

    if (scoreBtn1) scoreBtn1.addEventListener("click", () => openShare("1–4"));
    if (scoreBtn2) scoreBtn2.addEventListener("click", () => openShare("5–7"));
    if (scoreBtn3) scoreBtn3.addEventListener("click", () => openShare("8–10"));


    //share
    share.addEventListener("click", () => {
        popup.classList.remove("visible");
        donePopup.classList.add("visible");
    })

    //close uten å dele
    closePopup.addEventListener("click", () => {
        popup.classList.remove("visible");
    })

    //close etter deling
    closeDone.addEventListener("click", () => {
        donePopup.classList.remove("visible");
    })

    // ✔ CANCEL → tilbake til første popup
    //cancelShare.addEventListener("click", () => {
      //  sharePopup.classList.remove("visible");
    //    popup.classList.add("visible");
    //});


    /*/ Share → lagrer og går til done-popup
    confirmShare.addEventListener("click", () => {
        sharePopup.classList.remove("visible");
        donePopup.classList.add("visible");
    });


    // Lukk ferdig-popup
    closeDone.addEventListener("click", () => {
        donePopup.classList.remove("visible");
    });*/
});

