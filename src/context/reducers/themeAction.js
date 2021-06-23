
export let themeObject = {
    isDark: false,
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

    if(action.type === 'TOGGLE_UI'){
        themeObject = {...themeObject, isDark: !themeObject.isDark}
        state = themeObject.isDark ? themeObject.dark : themeObject.light
        typeof window !== 'undefined' && localStorage.setItem('card_theme', JSON.stringify(state))
        return state
    }
    else {
        return state
    }
}