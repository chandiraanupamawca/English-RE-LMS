
  function validp(paramid) {
    console.log(uid+"|||"+cid+"|||"+moment(time).local().format('MM')+"|||"+siid)
    if(paramid=='payhere'){
      var payment = {
        "sandbox": true,
        "merchant_id": "1220889",    // Replace your Merchant ID
        "return_url": "https://lms.lankaedu.tk/view-class",     // Important
        "cancel_url": "https://lms.lankaedu.tk/view-class",     // Important
        "notify_url": "https://server-05.lankaedu.tk/notify",
        "order_id": "PH"+cid+"UID"+siid+"MID"+moment(time).local().format('MM'),
        "items": classtopic,
        "amount": (parseInt(mfeeval)*2.69/100+parseInt(mfeeval)).toFixed(2),
        "currency": "LKR",
        "first_name": localStorage.fn,
        "last_name": localStorage.ln,
        "email": localStorage.em,
        "phone": localStorage.pn,
        "address": localStorage.ad,
        "city": "Matara",
        "country": "Sri Lanka",
        "delivery_address": "",
        "delivery_city": "Matara",
        "delivery_country": "Sri Lanka",
        "custom_1": btoa(btoa(uid+"|||"+cid+"|||"+moment(time).local().format('MM')+"|||"+siid)),
        "custom_2": (parseInt(mfeeval)*2.69/100+parseInt(mfeeval)).toFixed(2)+"|||"+localStorage.tname+"|||"+classtopic+"|||"+localStorage.cyear+"|||"+localStorage.stname+"|||"+siid
    };
      document.getElementsByClassName('cutfee')[1].innerText= (parseInt(mfeeval)*2.69/100).toFixed(2)+ " LKR"
      document.getElementsByClassName('tota')[1].innerText =(parseInt(mfeeval)*2.69/100+parseInt(mfeeval)).toFixed(2)+ " LKR"
      document.getElementsByClassName('paybypayhere')[1].onclick = function (){ payhere.startPayment(payment);
      }
    } else {
      console.log('elsing')
      document.getElementsByClassName('cutfee')[1].innerText= 0+ " LKR"
      document.getElementsByClassName('tota')[1].innerText =mfeeval+ " LKR"
      document.getElementsByClassName('paybypayhere')[1].onclick = function (){ console.log("elpay")
      }
  
    }
  }
  function thenpay (vals) {
  if(vals!=null){
      mfeeval = vals["rs"]
      $$('fee2').innerText = parseInt(vals["rs"]).toFixed(2)+ " LKR"
      $$('cutfee').innerText = (parseInt(vals["rs"])*2.69/100).toFixed(2)+ " LKR"
      $$('tota').innerText =(parseInt(vals["rs"])*2.69/100+parseInt(vals["rs"])).toFixed(2)+ " LKR"
      $('#notpayalert').fadeIn()
      console.log(vals)
      $$('mfee').innerText=vals["rs"] + " LKR"
      console.log(  $$('mfee').innerText)
      $$('notpayalert').style.display='block'
  
  } else{
      $$('notpayalert').style.display='none'
  
  }
  }
  
  
