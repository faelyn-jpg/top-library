const mainContainer = document.querySelector('.container')
const container = document.querySelector('.book-container')
const addBook = document.querySelector('.add-book')
const dialog = document.querySelector('dialog')
const showButton = document.querySelector('dialog + button')
const closeButton = document.querySelector('dialog button')
const submit = document.querySelector('#submit')
const myLibrary = []

//refactor into class

class Book {
  constructor(title, author, id, pages, read, image, desc) {
    this.title = title
    this.author = author
    this.id = id
    this.pages = pages
    this.read = read
    this.image = image
    this.desc = desc
  }

  readBook() {
    let result
    if (this.read === 'yes') {
      this.read = 'no'
      result = 'Not read'
    } else {
      this.read = 'yes'
      result = 'Read'
    }
    refreshDisplay(Book, this.read)
    return result
  }

  get book() {
    return {
      title: this.title,
      author: this.author,
      pages: this.pages,
      read: this.read,
      image: this.image,
      desc: this.desc,
    }
  }
}

function Dashboard() {}

function addBookToLibrary(title, author, pages, read, image, desc) {
  const id = crypto.randomUUID()
  const newTitle = new Book(title, author, id, pages, read, image, desc)
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
      const bookFormat = document.createElement('div')
      const newBook = document.createElement('div')
      const imagePlaceholder = document.createElement('div')
      const title = document.createElement('h2')
      const author = document.createElement('h3')
      const pages = document.createElement('div')
      const read = document.createElement('div')
      const buttonContainer = document.createElement('div')
      const image = document.createElement('img')
      const desc = document.createElement('p')
      const removeBook = document.createElement('button')
      const readBook = document.createElement('button')
      bookFormat.classList.add('book-format')
      buttonContainer.classList.add('button-container')
      readBook.classList.add('read-toggle')
      newBook.classList.add('book')
      title.classList.add('title')
      author.classList.add('author')
      pages.classList.add('pages')
      read.classList.add('read')
      bookFormat.setAttribute('id', book.id)
      image.src = book?.image
      removeBook.classList.add('remove-book')
      title.textContent = book.title
      desc.textContent = book.desc
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
      container.appendChild(bookFormat)
      bookFormat.appendChild(imagePlaceholder)
      imagePlaceholder.appendChild(image)
      bookFormat.appendChild(newBook)
      newBook.appendChild(title)
      newBook.appendChild(author)
      newBook.appendChild(read)
      newBook.appendChild(pages)
      newBook.appendChild(desc)

      newBook.appendChild(buttonContainer)
      buttonContainer.appendChild(readBook)
      buttonContainer.appendChild(removeBook)
      readBook.addEventListener('click', () => {
        read.textContent = book.readBook()
        buttonContainer.insertBefore(readBook, removeBook)
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

addBookToLibrary(
  'A book',
  'an author',
  'some',
  'no',
  './public/images/books.jpg',
  'some desc'
)
addBookToLibrary(
  'Fullmetal Alchemist',
  'Hiromu Arakawa',
  '4738',
  'yes',
  './public/images/fullmetal-alchemist.jpg',
  'a manga'
)
addBookToLibrary(
  'Warrior Cats: Into the Wild',
  'Erin Hunter',
  '320',
  'no',
  './public/images/warriors.jpg',
  'cats'
)

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
