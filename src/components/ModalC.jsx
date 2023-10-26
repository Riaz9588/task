import React from 'react';

function ModalC({ show, handleClose, data }) {
  return (
    <div>
      <div className={`modal fade${show ? ' show' : ''}`} style={{ display: show ? 'block' : 'none' }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Contact Data</h5>
              <button type="button" className="btn-close" onClick={handleClose}></button>
            </div>
            <div className="modal-body">
              <p>{data?.id}</p>  
              <p>{data?.country.name}</p>  
              <p>{data?.phone}</p>  
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalC;
