const DAO = {

    daoInit() {
        this.databaseRef = firebase.database();
    },
    
       registerNewUser(newUserData){
 
        this.databaseRef.ref("users/" + newUserData.email).set(newUserData);
        return  "new user registered";
    },

    getUserRegData(email, pass) {
        return this.databaseRef.ref("users/" + email).once('value')
            .then((userSnapshot) => {
                return userSnapshot.val();
            })
            .then((userData) => {
                if (userData) {
                    if (userData.pass==pass) {
                        return userData;
                    } else {
                        throw "Password Wrong";
                    }
                } else {
                    throw "User Does Not Exist";
                }
            }).catch((error) => {
                return error;
            });
    }}

    // updateCartList(){

    // },

    // updateFavList(){

    // }

