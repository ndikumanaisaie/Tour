import React from 'react';
import { MDBSpinner } from 'mdb-react-ui-kit';

const Spinner = () => {
  return (
    <MDBSpinner role='status' className='text-center me-2' style={{ marginTop: '100px', width: '3rem', height: '3rem' }} >
      <span className='visually-hidden'>Loading...</span>
    </MDBSpinner>
  );
};

export default Spinner