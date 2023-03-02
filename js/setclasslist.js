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