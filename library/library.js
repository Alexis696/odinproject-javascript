const myLibrary = [];

const tableBody = document.querySelector("tbody");

const bTitleInput = document.getElementById("book-title");
const bAuthorInput = document.getElementById("book-author");
const bPagesInput = document.getElementById("book-pages");
const bStatusInput = document.getElementById("book-status");

const refreshButton = document.querySelector(".refresh-button");
const addButton = document.querySelector(".add-button");

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `Title: ${this.title}\nAuthor: ${this.author}\nNo.Pages: ${this.pages}\nIsRead: ${this.read}`;
  };
}

favoriteBook = new Book("Rich Dad, Poor Dad", "Robert Kiyosaki", "273", true);
addBookToLibrary(favoriteBook);

for (let i = 0; i < myLibrary.length; i++) {
  const libraryBook = tableBody.insertRow(i);
  for (let j = 0; j < Object.keys(myLibrary[i]).length - 1; j++) {
    const bookProperty = libraryBook.insertCell();
    bookProperty.classList.add("cell");
    bookProperty.textContent = Object.values(myLibrary[i])[j];
  }
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  console.log(myLibrary);
}

function refreshData() {
  const newRow = tableBody.insertRow();
  for (let j = 0; j < Object.keys(myLibrary[0]).length - 1; j++) {
    const bookProperty = newRow.insertCell();
    bookProperty.classList.add("cell");
    bookProperty.textContent = Object.values(myLibrary[myLibrary.length-1])[j];
  }


  console.log(myLibrary);
}

refreshButton.addEventListener("click", function () {
  refreshData();
  refreshButton.disabled = true;
  addButton.disabled = false;
});

addButton.addEventListener("click", function () {
  //event.preventDefault();
  
  if (bTitleInput.value.trim() !== "" && bAuthorInput.value.trim() !== "" && bPagesInput.value.trim() != "") {
    const bookIsRead = bStatusInput.checked ? true : false;
    const newBook = new Book(
      bTitleInput.value,
      bAuthorInput.value,
      bPagesInput.value,
      bookIsRead,
    );
    addBookToLibrary(newBook);
    bTitleInput.value = "";
    bAuthorInput.value = "";
    bPagesInput.value = "";
    bStatusInput.checked = false;
    refreshButton.disabled = false;
    addButton.disabled = true;
  }
});
