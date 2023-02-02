var $$ = function( id ) { return document.getElementById( id ); };
added = []
uid  = localStorage.uid
$$$ = function(element,thiz){
    return element.getElementsByClassName(thiz)
}
firebase.auth().onAuthStateChanged((user) => {

    function thisd(xz){
var dis = xz[thisdz]

function getico (ico){
if(ico=="Windows"){
  return  '<i class="bx bxl-windows"></i>'
} else {
    if(ico=="Android"){
        return  '<i class="bx bxl-android"></i>'
      } else {
        if(ico=="iOS"||ico=="Mac OS"){
            return  '<i class="bx bxl-apple"></i>'
          } else {
            return  ''
              
          }
      }
}
}
try {
    $$('mydev').getElementsByClassName('name')[0].innerHTML = getico(dis["OS"]) + " "+ dis["OS"] + " | " + dis["isp"]
$$('mydev').getElementsByClassName('ip')[0].innerHTML = '<i class="bx bx-wifi"></i> '+dis["ip"]
$$('mydev').getElementsByClassName('time')[0].innerHTML ='<i class="bx bx-time-five"></i> '+ moment(dis["ts"],"X").format("YYYY-MM-DD hh:mm:ss")
$$('mydev').getElementsByClassName('location')[0].innerHTML ='<i class="bx bxs-map-pin"></i>  '+(dis["location"]).replace("|","<br>")
$$('mydev').getElementsByClassName('brow')[0].innerHTML ='<i class="bx bx-globe"></i>  '+dis["browser"]
if((dis["ismob"]).toString()=="true"){
    console.log("mm")
    $$('mydev').getElementsByTagName('img')[0].src = 'assets/img/elements/iphone14-pro.png'

} else {
    $$('mydev').getElementsByTagName('img')[0].src = 'assets/img/elements/mac-book-air.png'

}

} catch (error) {
    console.log(error)
    //document.write("You are not allowed to use this page at this time.Please Try again later! \n Redirecting you to home in 10 seconds")
    //setTimeout(location.replace("/"),10000)
}

var array = Object.keys(xz)
for (let i = 0; i < array.length; i++) {
    const d = array[i];
const e = xz[d]
console.log(d,e)
if(d!=thisdz){
    if(e["OS"]!=null&&!((added).includes(d))){
        added.push(d)
    console.log(e["OS"])
    clzcd = $$("mydev")
    clone = clzcd.cloneNode(true);
    clone.id = ""
    clone.getElementsByClassName('name')[0].innerHTML = getico(e["OS"]) + " "+ e["OS"] + " | " + e["isp"]
    clone.getElementsByClassName('ip')[0].innerHTML = '<i class="bx bx-wifi"></i> '+e["ip"]
    clone.getElementsByClassName('time')[0].innerHTML ='<i class="bx bx-time-five"></i> '+ moment(e["ts"],"X").format("YYYY-MM-DD hh:mm:ss")
    clone.getElementsByClassName('location')[0].innerHTML ='<i class="bx bxs-map-pin"></i>  '+(e["location"]).replace("|","<br>")
    clone.getElementsByClassName('brow')[0].innerHTML ='<i class="bx bx-globe"></i>  '+e["browser"]
    if((e["ismob"]).toString()=="true"){

        clone.getElementsByTagName('img')[0].src = 'assets/img/elements/iphone14-pro.png'
    
    } else {
        clone.getElementsByTagName('img')[0].src = 'assets/img/elements/mac-book-air.png'
    
    }
    clone.getElementsByClassName('inso')[0].id = d

clone.getElementsByClassName('inso')[0].innerHTML = "<button onclick='term(this.id)' id='"+d+"' class='btn btn-sm btn-primary'>Terminate Session</button>"

    $$('father').appendChild(clone)

} else{
    console.log("terminated")
}}
    
}
 
    }
    var uid = user.uid
var tt = localStorage.authid

try {
    var thisdz = CryptoJS.AES.decrypt(localStorage.getItem("lux"),tt).toString(CryptoJS.enc.Utf8)
} catch (error) {
    console.log(error)
    //document.write("You are not allowed to use this page at this time.Please Try again later! \n Redirecting you to home in 5 seconds")
    //setTimeout(location.replace("/"),5000)
}
firebase.database().ref("sessions/"+uid).on('value', snap => thisd(snap.val()))})

function term (thz){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, terminate!'
      }).then((result) => {
        if (result.isConfirmed) {
            console.log(thz)
            firebase.database().ref("sessions/"+uid+"/"+thz).set({
                term:"Y"
            }).then((x)=>{
               location.reload()
            })

        }
      })
  
}
fetch('https://ipapi.co/json/').catch((x)=>{
    document.write("<iframe src='404.html' style='height:100%;width:100%;' ></iframe>")
   })