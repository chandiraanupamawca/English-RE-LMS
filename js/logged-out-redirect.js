firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in      
    } else {
        location.replace("login")
    }
  });