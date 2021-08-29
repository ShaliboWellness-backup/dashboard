import React from 'react';
import Paper from '@material-ui/core/Paper';

const CustomPaper = (props) => {
  const { style } = props;
  return (
    <Paper
      {...props}
      style={{
        ...style,
        boxShadow: '0 1px 15px 0 hsla(0,0%,48.2%,.1)',
      }}
    >
      {props.children}
    </Paper>
  );
};

export default CustomPaper;
