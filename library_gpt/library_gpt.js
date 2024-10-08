
let myLibrary = [];

// Book constructor
class Book {
    constructor(name, author, pages, isRead) {
        this.name = name;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }
}

// Add book to library array
function addBookToLibrary(name, author, pages, isRead) {
    const newBook = new Book(name, author, pages, isRead);
    myLibrary.push(newBook); // Add the new book object to the myLibrary array
    updateTable(); // Update the table with the new book
    console.log(myLibrary);
}

// Remove a book from the library array
function removeBook(index) {
    myLibrary.splice(index, 1); // Remove the book at the specified index
    updateTable(); // Update the table after deletion
    console.log(myLibrary);
}

function toggleIsRead(index) {
    if (myLibrary[index]['isRead'] === "No") {
        myLibrary[index]['isRead'] = "Yes";
    } else {
        myLibrary[index]['isRead'] = "No";
    }
    updateTable();
    console.log(myLibrary);
}

// Update the table to reflect the current books in myLibrary
function updateTable() {
    const tableBody = document.querySelector("#libraryTable tbody");
    tableBody.innerHTML = ''; // Clear the table

    myLibrary.forEach((book, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${book.name}</td>
            <td>${book.author}</td>
            <td>${book.pages}</td>
            <td>${book.isRead}</td>
            <td>
              <button class="delete-btn" onclick="removeBook(${index})">Delete</button>
              <button class="toggle-read-btn" onclick="toggleIsRead(${index})">IsRead</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

// Handle form submission
document.getElementById("bookForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const bookName = document.getElementById("bookName").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const readStatus = document.getElementById("readStatus").value;

    addBookToLibrary(bookName, author, pages, readStatus);

    // Clear the form after submission
    document.getElementById("bookForm").reset();
});
