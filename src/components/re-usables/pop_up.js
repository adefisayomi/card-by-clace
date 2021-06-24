import {useState} from 'react'
import {Popup} from 'semantic-ui-react'


export default ({position= 'bottom right', trigger, content, basic, fixed}) => {

    const [open, setOpen] = useState(false)
    
    return (
        <Popup
          disabled= {!content}
          hoverable
          position= {position}
          eventsEnabled={true}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          trigger={trigger}
          positionFixed= {fixed}
          inverted
          basic= {basic}
          hideOnScroll
        >
          {content}
        </Popup>
    )
}