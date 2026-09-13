window.onload = function(){

    const sudokuCount = document.getElementById("sudokuCount");
    const booksReadCount = document.getElementById("booksReadCount");
    const profilePic = document.getElementById("profilePic");
    const changePicBtn = document.getElementById("changePic");

    const avatars= ["avatar1.png",  "avatar2.png", "avatar3.png", "avatar4.png", "avatar5.png", "avatar6.png"];

    let stats = {
        sudoku: 5,
        books: 8
    }


    //dummy feed
    const dummyFeed = [
        {user: "Aurora", message: "Reacted with ❤️ on your new profile picture!", time: "10:15", avatar:"avatar1.png"},
        {user: "Tobias", message: "Reacted with 👍 on your library post! ", time: "15:30", avatar: "avatar2.png"},
        {user: "Sjur", message: "Reacted with ❤️ on your sudoku post!", time: "yesterday", avatar: "avatar3.png"}
    ];

    function createFeedEntry(item) {
        const entry = document.createElement("div");
        entry.classList.add("feed-card");

        const avatar = document.createElement("img");
        avatar.classList.add("feed-avatar");
        avatar.src = item.avatar;
        avatar.alt = item.user + "avatar";
        entry.appendChild(avatar);

        const user = document.createElement("h4");
        user.textContent = item.user;
        entry.appendChild(user);

        const message = document.createElement("p");
        message.textContent = item.message;
        entry.appendChild(message);



        return entry;
    }

    dummyFeed.forEach(item => {
        const entry = createFeedEntry(item);
        feedbox.appendChild(entry);
    });

    changePicBtn.addEventListener("click", () => {
        
        let existingPanel = document.getElementById("avatarPanel");
        if(existingPanel) {
            existingPanel.remove();
            return;
        }


        const panel = document.createElement("div");
        panel.id = "avatarPanel";

        avatars.forEach(src =>{
            const img = document.createElement("img");
            img.src = src;
            img.alt = "avatar";

            img.addEventListener("click", () => {
                profilePic.src = src;
                panel.remove();

            });

            panel.appendChild(img);
        });

        changePicBtn.parentNode.appendChild(panel);
    })
};