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

function addBookToLibrary() {
  let title;
  while (true) {
    title = prompt("Book title:");
    if (title === null) return;
    if (title.trim() !== "") {
      title = title.trim();
      break;
    }
    alert("Title cannot be empty. Please try again.");
  }
  let author;
  while (true) {
    author = prompt("Book author:");
    if (author === null) return;
    if (author.trim() !== "") {
      author = author.trim();
      break;
    }
  }
  let pages;
  while (true) {
    pagesInput = prompt("Book page count:");
    if (pagesInput === null) return;
    const parsedPages = Number(pagesInput.trim());
    if (
      pagesInput.trim() !== "" &&
      Number.isInteger(parsedPages) &&
      parsedPages > 0
    ) {
      pages = parsedPages;
      break;
    }
    alert("Please enter a valid whole number greater than 0.");
  }
  let read;
  while (true) {
    const readInput = prompt("Have you read this book? (yes/no)");
    if (readInput === null) return;
    const cleanRead = readInput.trim().toLowerCase();
    if (cleanRead.startsWith("y") || cleanRead.startsWith("n")) {
      read = cleanRead;
      break;
    }
  }
  myLibrary.push(new Book(title, author, pages, read));
}

function displayLibrary() {
  myLibrary.forEach((element) => {
    const table = document.getElementById("libraryBooks");
    const row = document.createElement("tr");
    const titleCell = document.createElement("th");
    titleCell.textContent = element.title;
    const authorCell = document.createElement("td");
    authorCell.textContent = element.author;
    const pageCell = document.createElement("td");
    pageCell.textContent = element.pages;
    const readCell = document.createElement("td");
    readCell.textContent = element.read ? "Yes" : "No";
    const idCell = document.createElement("td");
    idCell.textContent = element.id;
    row.append(titleCell, authorCell, pageCell, readCell, idCell);
    table.append(row);
  });
}
