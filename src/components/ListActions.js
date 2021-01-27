import * as React from 'react';
import {
    useListContext,
    TopToolbar,
    CreateButton,
    sanitizeListRestProps,
} from 'react-admin';

export const ListActions = (props) => {
    const { className, ...rest } = props;
    const { basePath } = useListContext(props);

    return (
        <TopToolbar className={className} {...sanitizeListRestProps(rest)}>
            <CreateButton basePath={basePath} label = 'Create' />
        </TopToolbar>
    );
};