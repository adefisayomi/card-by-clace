import cookie from '../../utils/actions/cookie'

export let themeObject = {
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

    if(action.type === 'TOGGLE_UI'){
        themeObject = {...themeObject, isDark: !themeObject.isDark}
        state = themeObject.isDark ? themeObject.dark : themeObject.light
        cookie.set('card_theme', state)
        return state
    }
    else {
        return state
    }
}