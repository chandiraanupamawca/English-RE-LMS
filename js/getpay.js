var $$ = function (id) {
	return document.getElementById(id);
};

function openit(y) {
	intab = $$('invs').getElementsByClassName('intab')[0]
	var tl = intab.rows.length;
	for (let i = 0; i < tl - 1; i++) {
		intab.deleteRow(-1);
	}
	var zid = y.split("&")[0]
	var miid = y.split("&")[1]
	console.log(zid, miid)
	var ex = load[zid][miid]
	$$('invs').getElementsByClassName('inno')[0].innerText = (ex["md"].substring(0, 2)).toUpperCase() + "-" + ex["sid"] + "C" + ex["cid"] + "-" + "M" + ex["mid"]
	$$('invs').getElementsByClassName('ts')[0].innerText = moment(new Date(parseInt(ex["ts"]) * 1000)).format("YYYY-MM-DD hh:mm:ss a")

	if (ex["pay"] == 'ok') {

		$$('invs').getElementsByClassName('sts')[0].innerHTML = '<span style="font-size:20px;"  class="badge bg-label-success me-1">Approved</span>'

	} else {
		$$('invs').getElementsByClassName('sts')[0].innerHTML = '<span style="font-size:20px;" class="badge bg-label-danger me-1">Rejected</span>'


	}
	$$('invs').getElementsByClassName('ful')[0].innerText = ex["stname"]
	$$('invs').getElementsByClassName('siid')[0].innerText = "RE" + ("000" + ex["sid"]).slice(-4)
	$$('invs').getElementsByClassName('ad')[0].innerText = localStorage.ad
	$$('invs').getElementsByClassName('em')[0].innerText = localStorage.em
	$$('invs').getElementsByClassName('pn')[0].innerText = localStorage.pn
	$$('invs').getElementsByClassName('usid')[0].innerText = ex["uid"]
	table = intab
	var row = table.insertRow(-1);
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	var cell3 = row.insertCell(2);
	var cell4 = row.insertCell(3);
	var cell5 = row.insertCell(4);
	cell1.innerHTML = ex["cname"]
	cell2.innerHTML = ex["cid"]
	cell3.innerHTML = ex["mid"]
	cell4.innerHTML = ex["md"]
	cell5.innerHTML = parseInt(ex["fee"]).toFixed(2)
	var row2 = table.insertRow(-1);
	var cell1 = row2.insertCell(0);
	var cell2 = row2.insertCell(1);
	var cell3 = row2.insertCell(2);
	var cell4 = row2.insertCell(3);
	var cell5 = row2.insertCell(4);
	cell4.innerHTML = ' <h5 class="text-primary fw-bold"> SUB TOTAL :</h5>'

	cell5.innerHTML = ' <h5 class="text-primary fw-bold"> ' + parseInt(ex["fee"]).toFixed(2) + '</h5>'

	x = window.open("invoice.html", "MsgWindow", "width=900,height=700")
	x.onload = function () {
		x.document.getElementById('cont').innerHTML = $$('invs').innerHTML
		x.document.getElementById('invs').style.display = ''
	}
}

function getpay(en) {
	load = en
	console.log(en)
	var cids = Object.keys(en)
	for (let c = 0; c < cids.length; c++) {
		const e = cids[c];
		const el = en[e]
		console.log(el)
		clzcd = $$("paytab")
		clone = clzcd.cloneNode(true);
		$$('parentz').appendChild(clone)
		clone.style.display = ''
		clone.getElementsByClassName('clzname')[0].innerHTML = el[Object.keys(el)[0]]["cname"] + " | " + el[Object.keys(el)[0]]["cid"]
		var s = Object.keys(el)
		for (let b = 0; b < s.length; b++) {
			const e = s[b];
			const ex = el[e]
			console.log(ex)
			var table = clone.getElementsByClassName('paytab')[0]
			var row = table.insertRow(-1);
			var cell1 = row.insertCell(0);
			var cell2 = row.insertCell(1);
			var cell3 = row.insertCell(2);
			var cell4 = row.insertCell(3);
			var cell5 = row.insertCell(4);
			var cell6 = row.insertCell(5);
			cell1.innerHTML = ' <strong>' + (ex["md"].substring(0, 2)).toUpperCase() + "-" + ex["sid"] + "C" + ex["cid"] + "-" + "M" + ex["mid"] + '</strong>'
			cell2.innerHTML = ex["md"].toUpperCase()
			cell3.innerHTML = "Rs. " + parseInt(ex["fee"]).toFixed(2)
			cell4.innerHTML = moment(new Date(parseInt(ex["ts"]) * 1000)).format("YYYY-MM-DD hh:mm:ss a")
			if (ex["pay"] == 'ok') {

				cell5.innerHTML = '<span class="badge bg-label-primary me-1">Approved</span>'

			} else {
				cell5.innerHTML = '<span class="badge bg-label-danger me-1">Rejected</span>'

			}
			cell6.innerHTML = ' <div class="d-flex align-items-center">' +
				'<a href="javascript:;" onclick="openit(this.id)" data-bs-toggle="tooltip" class="text-body viewi" data-bs-placement="top" title="" data-bs-original-title="View Invoice" aria-label="View Invoice"><i class="bx bx-show mx-1"></i></a>' +
				'<a href="javascript:;" data-bs-toggle="tooltip" class="text-body" data-bs-placement="top" title="" data-bs-original-title="Download" aria-label="Download"><i class="bx bx-download mx-1"></i></a>'
			cell6.getElementsByClassName('viewi')[0].id = ex["cid"] + "&" + ex["mid"]

		}
	}
}
firebase.auth().onAuthStateChanged((user) => {
	if (localStorage.getItem("pw") == null) {
		localStorage.clear()
		firebase.auth().signOut()
		location.replace("login.html")
	}


	if (user) {
		// User is signed in, see docs for a list of available properties
		// https://firebase.google.com/docs/reference/js/firebase.User
		uid = user.uid;
		firebase.database().ref('enroll/' + uid).once('value', snap => getpay(snap.val()))
		// ...
	} else {
		location.replace("login")
		// User is signed out
		// ...
	}
});