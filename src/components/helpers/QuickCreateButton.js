import React, { useState } from 'react';
import { useForm } from 'react-final-form';
import {
  Button,
  SaveButton,
  useCreate,
  useNotify,
  FormWithRedirect,
  useRefresh,
  useRedirect
} from 'react-admin';
import IconContentAdd from '@material-ui/icons/Add';
import IconCancel from '@material-ui/icons/Cancel';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
function QuickCreateButton({
  onChange,
  dialogResource,
  children,
  dialogFormField,
  dialogTitle,
  dialogCancelLabel,
  dialogMergeFormValues,
  dialogRedirect,
  dialogAddTextLabel
}) {
  const [showDialog, setShowDialog] = useState(false);
  const notify = useNotify();
  const refresh = useRefresh();
  const redirect = useRedirect();
  const form = useForm();
  const [create, { loading }] = useCreate(dialogResource);
  const handleClick = () => {
    setShowDialog(true);
  };
  const handleCloseClick = () => {
    setShowDialog(false);
  };
  const handleSubmit = async values => {
    console.log('Create: ', dialogMergeFormValues);
    create(
      { payload: { data: { ...values, ...dialogMergeFormValues } } },
      {
        onSuccess: ({ data }) => {
          setShowDialog(false);
          // Update the comment form to target the newly created post
          // Updating the ReferenceInput value will force it to reload the available posts
          if (dialogRedirect) {
            redirect(dialogRedirect);
            refresh();
          } else {
            form.change(dialogFormField, data.id);
            // refresh();
          }
          onChange(data);
        },
        onFailure: ({ error }) => {
          notify(error.message, 'error');
        }
      }
    );
  };
  return (
    <>
      <Button onClick={handleClick} label={dialogAddTextLabel}>
        <IconContentAdd />
      </Button>
      <Dialog
        fullWidth
        open={showDialog}
        onClose={handleCloseClick}
        aria-label={dialogTitle}
      >
        <DialogTitle>{dialogTitle}</DialogTitle>
        <FormWithRedirect
          initialValues={{}}
          resource={dialogResource}
          save={handleSubmit}
          render={({ handleSubmitWithRedirect, pristine, saving }) => (
            <>
              <DialogContent>{children}</DialogContent>
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
                  disabled={loading}
                />
              </DialogActions>
            </>
          )}
        />
      </Dialog>
    </>
  );
}
export default QuickCreateButton;