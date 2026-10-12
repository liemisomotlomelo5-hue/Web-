import React, { useState } from 'react';

function Login() {
  const [membershipId, setMembershipId] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const found = users.find(u => u.membershipId === membershipId);

    if (found) {
      setMessage(`Welcome back, ${found.name} (${found.role})!`);
    } else {
      setMessage('User not found. Please check your Membership ID.');
    }
  };

  return (
    <div style={{ maxWidth: '300px' }}>
      <h2>User Login</h2>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input type="text" placeholder="Enter Membership ID" value={membershipId} onChange={(e) => setMembershipId(e.target.value)} />
        <button type="submit">Login</button>
      </form>
      {message && <p style={{ marginTop: '10px' }}>{message}</p>}
    </div>
  );
}

export default Login;