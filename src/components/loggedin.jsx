import React from 'react';

const LoggedIn = ({user}) => (
    <div>
        <p>Welcome, {user.displayName}</p>
    </div>
);

export default LoggedIn;