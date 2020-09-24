import React from 'react';
import { useLocation } from 'react-router-dom';

function Error() {
  const {
    state: { error },
  } = useLocation();

  return <div>Error happen: {error}</div>;
}

export default Error;
