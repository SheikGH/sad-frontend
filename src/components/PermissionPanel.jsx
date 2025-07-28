import React from 'react';

const PermissionPanel = ({ user, permissions, onToggle, pages, accessTypes }) => {
  if (!user) return null;

  return (
    <div className="permission-panel">
      <h5>Permissions for {user.username}</h5>
      <table className="table table-sm table-bordered">
        <thead>
          <tr>
            <th>Page</th>
            {accessTypes.map(type => <th key={type}>{type}</th>)}
          </tr>
        </thead>
        <tbody>
          {pages.map(page => (
            <tr key={page}>
              <td>{page}</td>
              {accessTypes.map(access => (
                <td key={access}>
                  <input
                    type="checkbox"
                    checked={permissions.some(p => p.user === user.id && p.page === page && p.access === access)}
                    onChange={() => onToggle(user.id, page, access)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PermissionPanel;