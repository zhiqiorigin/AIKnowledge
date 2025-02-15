import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './auth.scss';
import Link from '@/components/Link';

import { loginDataType } from '@/types/user';
import { postLoginAPI } from '@/api/user'; // 导入 postLoginAPI

const LoginComponent: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();
    const [error, setError] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const loginData: loginDataType = { username, password };
        try {
            const response = await postLoginAPI(loginData);
            if (response && response.access_token) {
                console.log('登录成功:', response);
                localStorage.setItem('token', response.access_token);
                navigate('/');
            } else {
                setError('登录失败：服务器返回数据格式不正确');
            }
        } catch (err: any) {
            console.error('登录失败:', err);
            setError(err.message || '用户名或密码错误');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-wrapper">
                <img 
                    src="/path-to-your-logo.png" 
                    alt="Logo" 
                    className="auth-logo" 
                />
                <h1>登录</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="用户名或邮箱"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="密码"
                            required
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" className="btn">登录</button>
                    <Link to="/register" className="switch-to-register">
                        没有账号？去注册
                    </Link>
                    <Link to="/" className="forgot-password">
                        忘记密码?
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default LoginComponent;