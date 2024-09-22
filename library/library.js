const myLibrary = [];

const tableBody = document.querySelector("tbody");
let bookRows = document.getElementsByClassName("book-row");

const bTitleInput = document.getElementById("book-title");
const bAuthorInput = document.getElementById("book-author");
const bPagesInput = document.getElementById("book-pages");
const bStatusInput = document.getElementById("book-status");

const refreshButton = document.querySelector(".refresh-button");
const addButton = document.querySelector(".add-button");
const removeButton = document.querySelector(".remove-button");
let deleteButtons = document.getElementsByClassName("delete-button");

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
console.log(favoriteBook.info());

for (let i = 0; i < myLibrary.length; i++) {
  const libraryBook = tableBody.insertRow(i);
  libraryBook.classList.add('book-row');
  bookRows = document.getElementsByClassName("book-row");
  for (let j = 0; j < Object.keys(myLibrary[i]).length - 1; j++) {
    const bookProperty = libraryBook.insertCell();
    bookProperty.classList.add("cell");
    bookProperty.textContent = Object.values(myLibrary[i])[j];
  }
  const deleteBookCell = libraryBook.insertCell();
  const pack = createDeleteButton()
  const deleteButton = pack[1];
  deleteButtons = pack[0];
  deleteBookCell.append(deleteButton);
  deleteButtons = document.getElementsByClassName("delete-button");
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  console.log(myLibrary);
}

function refreshData() {
  const newRow = tableBody.insertRow();
  newRow.classList.add('book-row');
  bookRows = document.getElementsByClassName("book-row");
  for (let j = 0; j < Object.keys(myLibrary[0]).length - 1; j++) {
    const bookProperty = newRow.insertCell();
    bookProperty.classList.add("cell");
    bookProperty.textContent = Object.values(myLibrary[myLibrary.length - 1])[
      j
    ];
  }
  const deleteBookCell = newRow.insertCell();
  const package = createDeleteButton()
  const deleteButton = package[1];
  deleteButtons = package[0];
  deleteBookCell.append(deleteButton);
  deleteButtons = document.getElementsByClassName("delete-button");
  console.log("Delete buttons: " + deleteButtons.length);
}

function createDeleteButton() {
  const deleteBookButton = document.createElement("button");
  deleteBookButton.setAttribute("class", "delete-button");
  deleteBookButton.innerText = "Delete";
  deleteBookButton.disabled = true;
  deleteButtons = document.getElementsByClassName("delete-button");
  deleteBookButton.onclick = deleteBook();
  return [deleteButtons, deleteBookButton];
}

function deleteBook() {
  console.log(deleteButtons.length);
  for (let i = 0; i < deleteButtons.length; i++) {
    console.log("adjofg");
    deleteButtons[i].onclick = function () {
      console.log(i);
      deleteButtons[i].remove();
      tableBody.deleteRow(i);
      //bookRows[i].remove();
      myLibrary.splice(i, 1);
      console.log(deleteButtons);
      console.log(myLibrary);
      console.log("current index: " + i);
      console.log("max index: " + deleteButtons.length);
      console.log(bookRows);
    };
  }
}

refreshButton.addEventListener("click", function () {
  refreshData();
  refreshButton.disabled = true;
  addButton.disabled = false;
});

addButton.addEventListener("click", function () {
  if (
    bTitleInput.value.trim() !== "" &&
    bAuthorInput.value.trim() !== "" &&
    bPagesInput.value.trim() != ""
  ) {
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

removeButton.addEventListener("click", function () {
  for (let i = 0; i < deleteButtons.length; i++) {
    if (deleteButtons[i].disabled === true) {
      deleteButtons[i].disabled = false;
      removeButton.innerHTML = "Cancel Removal";
    } else {
      deleteButtons[i].disabled = true;
      removeButton.innerHTML = "Remove Book";
    }
  }
});
