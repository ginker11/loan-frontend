import * as React from 'react';
import { useQuery } from 'react-admin';

export const UserFullName = id => {
    const { data, loading, error } = useQuery({
        type: 'getOne',
        resource: 'users',
        payload: { id: '/api/users/'+id }
    });

    if (loading) return null;
    if (error) return null;
    if (!data) return null;

    return data.name;
};