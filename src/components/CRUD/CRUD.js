import React from 'react';
import { useQuery } from 'react-admin';
import { getGroups, isAdmin } from './authProvider';
import {
    useLogout,
    FormTab,
    Datagrid,
    Create,
    Edit,
    Show,
    List
} from 'react-admin';
import { ListGuesser } from '@api-platform/admin';
import { withStyles } from '@material-ui/core/styles';

export const StyledFormTab = withStyles(theme => ({
    root: {
        fontWeight: 700,
        fontSize: '0.7rem',
        minWidth: 'unset',
        maxWidth: 127,
        padding: '17px 17px 12px 17px'
    }
}))(props => <FormTab {...props} />);

export function useGranted(resource) {
    const groupIds = getGroups(),
        logout = useLogout();
    let groups = [];

    if (!!groupIds) {
        groups = groupIds.map(el => `groups/${el}`);
    }

    const payload = {
        pagination: { page: 1 },
        sort: { field: 'resource', order: 'ASC' },
        filter: { group: groups, resource }
    };

    const { data, loading, error } = useQuery({
        type: 'getList',
        resource: 'role_authorizations',
        payload
    });

    if (loading) return null;
    if (error) return null;

    if (data && data.length) {
        const payload = data[0];

        return {
            hasCreate: payload.allowCreate,
            hasEdit: payload.allowEdit,
            hasList: payload.allowList,
            hasDelete: payload.allowDelete,
        };
    }

    return null;
}

const InitialState = {
    hasCreate: false,
    hasEdit: false,
    hasList: false,
    hasShow: false,
    hasDelete: false,
    hasExport: false
};

export function CRUDPermissionList({ children, permissions, ...props }) {
    const admin = isAdmin(permissions),
        granted = useGranted(props.resource);

    return <List {...props}>{children}</List>;
}

export function CRUDPermissionListGuesser({ children, permissions, ...props }) {
    const admin = isAdmin(permissions),
        granted = useGranted(props.resource);

    if (!admin) {
        props = { ...props, ...InitialState, ...granted };
        props = { ...props, bulkActionButtons: props.hasDelete };

        children = React.Children.map(children, child => {
            if (child.type.name === 'BooleanToggleField') {
                return React.cloneElement(child, {
                    ...props,
                    disabled: !props.hasEdit
                });
            }
            return React.cloneElement(child, {
                ...props
            });
        });
    }

    return <ListGuesser {...props}>{children}</ListGuesser>;
}

export function CRUDPermissionFormTab({
                                          children,
                                          permissions,
                                          permissionResource,
                                          ...props
                                      }) {
    const granted = useGranted(permissionResource),
        admin = isAdmin(permissions);

    if (!admin) {
        props = { ...props, ...InitialState, ...granted };
    }

    if ('hasList' in props && !props.hasList) return <div />;
    if ('hasCreate' in props && !props.hasCreate) {
        children = React.Children.map(children, child => {
            if (!child.props.actionTypeCreate) {
                return child;
            }
        });
    }
    return <StyledFormTab {...props}>{children}</StyledFormTab>;
}

export function CRUDPermissionDatagrid({ children, permissions, ...props }) {
    const granted = useGranted(props.resource),
        admin = isAdmin(permissions);

    if (!admin) {
        props = { ...props, ...InitialState, ...granted };

        children = React.Children.map(children, child => {
            if (child.props.actionTypeEdit) {
                if (props.hasEdit) {
                    return child;
                }
            } else if (child.props.actionTypeDelete) {
                if (props.hasDelete) {
                    return child;
                }
            } else {
                return child;
            }
        });
    }

    return <Datagrid>{children}</Datagrid>;
}

export function CRUDPermissionCreate({ children, permissions, ...props }) {
    const granted = useGranted(props.resource),
        admin = isAdmin(permissions);

    if (!admin) {
        props = { ...props, ...InitialState, ...granted };
    }

    if (!props.hasCreate) return null;

    return <Create {...props}>{children}</Create>;
}

export function CRUDPermissionEdit({ children, permissions, ...props }) {
    const granted = useGranted(props.resource),
        admin = isAdmin(permissions);

    if (!admin) {
        props = { ...props, ...InitialState, ...granted };
    }

    if (!props.hasEdit) return null;

    return <Edit {...props}>{children}</Edit>;
}

export function CRUDPermissionShow({ children, permissions, ...props }) {
    const granted = useGranted(props.resource),
        admin = isAdmin(permissions);

    if (!admin) {
        props = { ...props, ...InitialState, ...granted };
    }

    if (!props.hasShow) return null;

    return <Show {...props}>{children}</Show>;
}
