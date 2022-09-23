import React from 'react';
import { MDBSpinner } from 'mdb-react-ui-kit';

const Spinner = () => {
  return (
    <div className='text-center' style={{ marginTop: '100px', width: '3rem', height: '3rem' }} >
        <MDBSpinner role='status'>
          <span className='visually-hidden'>Loading...</span>
        </MDBSpinner>
    </div>
  )
}

export default Spinner