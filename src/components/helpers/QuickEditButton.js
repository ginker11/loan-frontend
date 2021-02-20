import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-final-form';
import {
  Button,
  SaveButton,
  useNotify,
  FormWithRedirect,
  useRefresh,
  useRedirect,
  useMutation,
  FormDataConsumer,
  TabbedForm, 
  FormTab,
} from 'react-admin';
import IconContentEdit from '@material-ui/icons/Edit';
import IconCancel from '@material-ui/icons/Cancel';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { FormControlLabel, Checkbox, Typography } from '@material-ui/core';

function QuickEditButton({
  onChange,
  dialogResource,
  children,
  dialogFormField,
  dialogTitle,
  dialogCancelLabel,
  dialogMergeFormValues,
  dialogRedirect,
  dialogAddTextLabel,
  defaultValues,
  isShowEditButton = false
}) {
  const [showDialog, setShowDialog] = useState(false);
  const notify = useNotify();
  const refresh = useRefresh();
  const redirect = useRedirect();
  const form = useForm();
  const [mutation, { loading }] = useMutation();
  const isClientContractsResource = dialogResource === 'client_contracts';
  const [checked, setChecked] = useState(!isClientContractsResource);
  const checkedRef = useRef(false);

  useEffect(() => {
    if (isShowEditButton) {
      checkedRef.current = isShowEditButton;
      setChecked(isShowEditButton);
    }
  }, [isShowEditButton]);

  const handleChange = () => {
    checkedRef.current = !checked;
    setChecked(!checked);
  };

  const handleClick = () => {
    setShowDialog(true);
  };

  const handleCloseClick = () => {
    setShowDialog(false);
  };

  const handleSubmit = async values => {
    mutation(
      {
        type: 'update',
        resource: dialogResource,
        payload: {
          id: values.id,
          data: { ...values, ...dialogMergeFormValues }
        }
      },
      {
        onSuccess: ({ data }) => {
          if (dialogRedirect) {
            redirect(dialogRedirect);
            refresh();
          } else {
            form.change(dialogFormField, values.id);
          }
        },
        onFailure: error => notify(`Error: ${error.message}`, 'warning')
      }
    );
  };

  // let returnField;
  // if (children.length == 1) {
  //   returnField = children[0]
  // }
  return (
    <>
      <Button onClick={handleClick} label={dialogAddTextLabel}>
        <IconContentEdit />
      </Button>
      <Dialog
        fullWidth
        open={showDialog}
        onClose={handleCloseClick}
        aria-label={dialogTitle}
      >
        <DialogTitle>{dialogTitle}</DialogTitle>

        <FormWithRedirect
          initialValues={defaultValues}
          resource={dialogResource}
          save={handleSubmit}
          render={({ handleSubmitWithRedirect, pristine, saving }) => (
            <>
              <DialogContent> 
                          {children}
              </DialogContent>
              <DialogActions>
                <Button
                  label={dialogCancelLabel || 'Cancel'}
                  onClick={handleCloseClick}
                  disabled={loading}
                >
                  <IconCancel />
                </Button>
                <SaveButton
                  handleSubmitWithRedirect={handleSubmitWithRedirect}
                  pristine={pristine}
                  saving={saving}
                  disabled={loading || !checked}
                />
              </DialogActions>
            </>
          )}
        />
      </Dialog>
    </>
  );
}

export default QuickEditButton;
