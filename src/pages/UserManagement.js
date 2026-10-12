import React, { useState, useEffect } from 'react';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [membershipId, setMembershipId] = useState('');
  const [role, setRole] = useState('Member');
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    setUsers(JSON.parse(localStorage.getItem('users')) || []);
  }, []);

  const saveUsers = (newUsers) => {
    setUsers(newUsers);
    localStorage.setItem('users', JSON.stringify(newUsers));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !membershipId) {
      alert('Please fill out all user details.');
      return;
    }

    if (editIndex !== null) {
      const updated = [...users];
      updated[editIndex] = { name, membershipId, role };
      saveUsers(updated);
      setEditIndex(null);
    } else {
      saveUsers([...users, { name, membershipId, role }]);
    }
    setName('');
    setMembershipId('');
  };

  const handleDelete = (index) => {
    saveUsers(users.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h2>User Management</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
        <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="Membership ID" value={membershipId} onChange={(e) => setMembershipId(e.target.value)} />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="Member">Member</option>
          <option value="Librarian">Librarian</option>
          <option value="Admin">Admin</option>
        </select>
        <button type="submit">{editIndex !== null ? 'Update User' : 'Add User'}</button>
      </form>

      <h3>Registered Users</h3>
      <ul>
        {users.map((u, i) => (
          <li key={i} style={{ marginBottom: '10px' }}>
            {u.name} ({u.membershipId}) - Role: {u.role}
            <button onClick={() => { setName(u.name); setMembershipId(u.membershipId); setRole(u.role); setEditIndex(i); }} style={{ marginLeft: '10px' }}>Edit</button>
            <button onClick={() => handleDelete(i)} style={{ marginLeft: '5px' }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserManagement;