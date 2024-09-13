const myLibrary = [];

const tableBody = document.querySelector('tbody');

const refreshButton = document.querySelector('.refresh');
const addButton = document.querySelector('.add');

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function() {
    return `Title: ${this.title}\nAuthor: ${this.author}\nNo.Pages: ${this.pages}\nIsRead: ${this.read}`;
  };
}

favoriteBook = new Book("Rich Dad, Poor Dad", "Robert Kiyosaki", 273, true);
addBookToLibrary(favoriteBook);
refreshData();
console.log(myLibrary);

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function refreshData() {
  for (let i = 0; i < myLibrary.length; i++) {
    //tableBody.insertRow(i);
    const libraryBook = tableBody.insertRow(i);//tableBody.rows[i];
    for (let j = 0; j < Object.keys(myLibrary[i]).length - 1; j++) {
      const bookProperty = libraryBook.insertCell();
      bookProperty.classList.add('cell');
      bookProperty.textContent = Object.values(myLibrary[i])[j];
    }
  }
}

refreshButton.addEventListener("click", function() {
  refreshData()
});

addButton.addEventListener("click", function() {
   
});
