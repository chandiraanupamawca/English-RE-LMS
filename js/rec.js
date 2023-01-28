var $$ = function( id ) { return document.getElementById( id ); };
function rec (d){
   tt =   localStorage.getItem("authid")

 if(d!=null){
    var  a = Object.keys(d)
    x = d
    for (let i = 0; i < a.length; i++) {
        k = i+1
         e = a[i];
        clzcd = $$("sampler")
        clone = clzcd.cloneNode(true);
    $$("recs").appendChild(clone);
    
    document.getElementsByClassName("sampler")[k].style.display = "block"
    document.getElementsByClassName("sampleri")[k].id = "sampleri"+k
    
 var el = "#"+ "sampleri"+k
    $($('.rtitle')[k]).attr('data-bs-target',el);
    document.getElementsByClassName("rtitle")[k].innerText = moment(d[e]["start"]).format("DD-MM-YYYY")+" | " +d[e]["title"]
    document.getElementsByClassName("rfr")[k].innerText = moment(d[e]["liveon"]).format("DD-MM-YYYY hh:mm a")
    document.getElementsByClassName("rti")[k].innerText = moment(d[e]["livetill"]).format("DD-MM-YYYY hh:mm a")
    document.getElementsByClassName("rsi")[k].innerText = (d[e]["size"]/1000000).toFixed(2) + " MB"
    document.getElementsByClassName("rst")[k].innerText =moment( d[e]["start"]).format("DD-MM-YYYY hh:mm a")
    document.getElementsByClassName("ren")[k].innerText = moment(d[e]["end"]).format("DD-MM-YYYY hh:mm a")
    document.getElementsByClassName("totplay")[k].innerText = d[e]["times"]
    document.getElementsByClassName("leplay")[k].innerText = d[e]["times"]
    document.getElementsByClassName("leplay")[k].id = e
    document.getElementsByClassName("leplay")[k].v = d[e]["times"]
    document.getElementsByClassName("wtchr")[k].id = e
    document.getElementsByClassName("wtchr")[k].times = CryptoJS.AES.encrypt(d[e]["times"],  tt)
    document.getElementsByClassName("wtchr")[k].dt = d[e]["data"]
    document.getElementsByClassName("wtchr")[k].se = CryptoJS.AES.encrypt(d[e]["media"],  tt)
    if(i==a.length-1){
      function thent (timem){
      for (let z = 1; z < document.getElementsByClassName("rti").length; z++) {
          var now = moment(timem,"x");
var prev = moment(document.getElementsByClassName("rti")[z].innerText, "DD-MM-YYYY hh:mm a");
if ( moment(prev).diff(moment(now), 'seconds')<0){
  document.getElementsByClassName("sampler")[z].style.display = 'none'
} else{
   $("#rect").fadeOut()

}
          
      }}

      var path =   "shared/time/time"
      const preObject74569 = document.getElementById(path);
      // Create References
      const dbRefObject74569 = firebase.database().ref().child(path);
      
      // Sync object changes
      dbRefObject74569.once('value', snap => thent(snap.val()));

      for (let s = 0; s < document.getElementsByClassName("leplay").length; s++) {
         const ga = document.getElementsByClassName("leplay")[s].id
         const v = document.getElementsByClassName("leplay")[s].v
function xlid(stst){
   if(stst!=null){
   var evaz = parseInt(v) - parseInt((Object.keys(stst).length))
   document.getElementsByClassName("leplay")[s].innerHTML = evaz
   document.getElementsByClassName("wtchr")[s].usea = CryptoJS.AES.encrypt(evaz.toString(),  tt)

   } else {
      document.getElementsByClassName("wtchr")[s].usea = CryptoJS.AES.encrypt(v ,  tt)
   }
}
         var path =   "attemps/" + siid + "/"+ga
         const preObject74569 = document.getElementById(path);
         // Create References
         const dbRefObject74569 = firebase.database().ref().child(path);
         
         // Sync object changes
         dbRefObject74569.on('value', snap => xlid(snap.val()));
      }
  }
    }

 } else {
    $$("rect").innerText = "No Class Recordings Available"
 }
}


function getzak (id,dta,se,times,usea1){
   var se = CryptoJS.AES.decrypt(se,tt).toString(CryptoJS.enc.Utf8)
   var times = CryptoJS.AES.decrypt(times,tt).toString(CryptoJS.enc.Utf8)
   var usea = CryptoJS.AES.decrypt(usea1,tt).toString(CryptoJS.enc.Utf8)
   tid = localStorage.getItem("tp")
   var data = JSON.stringify({sid:localStorage.getItem("sid"),cid:cid,pn:tid});
   encrypted = CryptoJS.AES.encrypt(data, tt);
 
 
 function newl(){
   var xhr2 = new XMLHttpRequest();
 
var url2 ="https://server-10.lankaedu.tk/zak";
 xhr2.open("POST", url2, true);
 xhr2.setRequestHeader("Content-Type", "application/json");
 xhr2.onreadystatechange = function () {
   if (xhr2.readyState === 4 && xhr2.status === 200) {
 if(xhr2.response=="Class fees not paid"){
   Swal.fire({
     icon: 'warning',
     title: 'Class Fees Not Paid!',
		 text: "Please pay Class fees to access this Recording"
   })
 } else {
   if(xhr2.response.includes("zackgot==")){
var acurl = CryptoJS.AES.decrypt(dta,tt).toString(CryptoJS.enc.Utf8)
if(se=="Y"){
   xten = uid
   firebase.database().ref("shared/"+xten).set({
      data : btoa(acurl+"?zak"+(xhr2.response).toString().replace("zackgot=",''),tt)
  }).then((a) => {
     protocolCheck(
          "aduruthuma://media/"+xten,
          () => {
              Swal.fire({
                  icon: 'info',
                  title: 'Aduruthuma Media Player is required',
                  text: 'Requested content will be only opened if you have installed Aduruthuma Media player on your device',
                  footer: '<a href="/download">ADURUTHUMA DOWNLOAD CENTER</a>'
                })
          },
          () => {
              Swal.fire(
                  'Launched Successfully',
                  'You can now close the browser window',
                  'success'
                )
          }, 5000
        );
  })
} else {
      window.location.href = acurl+"?zak"+(xhr2.response).toString().replace("zackgot=",'')}

   
   } else {
     Swal.fire({
       icon: 'error',
       title: 'We can not hanlde the request right now',
       text: xhr2.response,
       footer: '<a href="tel:0787134053">Support Hotline</a>'
     })
   }
 }
   }}
   out = JSON.stringify({tk:'"'+encrypted+'"',rid:id})

 if(usea>0){
   let timerInterval
   Swal.fire({
     title: 'Checking payment status..',
     html: 'Responding you in <b></b> milliseconds.',
     timer: 10000,
     timerProgressBar: true,
     allowEscapeKey:false,
     allowEnterKey:false,
     allowOutsideClick:false,
     didOpen: () => {
       Swal.showLoading()
       const b = Swal.getHtmlContainer().querySelector('b')
       timerInterval = setInterval(() => {
        if(b){
         b.textContent = Swal.getTimerLeft()
        }
       }, 100)
     },
     willClose: () => {
       clearInterval(timerInterval)
     }
   }).then((result) => {
     /* Read more about handling dismissals below */
     if (result.dismiss === Swal.DismissReason.timer) {
     }
   })
   xhr2.send(out);} else {
      Swal.close()
      Swal.fire({
         icon: 'error',
         title: 'Oops...',
         text: 'You have consumed all the watch times!',
         footer: '<a href="'+CryptoJS.AES.decrypt(dta,tt).toString(CryptoJS.enc.Utf8)+'">Try without authentication</a>'
       })
   }
 }
newl()
 
 }