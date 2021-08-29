import React from 'react';
import { Button, CircularProgress } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import { useApolloClient } from '@apollo/client';
import refreshMasterCodeMutation from '../../../graphql/companies/mutation/refresh-master-code';

const RefreshButton = ({ _id, minLoadingTime = 1000 }) => {
  const client = useApolloClient();

  const [loading, setLoading] = React.useState(false);

  const handleClick = () => {
    setLoading(true);
    client.mutate({
      mutation: refreshMasterCodeMutation,
      variables: { _id },
    })
      .then(() => {
        setTimeout(() => setLoading(false), minLoadingTime);
      })
      .catch((error) => {
        console.log(error);
      });
    // setTimeout(function () {
    //     setLoading(false)
    // }, 3000)
  };

  return loading
    ? <CircularProgress size={15} color="inherit" style={{ display: 'block', margin: '0px 8px' }} />
    : (
      <RefreshIcon
        onClick={handleClick}
        style={{ display: 'block', cursor: 'pointer', margin: '0px 8px' }}
        fontSize="small"
      />
    );
};

export default RefreshButton;
