/**
 * Account Settings - Account
 */
 firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User logged in already or has just logged in.
    useri = user.uid
  } else {
    // User not logged in or has just logged out.
  }
});
 const fileInput = document.querySelector('.account-file-input')

function fsave() { 
  var file = fileInput.files[0];
  var Type = file.type;
  var Size = file.size/1000000;
  console.log(Type);
  if(Size<8){
if (Type.includes("image")) {

  var filename = file.name;

  console.log (filename.substring(filename.lastIndexOf('.')+1))

    console.log();
    // Create a root reference
    var storageRef = firebase.storage().ref();

    // Create a reference to 'mountains.jpg'

    
    // While the file names are the same, the references point to different files

    // Uploading Section 

 

var uploadTask = storageRef.child('students/dps/'+useri+"/"+sid+"."+filename.substring(filename.lastIndexOf('.')+1)).put(file);
Swal.fire({
    title: '<strong>File is being uploaded</strong>',
    icon: 'info',
    html:'<div id="myProgress">' + '<center><small class="text-primary fw-semibold"><i class="bx bx-loader-circle"></i> Please be patient!</small></center><br>'+
   ' <div class="w3-green" id="myBar">10%</div>' +'</div>' ,
   showCancelButton: false,
   showCloseButton: false,
   showConfirmButton: false,
   allowOutsideClick: false
  })

// Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion
uploadTask.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    // Progress

document.getElementById("myBar").style.width = progress + "%"
document.getElementById("myBar").innerText = Math.round(progress)+"%";


    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case firebase.storage.TaskState.PAUSED: // or 'paused'
        console.log('Upload is paused');
        break;
      case firebase.storage.TaskState.RUNNING: // or 'running'
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Upload faild! Please try again'
    })
    // Handle unsuccessful uploads
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
   dp = downloadURL
    Swal.fire(
      'File Uploaded',
      filename+' has been successfully uploaded!',
      'success'
      )
      
  
    });
  }
);
   }  else {
    Swal.fire(
'Unsupported File',
'Only image file type is allowed. ',
'error'
)
   }} else {

      Swal.fire(
          'BIG File',
          'Only image files less than 25 MB allowd',
          'error'
          )
   }
  
  
  
  }
document.addEventListener('DOMContentLoaded', function (e) {
  (function () {
    const deactivateAcc = document.querySelector('#formAccountDeactivation');

    // Update/reset user image of account page
    let accountUserImage = document.getElementById('uploadedAvatar');
      resetFileInput = document.querySelector('.account-image-reset');

    if (accountUserImage) {
      const resetImage = accountUserImage.src;
      fileInput.onchange = () => {
        if (fileInput.files[0]) {

          fsave();

          accountUserImage.src = window.URL.createObjectURL(fileInput.files[0]);

        }
      };
      resetFileInput.onclick = () => {
        dp = "none"
        fileInput.value = '';
        accountUserImage.src = resetImage;
      };
    }
  })();
});
