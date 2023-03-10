if (localStorage.getItem("authid") != null) {
  tt = localStorage.getItem("authid");
} else {
  tt = null;
}
$(document).bind("mouseleave", function (e) {
  if (sessionStorage.leave != "true") {
    if (e.pageY - $(window).scrollTop() <= 1) {
      sessionStorage.leave = true;
      const Toast = Swal.mixin({
        position: "bottom-end",
        toast: true,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
      /*
	  Toast.fire({
		icon: 'success',
		title: 'Welcome to English RE',
		text:"Happy Learning with English RE 🥳"
	  })*/
    }
  }
});

mycardc = 1;
live = [];
mddd = [];
liveadd = [];
liveclass = [];
entota = 0;
function reptt() {
  // if(live.length==0&&localStorage.getItem("clzdata")!=null){
  document.getElementById("myb").click();
}
setTimeout(reptt, 100);
firebase.auth().onAuthStateChanged((user) => {
  if (localStorage.getItem("pw") == null) {
    localStorage.clear();
    firebase.auth().signOut();
    location.replace("login.html");
  }

  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    uid = user.uid;
    localStorage.uid = uid;
    function getOS() {
      var userAgent = window.navigator.userAgent,
        platform =
          window.navigator?.userAgentData?.platform ||
          window.navigator.platform,
        macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"],
        windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"],
        iosPlatforms = ["iPhone", "iPad", "iPod"],
        os = null;

      if (macosPlatforms.indexOf(platform) !== -1) {
        os = "Mac OS";
      } else if (iosPlatforms.indexOf(platform) !== -1) {
        os = "iOS";
      } else if (windowsPlatforms.indexOf(platform) !== -1) {
        os = "Windows";
      } else if (/Android/.test(userAgent)) {
        os = "Android";
      } else if (/Linux/.test(platform)) {
        os = "Linux";
      }

      return os;
    }
    getBrowser = () => {
      const userAgent = navigator.userAgent;
      let browser = "unkown";
      // Detect browser name
      browser = /ucbrowser/i.test(userAgent) ? "UCBrowser" : browser;
      browser = /edg/i.test(userAgent) ? "Edge" : browser;
      browser = /googlebot/i.test(userAgent) ? "GoogleBot" : browser;
      browser = /chromium/i.test(userAgent) ? "Chromium" : browser;
      browser =
        /firefox|fxios/i.test(userAgent) && !/seamonkey/i.test(userAgent)
          ? "Firefox"
          : browser;
      browser =
        /; msie|trident/i.test(userAgent) && !/ucbrowser/i.test(userAgent)
          ? "IE"
          : browser;
      browser =
        /chrome|crios/i.test(userAgent) &&
        !/opr|opera|chromium|edg|ucbrowser|googlebot/i.test(userAgent)
          ? "Chrome"
          : browser;
      browser =
        /safari/i.test(userAgent) &&
        !/chromium|edg|ucbrowser|chrome|crios|opr|opera|fxios|firefox/i.test(
          userAgent
        )
          ? "Safari"
          : browser;
      browser = /opr|opera/i.test(userAgent) ? "Opera" : browser;

      // detect browser version
      switch (browser) {
        case "UCBrowser":
          return `${browser}/${browserVersion(
            userAgent,
            /(ucbrowser)\/([\d\.]+)/i
          )}`;
        case "Edge":
          return `${browser}/${browserVersion(
            userAgent,
            /(edge|edga|edgios|edg)\/([\d\.]+)/i
          )}`;
        case "GoogleBot":
          return `${browser}/${browserVersion(
            userAgent,
            /(googlebot)\/([\d\.]+)/i
          )}`;
        case "Chromium":
          return `${browser}/${browserVersion(
            userAgent,
            /(chromium)\/([\d\.]+)/i
          )}`;
        case "Firefox":
          return `${browser}/${browserVersion(
            userAgent,
            /(firefox|fxios)\/([\d\.]+)/i
          )}`;
        case "Chrome":
          return `${browser}/${browserVersion(
            userAgent,
            /(chrome|crios)\/([\d\.]+)/i
          )}`;
        case "Safari":
          return `${browser}/${browserVersion(
            userAgent,
            /(safari)\/([\d\.]+)/i
          )}`;
        case "Opera":
          return `${browser}/${browserVersion(
            userAgent,
            /(opera|opr)\/([\d\.]+)/i
          )}`;
        case "IE":
          const version = browserVersion(userAgent, /(trident)\/([\d\.]+)/i);
          // IE version is mapped using trident version
          // IE/8.0 = Trident/4.0, IE/9.0 = Trident/5.0
          return version
            ? `${browser}/${parseFloat(version) + 4.0}`
            : `${browser}/7.0`;
        default:
          return `unknown/0.0.0.0`;
      }
    };

    browserVersion = (userAgent, regex) => {
      return userAgent.match(regex) ? userAgent.match(regex)[2] : null;
    };
    //session info
    if (tt != null) {
      if (localStorage.getItem("lux") == null) {
        var randx = Math.floor(Math.random() * 10000000 + 1).toString();
        var enxt = CryptoJS.AES.encrypt(randx, tt);
        localStorage.setItem("lux", enxt.toString());
      }
      function precheck(val) {
        if (val != "Y") {
          fetch("https://ipapi.co/json/")
            .then((response) => response.json())
            .then((data) => {
              console.log(
                data["ip"],
                data["region"] +
                  " , " +
                  data["city"] +
                  " , " +
                  data["country_name"],
                data["org"]
              );
              firebase
                .database()
                .ref(
                  "sessions/" +
                    uid +
                    "/" +
                    CryptoJS.AES.decrypt(
                      localStorage.getItem("lux"),
                      tt
                    ).toString(CryptoJS.enc.Utf8)
                )
                .set({
                  ts: Math.floor(Date.now() / 1000),
                  OS: getOS(),
                  ismob: navigator.userAgentData.mobile,
                  ip: data["ip"],
                  location:
                    data["region"] +
                    " , " +
                    data["city"] +
                    " | " +
                    data["country_name"],
                  isp: data["org"],
                  browser: getBrowser(),
                });
            })
            .catch((x) => {
              Swal.fire({
                icon: "error",
                allowEscapeKey: "false",
                title:
                  "Please disable any browser extension or Ad Blocker to continue using the website",
                text: x,
                confirmButtonText: "PROCEED WITH CAUTION",
                confirmButtonColor: "#e23137",
              });
            });
        } else {
          var thisdz = CryptoJS.AES.decrypt(
            localStorage.getItem("lux"),
            tt
          ).toString(CryptoJS.enc.Utf8);
          firebase
            .database()
            .ref("sessions/" + uid + "/" + thisdz)
            .set({})
            .then((x) => {
              sessionStorage.clear();
              localStorage.clear();
              firebase.auth().signOut();
            });
        }
      }

      firebase
        .database()
        .ref(
          "sessions/" +
            uid +
            "/" +
            CryptoJS.AES.decrypt(localStorage.getItem("lux"), tt).toString(
              CryptoJS.enc.Utf8
            ) +
            "/term"
        )
        .on("value", (snap) => precheck(snap.val()));
    }
    function erl(eli) {
      if (eli != null) {
        localStorage.setItem("myclzz", JSON.stringify(eli));
      } else {
        localStorage.setItem("myclzz", JSON.stringify({}));
      }
    }

    path = "enroll/" + uid;
    const dbRefObjectaz = firebase.database().ref().child(path);
    dbRefObjectaz.on("value", (snap) => erl(snap.val()));
    // ...
  } else {
    localStorage.clear();
    location.replace("login.html");
    // User is signed out
    // ...
  }
});
zk = 0;
liveno = 0;
//searches for all classes
function searches() {
  var input = document.getElementById("search");
  var filter = input.value.toLowerCase();
  var nodes = document.getElementsByClassName("clzcard");

  for (i = 0; i < nodes.length; i++) {
    if (nodes[i].innerHTML.toLowerCase().includes(filter)) {
      if (
        document.getElementsByClassName("alltitle")[i].innerText !=
        "Loading Class Name"
      ) {
        nodes[i].style.display = "block";
      }
    } else {
      nodes[i].style.display = "none";
    }
  }
}

var $$ = function (id) {
  return document.getElementById(id);
};

function joinl(id) {
  cid = id.split("||")[0];
  tid = id.split("||")[1];
  mid = id.split("||")[2];
  var data = JSON.stringify({ sid: siid, cid: cid, pn: tid });
  encrypted = CryptoJS.AES.encrypt(data, tt);

  let timerInterval;
  Swal.fire({
    title: "Making your seat ready",
    html: "Responding you in <b></b> milliseconds.",
    timer: 10000,
    timerProgressBar: true,
    allowEscapeKey: false,
    allowEnterKey: false,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
      const b = Swal.getHtmlContainer().querySelector("b");
      timerInterval = setInterval(() => {
        b.textContent = Swal.getTimerLeft();
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
    },
  }).then((result) => {
    /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer) {
    }
  });
  function newl() {
    var xhr2 = new XMLHttpRequest();

    var url2 = "https://server-03.englishre.xyz/zoom";
    //url2 ="http://localhost:5000/zak";
    xhr2.open("POST", url2, true);
    xhr2.setRequestHeader("Content-Type", "application/json");

    xhr2.onreadystatechange = function () {
      if (xhr2.readyState === 4 && xhr2.status === 200) {
        if (xhr2.response == "Class fees not paid") {
          Swal.fire({
            icon: "warning",
            title: "Class fees not paid",
            text: "Please pay Class fees to join this Meeting",
          });
        } else {
          if (xhr2.response.includes("zoom.us/w")) {
            firebase
              .database()
              .ref("mreglinks/" + uid + "/" + cid)
              .set(JSON.parse('{"' + mid + '":"' + xhr2.responseText + '"}'))
              .then((result) => {
                Swal.close();
                window.location.href = xhr2.response;
              });
          }
        }
      }
    };
    out = JSON.stringify({ tk: '"' + encrypted + '"' });
    xhr2.send(out);
  }
  function vdc(df) {
    if (df == null) {
      newl();
    } else {
      if (df.includes("zoom.us/w")) {
        Swal.close();
        window.location.href = df;
      } else {
        alert(df);
      }
    }
  }
  path = "mreglinks/" + uid + "/" + cid + "/" + mid;
  const dbRefObject = firebase.database().ref().child(path);
  dbRefObject.once("value", (snap) => vdc(snap.val()));
}

function rest(err) {
  function v2(d) {
    localStorage.setItem("stdata", JSON.stringify(d));
    sid = "RE" + ("000" + d["id"]).slice(-4);

    siid = d["id"];
    data = d["data"];
    var pw = CryptoJS.AES.decrypt(localStorage.getItem("pw"), err).toString(
      CryptoJS.enc.Utf8
    );
    var info = JSON.parse(
      CryptoJS.AES.decrypt(data, pw).toString(CryptoJS.enc.Utf8)
    );
    localStorage.setItem("stname", info["fn"] + " " + info["ln"]);
    localStorage.setItem("fn", info["fn"]);
    localStorage.setItem("ln", info["ln"]);
    localStorage.setItem("em", info["em"]);
    localStorage.setItem("ad", info["ad"]);
    localStorage.setItem("dp", info["dp"]);
    if (info["dp"] != null) {
      if (info["dp"].includes("api")) {
        $$("dp2").src = info["dp"];
        $$("dp1").src = info["dp"];
      }
    }
    $$("name2").innerText = info["fn"] + " " + info["ln"];

    $$("st-name").innerText = info["fn"] + " " + info["ln"];
    $$("st-id").innerText = sid;
    localStorage.setItem("sid", siid);

    $$("exam-year").innerText = info["yr"];
    $$("phone-number").innerText = info["pn"];

    function v3(dt) {
      localStorage.setItem("clzdata", JSON.stringify(dt));
      for (let i = 0; i < Object.keys(dt).length; i++) {
        clzcd = $$("clzcard");
        clone = clzcd.cloneNode(true);
        cos = dt[Object.keys(dt)[i]]["info"];
        $$("all-classes-card").appendChild(clone);
        k = i + 1;

        document.getElementsByClassName("clzcard")[k].style.display = "block";
        document.getElementsByClassName("alltitle")[k].innerText = cos["topic"];
        document.getElementsByClassName("alltm")[k].innerText = cos["time"];
        document.getElementsByClassName("alltu")[k].innerText = cos["name"];
        document.getElementsByClassName("allcid")[k].innerText =
          "Class ID: " +
          cos["section"] +
          ("000" + Object.keys(dt)[i]).slice(-4);
        document.getElementsByClassName("allbtn")[k].id =
          Object.keys(dt)[i] + "||" + cos["pn"];
        document.getElementsByClassName("allyr")[k].innerText =
          cos["year"] + " " + cos["section"];
        function addZero(i) {
          if (i < 10) {
            i = "0" + i;
          }
          return i;
        }
        var daz = new Date();
        var mn = addZero(daz.getMonth() + 1);
        var ztc = Object.keys(JSON.parse(localStorage.getItem("myclzz")));
        if (ztc.includes(Object.keys(dt)[i])) {
          if (
            JSON.parse(localStorage.getItem("myclzz"))[Object.keys(dt)[i]] !=
            null
          ) {
            if (
              JSON.parse(localStorage.getItem("myclzz"))[Object.keys(dt)[i]][
                mn
              ] != null
            ) {
              var tsts = JSON.parse(localStorage.getItem("myclzz"))[
                Object.keys(dt)[i]
              ][mn]["pay"];
              if (tsts == "ok") {
                document.getElementsByClassName("allst")[k].innerText =
                  "Enrolled";
              } else {
                document.getElementsByClassName("allst")[k].innerText =
                  "Not Enrolled";
              }
            } else {
              document.getElementsByClassName("allst")[k].innerText = "Expired";
            }
          } else {
            document.getElementsByClassName("allst")[k].innerText =
              "Not Enrolled";
          }
        } else {
          document.getElementsByClassName("allst")[k].innerText =
            "Not Enrolled";
        }
        if (cos["pic"] != null) {
          document.getElementsByClassName("allpic")[k].src = cos["pic"];
        } else {
          document.getElementsByClassName("allpic")[k].src =
            "assets/img/clz.jpg";
        }

        if (localStorage.getItem("myclzz") != null) {
          if (
            JSON.parse(
              Object.keys(JSON.parse(localStorage.getItem("myclzz"))).includes(
                Object.keys(dt)[i]
              )
            )
          ) {
            if (!mddd.includes(Object.keys(dt)[i])) {
              mycard = $$("my-classes-card");
              clone = mycard.cloneNode(true);
              $$("myhold").appendChild(clone);
              $$("nomy").style.display = "none";
              document.getElementsByClassName("my-classes-card")[
                mycardc
              ].style.display = "block";
              document.getElementsByClassName("myname")[mycardc].innerText =
                cos["topic"];
              document.getElementsByClassName("mytm")[mycardc].innerText =
                cos["time"];
              document.getElementsByClassName("mytc")[mycardc].innerText =
                cos["name"];
              document.getElementsByClassName("mybtn")[mycardc].id =
                Object.keys(dt)[i] + "||" + cos["pn"];
              document.getElementsByClassName("myyr")[mycardc].innerText =
                cos["year"] + " " + cos["section"];
              if (cos["topic"] != "" || cos["topic"] != null) {
                var ul = document.getElementById("ulclz");
                var li = document.createElement("li");
                li.appendChild(document.createTextNode("clz"));
                li.setAttribute("id", Object.keys(dt)[i] + "||mm"); // added line
                ul.appendChild(li);
                document.getElementById(Object.keys(dt)[i] + "||mm").outerHTML =
                  '	<li class="menu-item sht" href="#"  id="' +
                  Object.keys(dt)[i] +
                  "||" +
                  cos["pn"] +
                  '"  onclick="stck(this.id)" ><a class="menu-link"><div data-i18n="Without menu">' +
                  cos["topic"] +
                  "</div></a></li>";
              }
              function addZero(i) {
                if (i < 10) {
                  i = "0" + i;
                }
                return i;
              }
              var daz = new Date();
              var mn = addZero(daz.getMonth() + 1);
              if (
                JSON.parse(localStorage.getItem("myclzz"))[
                  Object.keys(dt)[i]
                ] != null
              ) {
                if (
                  JSON.parse(localStorage.getItem("myclzz"))[
                    Object.keys(dt)[i]
                  ][mn] != null
                ) {
                  entota = entota + 1;
                  $$("clzno").innerText = entota;
                  var tsts = JSON.parse(localStorage.getItem("myclzz"))[
                    Object.keys(dt)[i]
                  ][mn]["pay"];
                  if (tsts == "ok") {
                    document.getElementsByClassName("myst")[mycardc].innerText =
                      "Enrolled";
                  } else {
                    document.getElementsByClassName("myst")[mycardc].innerText =
                      "Not Enrolled";
                  }
                } else {
                  document.getElementsByClassName("myst")[mycardc].innerText =
                    "Expired";
                }
              } else {
                document.getElementsByClassName("myst")[mycardc].innerText =
                  "Not Enrolled";
              }
              if (cos["pic"] != null) {
                document.getElementsByClassName("mypic")[mycardc].src =
                  cos["pic"];
              } else {
                document.getElementsByClassName("mypic")[mycardc].src =
                  "assets/img/clz.jpg";
              }
              mddd.push(Object.keys(dt)[i]);
              mycardc = mycardc + 1;
            }
          }
        }

        if (live != null) {
          if (live[Object.keys(dt)[i]] != null) {
            if (live[Object.keys(dt)[i]]["sts"] == "Live") {
              liveno = liveno + 1;
              liveclass.push(cos["topic"]);
              document.getElementsByClassName("islive")[k].style.display =
                "block";
              if (!liveadd.includes(Object.keys(dt)[i])) {
                clzcd = $$("live-classes-card");
                clone = clzcd.cloneNode(true);
                liveadd.push(Object.keys(dt)[i]);
                $$("liveall").appendChild(clone);
                for (let j = 0; j < liveclass.length; j++) {
                  console.log(cos["topic"], liveclass[j]);
                  if (cos["topic"] == liveclass[j]) {
                    m = j + 1;
                    function addZero(i) {
                      if (i < 10) {
                        i = "0" + i;
                      }
                      return i;
                    }

                    var daz = new Date();
                    var mn = addZero(daz.getMonth() + 1);
                    if (
                      JSON.parse(localStorage.getItem("myclzz"))[
                        Object.keys(dt)[i]
                      ] != null
                    ) {
                      if (
                        JSON.parse(localStorage.getItem("myclzz"))[
                          Object.keys(dt)[i]
                        ][mn] != null
                      ) {
                        var tsts = JSON.parse(localStorage.getItem("myclzz"))[
                          Object.keys(dt)[i]
                        ][mn]["pay"];
                        if (tsts == "ok") {
                          document.getElementsByClassName("list")[m].innerText =
                            "Enrolled";
                        } else {
                          document.getElementsByClassName("list")[m].innerText =
                            "Not Enrolled";
                        }
                      } else {
                        document.getElementsByClassName("list")[m].innerText =
                          "Expired";
                      }
                    } else {
                      document.getElementsByClassName("list")[m].innerText =
                        "Not Enrolled";
                    }
                    document.getElementsByClassName("live-classes-card")[
                      m
                    ].style.display = "block";
                    document.getElementsByClassName("litp")[m].innerText =
                      cos["topic"];
                    document.getElementsByClassName("litm")[m].innerText =
                      cos["time"];
                    document.getElementsByClassName("litu")[m].innerText =
                      cos["name"];
                    document.getElementsByClassName("libtn")[m].id =
                      Object.keys(dt)[i] +
                      "||" +
                      cos["pn"] +
                      "||" +
                      live[Object.keys(dt)[i]]["id"];
                    document.getElementsByClassName("liyr")[m].innerText =
                      cos["year"] + " " + cos["section"];
                    if (cos["pic"] != null) {
                      document.getElementsByClassName("lipic")[m].src =
                        cos["pic"];
                    } else {
                      document.getElementsByClassName("lipic")[m].src =
                        "assets/img/clz.jpg";
                    }
                  }
                }
              }
            }
          }
        }
        if (i == Object.keys(dt).length - 1) {
          $$("load").style.display = "none";
          if (liveno == 0) {
            $$("liveb").style.display = "none";
            $$("myb").click();
          }
        }
      }
    }
    if (localStorage.getItem("clzdata") != null) {
      v3(JSON.parse(localStorage.getItem("clzdata")));
    }

    function tnx(now) {
      live = now;
      path = "classes/";
      const dbRefObject = firebase.database().ref().child(path);
      if (localStorage.getItem("clzdata") == null) {
        dbRefObject.once("value", (snap) => v3(snap.val()));
      } else {
        console.log("Class Data Loaded from Local Storage");
        v3(JSON.parse(localStorage.getItem("clzdata")));
        function dr(val) {
          localStorage.setItem("clzdata", JSON.stringify(val));
        }
        dbRefObject.on("value", (snap) => dr(snap.val()));
      }
    }

    function vvc(dt) {
      var myclzhtml = $$("my-classes").innerHTML;

      $$("fastloadcontent").innerHTML =
        "<div class='nav-align-top mb-4' id='myouter'> <ul class='nav nav-pills mb-3' role='tablist'> <li class='nav-item'> <button id='liveb' type='button' class='nav-link active' role='tab' data-bs-toggle='tab' data-bs-target='#live-classes' aria-controls='live-classes' aria-selected='true'> Live Classes </button> </li> <li class='nav-item'> <button id='myb' type='button' class='nav-link' role='tab' data-bs-toggle='tab' data-bs-target='#my-classes' aria-controls='my-classes' aria-selected='true'> My Classes </button> </li> <li class='nav-item'> <button id='allb' type='button' class='nav-link' role='tab' data-bs-toggle='tab' data-bs-target='#all-classes' aria-controls='all-classes' aria-selected='false'> All Classes </button> </li> </ul> <div class='tab-content'> <div class='tab-pane fade active show' id='live-classes' role='tabpanel'> <iframe id='load' src='book.html' height='500px' width='100%' frameborder='0' style='display: block;'> </iframe> <div class='row row-cols-1 row-cols-md-4 g-4' id='liveall'> <div class='col live-classes-card' id='live-classes-card' style='display:none ;'> <div class='card' style='border: 1px solid #696cfe80;'> <a href='#'> <img src='../assets/img/classes/100.png' class='card-img-top lipic' alt='Class Icon'/> </a> <div class='card-body'> <a href='#'> <h5 class='card-title fw-bold litp' style='font-size: 20px; color: #111;'>Loading live</h5> </a> <p> <center class='mb-1'> <span id='live-streaming' class='badge bg-label-primary rounded-pill align-middle'><i class='bx bx-broadcast bx-flashing'></i> <span class='align-middle bx-flashing'>Live on English RE</span></span> </center> <span class='fw-bold '><i class='bx bx-calendar'></i></span> <span class='align-middle liyr'>Loading</span> <br> <span class='fw-bold '><i class='bx bx-time-five'></i></span> <span class='align-middle litm'>Loading</span> <br> <span class='fw-bold '><i class='bx bx-user-circle'></i></span> <span class='align-middle litu'>Loading</span> <br> <span class='fw-bold '><i class='bx bx-info-circle'></i></span> <span class='align-middle list'>Loading</span> <br> </p> <center> <a href='javascript:void(0)' class='btn btn-primary fw-bold libtn' onclick='joinl(this.id)' id='libtn'>Join Now</a> </center> </div> </div> </div> </div> </div> <div class='tab-pane fade' id='my-classes' role='tabpanel'> <div class='row row-cols-1 row-cols-md-4 g-4 ' id='myhold' > <div class='col my-classes-card' id='my-classes-card' style='display:none;'> <div class='card' style='border: 1px solid #696cfe80;'> <a href='#'> <img src='../assets/img/classes/100.png' class='card-img-top mypic' alt='Class Icon'/> </a> <div class='card-body'> <a href='#'> <h5 class='card-title fw-bold myname' style='font-size: 20px; color: #111;'>English Language | Grade 11 (Theory)</h5> </a> <p> <span class='fw-bold'><i class='bx bx-calendar'></i></span> <span class='align-middle myyr'>2022 O/L</span> <br> <span class='fw-bold'><i class='bx bx-time-five'></i></span> <span class='align-middle mytm'>Monday 5.30 PM - 7.30 PM</span> <br> <span class='fw-bold'><i class='bx bx-user-circle'></i></span> <span class='align-middle mytc'>A B Perera</span> <br> <span class='fw-bold'><i class='bx bx-info-circle'></i></span> <span class='align-middle myst'>Enrolled</span> <br> </p> <center> <a href='javascript:void(0)' class='btn btn-outline-primary fw-bold mybtn' onlclick='launch(this.id)'>View Class</a> </center> </div> </div> </div> </div> </div> <div class='tab-pane fade' id='all-classes' role='tabpanel'> <center class='mb-3'> <form class='d-flex' onsubmit='return false'> <input id='search' onkeyup='searches()' class='form-control me-2' type='search' placeholder='Search Classes' aria-label='Search'> <button class='btn btn-outline-primary' onclick='searches()' type='submit'>Refresh</button> </form> </center> <div class='row row-cols-1 row-cols-md-4 g-4' id='all-classes-card' > <div class='col clzcard' id='clzcard' style='display: none;' > <div class='card' style='border: 1px solid #696cfe80;'> <a href='#'> <img src='../assets/img/classes/100.png' class='card-img-top allpic' alt='Class Icon'/>   <span  class='badge bg-label-primary allcid fw-bold'>CID</span> </a> <div class='card-body'> <a href='#'> <h5 class='card-title fw-bold alltitle' style='font-size: 20px; color: #111;'>Loading Class Name</h5> </a> <center style='display: none;' class='mb-1 islive'> <span id='live-streaming' class='badge bg-label-primary rounded-pill align-middle'><i class='bx bx-broadcast bx-flashing'></i> <span class='align-middle bx-flashing'>Live on English RE</span></span> </center> <p> <span class='fw-bold'><i class='bx bx-calendar'></i></span> <span class='align-middle allyr'>Loading</span> <br> <span class='fw-bold'><i class='bx bx-time-five'></i></span> <span class='align-middle alltm'>Loading</span> <br> <span class='fw-bold'><i class='bx bx-user-circle'></i></span> <span class='align-middle alltu'>Loading</span> <br> <span class='fw-bold'><i class='bx bx-info-circle'></i></span> <span class='align-middle allst'>Loading</span> <br> </p> <center> <a href='javascript:void(0)' class='btn btn-outline-primary fw-bold allbtn' onclick='launch(this.id)' id='allbtn'>View Class</a> </center> </div> </div> </div> </div> </div> </div> </div>";
      $$("my-classes").innerHTML = myclzhtml;
      if (zk == 0) {
        zk = 1;
        tnx(dt);
      } else {
        location.reload();
      }

      if (localStorage.theme == "d") {
        var array = document.getElementsByClassName("card-title");
        for (let i = 0; i < array.length; i++) {
          const element = array[i];
          element.style.color = "#ffff";
        }
      }
    }
    path = "live/";
    const dbRefObject = firebase.database().ref().child(path);
    dbRefObject.on("value", (snap) => vvc(snap.val()));

    function erl() {}
  }
  var pn = localStorage.getItem("pn");
  var et = btoa(pn);
  path = "students/" + encodeURIComponent(et);
  const dbRefObject = firebase.database().ref().child(path);
  if (localStorage.getItem("stdata") == null) {
    dbRefObject.on("value", (snap) => v2(snap.val()));
  } else {
    v2(JSON.parse(localStorage.getItem("stdata")));
    console.log("Student Data Loaded from Local Storage");
    function dr(val) {
      localStorage.setItem("stdata", JSON.stringify(val));
    }
    dbRefObject.on("value", (snap) => dr(snap.val()));
  }
}

function handleerror(err) {
  localStorage.setItem("authid", err);
  rest(err);
}
path = "/expologs/errorlogs/err";
const dbRefObject = firebase.database().ref().child(path);
if (localStorage.getItem("authid") != null) {
  rest(localStorage.getItem("authid"));
} else {
  // Sync object changes
  dbRefObject.once("value", (snap) => handleerror(snap.val()));
}

function launch(it) {
  cid = it.split("||")[0];
  tid = it.split("||")[1];
  localStorage.setItem("nclz", cid);
  localStorage.setItem("tp", tid);
  if (vhtml != null) {
    $$("vc").src = "js/viewclz.js";
    $$("slipz").src = "js/slips.js";
    $$("pays").src = "js/payments.js";
    $$("menus").src = "assets/vendor/js/menu.js";
    window.history.pushState("object or string", "Title", "/view-class");
    if (!document.getElementById("mclass").className.includes("active")) {
      document.getElementById("mclass").className =
        document.getElementById("mclass").className + " active";
    }
    document.getElementById("mdlink").href = "#";
    document.getElementById("mdlink").onclick = function () {
      history.back();
      document.title = "English RE - Online Learning";

      for (let c = 0; c < document.getElementsByClassName("sht").length; c++) {
        const e = document.getElementsByClassName("sht")[c];
        e.className = e.className.replace("active", "");
      }
      document.getElementById("mclass").className = document
        .getElementById("mclass")
        .className.replace("active", "");
      if (!document.getElementById("mdash").className.includes("active")) {
        document.getElementById("mdash").className =
          document.getElementById("mdash").className + " active";
      }
    };
    document.getElementById("mdash").className = document
      .getElementById("mdash")
      .className.replace("active", "");
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    $$("viewroot").innerHTML = vhtml;

    viewclass();
    slipsjs();
    $("#viewroot").fadeIn();
    $("#cont").fadeOut();
    window.onpopstate = function () {
      window.history.pushState("object or string", "Title", "/");
      var array = document.getElementsByClassName("menu-item open");
      for (let b = 0; b < array.length; b++) {
        const e = array[b];
        e.className = e.className.replace("open", "");
      }
      document.title = "English RE - Online Learning";

      for (let c = 0; c < document.getElementsByClassName("sht").length; c++) {
        const e = document.getElementsByClassName("sht")[c];
        e.className = e.className.replace("active", "");
      }
      document.getElementById("mclass").className = document
        .getElementById("mclass")
        .className.replace("active", "");
      if (!document.getElementById("mdash").className.includes("active")) {
        document.getElementById("mdash").className =
          document.getElementById("mdash").className + " active";
      }
      $("#viewroot").fadeOut();
      $("#cont").fadeIn();
    };
  } else {
    window.location.href = "view-class";
  }
}
