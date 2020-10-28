import React from 'react';
import { Button } from '@material-ui/core';
import CloudDownload from '@material-ui/icons/CloudDownload';
const Incomes = () => {
  return (
    <>
      <Button variant='contained' color='primary'>
        Add Income&nbsp;&nbsp;
        <CloudDownload />
      </Button>
    </>
  );
};

export default Incomes;
