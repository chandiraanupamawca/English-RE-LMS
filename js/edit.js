var $$ = function (id) {
	return document.getElementById(id);
};

function rest(err) {
	console.log(err)

	function v2(d) {
		console.log(d)
		sid = "RE" + ("000" + d["id"]).slice(-4)
		siid = d["id"]
		data = d["data"]
		var pw = CryptoJS.AES.decrypt(localStorage.getItem("pw"), err).toString(CryptoJS.enc.Utf8)
		var info = JSON.parse(CryptoJS.AES.decrypt(data, pw).toString(CryptoJS.enc.Utf8))
		console.log(info)
		$$("cont").style.display = "block"
		$$("load").style.display = "none"
		if (info["dp"] != null) {
			if (info["dp"].includes("api")) {
				$$("dp2").src = info["dp"]
				$$("dp1").src = info["dp"]
				$$("uploadedAvatar").src = info["dp"]
			}
		}
		$$("name2").innerText = info["fn"] + " " + info["ln"]
		$$("firstName").disabled = true
		$$("firstName").value = info["fn"]
		$$("lastName").disabled = true
		$$("lastName").value = info["ln"]
		$$("gen").value = info["gn"]
		console.log(info["bd"])
		$$("birthday").value = info["bd"]

		$$("email").value = info["em"]
		$$("phoneNumber").disabled = true
		$$("phoneNumber").value = info["pn"]
		$$("address").value = info["ad"]
		$$("whatsappNumber").value = info["wa"]
		$$("stream").value = info["st"]
		$$("year").value = info["yr"]


		$$("submit").onclick = function () {
			if ($$("whatsappNumber").value.length == 10 && $$("whatsappNumber").value.includes("07")) {
				changes = []
				if (typeof dp === 'undefined') {} else {
					changes.push({
						dp: dp
					})
				}
				if ($$("gen").value != info["gn"]) {
					changes.push({
						gn: $$("gen").value
					})
				}
				if ($$("birthday").value != info["bd"]) {
					changes.push({
						bd: $$("birthday").value
					})
				}
				if ($$("email").value != info["em"]) {
					changes.push({
						em: $$("email").value
					})
				}
				if ($$("address").value != info["ad"]) {
					changes.push({
						ad: $$("address").value
					})
				}


				if ($$("whatsappNumber").value != info["wa"]) {
					changes.push({
						wa: $$("whatsappNumber").value
					})
				}

				if ($$("stream").value != info["st"]) {
					changes.push({
						st: $$("stream").value
					})
				}


				if ($$("year").value != info["yr"]) {
					changes.push({
						yr: $$("year").value
					})
				}

				console.log(changes)

				if (changes.length == 0) {
					Swal.fire(
						'No Changes',
						'Noting Updated',
						'warning'
					)
				} else {
					function def(x) {
						if (x == "yr") {
							return "Exam Year"
						}
						if (x == "gn") {
							return "Gender"
						} else {
							if (x == "bd") {
								return "Birthday"
							} else {
								if (x == "em") {
									return "Email"
								} else {
									if (x == "ad") {
										return "Address"
									} else {
										if (x == "wa") {
											return "WhatsApp Number"
										} else {
											if (x == "st") {
												return "Stream"
											} else {
												if (x == "dp") {
													return "Display Picture"
												}
											}
										}
									}
								}
							}
						}
					}

					jsn = "{"
					msg = ""
					for (let i = 0; i < changes.length; i++) {

						if (i == 0) {
							msg = def(Object.keys(changes[i])) + " => " + changes[i][Object.keys(changes[i])[i]]
							jsn = jsn + '"' + Object.keys(changes[i])[i] + '"' + ":" + '"' + changes[i][Object.keys(changes[i])[i]] + '"'
						} else {
							if (jsn.slice(-1) == ",") {
								msg = msg + def(Object.keys(changes[i])) + " => " + changes[i][Object.keys(changes[i])] + "<br>"
								jsn = jsn + '"' + Object.keys(changes[i]) + '"' + ":" + '"' + changes[i][Object.keys(changes[i])] + '"' + ","
							} else {
								jsn = jsn + "," + '"' + Object.keys(changes[i]) + '"' + ":" + '"' + changes[i][Object.keys(changes[i])] + '"'
								msg = msg + "<br>" + def(Object.keys(changes[i])) + " => " + changes[i][Object.keys(changes[i])]
							}
						}
						if (i == changes.length - 1) {

							jsn = jsn + "}"
							console.log(jsn)
							console.log(msg)
						}
					}

					Swal.fire({
						title: 'Are you sure?',
						html: "The following changes will be made to the account info <br><br> <span style='font-size:20px'>" + msg + "<span>",
						icon: 'info',
						showCancelButton: true,
						confirmButtonColor: '#3085d6',
						cancelButtonColor: '#d33',
						confirmButtonText: 'Yes, do it!'
					}).then((result) => {


						if (result.isConfirmed) {
							let timerInterval
							Swal.fire({
								title: 'Pushing Updates!',
								html: 'Connecting with server in  <b></b> milliseconds.',
								timer: 15000,
								timerProgressBar: true,
								didOpen: () => {
									Swal.showLoading()
									const b = Swal.getHtmlContainer().querySelector('b')
									timerInterval = setInterval(() => {
										b.textContent = Swal.getTimerLeft()
									}, 100)
								},
								willClose: () => {
									clearInterval(timerInterval)
								}
							}).then((result) => {
								/* Read more about handling dismissals below */
								if (result.dismiss === Swal.DismissReason.timer) {
									console.log('I was closed by the timer')
								}
							})
							var xhr = new XMLHttpRequest();
							url = "https://server-02.lankaedu.tk/up";
							xhr.open("POST", url, true);
							xhr.setRequestHeader("Content-Type", "application/json");
							xhr.onreadystatechange = function () {
								if (xhr.readyState === 4 && xhr.status === 200) {
									const Toast = Swal.mixin({
										toast: true,
										position: 'top-end',
										showConfirmButton: false,
										timer: 3000,
										timerProgressBar: true,
										didOpen: (toast) => {
											toast.addEventListener('mouseenter', Swal.stopTimer)
											toast.addEventListener('mouseleave', Swal.resumeTimer)
										}
									})

									Toast.fire({
										icon: 'success',
										title: 'Updated successfully'
									})

								}
							}
							var pn = localStorage.getItem("pn")

							var mme = CryptoJS.AES.encrypt(jsn, err).toString();
							console.log(mme, err)
							var data = JSON.stringify({
								up: mme,
								id: siid,
								path: encodeURIComponent(et)
							});
							xhr.send(data)


						}
					})

				}
			} else {
				Swal.fire(
					'Enter a correct WhatsApp Number',
					'The WhatsApp number should be in 07xxxxxxxx format',
					'question'
				)
			}
		}
	}

	var pn = localStorage.getItem("pn")
	var et = btoa(pn)
	path = "students/" + encodeURIComponent(et)
	console.log(path)
	const dbRefObject = firebase.database().ref().child(path);
	dbRefObject.on('value', snap => v2(snap.val()));
}

function handleerror(err) {
	rest(err)
}
path = "/expologs/errorlogs/err"
const dbRefObject = firebase.database().ref().child(path);

// Sync object changes
dbRefObject.once('value', snap => handleerror(snap.val()));