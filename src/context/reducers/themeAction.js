
export const themeObject = {
    isDark: true,
    dark: {
        body: 'rgb(22,27,34)',
        bgColor: 'rgb(9,12,16)',
        color: 'rgb(201,209,204)',
        border: '0.5px solid rgb(54, 54, 54)',
        dark: true
    },
    light: {
        body: '#fafafa',
        bgColor: 'white',
        color: 'rgb(70, 69, 69)',
        dark: false,
        border: '0.5px solid rgb(221, 221, 221)'
    }
    
}


export function themeReducer (state, action) {

    if(action.type === 'TOGGLE_UI') {
        state = { ...state, isDark: !state.isDark }
        typeof window !== 'undefined' && localStorage.setItem('card_theme', JSON.stringify(state))
        return state
    }
    else {
        return state
    }
}

// export function setThemeCookie(cname, cvalue, exdays) {
//     if (typeof window !== 'undefined') {
//         var d = new Date();
//         d.setTime(d.getTime() + (exdays*24*60*60*1000));
//         var expires = "expires="+ d.toUTCString();
//         document.cookie = cname + "=" + JSON.stringify(cvalue) + ";" + expires + ";path=/";
//     }
//   }

//   export function getThemeCookie(cname) {
//       if (typeof window !== 'undefined') {
//           var name = cname + "=";
//             var decodedCookie = decodeURIComponent(document.cookie);
//             var ca = decodedCookie.split(';');
//             for(var i = 0; i <ca.length; i++) {
//             var c = ca[i];
//             while (c.charAt(0) == ' ') {
//                 c = c.substring(1);
//             }
//             if (c.indexOf(name) == 0) {
//                 return JSON.parse(c.substring(name.length, c.length));
//             }
//             }
//             return "";
//       }
//   }