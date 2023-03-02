var myclazz = JSON.parse(localStorage.getItem("myclzz"));
var clzdata = JSON.parse(localStorage.getItem("clzdata"));
    list = ''
	// console.log(myclazz)
	var cids = Object.keys(myclazz)
	for (let c = 0; c < cids.length; c++) {
		const e = cids[c];
		const currentclz = myclazz[e]
        currentclzid = currentclz[Object.keys(currentclz)[0]]["cid"]
		// console.log(currentclz)
        newitem = '<li class="menu-item sht" href="#" id="' + currentclzid + '||' + clzdata[currentclzid].info.pn + '" onclick="stck(this.id)"><a class="menu-link"><div data-i18n="Without menu">' + currentclz[Object.keys(currentclz)[0]]["cname"] + '</div></a></li>'
		list = list + newitem
	}
document.getElementById('ulclz').innerHTML = list


		function  launch2 (it){
		  for (let c = 0; c <  document.getElementsByClassName('sht').length; c++) {
		  const e =  document.getElementsByClassName('sht')[c];
		 e.className = (e.className).replace("active",'')
		 }
		  document.getElementById(it).className = document.getElementById(it).className + " active"
		
		cid  = it.split("||")[0]
		tid  = it.split("||")[1]
		localStorage.setItem("nclz",cid)
		localStorage.setItem("tp",tid)
		vhtml = null
		if(vhtml!=null || vhtml!=undefined){
		
		window.history.pushState("object or string", "Title", "/view-class");
		
		if(!((  document.getElementById('mclass').className).includes('active'))){
		document.getElementById('mclass').className= document.getElementById('mclass').className + " active"}
		document.getElementById('mdlink').href = "#"
		document.getElementById('mdlink').onclick = function (){history.back()
		
		for (let c = 0; c <  document.getElementsByClassName('sht').length; c++) {
		  const e =  document.getElementsByClassName('sht')[c];
		 e.className = (e.className).replace("active",'')
		 }
		document.getElementById('mclass').className = (document.getElementById('mclass').className).replace("active",'')
		if(!((  document.getElementById('mdash').className).includes('active'))){
		document.getElementById('mdash').className= document.getElementById('mdash').className + " active"}
		}
		document.getElementById('mdash').className = (document.getElementById('mdash').className).replace("active",'')
		document.body.scrollTop = 0; // For Safari
		document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
		$$('viewroot').innerHTML = vhtml
		
		viewclass()
		slipsjs()
		
		$('#viewroot').fadeIn()
		
		$('#cont').fadeOut()
		window.onpopstate = function() {
		
		window.history.pushState("object or string", "Title", "/");
		
		var array = document.getElementsByClassName('menu-item open')
		for (let b = 0; b < array.length; b++) {
		const e = array[b];
		e.className = (e.className).replace("open",'')
		}
		for (let c = 0; c <  document.getElementsByClassName('sht').length; c++) {
		  const e =  document.getElementsByClassName('sht')[c];
		 e.className = (e.className).replace("active",'')
		 }
		document.getElementById('mclass').className = (document.getElementById('mclass').className).replace("active",'')
		if(!((  document.getElementById('mdash').className).includes('active'))){
		document.getElementById('mdash').className= document.getElementById('mdash').className + " active"}
		  $('#viewroot').fadeOut()
		  $('#cont').fadeIn()
		  function asx (){
		    document.title = "Student - English RE"
		  }
		  setTimeout(asx,600)
		
		}
		
		
		} else {
		window.location.href = "view-class.html"
		} 
		
		
		
		} 
		function stck (id){
		launch2(id)
		}