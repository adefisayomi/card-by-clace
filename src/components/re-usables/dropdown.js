// import styles from './style/drop_down.module.css'
// import {Transition} from 'semantic-ui-react'
// import { useState } from 'react'
// import { GlobalState } from '../../context/globalState'


// export default function DropDown ({width, trigger, children, animation= {overlay: 'fade', menu: 'scale'} }) {

//     const {UI} = GlobalState()
//     const [visible, setVisible] = useState(false)
//     const toggleVisibility = () => setVisible(!visible)
//     const closeVisibility = () => setVisible(false)
    

//     return (
//         <div className= {styles.drop_down}>
//            <span className= {styles.drop_down_trigger} onClick= {toggleVisibility}>
//             {trigger}
//            </span>
//            <Transition visible={visible} animation= {animation.menu} duration={400}>
//                <div className= {styles.drop_down_list} style= {{ minWidth: width}}>
//                    {children}
//                </div>
//            </Transition>
//            <Transition visible={visible} animation= {animation.overlay} duration={400}>
//             <div className= {styles.drop_down_overlay} onClick= {closeVisibility}>
//                 {/*  */}
//             </div>
//            </Transition>
//         </div>
//     )
// }

import {useState} from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import styles from './style/drop_down.module.scss'



export default function dropDown ({trigger, children}) {

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div className= {styles.drop_down}>
      <span className= {styles.drop_down_trigger} aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
        {trigger}
      </span>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
          <span classname= {styles.drop_down_children}>
            {children}
          </span>
      </Popover>
    </div>
  );
}
