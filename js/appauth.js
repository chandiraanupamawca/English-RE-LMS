

var $$ = function( id ) { return document.getElementById( id ); };
firebase.auth().onAuthStateChanged((user) => {
  if(localStorage.getItem("pw")==null){
    localStorage.clear()
    firebase.auth().signOut()
    location.replace("login")
  }


  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
   uid = user.uid;
   var xhr = new XMLHttpRequest();
   url = "http://localhost:1234/auth";
   xhr.open("POST", url, true);
   xhr.setRequestHeader("Content-Type", "application/json");
   xhr.onreadystatechange = function () {
       if (xhr.readyState === 4 && xhr.status === 200) {
         document.write("Successfull")
       }}
       data = JSON.stringify({id:uid})
       xhr.send(data)
    // ...
  } else {
    location.replace("login.html")
    // User is signed out
    // ...
  }
});


function handleerror (err){
    keyid = err;
    
    }
    path = "/expologs/errorlogs/err"
    const dbRefObject = firebase.database().ref().child(path);
      
    // Sync object changes
    dbRefObject.on('value', snap => handleerror(snap.val()));

    
    //End Error Logs
function checkd(){
    console.log($$("username").value)
    if($$("username").value.length!=10){
        Swal.fire(
            'Phone number incorrect',
            'Please enter in the format of 07XXXXXXXX',
            'warning'
          )
    } else {
        if($$("password").value==''){
            Swal.fire(
                'Empty Password',
                'Please enter the password',
                'warning'
              )
        } else {
            
            var email = $$("username").value+"@aduruthuma.lk"
            var password = $$("password").value
            firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
              // Signed in
              localStorage.setItem("pn",$$("username").value)
              localStorage.setItem("pw",CryptoJS.AES.encrypt($$("password").value, keyid).toString())
              var user = userCredential.user;
              const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
         
              // ...
              
            })
            .catch((error) => {
                Swal.fire(
                    'Login Failed',
                    error.message,
                    'error'
                  )
              var errorCode = error.code;
              var errorMessage = error.message;
            });  
        }
    }
}

