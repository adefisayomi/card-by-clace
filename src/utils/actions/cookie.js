
const set = (cname, cvalue, exhour= 1260) => {
    if (typeof window !== 'undefined') {
        const d = new Date();
        d.setTime(d.getTime() + (exhour * 60 * 60 * 1000));
        let expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + JSON.stringify(cvalue) + ";" + expires + ";path=/";
    }
    
  }
  
  const get = (cname) => {
      if (typeof window !== 'undefined') {
           let name = cname + "=";
            let ca = document.cookie.split(';');
            for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return JSON.parse(c.substring(name.length, c.length));
            }
            }
            return "";
      }
   
  }
  
//   const checkCookie() {
//     let user = getCookie("username");
//     if (user != "") {
//       alert("Welcome again " + user);
//     } else {
//       user = prompt("Please enter your name:", "");
//       if (user != "" && user != null) {
//         setCookie("username", user, 365);
//       }
//     }
//   }


module.exports = {
    set, get
}