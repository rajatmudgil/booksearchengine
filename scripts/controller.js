window.addEventListener('load', () => {
    searchOperations.searchOperationsInit();
    booksContainerView = document.querySelector(".books-container");
    document.querySelector(".search-button").addEventListener("click", () => {
        searchOperations.searchForBooks();
    });
    searchBar=document.getElementById('search-bar');
    advSearchBarToggleButton = document.querySelector("#adv-search-btn");
    advSearchBarToggleButton.addEventListener('click', toggleAdvanceSearchBar);
    advanceSearchBar = document.querySelector("#adv-search-bar");
    searchResultDiv = document.querySelector("#search-result");
    advanceSearchBar.style.transform = 'scaleY(0)';
    loginBox = document.querySelector("#login-box");
    loginClose = document.querySelector("#login-box #login-close");
    loginBtn = document.querySelector("#login-btn");
    loginClose.addEventListener('click', () => toggleLoginBoxDisplay(false));
    loginBtn.addEventListener('click', () => toggleLoginBoxDisplay(false));
    registrationBox = document.querySelector("#registration-box");
    document.querySelector("#registration-btn").addEventListener('click', toggleRegBox);
    regBoxClose = document.querySelector("#registration-box #login-close");
    regBoxClose.addEventListener("click", toggleRegBox);
    DAO.daoInit();
    
    registrationBtn=document.querySelector("#reg-reg-btn")
    registrationBtn.addEventListener('click', registerNewUser);
    regResetBtn=document.querySelector("#reg-reset");
    regResetBtn.addEventListener('click', regReset);
    loginBtn=document.querySelector('#login-btn-btn');
    loginBtn.addEventListener('click', loginUser);
    
    resultPerPageList=document.querySelector("#number-of-result");
    filterByList=document.querySelector('select#filter-by-list');
    searchByList=document.querySelector('select#search-by-list');
    searchbyQuery=document.querySelector('input#search-by-query-text');
    orderByList = document.querySelector('#order-by-list');

    userManagerBox=document.querySelector('#user-login-reg-box');
    userBox=document.querySelector('#user-box');
    logoutBtn = document.querySelector("#user-logout");
    logoutBtn.addEventListener('click', logout);
    viewFavBtn = document.querySelector("#view-fav-btn");
    viewFavBtn.addEventListener('click', viewFavList);

    // resultPerPageList.onchange = ()=>{searchOperations.setResultPerPage(resultPerPageList.value)};
    // filterByList.onchange=()=>{searchOperations.setBookType(filterByList.value)};
});


function updateBookContainer(searchQuery, books) {
    updateSearchHeading(searchQuery);
    clearBookContainerView();
    books.forEach(book => {
        let bookCard = createCard();
        bookCard.querySelector(".book-image>img").src = book.imgLink;
        bookCard.querySelector(".book-name").innerText = book.title;
        bookCard.querySelector(".author-name").innerText = book.authorName;
        bookCard.querySelector(".read-more-link").href = book.readMoreLink;
        bookCard.classList.remove("display-none");
        bookCard.querySelector(".add-to-fav").setAttribute("data-id", book.id);
        appendBookCard(bookCard);
    });
}

function appendBookCard(bookCard) {
    booksContainerView.append(bookCard);
}

function updateSearchHeading(searchQuery) {
    document.querySelector("#search-heading").innerHTML = `Search Result For ${searchQuery}`;
}

function createCard() {
    var bookCard = document.querySelector('#site-assets>.book-card.display-none').cloneNode(true);
    return bookCard;
}

function clearBookContainerView() {
    booksContainerView.querySelectorAll('.book-card').forEach(book => book.remove());;
}

function toggleAdvanceSearchBar() {
    // console.log(advanceSearchBar);
    if (advanceSearchBar.style.transform == 'scaleY(0)') {
        searchResultDiv.style.marginTop = "150px";
        advanceSearchBar.style.transform = "scaleY(1)";
    } else {
        advanceSearchBar.style.transform = "scaleY(0)";
        searchResultDiv.style.marginTop = "100px";
    }
}

function toggleLoginBoxDisplay(state) {
    loginBox.classList.toggle("display-none");
}

function toggleRegBox(state) {
    registrationBox.classList.toggle("display-none");
}

function getUserRegData() {
    var newUser;
    pass = document.querySelector("#reg-uname").value;
    if ( pass == document.querySelector("#reg-repass").value) {
        newUser = new User(document.querySelector("#reg-uname").value,
                           document.querySelector("#reg-email").value,
                           document.querySelector("input[name='gen']:checked").value,
                           document.querySelector("#reg-mob").value
                           );
        newUser.pass = pass;
    }
    return newUser;
}

function registerNewUser(){
    var newUserData = getUserRegData();
    console.log(newUserData);
    console.log(userOperations.register(newUserData));
}


function regReset(){
    document.querySelectorAll("#registration-box input:not([type='radio])").forEach( box => {box.value=box.defaultValue});
    document.querySelectorAll("#registration-box input[type='radio']").forEach( box => {box.checked=false});
}

function loginUser(){
    var email=document.querySelector("#login-email").value;
    var pass=document.querySelector('#login-pass').value;
    userOperations.login(email, pass);
    toggleLoginBoxDisplay();
}

function getResultPerPageValue(){
    return resultPerPageList.value;
}

function getBookType(){
    return filterByList.value;
}

function getSearchByCategory(){
    return searchByList.value;
}

function getSearchQuery(){
    return searchBar.value;
}

function getSearchByQuery(){
    return searchbyQuery.value;
}

function getOrderByValue(){
    return orderByList.value;
}

function toggleBetweenUserBoxes(){
    if(userOperations.user){
        userManagerBox.classList.add('display-none');
        userBox.classList.remove('display-none');
        userBox.querySelector('#user-box-uname').innerHTML = userOperations.getUserName();
    }else{
        userManagerBox.classList.remove('display-none');
        userBox.classList.add('display-none');
        userBox.querySelector('#user-box-uname').innerHTML = "";
    }
}

function logout(){
    userOperations.logout();
}

function addToFavList(element){
    if(userOperations.user){
        if(userOperations.addToFavList(element.getAttribute("data-id"))){
            console.log("Book Successfully Added");
        }else{
            console.log("Book Already Exist In Favourite List");
        }
    }else{
        alert("Please Login To use this feature");
    }
}

function viewFavList(){
    updateBookContainer("Favourite Books", userOperations.getFavList());
}