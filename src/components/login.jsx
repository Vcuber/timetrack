import React from 'react';
import Button from 'react-bootstrap/Button';

const Login = ({ login }) => (
    <div>
        <p>You're not logged in.</p>
        <Button onClick={login} variant="secondary" size="lg" active>LogIn using Google</Button>
    </div>
);

export default Login;