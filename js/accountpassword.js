function changePassword() {
  const newPassword = document.getElementById("new-password").value;
  const confirmPassword = document.getElementById("confirm-password").value;
  const currentPassword = document.getElementById("current-password").value;
  
  // Step 1: Check whether new password and confirm password are equal
  if (newPassword !== confirmPassword) {
    swal.fire({title: "Validation Error", text: "New password and confirm password do not match", icon: "error"});
    return;
  }
  
  // Step 2: Check whether new password contains less than 6 characters or is similar to old password
  if (newPassword.length < 6) {
    swal.fire({title: "Validation Error", text: "New password should be at least 6 characters", icon: "error"});
    return;
  }

  if (newPassword === currentPassword) {
    swal.fire({title: "Validation Error", text: "New password should be different from old password", icon: "error"});
    return;
  }
  
  // Step 3: Re-authenticate the user with the entered current password
  const user = firebase.auth().currentUser;
  const credential = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
  
  user.reauthenticateWithCredential(credential)
    .then(() => {
      // Step 4: Prompt user to confirm password change and send request to server
      swal.fire({
        title: "Are you sure?",
        text: "Your password will be changed and you will be logged out from your account",
        icon: "warning",
        confirmButtonText: "Confirm"
      })
      .then((willChange) => {
        if (willChange) {
          swal.fire({
            title: "Please wait...",
            text: "Your password is being changed...",
            icon: "info",
            showConfirmButton: false,
            allowEscapeKey: false,
            allowOutsideClick: false,
          });
  
          // Send POST request to server
          fetch("https://server-02.englishre.xyz/changepassword", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: user.email,
              phoneNumber: '0'+parseInt(user.email),
              oldPassword: currentPassword,
              newPassword: newPassword,
              id: user.uid,
            }),
          })
          .then((response) => {
            if (response.status === 200) {
              // Password changed successfully, clear local storage
              localStorage.clear();
              swal.fire({title: "Success", text: "Password changed successfully", icon: "success"})
              .then((response) => {
                if (response){
                  logout()
                }
              });
            } else {
              // Error changing password, show error message
              swal.fire({title: "Error", text: "Unable to change password", icon: "error"});
            }
          });
        } else {
          // User canceled password change, do nothing
          return;
        }
      });
    })
    .catch((error) => {
      swal.fire({title: "Invalid Password", text: "You have entered an incorrect Password!", icon: "error"});
      console.log(error);
    });  
};