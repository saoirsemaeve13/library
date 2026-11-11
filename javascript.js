const myLibrary = [];

function Book(title, author, pages, read) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor.");
  }
  if (typeof read === "boolean") {
    this.read = read;
  } else {
    const cleanRead = String(read).trim().toLowerCase();
    this.read = cleanRead.startsWith("y");
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.id = crypto.randomUUID();

  const info = () => {
    console.log(
      `${this.title} by ${this.author}, ${pages} pages, ${this.read ? "read" : "not read"}`,
    );
  };
  info();
}

function addBookToLibrary(title, author, pages, read) {
  const title1 = title;
  const author1 = author;
  const pages1 = pages;
  const read1 = read;
  myLibrary.push(new Book(title1, author1, pages1, read1));
}

function displayLibrary() {
  const table = document.getElementById("libraryBooks");
  const delTemplate = document.getElementById("delete-button-template");
  table.textContent = "";

  myLibrary.forEach((element) => {
    const row = document.createElement("tr");
    const titleCell = document.createElement("th");
    const authorCell = document.createElement("td");
    const pageCell = document.createElement("td");
    const readCell = document.createElement("td");
    const idCell = document.createElement("td");
    const delCell = document.createElement("td");

    titleCell.textContent = element.title;
    authorCell.textContent = element.author;
    pageCell.textContent = element.pages;
    readCell.textContent = element.read ? "Yes" : "No";
    idCell.textContent = element.id;
    delCell.append(delTemplate.content.cloneNode(true));
    const delBtn = delCell.querySelector("button");
    delBtn.classList.add("deleteBook");
    delBtn.addEventListener("click", () => {
      const index = myLibrary.findIndex((book) => book.id === element.id);
      myLibrary.splice(index, 1);
      displayLibrary();
    });
    row.append(titleCell, authorCell, pageCell, readCell, idCell, delCell);
    table.append(row);
  });
}
const addBookButton = document.getElementById("addBook");
const bookDialog = document.getElementById("bookDialog");
const cancelBtn = document.getElementById("cancel-btn");
const formSection = document.getElementById("form-section");
const bookForm = document.getElementById("bookForm");
const submitBook = document.getElementById("submitBook");

addBookButton.addEventListener("click", () => {
  formSection.classList.toggle("hidden");
});

cancelBtn.addEventListener("click", () => {
  bookForm.reset();
  formSection.classList.toggle("hidden");
});

bookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const titleInput = document.getElementById("title");
  const authorInput = document.getElementById("author");
  const pagesInput = document.getElementById("pages");
  const readInput = document.getElementById("read");
  const title = titleInput.value;
  const author = authorInput.value;
  const pages = Number(pagesInput.value);
  const read = readInput.value;
  addBookToLibrary(title, author, pages, read);
  displayLibrary();
  bookForm.reset();
  titleInput.focus();
});
