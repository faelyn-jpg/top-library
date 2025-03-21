const mainContainer = document.querySelector('.container')
const container = document.querySelector('.book-container')
const addBook = document.querySelector('.add-book')
const dialog = document.querySelector('dialog')
const showButton = document.querySelector('dialog + button')
const closeButton = document.querySelector('dialog button')
const submit = document.querySelector('#submit')
const myLibrary = []

function Book(title, author, id, pages, read) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor")
  }
  ;(this.title = title),
    (this.author = author),
    (this.id = id),
    (this.read = read),
    (this.pages = pages)
}

Book.prototype.readBook = function (book, read, readBook) {
  let result
  if (this.read === 'yes') {
    this.read = 'no'
    result = 'Not read'
  } else {
    this.read = 'yes'
    result = 'Read'
  }
  refreshDisplay(book, read)
  return result
}

function addBookToLibrary(title, author, pages, read) {
  const id = crypto.randomUUID()
  const newTitle = new Book(title, author, id, pages, read)
  if (
    myLibrary.find(
      (title) => newTitle.title + newTitle.author === title.title + title.author
    )
  ) {
    return
  } else {
    myLibrary.push(newTitle)
    displayBooks()
  }
}

function displayBooks() {
  for (const [i, book = value] of myLibrary.entries()) {
    const getAllTitles = document.querySelectorAll('.title')
    const allTitles = Array.from(getAllTitles)
    const sameTitle = allTitles.find((title) => title.textContent == book.title)
    if (sameTitle === undefined) {
      const newBook = document.createElement('div')
      const title = document.createElement('h2')
      const author = document.createElement('h3')
      const pages = document.createElement('div')
      const read = document.createElement('div')
      const removeBook = document.createElement('button')
      const readBook = document.createElement('button')
      readBook.classList.add('read-toggle')
      newBook.classList.add('book')
      title.classList.add('title')
      author.classList.add('author')
      pages.classList.add('pages')
      read.classList.add('read')
      newBook.setAttribute('id', book.id)
      removeBook.classList.add('remove-book')
      title.textContent = book.title
      author.textContent = book.author
      pages.textContent = `${book.pages} pages`
      if (book.read === 'yes') {
        read.textContent = 'Read'
      } else {
        read.textContent = 'Not read'
      }
      readBook.textContent = 'Toggle Read'
      removeBook.textContent = 'Remove Book'
      removeBook.dataset.id = book.id

      container.appendChild(newBook)
      newBook.appendChild(title)
      newBook.appendChild(author)
      newBook.appendChild(read)
      newBook.appendChild(pages)
      newBook.appendChild(readBook)
      newBook.appendChild(removeBook)
      readBook.addEventListener('click', () => {
        read.textContent = book.readBook(book, read, readBook)
        newBook.insertBefore(readBook, removeBook)
      })
    }
  }
}

function removeBook(id) {
  const target = document.getElementById(`${id}`)
  target.remove()
  const index = myLibrary.findIndex((book) => book.id === id)
  myLibrary.splice(index, 1)
}

function refreshDisplay(book, read) {
  read.textContent = book.read
}

addBookToLibrary('A book', 'an author', 'some', 'no')
addBookToLibrary('Fullmetal Alchemist', 'Hiromu Arakawa', '4738', 'yes')
addBookToLibrary('Fullmetal Alchemist', 'Hiromu Arakawa', '4738', 'yes')
addBookToLibrary('Warrior Cats: Into the Wild', 'Erin Hunter', '320', 'no')

addBook.addEventListener('click', (e) => {
  dialog.showModal()
})

closeButton.addEventListener('click', () => {
  dialog.close()
})

submit.addEventListener('click', (e) => {
  const form = document.querySelectorAll('input[type="text"]')
  const radio = document.querySelector('input[type="radio"]:checked')
  e.preventDefault()
  addBookToLibrary(form[0].value, form[1].value, form[2].value, radio.id)
  for (let i = 0; i < form.length; i++) {
    form[i].value = ''
  }
  dialog.close()
})
container.addEventListener('click', (e) => {
  if (e.target.matches('.remove-book')) removeBook(e.target.dataset.id)
})
