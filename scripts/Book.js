class Book {
    constructor(obj){
        this.id=obj.id;
        this.authorName=obj.volumeInfo.authors || "";
        this.title=obj.volumeInfo.title || "";
        this.readMoreLink=obj.volumeInfo.infoLink || "";
        if(obj.volumeInfo.imageLinks){
            this.imgLink=obj.volumeInfo.imageLinks.thumbnail || "";
        } else {
            this.imgLink = "";
        }
    }
}