import { useRef } from "react";
import { Icon} from "semantic-ui-react";
import { GlobalState } from "../../context/globalState";
import styles from './style/searchTab.module.css'


export default function SearchTab ({onBlur, onFocus, id}) {

    const inputRef = useRef()
    const {UI} = GlobalState()

    return (
       <div className= {styles.search_tab} style= {{ color: UI.color, backgroundColor: UI.body }}>
           <input onFocus= {onFocus} onBlur= {onBlur} id= {id} ref= {inputRef} type="text" placeholder= 'search...' />
           <span className= {styles.search_tab_icon}><Icon name= 'search' color= 'grey' link onClick= {() => inputRef.current.focus()} /></span>
       </div>
    ) 
}