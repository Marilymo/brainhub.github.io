
class Book {
    constructor(title, author, cover) {
        this.title = title;
        this.author = author;
        this.cover = cover;
        this.read = false;
    }

    markAsRead(){
        this.read = true;
    }
}


// Dummy data
let library = [
    new Book("Harry Potter: Chamber of Secrets", "J.K. Rowling", "📙"),
    new Book("Charlie and the Chocolate Factory", "Roald Dahl", "📕"),
    new Book("Diary of a Wimpy Kid", "Jeff Kinney", "📗"),
    new Book("Percy Jackson and the Lightning Thief", "Rick Riordan", "📘"),
    new Book("Doctor Proctor's Fart Powder", "Jo Nesbø", "📕"),
    new Book("George's Marvellous Medicine", "Roald Dahl", "📙")
];

library[1].read = true;
library[2].read = true;
library[5].read = true;

// Last saved library fra localStorage hvis den finnes
const savedLibrary = JSON.parse(localStorage.getItem("libraryData"));
if(savedLibrary && savedLibrary.length) {
    library = savedLibrary;
}

window.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("libraryList");
    const totalBooks = document.getElementById("totalBooks");
   
    updateBookCounter();

    function saveLibrary() {
        localStorage.setItem("libraryData", JSON.stringify(library));
    }

    function addBook(title, author, cover) {
        const book = new Book(title, author, cover);
        library.push(book);
        saveLibrary();
        renderLibrary();
 
    }

    
    function saveLibrary() {
        localStorage.setItem("libraryData", JSON.stringify(library));
    }

    function updateBookCounter() {
        const totalBooks = document.getElementById("totalBooks");
        const count  = library.filter(b => b.read).length;
        
        if(totalBooks){
        totalBooks.textContent = library.length;
        }

    }

    function createBookCard(book) {
        const card = document.createElement("div");
        card.classList.add("book-card");

        const cover = document.createElement("div");
        cover.classList.add("book-cover");
        cover.textContent = book.cover;

        const title = document.createElement("h3");
        title.textContent = book.title;

        const author = document.createElement("p");
        author.textContent = "by " + book.author;

        const readBtn = document.createElement("button");
        readBtn.classList.add("readBtn");
        readBtn.textContent = book.read ? "Read ✔️" : "Mark as read";
        if(book.read) readBtn.classList.add("read");

        const removeBtn = document.createElement("button");
        removeBtn.classList.add("removeBtn");
        removeBtn.textContent = "🗑️";

        removeBtn.onclick = function() {
            removeBook(book);
        };

        card.appendChild(removeBtn);

        readBtn.onclick = function() {
            book.read = !book.read; // veksle mellom true/false
            readBtn.textContent = book.read ? "Read ✔️" : "Mark as read";
            if(book.read) readBtn.classList.add("read");
            else readBtn.classList.remove("read");
  
            saveLibrary();
            updateReadCounter();
        };

        card.appendChild(cover);
        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(readBtn);
        card.appendChild(removeBtn);

        return card;
    }

    function renderLibrary() {
        if(!container) return;
        container.innerHTML = "";
        library.forEach(book => container.appendChild(createBookCard(book)));
        //updateReadCounter();
    }

    renderLibrary();

    const addBtn = document.getElementById("addBookBtn");
    const popup = document.getElementById("addBookPopup");
    const saveBtn = document.getElementById("saveBookBtn");
    const cancelBtn = document.getElementById("cancelBtn");

    if(addBtn){
    addBtn.addEventListener("click", () => popup.classList.add("visible"));
    }

    if(cancelBtn){
    cancelBtn.addEventListener("click", () => popup.classList.remove("visible"));
    }

    if(saveBtn){
    saveBtn.addEventListener("click", () => {
        const title = document.getElementById("bookTitle").value.trim();
        const author = document.getElementById("bookAuthor").value.trim();
        const cover = document.getElementById("bookCover").value.trim();

        if(title && author && cover) {
            addBook(title, author, cover);
            popup.classList.remove("visible");
            document.getElementById("bookTitle").value = "";
            document.getElementById("bookAuthor").value = "";
            document.getElementById("bookCover").value = "";
            updateBookCounter();
        } else {
            alert("Please fill in all fields!");
        }
    });

    function removeBook(book) {
    // Fjern boken fra library-arrayen
    library = library.filter(b => b !== book);

    // Oppdater localStorage
    localStorage.setItem("libraryData", JSON.stringify(library));

    // Oppdater antall bøker
    updateBookCounter();

    // Rerender biblioteket
    renderLibrary();
}
}
});

