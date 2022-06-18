import React from 'react';
import Button from './../forms/Button';

const LoadMore = ({
  onLoadMoreEvt = () => { },
}) => {
  return (
    <Button onClick={() => onLoadMoreEvt()}>
     טעון עוד מוצרים
    </Button>
  );
};

export default LoadMore;
