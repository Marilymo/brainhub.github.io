class Observable {
    constructor() {
        this.observers = [];
    }

    subscribe(f) {
        this.observers.push(f);
    }

    unsubscribe(f){
        this.observers = this.observers.filter(subscriber => subscriber !== f);
    }

    notify(data) {
        this.observers.forEach(observer => observer(data));
    }
}

const reactionSubject = new Observable();


class Feed {
    constructor(elementId) {
        this.feedElement = document.getElementById(elementId);
    }


    update(data) {

        const entry = document.createElement("div");
        entry.classList.add("feed-entry");

        // Avatar (use default for generated events)
        const avatar = document.createElement("img");
        avatar.classList.add("avatar");
        avatar.src = data.avatar || "avatar-default.png";
        entry.appendChild(avatar); 

        // Username
        const user = document.createElement("h4");
        user.textContent = data.user;
        entry.appendChild(user);

        // Message
        const message = document.createElement("p");
        message.textContent = data.message || data;
        entry.appendChild(message);

        // Time
        const time = document.createElement("span");
        time.classList.add("feed-time");
        time.textContent = data.time;

        // Reactions
        const reactions = document.createElement("div");
        reactions.classList.add("reactions");
        const reactionIcons = ["❗", "👍", "❤️", "😊"];
        reactionIcons.forEach(icon => {
            const btn = document.createElement("button");
            btn.classList.add("reaction-btn");
            btn.textContent = icon;
            btn.addEventListener("click", ()=> {
                reactionSubject.notify({
                    user: data.user,
                    reaction: icon,
                    message: data.message
                });
            })
            reactions.appendChild(btn);
        });
        entry.appendChild(reactions);

        // Add to top of feed
        this.feedElement.prepend(entry);
    }
}



reactionSubject.subscribe(data => {
    const popup = document.createElement("div");
    popup.classList.add("reaction-popup");
    popup.textContent = `${data.user}'s post got a "${data.reaction}" reaction!`;
    document.body.appendChild(popup);

    setTimeout(()=> popup.remove(), 2000);
});

const feed = new Feed("feedbox");

//dummy feed on load

const dummyFeed = [
    {user: "Aurora", message: "     I solved today's Sudoku with 2 mistakes!", avatar:"avatar1.png", time:"10:15"},
    {user: "Tobias", message: "I added a new book to my library!", avatar: "avatar2.png", time:"15:30"},
    {user: "Sjur", message: "I completed today's Memory challenge!", avatar: "avatar3.png", time:"yesterday"}
];

dummyFeed.forEach(entry => feed.update(entry));



// Sett dagens dato øverst
window.addEventListener("DOMContentLoaded", () => {
    const dateElement = document.getElementById("todaysDate");
    if (dateElement) {
        const today = new Date();
        const options = { weekday: 'long', month: 'long', day: 'numeric' };
        dateElement.textContent = today.toLocaleDateString('en-US', options);

    }
});



