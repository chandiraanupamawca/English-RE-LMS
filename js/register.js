//Error Logs
  // Create References
  const pops = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

function handleerror (err){
keyid = err;

}

  path = "/expologs/errorlogs/err"
  const dbRefObject = firebase.database().ref().child(path);
    
  // Sync object changes
  dbRefObject.on('value', snap => handleerror(snap.val()));

//End Error Logs

var $$ = function( id ) { return document.getElementById( id ); };
// Values
function doit(){
  console.log("parse")
  $$("enableOTP").style.display="block"
  Swal.fire({
      icon: 'info',
        width:"0px",
        allowEscapeKey:false,
        allowEnterKey:false,
        allowOutsideClick:false
    
    })
    $$("code").value=parseInt(pn)    
}

res=null
function validateEmail(email) 
    {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }
function verify(){
    fn= $$("firstName").value
ln = $$("lastName").value
gn = $$("gen").value
bd = $$("birthday").value
em = $$("email").value
pn = $$("phoneNumber").value
ad = $$("address").value
st = $$("stream").value
yr = $$("year").value
pw = $$("pw").value
wa = $$("whatsappNumber").value
if($$("firstName").value==''){
    Swal.fire(
        'Fill the First Name',
        'Please fill out all the fields to continue',
        'error'
      )
} else{
    if($$("lastName").value==''){
        Swal.fire(
            'Fill the Last Name',
            'Please fill out all the fields to continue',
            'error'
          )
    } else{
        if($$("gen").value==''){
            Swal.fire(
                'Select the Gender',
                'Please fill out all the fields to continue',
                'error'
              )
        } else{
            if($$("birthday").value==''){
                Swal.fire(
                    'Fill the Birthday',
                    'Please fill out all the fields to continue',
                    'error'
                  )
            } else{
                if((validateEmail(em)==false)){
                    Swal.fire(
                        'Fill the correct Email',
                        'Please fill out all the fields to continue',
                        'error'
                      )
                } else{
                
                    if($$("phoneNumber").value==''||String(pn).slice(0, 2)!="07"||pn.toString().length!=10){
                        Swal.fire(
                            'Fill the OTP phone number',
                            'Phone number should be entered as 07XXXXXXXX',
                            'error'
                          )
                    } else{
                    
                        if($$("address").value==''){
                            Swal.fire(
                                'Fill the Address',
                                'Please fill out all the fields to continue',
                                'error'
                              )
                        } else{
                            if($$("whatsappNumber").value==''||String($$("whatsappNumber").value).slice(0, 2)!="07"||$$("whatsappNumber").value.toString().length!=10){
                                Swal.fire(
                                    'Fill the the WhastsApp number',
                                    'WhatsApp number should be entered as 07XXXXXXXX',
                                    'error'
                                  )
                            } else{
                                if($$("year").value==''){
                                    Swal.fire(
                                        'Select the Exam Year',
                                        'Please fill out all the fields to continue',
                                        'error'
                                      )
                                } else{
                                    if($$("stream").value==''){
                                        Swal.fire(
                                            'Select the Exam',
                                            'Please fill out all the fields to continue',
                                            'error'
                                          )
                                    } else{
                                      if($$("pw").value==''){
                                        Swal.fire(
                                            'Enter a password',
                                            'Please fill out all the fields to continue',
                                            'error'
                                          )
                                    } else{
                                      if($$("pw").value.length<6){
                                        Swal.fire(
                                            'Password minimum length is 6 characters',
                                            'Enter a strong password',
                                            'error'
                                          )
                                    } else{
                                      if($$("con").value!=$$("pw").value){
                                        Swal.fire(
                                            'Confirm Password mismacth',
                                            'Please confirm the password to continue',
                                            'error'
                                          )
                                    } else{
doit()
                                    }
                                    }
                                    }
                                    } 
                                    
                                }   
                                
                            }   
                            
                        }   
                    }   
                }
                
            }
            
        }
        
    }

}



}

$$("reg").onclick=function(){verify()}

function closeit(){
    Swal.close()
    $$("enableOTP").style.display="none"
}
function opts(){
firebase.auth().languageCode = 'en';
// To apply the default browser preference instead of explicitly setting it.
// firebase.auth().useDeviceLanguage();

  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
    'size': 'normal',
    'callback': (response) => {
        console.log(response)
        res = response
      // reCAPTCHA solved, allow signInWithPhoneNumber.
      // ...
    },
    'expired-callback': () => {
      // Response expired. Ask user to solve reCAPTCHA again.
      // ...
      res = null
    }
  });
  recaptchaVerifier.render().then((widgetId) => {
    window.recaptchaWidgetId = widgetId;
  });}
  opts();
function basev (){
  if($$("otpv").innerText=="Get OTP"){
    $$("otpv").className="btn btn-primary me-sm-3 me-1 disabled"
    setTimeout($$("otpv").className="btn btn-primary me-sm-3 me-1",3000)
    if(res==null){
        $$("verifyt").innerText="Sending OTP..."
        
        $$("nocap").style.display="block"
    } else{
        $$("nocap").style.display="none"
        var phoneNumber = "+94"+parseInt(pn);
var appVerifier = window.recaptchaVerifier;
firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
    .then((confirmationResult) => {
      $$("otpv").className="btn btn-primary me-sm-3 me-1 "
        $$("otpv").innerText="Verify"
        $$("verifyt").innerText="Enter the code sent to your mobile number. It may take upto 2 minutes to receive an OTP."
        $$("recaptcha-container").style.display="none"
$$("cc").style.display="none"
$$("code").disabled = false
$$("code").placeholder= "XXXXXX"
$$("code").value=""
$$("whit").innerText="OTP Number"
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      window.confirmationResult = confirmationResult;
      // ...
    }).catch((error) => {
        $$("nocap").style.display="none"
        var phoneNumber = "+94"+parseInt(pn);
var appVerifier = window.recaptchaVerifier;
firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
        $$("optv").innerText="Verify"
        $$("verifyt").innerText="Enter the code sent to your mobile number. It may take upto 2 minutes to receive an OTP."
        $$("recaptcha-container").style.display="none"
$$("cc").style.display="none"
$$("code").disabled = false
$$("code").placeholder= "XXXXXX"
$$("whit").innerText="OTP Number"
      // Error; SMS not sent
      // ...
    });

    }
  } else{
    $$("otpv").className="btn btn-primary me-sm-3 me-1 disabled"
    const code = $$("code").value;
confirmationResult.confirm(code).then((result) => {
  $$("otpv").className="btn btn-primary me-sm-3 me-1"
  // User signed in successfully.
  user = result.user;

 closeit()
function cont (){
 let timerInterval
 Swal.fire({
   title: 'Registering You!',
   html: 'Awaiting <b></b> milliseconds.',
   timer: 15000,
   allowOutsideClick:false,
   allowEnterKey:false,
   allowEscapeKey:false,
   timerProgressBar: true,
   didOpen: () => {
     Swal.showLoading()
     const b = Swal.getHtmlContainer().querySelector('b')
     timerInterval = setInterval(() => {
       b.textContent = Swal.getTimerLeft()
     }, 100)
   },
   willClose: () => {
     clearInterval(timerInterval)
   }
 }).then((result) => {
   /* Read more about handling dismissals below */
   if (result.dismiss === Swal.DismissReason.timer) {
     console.log('I was closed by the timer')
   }
 })

 firebase.auth().signOut()
  var data = JSON.stringify({fn:fn,ln:ln,gn:gn,bd:bd,em:em,pn:pn,ad:ad,st:st,yr:yr,wa:wa,pw:pw});
  et = CryptoJS.AES.encrypt(data, keyid).toString();
  var xhr2 = new XMLHttpRequest();
  var url2 ="https://server-02.englishre.xyz/reg";
  xhr2.open("POST", url2, true);
  xhr2.setRequestHeader("Content-Type", "application/json");
  
  xhr2.onreadystatechange = function () {
      if (xhr2.readyState === 4 && xhr2.status === 200) {
  console.log(xhr2.response)
if (xhr2.response!=null){
  var email = pn+"@englishre.xyz"
  var password = pw
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    Swal.close()
    localStorage.setItem("pn",pn)
    localStorage.setItem("pw",CryptoJS.AES.encrypt(password, keyid).toString())
    // Signed in 
    document.getElementById("popp").innerHTML="<div id='suc' class='animated fadeIn'> <div id='upper-side'> <?xml version='1.0' encoding='utf-8'?> <!-- Generator: Adobe Illustrator 17.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0) --> <!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'> <svg version='1.1' id='checkmark' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' xml:space='preserve'> <path d='M131.583,92.152l-0.026-0.041c-0.713-1.118-2.197-1.447-3.316-0.734l-31.782,20.257l-4.74-12.65 c-0.483-1.29-1.882-1.958-3.124-1.493l-0.045,0.017c-1.242,0.465-1.857,1.888-1.374,3.178l5.763,15.382 c0.131,0.351,0.334,0.65,0.579,0.898c0.028,0.029,0.06,0.052,0.089,0.08c0.08,0.073,0.159,0.147,0.246,0.209 c0.071,0.051,0.147,0.091,0.222,0.133c0.058,0.033,0.115,0.069,0.175,0.097c0.081,0.037,0.165,0.063,0.249,0.091 c0.065,0.022,0.128,0.047,0.195,0.063c0.079,0.019,0.159,0.026,0.239,0.037c0.074,0.01,0.147,0.024,0.221,0.027 c0.097,0.004,0.194-0.006,0.292-0.014c0.055-0.005,0.109-0.003,0.163-0.012c0.323-0.048,0.641-0.16,0.933-0.346l34.305-21.865 C131.967,94.755,132.296,93.271,131.583,92.152z' /> <circle fill='none' stroke='#ffffff' stroke-width='5' stroke-miterlimit='10' cx='109.486' cy='104.353' r='32.53' /> </svg> <h3 id='status'> Success </h3> </div> <div id='lower-side'> <p id='message'> Congratulations, your account has been successfully created. </p> <a href='/' id='contBtn'>Continue</a> </div> </div>"

    var user = userCredential.user;
    console.log(user)

    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ..
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'error',
      title: errorMessage
    })
  });
}
  
      }}

      out = JSON.stringify({reg:'"'+et+'"'})
      xhr2.send(out);
    }
      
  console.log(result.additionalUserInfo.isNewUser) 
  if(result.additionalUserInfo.isNewUser){
    cont ()
  } else{
$$("popp").innerHTML="<div id='dan' class='animated fadeIn'> <div id='upper-sided'><h3 id='status'> Error </h3> </div> <div id='lower-side'> <p id='message'> The Phone number already exists. Sorry try siginig using another number. </p> <a onclick='location.reload()' id='contBtnd'>Reload</a> </div> </div>"    
  }
  // ...
}).catch((error) => {
  $$("otpv").className="btn btn-primary me-sm-3 me-1"
  console.log(error)
    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'error',
        title: 'OTP Invalid'
      }).then((result) => {
        Swal.fire({
            icon: 'info',
              width:"0px"
          
          })
      })
      
  // User couldn't sign in (bad verification code?)
  // ...
});
  }
  }








