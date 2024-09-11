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
console.log(favoriteBook.info());
console.log(favoriteBook.valueOf());
