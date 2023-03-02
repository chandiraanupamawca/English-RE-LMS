var getcurrentuser = localStorage.getItem("stname");
if (getcurrentuser) {
  // User is signed in
      Swal.fire({
          title: 'Already Logged In!',
          icon: 'success',
          html: 'Redirecting you into Student Dashboard',
          showConfirmButton: false,
          showCancelButton: false,
          timer: 1000
        }).then((result) => {
          location.replace("index.html")
        })
} else {
  // User is signed out
}