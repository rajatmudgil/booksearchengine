class User{

    constructor(username, email, gender, mobile, cartList=[], favList=[]){
        this.email=email;
        this.uname=username;
        this.gender=gender;
        this.mobile=mobile;
        this.cart=cartList;
        this.favouriteBooks=favList;
    }

    initCart(){
        //check database for any product in cart for this user;
    }

    initFavList(){
        //check database for book marked as fav for this user;
    }

    addBookToCart(book){
        //add Book To Cart
        this.cart.push(book);
    }

    addToFavList(book){
        //add Book to favourite List
        if(this.favouriteBooks.find( currentBook=>{
            if(currentBook.id==book.id){
                return book;
            }
        })){
            return false;
        }else{
            this.favouriteBooks.push(book);
            return true;
        }
        
    }

    getCartList(){
        return this.cart;
    }

    getFavBookList(){
        return this.favouriteBooks;
    }

    removeFromFavBook(){

    }

    removeCartList(){

    }

    getUserName(){
        return this.uname;
    }

    getFavList(){
        return this.favouriteBooks;
    }

}