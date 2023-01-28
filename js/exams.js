var $$ = function (id) {
	return document.getElementById(id);
};

function getCookie(cname) {
	let name = cname + "=";
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(';');
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

function setCookie(cname, cvalue, exdays) {
	const d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	let expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function examsq(d) {
	$("#ccc").fadeIn()
	console.log(d)
	if (d != null) {
		$("#extext").fadeOut()
		var a = Object.keys(d)
		x = d
		for (let i = 0; i < a.length; i++) {
			io = i + 1
			e = a[i];
			clzcd = $$("exmser")
			clone = clzcd.cloneNode(true);
			$$("exxams").appendChild(clone);

			document.getElementsByClassName("exmser")[io].style.display = "block"
			document.getElementsByClassName("exmseri")[io].id = "exmseri" + io

			var el = "#" + "exmseri" + io
			$($('.extitle')[io]).attr('data-bs-target', el);

			document.getElementsByClassName("extitle")[io].innerText = d[e]["topic"]
			document.getElementsByClassName("exfr")[io].innerText = moment(d[e]["start"]).format("DD-MM-YYYY hh:mm a")
			document.getElementsByClassName("exti")[io].innerText = moment(d[e]["end"]).format("DD-MM-YYYY hh:mm a")
			document.getElementsByClassName("exdu")[io].innerText = d[e]["dur"]
			document.getElementsByClassName("exdes")[io].innerText = d[e]["des"]
			document.getElementsByClassName("exchr")[io].id = a[i]
			document.getElementsByClassName("exchr")[io].exname = d[e]["topic"]

			if (i == a.length - 1) {
				function thent(timem) {
					console.log(timem)
					for (let z = 1; z < document.getElementsByClassName("atill").length; z++) {
						var now = moment(timem, "x");
						var prev = moment(document.getElementsByClassName("atill")[z].innerText, "DD-MM-YYYY hh:mm a");
						if (moment(prev).diff(moment(now), 'seconds') < 0) {
							document.getElementsByClassName("exmser")[z].style.display = 'none'
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
		$$("filt").innerText = "No Class Materials"

	}
}

function startex(thisid, exname) {
	function push() {

		var token = btoa("cid" + cid + "exid" + thisid)

		tid = localStorage.getItem("tp")
		tt = localStorage.getItem("authid")
		var data = JSON.stringify({
			sid: siid,
			cid: cid,
			pn: tid,
			exid: thisid
		});
		encrypted = CryptoJS.AES.encrypt(data, tt);

		let timerInterval
		Swal.fire({
			title: 'Be confident! You can do it 🥳',
			html: 'Please Wait. We respond you in <b></b> milliseconds.',
			timer: 10000,
			timerProgressBar: true,
			allowEscapeKey: false,
			allowEnterKey: false,
			allowOutsideClick: false,
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
				alert("Runtime Error")
			}
		})

		var xhr2 = new XMLHttpRequest();


		var url2 = "https://server-07.lankaedu.tk/getex";
		xhr2.open("PATCH", url2, true);
		xhr2.setRequestHeader("Content-Type", "application/json");

		xhr2.onreadystatechange = function () {
			if (xhr2.readyState === 4 && xhr2.status === 200) {
				console.log(xhr2.response)
				if (xhr2.response == "Class fees not paid") {
					Swal.fire({
						icon: 'warning',
						title: 'Class Fees Not Paid!',
						text: "Please pay Class fees to access this Exam"
					})
				} else {
					if ((xhr2.response).includes('firebasestorage.googleapis.com')) {

						setCookie(cid + thisid, CryptoJS.AES.encrypt(xhr2.responseText, localStorage.getItem('authid')).toString(), 2)

						window.location.href = 'mcq-exam' + "?token=" + token

					} else {
						Swal.fire({
							icon: 'warning',
							title: 'Unable to enroll the exam',
							text: xhr2.response,
							footer: '<a href="tel:0787134053">Support Hotline</a>'
						})
					}
				}
			}
		}
		out = JSON.stringify({
			tk: '"' + encrypted + '"'
		})
		if (getCookie(cid + thisid) == '') {
			xhr2.send(out);

		} else {
			console.log(getCookie(cid + thisid))
			window.location.href = 'mcq-exam' + "?token=" + token

		}
	}

	function precheck(input) {
		if (input == null) {
			push()
		} else {
			if (input["res"] == null) {
				push()
			} else {
				var w = screen.width;
				var h = screen.height;
				var left = Number((screen.width / 2) - (w / 2));
				var tops = Number((screen.height / 2) - (h / 2));

				var x = window.open("mcq-results.html", '', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + tops + ', left=' + left);
				x.onload = function () {
					console.log(input)
					var $$$ = function (id) {
						return x.document.getElementById(id);
					};
					swal.close()
					$$$('mname').innerText = exname
					$$$('cname').innerText = classtopic
					$$$('mcqpdf').src = input["info"]["url"]
					$$$('sidd').innerText = "RE" + ("000" + input["info"]["sid"]).slice(-4)
					$$$('stname').innerText = input["info"]["stname"]
					$$$('oss').innerText = (input["info"]["device"]).toString().toUpperCase()
					$$$('startt').innerText = moment(input["info"]["start"], "x").format("YYYY MMMM DD hh:mm:ss a")
					$$$('endd').innerText = moment(input["info"]["end"], "x").format("YYYY MMMM DD hh:mm:ss a")
					if (input["info"]["focus"] == 'false') {
						$$$('focuss').innerHTML = '  <span class="badge bg-label-danger rounded-pill">bad</span>'
					}
					$$$('fullt').innerText = parseFloat(input["info"]["marks"]) * 100 + "%"
					$$$('hell').innerText = "Final Score : " + parseFloat(input["info"]["marks"]) * 100 + "%"
					var pass = input["res"]["pass"]
					var fail = input["res"]["fail"]
					var empty = input["res"]["empty"]
					var table = $$$('ress')

					var marks = []

					var all = JSON.parse(pass).length + JSON.parse(fail).length + JSON.parse(empty).length
					console.log(all)
					for (let i = 1; i < all + 1; i++) {
						var row = table.insertRow(-1);

						var cell1 = row.insertCell(0);
						cell1.innerHTML = `<b>Question ${i}</b>`
						var cell2 = row.insertCell(1);
						if (pass.includes('Q' + i)) {
							cell2.innerHTML = '<span class="badge bg-label-success rounded-pill">Correct</span>'
						} else {
							if (fail.includes('Q' + i)) {
								cell2.innerHTML = '<span class="badge bg-label-danger rounded-pill">Wrong</span>'
							} else {
								if (empty.includes('Q' + i)) {
									cell2.innerHTML = '<span class="badge bg-label-dark rounded-pill">Empty</span>'
								} else {
									console.log('Q' + i)
								}
							}
						}
					}
				}
			}
		}
	}
	swal.fire({
		text: "Fecting Results",
		icon: "info",
		showCloseButton: true
	})
	swal.showLoading()
	var path = "exattemps/" + cid + "/" + thisid + "/" + localStorage.getItem('sid')
	console.log(path)
	const preObject745691 = document.getElementById(path);
	// Create References
	const dbRefObject745691 = firebase.database().ref().child(path);

	// Sync object changes
	dbRefObject745691.once('value', snap => precheck(snap.val()));
}