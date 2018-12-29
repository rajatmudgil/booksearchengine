const searchOperations = { 
    searchUrl:"https://www.googleapis.com/books/v1/volumes?q=",

    
    searchOperationsInit(){
        
    },

    searchStringFormation(){
        searchUrl=this.searchUrl;
        searchUrl += this.getSearchQuery();
        searchUrl += this.getSearchBy();
        searchUrl += this.getBookType();
        searchUrl += this.getResultPerPage();
        searchUrl += this.getOrderByValue();
        return searchUrl;
    },

    getSearchUrl(){
        return this.searchStringFormation();
    },

    searchForBooks(){
        var searchQuery=this.getSearchUrl();
        bookOperations.clearBooksContainer();
        fetch(searchQuery)
        .then((resp)=>resp.json())
        .then((data)=>{
            data.items.forEach(book=>{
                bookOperations.addBook(new Book(book));
            })
        }).then(()=>{updateBookContainer(this.getSearchQuery(), bookOperations.getBooksContainer())});
    },

    getResultPerPage(){
        return "&maxResults="+getResultPerPageValue();
    },

    getBookType(){ 
        var bookType=getBookType();
        if(bookType){
            return "&filter="+getBookType();
        }else{
            return "";
        }  
    },

    getSearchBy(){
        var searchBy = this.getSearchByCategory();
        if(searchBy){
            return searchBy ="+"+searchBy+":"+this.getSearchByText();
        }else{
            return "";
        }
    },

    getSearchByCategory(){
        return getSearchByCategory();
    },

    getSearchByText(){
        return getSearchByQuery();
    },

    getSearchQuery(){
        return getSearchQuery();
    },

    getOrderByValue(){
        var orderBy = getOrderByValue();
        if(orderBy){
            return "&orderBy="+orderBy;
        }else{
            return "";
        }
    }

}