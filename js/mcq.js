var $$ = function( id ) { return document.getElementById( id ); };
en = 0
starttime = ''
nowtime = ''
function xhrs (){
  Swal.fire({
    title: 'Awaiting Results! 🙂',
    html: 'Checking your answers...',
    timer: 50000,
    timerProgressBar: true,
    allowOutsideClick: false,
    allowEscapeKey:false
  
  })
  clearInterval(fx)
  Swal.showLoading()
  var xhr2 = new XMLHttpRequest();
  
  var url2 ="https://server-07.lankaedu.tk/mcq";
 //var url2 ="http://localhost:5000/mcq";
  xhr2.open("POST", url2, true);
  xhr2.setRequestHeader("Content-Type", "application/json");
  
  xhr2.onreadystatechange = function () {
    if (xhr2.readyState === 4 && xhr2.status === 200) {
if((xhr2.responseText).includes("pass")){
location.replace('view-class')
} else{
Swal.fire(
'Submission Failed',
xhr2.responseText,
'warning'
)
}
    }}
    siid = localStorage.getItem("sid")
    tid = localStorage.getItem("tp")
    tt =   localStorage.getItem("authid")
    if(sessionStorage.getItem(btoa("focus"+exid))==null){
      sessionStorage.setItem(btoa("focus"+exid),"true")
    }
    var data = JSON.stringify({sid:siid,cid:cid,pn:tid,exid:exid});
    encrypted = CryptoJS.AES.encrypt(data, tt);
    out = JSON.stringify({tk:'"'+encrypted+'"',ans:localStorage.getItem(exid),stname:localStorage.getItem('stname'),start:starttime,end:nowtime,focus:sessionStorage.getItem(btoa("focus"+exid)),device:navigator.platform})
xhr2.send(out)

}
function fuucus(){
  if((document.visibilityState === 'visible')){

  } else{
 setTimeout(location.reload(),8000)
 sessionStorage.setItem(btoa("focus"+exid),"false")
  }
}
function revv(){
  var table = $$('rbb')

  var array = JSON.parse((localStorage.getItem(exid)))
  var tl = table.rows.length;
  for (let i = 0; i < tl-1; i++) {
    table.deleteRow(-1);}
  for (let i = 1; i < exam["length"]+1  ; i++) {
 
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
 cell1.innerHTML = "Q"+i
var ans = array["Q"+i]
if(ans!=null){

  cell2.innerHTML = `<b  class='text-primary fw-bold'>${ans}</b>` 

} else {
  cell2.innerHTML = `<span class='text-danger fw-bold'>Blank</span>` 

}
 
  }

 }
function submitt(){
  revv()

  swal.fire({
    html:$$('review').innerHTML,
    confirmButtonText:'Submit',
    showCloseButton:true
  }).then((result)=>{
    if(result.isConfirmed){
      if(starttime!=''){
        xhrs ()

      } else {
        alert("Calculations are in Progress. Please try in few seconds")
      }
    }
  })
}
/* Helper function */
let formatz = (n) => `0${n / 60 ^ 0}`.slice(-2) + ':' + ('0' + n % 60).slice(-2)

function savve(qid,vid){


if(localStorage.getItem(exid)!=null){
    exi = {}
     exi = JSON.parse((localStorage.getItem(exid)))
    exi[qid]=vid
    var ite = (JSON.stringify(exi))
    localStorage.setItem(exid,ite)
    var exq = JSON.parse((localStorage.getItem(exid)))


} else{
     exi = {}
    exi[qid]=vid
    var ite = (JSON.stringify(exi))
    localStorage.setItem(exid,ite)
}
revv()
}
function getans (){
    $("input[name='" + fieldName + "']:checked").val();
}

function downloadFile(url, fileName) {
    fetch(url, { method: 'get', mode: 'no-cors', referrerPolicy: 'no-referrer' })
      .then(res => res.blob())
      .then(res => {
        const aElement = document.createElement('a');
        aElement.setAttribute('download', fileName);
        const href = URL.createObjectURL(res);
        aElement.href = href;
        aElement.setAttribute('target', '_blank');
        aElement.click();
        URL.revokeObjectURL(href);
      });

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your file has been downloaded successfully',
        showConfirmButton: false,
        timer: 1500
      })
  };

function download_file (urlz,namez){
    const url =urlz

const options = {

};
 fetch(url, options)
  .then( res => res.blob() )
  .then( blob => {
downfile = window.URL.createObjectURL(blob);
downloadFile(downfile,namez)
  });
}


const queryString = window.location.search;
const up = new URLSearchParams(queryString);
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
var token = atob(up.get('token'))
 cid = token.split('exid')[0].replace("cid",'')
 exid = token.split('exid')[1]
if(getCookie(cid+exid)==''){
$$('cont').innerHTML = '<iframe src="404.html" id="404" height="500vh" width="100%"></iframe>'
} else{
  try {
 var tempo =  CryptoJS.AES.decrypt(getCookie(cid+exid),localStorage.getItem('authid')).toString(CryptoJS.enc.Utf8)
    
  
exam = JSON.parse(tempo)
   $$('exam-name').innerText = exam["topic"]
   $$('time-left').innerText = "Calculating"
   $$('fullt').innerText = exam["dur"] + " mins"
   $$('mcqpdf').src =  exam["url"]
   $$('dld').onclick =  function(){
    
    download_file(exam["url"],exam["cname"]+" | Exam ID_"+exid+".pdf")
    Swal.fire({
        title: 'Downloading the file!',
        html: 'Please wait..It may take a few seconds',
        timerProgressBar: true,
  showCloseButton:true
  
      })
}
for (let i = 1; i < parseInt(exam["length"])+1; i++) {
    
    clzcd = $$('qlist')
clone = clzcd.cloneNode(true);
clone.getElementsByClassName('qesno')[0].innerText = 'Question '+i 
for (let z = 0; z < clone.getElementsByClassName('mass').length; z++) {
    const element = clone.getElementsByClassName('mass')[z];

  $( element.getElementsByTagName('input')).attr("name","Q"+i);
}


clone.style.display = ''
$$("quesr").appendChild(clone)
}
var lim  = parseInt(exam["apq"])
for (let z = lim; z <= 7; z++) {
										
    array = document.getElementsByClassName('mas'+z)
    for (let i = 0; i < array.length; i++) {
        const e = array[i];
        e.style.display = 'none'
    }
    
}
for (let z = 0; z <= lim; z++) {

array = document.getElementsByClassName('mas'+z)
for (let i = 0; i < array.length; i++) {
    const e = array[i];
    e.style.display = ''
}

}

if(localStorage.getItem(exid)==null){
} else{
    if(localStorage.getItem(exid)!=null){
        var pre = JSON.parse(localStorage.getItem(exid))
        for (let s = 0; s < Object.keys(pre).length; s++) {
            const inx =  Object.keys(pre)[s];
            const e = pre[inx]
  
            $("input[name="+inx+"][value=" + e + "]").attr('checked', 'checked');
        }
    
    }
}

} catch (error) {
  Swal.fire({
    icon:"error",
    title:"Fatal RunTime Error",
    text:error
  })
}



}
function msToHMS( ms ) {
  // 1- Convert to seconds:
  let seconds = ms / 1000;
  // 2- Extract hours:
  const hours = parseInt( seconds / 3600 ); // 3,600 seconds in 1 hour
  seconds = seconds % 3600; // seconds remaining after extracting hours
  // 3- Extract minutes:
  const minutes = parseInt( seconds / 60 ); // 60 seconds in 1 minute
  // 4- Keep only seconds not extracted to minutes:
  seconds = seconds % 60;
  return  hours+":"+minutes+":"+seconds.toFixed(0);
}//obf
function exop (elm,now){
  sessionStorage.setItem(btoa(cid+exid+"st"),CryptoJS.AES.encrypt(elm.toString(),localStorage.getItem('authid')).toString())
  sessionStorage.setItem(btoa(cid+exid+"nw"),CryptoJS.AES.encrypt(now.toString(),localStorage.getItem('authid')).toString())
function countz(){

try {
  var ex = CryptoJS.AES.decrypt(sessionStorage.getItem(btoa(cid+exid+"nw")),localStorage.getItem('authid')).toString(CryptoJS.enc.Utf8)
  nowtime = ex
  var st = CryptoJS.AES.decrypt(sessionStorage.getItem(btoa(cid+exid+"st")),localStorage.getItem('authid')).toString(CryptoJS.enc.Utf8)
  starttime = st
  if(ex!=null){
    var nxt = parseInt(ex)+1000
  sessionStorage.setItem(btoa(cid+exid+"nw"),CryptoJS.AES.encrypt(nxt.toString(),localStorage.getItem('authid')).toString())
var diff = (parseInt(ex)-parseInt(st))

var real = (parseInt(exam["dur"])*60*1000)-diff
if(real/1000<0){
if(en==0){
  en = 1
  xhrs ()
}
}
if(moment(msToHMS(real),"h:m:s").format("HH:mm:ss")!="Invalid Date"){
$$('time-left').innerText = moment(msToHMS(real),"h:m:s").format("HH:mm:ss")}


  }
} catch (error) {
  telenot(error + " " + localStorage.getItem('sid') + " | "+localStorage.getItem('stname'))
  setTimeout(location.reload(),3000)

}
}
 setInterval(countz,1000)
}

firebase.database().ref('shared/time').update({ time: firebase.database.ServerValue.TIMESTAMP })
.then(function (data) {
  firebase.database().ref('shared/time')
    .once('value')
    .then(function (data) {
      var t = data.val()['time'];
     var  time = t
var path = "exattemps/"+cid+"/"+exid+"/"+localStorage.getItem('sid')+"/ts"
// Create References
const dbRefObject234 = firebase.database().ref().child(path);
// Sync object changes
dbRefObject234.on('value', snap => exop(snap.val(),time));})})

fx =  setInterval(fuucus,1000)