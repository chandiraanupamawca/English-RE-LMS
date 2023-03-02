var $$ = function (id) {
  return document.getElementById(id);
};
sid = localStorage.getItem("sid")
siid = localStorage.getItem("sid")

function viewclass() {
  //openchart()

  function loadin() {
     var path = "live/" + cid
     const dbRefObject741569 = firebase.database().ref().child(path);
     dbRefObject741569.on('value', snap => live(snap.val()));
     path = "files/" + localStorage.getItem("nclz")
     const dbRefObject22x = firebase.database().ref().child(path);
     dbRefObject22x.once('value', snap => fls(snap.val()));
     path = "exams/" + localStorage.getItem("nclz")
     const dbRefObject22xq = firebase.database().ref().child(path);
     dbRefObject22xq.once('value', snap => examsq(snap.val()));
     var path = "strecordings/" + cid
     const dbRefObject745 = firebase.database().ref().child(path);

     // Sync object changes
     dbRefObject745.once('value', snap => rec(snap.val()));
  }

  function live(d) {
     Swal.close()
     if (d != null) {
        $('#jcont').fadeIn()

        if (d["sts"] != "Live") {
           $('#jcont').fadeIn()
           $$('div-join-class').style.display = 'none'
           $$("live-class-status").innerText = "Virtual Classroom has not started yet!"

        } else {
           mid = d["id"]
           $('#div-join-class').fadeIn()
           $$("live-class-status").innerText = "Virtual Classroom has been started!"


        }
     } else {
        $$('div-join-class').style.display = 'none'
        $$("live-class-status").innerText = "Virtual Classroom has not started yet!"
     }
  }
  time = Math.floor(Date.now() / 10)
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
        // ...
     } else {
        location.replace("login.html")
        // User is signed out
        // ...
     }
  });
  var siid = JSON.parse(localStorage.getItem("stdata"))["id"]
  sid = "RE" + ("000" + siid).slice(-4)
  $$("st-id2").innerText = sid
  $$("st-name2").innerText = localStorage.getItem("stname")
  l = JSON.parse(localStorage.getItem("clzdata"))[cid]["info"]

  $$("cida").innerText = " ID " + cid
  $$("class-topic").innerText = l["topic"]
  document.title = l["topic"] + " | English RE"
  analytics.logEvent('View_Class', {
     classname: l["topic"] + " | English RE"
  });

  classtopic = l["topic"]
  var array = document.getElementsByClassName('exyr')
  for (let f = 0; f < array.length; f++) {
     const element = array[f];
     element.innerHTML = l["year"] + " " + l["section"]
  }
  localStorage.setItem("cyear", l["year"] + " " + l["section"])
  $$("teacher").innerText = l["name"]
  localStorage.setItem("tname", l["name"])
  $$("class-schedule").innerText = l["time"]

  firebase.database().ref('shared/time').update({
        time: firebase.database.ServerValue.TIMESTAMP
     })
     .then(function (data) {
        firebase.database().ref('shared/time')
           .once('value')
           .then(function (data) {
              var t = data.val()['time'];
              time = t
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
                    var path = "slips/" + uid + "/" + cid
                    const dbRefObject74522ew = firebase.database().ref().child(path);
                    dbRefObject74522ew.once('value', snap => paynot(snap.val()));
                    // ...
                 } else {
                    location.replace("login.html")
                    // User is signed out
                    // ...
                 }
              });
              document.getElementById("current-month").innerText = moment(time).local().format("MMMM")

              var siid = JSON.parse(localStorage.getItem("stdata"))["id"]
              sid = "RE" + ("000" + siid).slice(-4)
              $$("st-id2").innerText = sid
              $$("st-name2").innerText = localStorage.getItem("stname")
              l = JSON.parse(localStorage.getItem("clzdata"))[cid]["info"]
              $$("class-topic").innerText = l["topic"]
              $$("teacher").innerText = l["name"]
              $$("class-schedule").innerText = l["time"]

              function befirep(thatz) {
                 if (thatz == null) {
                    var path = "payset/" + cid

                    const dbRefObject = firebase.database().ref().child(path);
                    // Sync object changes
                    dbRefObject.once('value', snap => thenpay(snap.val()));

                    function excuse(status) {
                       if (status == 'restrict') {} else if (status == 'open') {
                          loadin()
                       } else {
                          if (status != null) {
                             if (status.includes("auto")) {
                                var thear = status.split("``")
                                var startdate = parseInt(thear[1])
                                var endate = parseInt(thear[2])
                                var daraz = moment(time).local().format("DD")

                                if (daraz < endate && daraz > startdate) {
                                   loadin()
                                } else {}
                             }
                          }
                       }
                    }
                    var path = "status/" + cid + "/sts"

                    const dbRefObjectz = firebase.database().ref().child(path);
                    // Sync object changes
                    dbRefObjectz.once('value', snap => excuse(snap.val()));
                 } else {
                    if (thatz == 'ok') {
                       payed = true
                       loadin()

                    } else {
                       var path = "payset/" + cid

                       const dbRefObject = firebase.database().ref().child(path);
                       // Sync object changes
                       dbRefObject.once('value', snap => thenpay(snap.val()));

                       function excuse(status) {
                          if (status == 'restrict') {} else if (status == 'open') {
                             loadin()
                          } else {
                             if (status != null) {
                                if (status.includes("auto")) {
                                   var thear = status.split("``")
                                   var startdate = parseInt(thear[1])
                                   var endate = parseInt(thear[2])
                                   var daraz = moment(time).local().format("DD")

                                   if (daraz < endate && daraz > startdate) {
                                      loadin()
                                   } else {}
                                }
                             }
                          }
                       }
                       var path = "status/" + cid + "/sts"

                       const dbRefObjectzz = firebase.database().ref().child(path);
                       // Sync object changes
                       dbRefObjectzz.once('value', snap => excuse(snap.val()));
                       const Toast = Swal.mixin({
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

                       Toast.fire({
                          icon: 'warning',
                          title: 'Payment Rejected',
                          text: "There was an issue in the payment for the month of " + moment(time).format("MMMM")
                       })
                    }

                 }
              }

              var path = "enroll/" + uid + "/" + cid + "/" + moment(time).local().format("MM") + "/pay"
              const dbRefObject9 = firebase.database().ref().child(path);
              // Sync object changes
              dbRefObject9.once('value', snap => befirep(snap.val()));

              // Notices
              function timeConverter(UNIX_timestamp) {
                 var a = new Date(UNIX_timestamp * 1000);
                 var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                 var year = a.getFullYear();
                 var month = months[a.getMonth()];
                 var date = a.getDate();
                 var hour = a.getHours();
                 var min = a.getMinutes();
                 var sec = a.getSeconds();
                 var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min;
                 return time;
              }

              function notes(d) {
                 if (d != null) {
                    if (d["time"] != null) {
                       if (Math.floor(Date.now() / 1000) > parseInt(d["time"])) {
                          $("#div-notice-board").fadeIn()
                          $$('notice-date').innerText = timeConverter(d["time"])
                          $$("notice-topic").innerText = d["topic"]
                          var temp = d["html"]
                          $$("notice-body").innerHTML = temp.replace("<p>", "").replace("</p>", "")


                       } else {
                          $$("div-notice-board").style.display = "none"
                       }
                    }
                 } else {
                    $$("div-notice-board").style.display = "none"
                 }
                 $('#dribble').fadeOut()

              }

              var path = "notes/" + cid
              const preObject74569 = document.getElementById(path);
              // Create References
              const dbRefObject74569 = firebase.database().ref().child(path);

              // Sync object changes
              dbRefObject74569.on('value', snap => notes(snap.val()));

              // End of Notices

              // Start of Live fetch


              // Join 


           }, function serverTimeErr(err) {});
     }, function (err) {});


}

function joinl(id) {

  tid = localStorage.getItem("tp")
  tt = localStorage.getItem("authid")
  var data = JSON.stringify({
     sid: siid,
     cid: cid,
     pn: tid
  });
  encrypted = CryptoJS.AES.encrypt(data, tt);

  let timerInterval
  Swal.fire({
     title: 'Making your seat ready',
     html: 'Responding you in <b></b> milliseconds.',
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
     if (result.dismiss === Swal.DismissReason.timer) {}
  })

  function newl() {
     var xhr2 = new XMLHttpRequest();

     // var url2 = "https://server-03.englishre.xyz/zoom";
     var url2 = "https://server-03.englishre.xyz/zoom";
     xhr2.open("POST", url2, true);
     xhr2.setRequestHeader("Content-Type", "application/json");

     xhr2.onreadystatechange = function () {
        if (xhr2.readyState === 4 && xhr2.status === 200) {
           if (xhr2.response == "Class fees not paid") {
              Swal.fire({
                 icon: 'warning',
                 title: 'Class Fees Not Paid!',
					  text: "Please pay Class fees to join this Meeting"
              })
           } else {
              if (xhr2.response.includes("zoom.us/w")) {
                 firebase.database().ref("mreglinks/" + uid + "/" + cid).set(JSON.parse('{"' + mid + '":"' + xhr2.responseText + '"}')).then((result) => {
                    var df = xhr2.responseText
                    Swal.close()
                    // window.location.href = df
                    var zst = df.split("zoom.us/w/")[1]
                    console.log(zst)
                    var cofo = zst.split('?tk=')[0]
                    var zack = zst.split('?tk=')[1].split("&pwd=")[0]
                    var pwds = zst.split('?tk=')[1].split("&pwd=")[1]
                    console.log(cofo, zack, pwds, window.navigator.platform)
                    if ((window.navigator.platform).toUpperCase().includes("WIN")) {
                       urll = "zoommtg"
                    } else {
                       urll = "zoomus"
                    }
                    protocolCheck(
                       urll + "://zoom.us/join?action=join&confno=" + cofo + "&pwd=" + pwds + "&tk=" + zack,
                       () => {
                          Swal.fire({
                             icon: 'info',
                             title: 'We detected ZOOM in not installed in your device',
                             text: 'English RE LMS uses ZOOM for Online Sessions',
                             confirmButtonText: "Try to Open Anyway",
                             footer: '<a href="https://zoom.us/download">ZOOM DOWNLOAD CENTER</a>',

                             showCloseButton: true
                          }).then((x) => {
                             if (x.isConfirmed) {
                                window.open(df)
                             }
                          })
                       },
                       () => {
                        Swal.fire({
                           title: 'Meeting Launched Successfully',
                           text: 'You can now close the browser window',
                           icon: 'success',
                           showCloseButton: true,
                           confirmButtonText: "Relaunch Zoom Meeting",
                           showDenyButton: false
                        }).then((x) => {
                           if (x.isConfirmed) {
                            window.open(df)
                           }
                        })
                     }, 5000
                    );
                 })
              } else {
                 Swal.fire({
                    icon: 'error',
                    title: 'Runtime Error',
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
     xhr2.send(out);
  }

  function vdc(df) {
     if (df == null) {
        newl()
     } else {
        if (df.includes("zoom.us/w")) {
           Swal.close()
           // window.location.href = df
           var zst = df.split("zoom.us/w/")[1]
           console.log(zst)
           var cofo = zst.split('?tk=')[0]
           var zack = zst.split('?tk=')[1].split("&pwd=")[0]
           var pwds = zst.split('?tk=')[1].split("&pwd=")[1]
           console.log(cofo, zack, pwds, window.navigator.platform)
           if ((window.navigator.platform).toUpperCase().includes("WIN")) {
              urll = "zoommtg"
           } else {
              urll = "zoomus"
           }
           protocolCheck(
              urll + "://zoom.us/join?action=join&confno=" + cofo + "&pwd=" + pwds + "&tk=" + zack,
              () => {
                 Swal.fire({
                    icon: 'info',
                    title: 'We detected ZOOM in not installed in your device',
                    text: 'English RE LMS uses Zoom for Online Sessions',
                    confirmButtonText: "Try to Open Anyway",
                    footer: '<a href="https://zoom.us/download">ZOOM DOWNLOAD CENTER</a>',

                    showCloseButton: true
                 }).then((x) => {
                    if (x.isConfirmed) {
                       window.open(df)
                    }
                 })
              },
              () => {
                 Swal.fire({
                    title: 'Meeting Launched Successfully',
                    text: 'You can now close the browser window',
                    icon: 'success',
                    showCloseButton: true,
                    confirmButtonText: "Relaunch Zoom Meeting",
                    showDenyButton: false
                 }).then((x) => {
                    if (x.isConfirmed) {
                     window.open(df)
                    }
                 })
              }, 5000
           );
        } else {
           alert(df)
        }
     }
  }
  path = "mreglinks/" + uid + "/" + cid + "/" + mid
  const dbRefObject = firebase.database().ref().child(path);
  dbRefObject.once('value', snap => vdc(snap.val()));

}