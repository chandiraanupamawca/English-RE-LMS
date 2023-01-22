iii = 0
function promojs(){
    remoteConfig.fetchAndActivate()
  .then((x) => {

    var val = remoteConfig.getValue("promo");
    var im = remoteConfig.getValue("urls");
    val = val["_value"]
    im = JSON.parse(im["_value"])
    console.log(im)
    console.log(val == 'true')
    function promote (){
        if(val == 'true'){
if(iii<im.length-1){
    iii =iii +1   ;

} else{
    iii = 0
}
              const url = im[iii];
              $$('dash').innerHTML = '<img class="img-fluid rounded "  src='+url+'>'
           
        $('#dash').fadeIn()
          
          
          
             }
    }
    if(val == 'true'){
    $('#dash').fadeOut()

    promote()
setInterval(promote,7000)}
  })
  .catch((err) => {
    // ...
  });

}

