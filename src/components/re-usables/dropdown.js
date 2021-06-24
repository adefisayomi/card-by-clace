import {useState} from 'react';
import Popover from '@material-ui/core/Popover';
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
