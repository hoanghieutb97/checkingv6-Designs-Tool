import React, { useState } from 'react';

const PasswordProtected = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === '123456') {
            setIsAuthenticated(true);
            setError('');
        } else {
            setError('Mật khẩu không đúng!');
            setPassword('');
        }
    };

    if (isAuthenticated) {
        return children;
    }

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '200px',
            padding: '20px'
        }}>
            <div style={{
                background: '#f5f5f5',
                padding: '30px',
                borderRadius: '10px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                textAlign: 'center'
            }}>
                <h3 style={{ marginBottom: '20px', color: '#333' }}>
                    Nhập mật khẩu để truy cập
                </h3>
                <form onSubmit={handleSubmit}>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Nhập mật khẩu..."
                        style={{
                            padding: '10px 15px',
                            fontSize: '16px',
                            border: '1px solid #ddd',
                            borderRadius: '5px',
                            width: '250px',
                            marginBottom: '10px'
                        }}
                    />
                    <br />
                    <button
                        type="submit"
                        style={{
                            padding: '10px 20px',
                            fontSize: '16px',
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        Xác nhận
                    </button>
                </form>
                {error && (
                    <p style={{ color: 'red', marginTop: '10px' }}>
                        {error}
                    </p>
                )}
            </div>
        </div>
    );
};

export default PasswordProtected; 