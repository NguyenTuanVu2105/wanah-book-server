function mapbooks(books) {
    ids = books.map(book => book.id)
    _books = ids.map(id => {
        return books.filter(book => book.id)
    })
  //  _books.map(book => )
}