import React, { useState, useCallback, Children } from 'react';
import { useFormState } from 'react-final-form';
import { makeStyles } from '@material-ui/core/styles';

import QuickEditButton from './QuickEditButton';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center'
  }
});

const spySubscription = { values: true };

const ModalEditButton = props => {
  const classes = useStyles();
  const [version, setVersion] = useState(0);
  const { values } = useFormState({ subscription: spySubscription });
  const handleChange = useCallback(
    data => {
      return setVersion(version + 1);
    },
    [version]
  );

  return (
    <QuickEditButton
      onChange={handleChange}
      {...props}
      defaultValues={props.record}
    >
      {React.Children.map(props.children, child =>
        React.cloneElement(child, { record: props.record })
      )}
    </QuickEditButton>
  );
};

export default ModalEditButton;
