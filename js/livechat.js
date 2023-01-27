//<![CDATA[

  const Toastz = Swal.mixin({
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

        var tags = [
 
        ];
    
        function customTagRender () {
          
          $('#ui-control').prepend('<div id="custom-input">Custom input! Practically, this would be a clickable map or image, or virtually anything that you can code up. Click the big button below to submit</div>');
        
          //This custom data would be set by user interaction in the real world
          window.customData = "the possibilities are endless!";
        } 

        function openchart(){
    
       
          Chat.start($('#chat-context'), tags);
          $$('ui-control').outerHTML ='<div id="ui-response" class=""><input id="response-text" placeholder="Type your message" requireds><div id="ui-submit"><i class="fas fa-arrow-up"></i></div></div>'
          $$('ui-submit').onclick = function (){

            if($$('response-text').value!=''){

firebase.database().ref("livechat/"+cid+"/"+Math.floor(Date.now() / 1000)).set({
msg:$$('response-text').value,
ts:moment().format("YYYY-MM-DD hh:mm:ss a"),
dp:localStorage.getItem('dp') || "none",
name:localStorage.getItem('stname') || "Anonymous",
sid:siid
}).then((x)=>{

Toastz.fire({
  icon: 'success',
  title: 'Message sent successfully'
})

})

            } else{
              if($$('response-text').value==''){
              swal.fire(
                "Can not send empty message",
                "Please enter the message",
                "warning"
              )}
            }
$$('response-text').value=''

          }
          $$('response-text').addEventListener("keypress", function(event) {
            // If the user presses the "Enter" key on the keyboard
            if (event.key === "Enter") {
              // Cancel the default action, if needed
              event.preventDefault();
              // Trigger the button element with a click
              document.getElementById("ui-submit").click();
            }
          });
        }
        
  
        
        
            
            //,name,url,ts
        function adleft (msg,name,src,ts){
          e = document.createElement('div')
          $$('chat').appendChild(e)
        if(src==null||src=="none"){
          src = "../assets/img/avatars/1.png"
        }
          e.outerHTML = `<div class='chat-response robot' style='display: block; opacity: 1;'><div class=" row"><div class='col-sm-3' ><img class=' h-px-30 w-px-30 rounded-circle ' src=${src}></div><span class='fw-bold text-primary  col'>${name}</span></div><p style='padding-top:3px;' class=' '>${msg}</p><small>${ts}</small><div class='add-content'></div></div>`
          $(e).addClass('background').attr('data-content','url("ac")');
        }
        function adright (msg,name,src,ts,id){
          if(src==null||src=="none"){
            src = "../assets/img/avatars/1.png"
          }
          e = document.createElement('div')
          $$('chat').appendChild(e)
 
          e.outerHTML = `<div class='chat-response user' style='display: block; opacity: 1;'><div class=" row"><div class='col-sm-3' ><img class=' h-px-30 w-px-30 rounded-circle ' src=${src}></div><span class='fw-bold   col'>You</span></div><p style='padding-top:3px;' class=' '>${msg}</p><small>${ts}</small> &nbsp;&nbsp;<button type="button" class="btn btn-icon rounded active btn-sm btn-danger" id=${id} onclick="removemsg(this.id)">  <span class="tf-icons bx bxs-message-alt-x"></span>  </button><div class='add-content'></div></div>`
    
        
    
        }
          //]]>

          function livechat (zx){

        
  
            if(zx!=null){
var za = Object.keys(zx)
var arrayz = document.getElementsByClassName("chat-response")
for (let a = 0; a < arrayz.length; a++) {
  const e = arrayz[a];
  e.style.display='none'
}

adleft("<span class='fw-bold text-primary'>Hello " + localStorage.getItem("fn") + "!</span> <br>Use this chat room to seek help from your colleagues in Subject Matters. <br>Hope you behave in accordance with Aduruthuma Code of Ethics. <br> HTML & Bootstrap stylings are supported!<br> <b>English RE 🥳</b>","","assets/img/icon.png","Thank You!")


for (let v = 0; v < za.length; v++) {
  const e = za[v];
  const b = zx[e]
  if(parseInt(b["sid"])!=parseInt(siid)){
  adleft((b["msg"]).replaceAll("<style>",'').replaceAll("</style>",''),b["name"],b["dp"],b["ts"])} else{
    adright((b["msg"]).replaceAll("<style>",'').replaceAll("</style>",''),b["name"],b["dp"],b["ts"],za[v])
  }
  $$('chat').scrollTo(0,$$('chat').scrollHeight)
}

            } else{
              var arrayz = document.getElementsByClassName("chat-response")
for (let a = 0; a < arrayz.length; a++) {
  const e = arrayz[a];
  e.style.display='none'
}
adleft("<span class='fw-bold text-primary'>Hello " + localStorage.getItem("stname") + "!</span> <br>Use this chat room to seek help from your colleagues in Subject Matters. <br>Hope you behave in accordance with Aduruthuma Code of Ethics. <br> HTML & Bootstrap stylings are supported!<br> <b>English RE 🥳</b>","","assets/img/icon.png","Thank You!")

            }
          }

function removemsg(id){
firebase.database().ref("livechat/"+cid+"/"+id).set({}).then((x)=>{
  
  Toastz.fire({
    icon: 'success',
    title: 'Message deleted successfully'
  })
})
}