const bookOperations = {

    booksContainer: [],

    addBook(book){
        this.booksContainer.push(book);
    },

    clearBooksContainer(){
        this.booksContainer=[];
    },

    getBooksContainer(){
        return this.booksContainer;
    },

    getBookByID(bookID){
        return this.booksContainer.find(book=>{ if(bookID==book.id){
            return book;
        }});
    }

}