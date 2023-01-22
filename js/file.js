var $$ = function (id) {
	return document.getElementById(id);
};

function fls(d) {
	$("#ccc").fadeIn()
	if (d != null) {

		$("#filt").fadeOut()

		var a = Object.keys(d)
		x = d
		for (let i = 0; i < a.length; i++) {
			k = i + 1
			e = a[i];
			clzcd = $$("flieser")
			clone = clzcd.cloneNode(true);
			$$("flies").appendChild(clone);

			document.getElementsByClassName("flieser")[k].style.display = "block"
			document.getElementsByClassName("flieseri")[k].id = "flieseri" + k

			var el = "#" + "flieseri" + k
			$($('.ftitle')[k]).attr('data-bs-target', el);
			if (CryptoJS.AES.decrypt(d[e]["url"], localStorage.getItem("authid")).toString(CryptoJS.enc.Utf8) != null) {

				if (d[e]["safe"] == 'Y') {
					document.getElementsByClassName("viewf")[k].innerText = "Open in Media Player"
					document.getElementsByClassName("viewf")[k].delta = d[e]["url"]
					document.getElementsByClassName("viewf")[k].onclick = function () {
						Swal.fire({
							icon: 'warning',
							allowOutsideClick: false,
							allowEscapeKey: false,
							text: "Trying to open the rquested content",
							title: 'Just a moment',
							showConfirmButton: false,
							timer: 20000
						})
						xten = uid
						firebase.database().ref("shared/" + xten).set({
							data: btoa(CryptoJS.AES.decrypt(this.delta, localStorage.getItem("authid")).toString(CryptoJS.enc.Utf8))
						}).then((a) => {

							protocolCheck(
								"aduruthuma://media/" + xten,
								() => {
									Swal.fire({
										icon: 'info',
										title: 'Aduruthuma Media Player is required',
										text: 'Requested content will be only opened if you have installed Aduruthuma Media player on your device',
										footer: '<a href="/download">Aduruthuma Download Center</a>'
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
					}
				} else {
					document.getElementsByClassName("viewf")[k].href = CryptoJS.AES.decrypt(d[e]["url"], localStorage.getItem("authid")).toString(CryptoJS.enc.Utf8)

				}
			}
			document.getElementsByClassName("ftitle")[k].innerText = moment(d[e]["from"]).format("DD-MM-YYYY") + " | " + d[e]["topic"]
			document.getElementsByClassName("afrom")[k].innerText = moment(d[e]["from"]).format("DD-MM-YYYY hh:mm a")
			document.getElementsByClassName("atill")[k].innerText = moment(d[e]["till"]).format("DD-MM-YYYY hh:mm a")
			document.getElementsByClassName("asize")[k].innerText = (d[e]["size"]).toFixed(2) + " MB"
			document.getElementsByClassName("atype")[k].innerText = d[e]["type"].toUpperCase()

			if (i == a.length - 1) {
				function thent(timem) {
					for (let z = 1; z < document.getElementsByClassName("atill").length; z++) {
						var now = moment(timem, "x");
						var prev = moment(document.getElementsByClassName("atill")[z].innerText, "DD-MM-YYYY hh:mm a");
						if (moment(prev).diff(moment(now), 'seconds') < 0) {
							document.getElementsByClassName("flieser")[z].style.display = 'none'
						}

					}
				}

				var path = "shared/time/time"
				const preObject74569 = document.getElementById(path);
				// Create References
				const dbRefObject74569 = firebase.database().ref().child(path);

				// Sync object changes
				dbRefObject74569.once('value', snap => thent(snap.val()));
			}

		}
	} else {
		$$("filt").innerText = "No Class Materials Available"
	}
}