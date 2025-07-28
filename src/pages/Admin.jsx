import React, { useEffect, useState } from 'react';
import api from '../api/api';
import './Admin.css';
import PermissionPanel from '../components/PermissionPanel';

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const pages = [
        'products', 'marketing', 'orders', 'media', 'pricing',
        'clients', 'suppliers', 'support', 'sales', 'finance'
    ];
    const accessTypes = ['view', 'edit', 'create', 'delete'];

    useEffect(() => {
        fetchUsers();
        fetchPermissions();
    }, []);

    const fetchUsers = async () => {
        const res = await api.get('/user/users/');
        setUsers(res.data);
    };

    const fetchPermissions = async () => {
        const res = await api.get('/user/permissions/');
        setPermissions(res.data);
    };

    const getPermission = (userId, page, access) => {
        return permissions.some(p => p.user === userId && p.page === page && p.access === access);
    };

    const togglePermission = async (userId, page, access) => {
        const match = permissions.find(p => p.user === userId && p.page === page && p.access === access);
        if (match) {
            await api.delete(`/user/permissions/${match.id}/`);
        } else {
            await api.post('/user/permissions/', { user: userId, page, access });
        }
        fetchPermissions();
    };

    return (
        <div className="container-fluid mt-4">
            <h2>Super Admin Dashboard</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>User</th>
                        {pages.map(page => <th key={page}>{page}</th>)}
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.username}</td>
                            {pages.map(page => (
                                <td key={page}>
                                    {accessTypes.map(access => (
                                        <div key={access}>
                                            <input
                                                type="checkbox"
                                                checked={getPermission(user.id, page, access)}
                                                onChange={() => togglePermission(user.id, page, access)}
                                            /> {access}
                                        </div>
                                    ))}
                                </td>
                            ))}
                            <td>
                                <button className="btn btn-sm btn-secondary" onClick={() => setSelectedUser(user)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <PermissionPanel
                    user={selectedUser}
                    permissions={permissions}
                    onToggle={togglePermission}
                    pages={pages}
                    accessTypes={accessTypes}
                />
            </div>
        </div>
    );
};

export default Admin;

