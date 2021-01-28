import React from 'react';
import { TopToolbar, ListButton } from 'react-admin';
import ChevronLeft from '@material-ui/icons/ChevronLeft';


export const EditActions = ({ basePath, data }) => (
    <TopToolbar>
        <ListButton basePath={basePath} label="Back" icon={<ChevronLeft />} />
    </TopToolbar>
);
