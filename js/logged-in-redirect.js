firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    Swal.fire({
      title: 'Successfully Logged In!',
      icon: 'success',
      html: 'Redirecting you into Student Dashboard',
      showConfirmButton: false,
      showCancelButton: false,
      timer: 750
    }).then((result) => {
      setTimeout(function(){
        location.replace("/")
      }, 250); 
    })
  } else {
    // User is signed out
  }
});