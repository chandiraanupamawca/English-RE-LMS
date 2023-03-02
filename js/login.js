// Key Press Functions
document.getElementById("username").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    document.getElementById("password").focus();
  }
});

document.getElementById("password").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
	document.getElementById("login").click();
  }
});


// Login Functions
var $$ = function (id) {
	return document.getElementById(id);
};
firebase.auth().onAuthStateChanged((user) => {
	if (localStorage.getItem("pw") == null) {
		localStorage.clear()
		firebase.auth().signOut()
	}	if (user) {
		// User is signed in, see docs for a list of available properties
		// https://firebase.google.com/docs/reference/js/firebase.User
		uid = user.uid;
		// ...
	} else {
		console.log("User is signed out")
		// User is signed out
		// ...
	}
});

function handleerror(err) {
	keyid = err;

}
path = "/expologs/errorlogs/err"
const dbRefObject = firebase.database().ref().child(path);

// Sync object changes
dbRefObject.on('value', snap => handleerror(snap.val()));


//End Error Logs
function checkd() {
	console.log($$("username").value)
	if ($$("username").value.length != 10) {
		Swal.fire(
			'Incorrect Phone number',
			'Please enter in the format of 07XXXXXXXX',
			'warning'
		)
	} else {
		if ($$("password").value == '') {
			Swal.fire(
				'Empty Password',
				'Please enter the password',
				'warning'
			)
		} else {

			var email = $$("username").value + "@englishre.tk"
			var password = $$("password").value
			firebase.auth().signInWithEmailAndPassword(email, password)
				.then((userCredential) => {
					// Signed in
					localStorage.setItem("pn", $$("username").value)
					localStorage.setItem("pw", CryptoJS.AES.encrypt($$("password").value, keyid).toString())
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

					location.replace("/")
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