
export const themeObject = {
    isDark: false,
    dark: {
        body: 'rgb(22,27,34)',
        bgColor: 'rgb(9,12,16)',
        color: 'rgb(201,209,204)',
        // color: 'rgb(70, 69, 69)',
        border: '0.5px solid rgb(54, 54, 54)',
        dark: true
    },
    light: {
        body: '#fafafa',
        // body: 'rgb(22,27,34)',
        bgColor: 'white',
        color: 'rgb(70, 69, 69)',
        dark: false,
        border: '0.5px solid rgb(221, 221, 221)'
    }
    
}


export function themeReducer (state, action) {

    if(action.type === 'TOGGLE_UI') {
        state = {  ...state, isDark: !state.isDark }
        window.localStorage.setItem('card_theme', JSON.stringify(state))
        return state
    }
    else {
        return state
    }
}