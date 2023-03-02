var getcurrentuser = localStorage.getItem("stname")
console.log(getcurrentuser)
if (getcurrentuser) {
    //
} else {
    location.replace("login.html")
}