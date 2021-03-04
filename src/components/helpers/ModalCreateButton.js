import React, { useState, useCallback } from 'react';
import { useFormState } from 'react-final-form';
import { makeStyles } from '@material-ui/core/styles';
import QuickCreateButton from './QuickCreateButton';
const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center'
  }
});
const spySubscription = { values: true };
const ModalCreateButton = props => {
  const {disabled} = props;
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
      <QuickCreateButton onChange={handleChange} {...props} defaultValues={{}}>
        {props.children}
      </QuickCreateButton>
    );

};
export default ModalCreateButton;