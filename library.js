const container = document.querySelector('.book-container')
const addBook = document.querySelector('.add-book')
const dialog = document.querySelector('dialog')
const showButton = document.querySelector('dialog + button')
const closeButton = document.querySelector('dialog button')
const myLibrary = []

function Book(title, author, id) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor")
  }
  ;(this.title = title), (this.author = author), (this.id = id)
}

function addBookToLibrary(title, author) {
  const id = crypto.randomUUID()
  const newTitle = new Book(title, author, id)
  myLibrary.push(newTitle)
}

addBookToLibrary('A book', 'an author')
addBookToLibrary('Fullmetal Alchemist', 'Hiromu Arakawa')
addBookToLibrary('Warrior Cats: Into the Wild', 'Erin Hunter')
console.log(myLibrary)

myLibrary.forEach((book) => {
  const newBook = document.createElement('div')
  const bookTitle = document.createElement('h2')
  const bookAuthor = document.createElement('h3')
  newBook.classList.add('book')
  bookTitle.classList.add('title')
  bookAuthor.classList.add('author')
  bookTitle.textContent = book.title
  bookAuthor.textContent = book.author
  container.appendChild(newBook)
  newBook.appendChild(bookTitle)
  newBook.appendChild(bookAuthor)
})

addBook.addEventListener('click', (e) => {
  dialog.showModal()
})

closeButton.addEventListener('click', () => {
  dialog.close()
})
