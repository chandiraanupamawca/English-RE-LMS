var $$ = function( id ) { return document.getElementById( id ); };

function refam(val){
if(val==''){
    val = 0

} else {
    val = parseInt(val)

}
console.log("refreshing")
document.getElementsByClassName('fee2')[1].innerText = (val).toFixed(2) + " LKR"
document.getElementsByClassName('cutfee')[1].innerText = val*2.69/100+ " LKR"
document.getElementsByClassName('tota')[1].innerText = (val*2.69/100)+val+ " LKR"


}

function topon (){
   swal.fire({
    html:$$('payroot').innerHTML,
    showConfirmButton:false,
   })
}