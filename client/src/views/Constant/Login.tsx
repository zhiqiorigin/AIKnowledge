import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './auth.scss';
import Link from '@/components/Link';

interface LoginProps {
    // 如果有需要，可以在这里定义 props
}

const LoginComponent: React.FC<LoginProps> = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // 处理登录逻辑
        console.log('登录信息:', { username, password });
        // 这里可以添加你的后端调用代码
        navigate('/'); // 登录成功后的跳转
    };

    return (
        <div className="auth-container">
            <div className="auth-wrapper">
                {/* <img src="https://img.alicdn.com/tfs/TB1yhoIXHzqK1RjSZFgXXa7JXXa-200-200.png" alt="Product Logo" className="product-logo" /> */}
                <h1>Login</h1>
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



