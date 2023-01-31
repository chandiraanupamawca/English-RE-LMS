function slipsjs (){
  $$('Bank Details').onclick = function () {
    Swal.fire({
      title: 'Bank Details',
      html: "Bank: National Savings Bank (NSB) <br> Branch: Beliatta Branch <br> Account Number: 100480169447",
      icon: 'info',
      showCancelButton: true,
      cancelButtonColor: '#696cff',
      showConfirmButton: false
      })
  }
}
function paynot (dy){

 if(dy!=null){
  var month = moment(time).local().format("MM")

  if(dy[month]!=null){
       if(dy[month]["url"].includes("http")){
  $$('paytext').innerText='Your payment is pending for verification. \n This may take upto 24 hours'
  $$('upload-slip').innerText = "View Uploaded Slip"
  $$('Bank Details').innerText = "Delete Slip"
  $$('Bank Details').onclick = function (){
      Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
              firebase.database().ref("slips/"+uid+"/"+cid+"/"+moment(time).local().format('MM')).set({}).then((result) => {
               
                  Swal.fire({
                      position: 'top-end',
                      icon: 'success',
                      title: 'Your Slip has been successfully Deleted!',
                      showConfirmButton: false,
                      timer: 1500
                    }).then((result) => {
                      location.reload()
                    })
           })
          }
        })

 
  }

  
  $$('upload-slip').onclick = function () {
      let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
width=0,height=0,left=-1000,top=-1000`;

open(dy[month]["url"], 'test', params);
  }
      } else{
        if(dy[month]["url"].includes("reject")){
          $$('paytext').className = "mb-4"+" text-danger fw-bold"
          $$('paytext').innerText='Your slip was rejected. \n Contact 078 713 4053 for support'
          $$('upload-slip').innerText = "Re-Upload Slip"
        
      
          

        }
      }
  }
 }
}
function uploadslip (){
  function fsave() { 
      var file =  $$('picker').files[0]
      var Type = file.type;
      var Size = file.size/1000000;
      if(Size<20){
    if (Type.includes("image")||Type.includes("pdf")) {
    
      var filename = file.name;
    
    
        // Create a root reference
        var storageRef = firebase.storage().ref();
    
        // Create a reference to 'mountains.jpg'
    
        
        // While the file names are the same, the references point to different files
    
        // Uploading Section 
    
     
    
    var uploadTask = storageRef.child('students/slips/'+uid+"/"+cid+"/"+sid+"."+filename.substring(filename.lastIndexOf('.')+1)).put(file);
    Swal.fire({
        title: 'Slip is being uploaded',
        icon: 'info',
        html:'<div id="myProgress">' + '<center><small class="text-primary fw-semibold"><i class="bx bx-loader-circle bx-spin" ></i> Please be patient!</small></center><br>'+
       ' <div class="w3-green" id="myBar">10%</div>' +'</div>' ,
       showCancelButton: false,
       allowOutsideClick: false,
       allowEscapeKey:false,
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
    
    
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
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
  
       slurl = downloadURL
       firebase.database().ref("slips/"+uid+"/"+cid+"/"+moment(time).local().format('MM')).set({
  url:downloadURL,
  name:localStorage.getItem("stname"),
  uid:uid,
  cid:cid,
  mid:moment(time).local().format('MM'),
  sid:siid,
  cname:JSON.parse(localStorage.getItem("clzdata"))[cid]["info"]["topic"],
  tname:JSON.parse(localStorage.getItem("clzdata"))[cid]["info"]["name"],
  year:JSON.parse(localStorage.getItem("clzdata"))[cid]["info"]["year"],
  fee:mfeeval
       }).then((result) => {
          Swal.fire({
              icon: 'success',
              title: 'Your Slip has been successfully Uploaded!',
              showConfirmButton: false,
              timer: 1500
            }).then((result) => {
              location.reload()
            })
  
       })
       telenot("<b>🔵 New Payment Slip has been uploaded </b> \n<b>Student ID</b> : "+ sid + "\n<b>Student Name</b> : "+localStorage.getItem("stname")+ "\n<b>Class ID</b> : "+cid+ "\n<b>Class Name</b> : "+JSON.parse(localStorage.getItem("clzdata"))[cid]["info"]["topic"]+ "\n<b>Class Scheduele</b> : "+JSON.parse(localStorage.getItem("clzdata"))[cid]["info"]["time"]+ "\n<b>Teacher</b> : "+JSON.parse(localStorage.getItem("clzdata"))[cid]["info"]["name"]+ "\n<b>URL</b> : "+downloadURL  )
  
          
      
        });
      }
    );
       }  else {
        Swal.fire(
    'Unsupported File',
    'Only mage & pdf file types are allowed. ',
    'error'
    )
       }} else {
    
          Swal.fire(
              'Large File',
              'Only image & pdf files less than 20 MB allowd',
              'error'
              )
       }
      
      
      
      }
      fsave()
  }