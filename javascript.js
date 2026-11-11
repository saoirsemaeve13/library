function Book(title, author, pages, read) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor.");
  }
  if (!Number.isInteger(pages) || pages <= 0) {
    throw Error("Page count must be a whole number greater than 0.");
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

  const info = () => {
    console.log(
      `${this.title} by ${this.author}, ${pages} pages, ${this.read ? "read" : "not read"}`,
    );
  };
  info();
}
