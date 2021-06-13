import {useEffect, useState} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert  from '@material-ui/lab/Alert';
import { GlobalState } from '../../context/globalState';



export default () => {

  const {alert, setAlert} = GlobalState()
  const [open, setOpen] = useState(false)
  const handleClose = (e, reason) => {
      if (reason === 'clickaway') {
          return
      }
      else {
        setOpen(false)
        setTimeout(() => setAlert({}), 200)
      }
  }

  useEffect(() => {
      const getAlert = () => alert && alert.message && setOpen(true)
      getAlert()
  }, [alert.message])

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
      >
        <Alert onClose={handleClose} variant="filled" severity= { alert && alert.type === 'error' ? 'error' : 'success'}>
          {alert && alert.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
