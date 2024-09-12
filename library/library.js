const myLibrary = [];
const refreshButton = document.querySelector('.refresh');

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function() {
    return `Title: ${this.title}\nAuthor: ${this.author}\nNo.Pages: ${this.pages}\nIsRead: ${this.read}`;
  };
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

favoriteBook = new Book("Rich Dad, Poor Dad", "Robert Kiyosaki", 273, true);
addBookToLibrary(favoriteBook);
console.log(myLibrary);

function refreshData() {
  for (let i = 0; i < myLibrary.length; i++) {
    const libraryBook = document.createElement("tr");
    libraryBook.classList.add("bookProperties");
    document.querySelector("tbody").appendChild(libraryBook);
    for (let j = 0; i < Object.keys(libraryBook).length - 1; j++) {
      const bookProperty = document.createElement("td");
      bookProperty.innerHTML = "ahmed";
      libraryBook.insertCell(j);
      //document.getElementsByClassName('.bookProperties').appendChild(bookProperty);
    }
  }
}

refreshButton.addEventListener("click", function() {
  refreshData()
});
