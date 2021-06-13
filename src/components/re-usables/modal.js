import React from 'react';
import Modal from '@material-ui/core/Modal';
import styles from './style/modal.module.css'



export default function modal ({children}) {
  const rootRef = React.useRef(null);

  return (
    <div className= {styles.modal_container} ref={rootRef}>
      <Modal
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        open
        aria-labelledby="server-modal-title"
        aria-describedby="server-modal-description"
        className={styles.modal}
        container={() => rootRef.current}
      >
        <div className={styles.modal_children}>
          {children}
        </div>
      </Modal>
    </div>
  );
}
