import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './auth.scss';
import Link from '@/components/Link';

interface RegisterProps {
    // 如果有需要，可以在这里定义 props
}

const RegisterComponent: React.FC<RegisterProps> = () => {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [termsOfService, setTermsOfService] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // 处理注册逻辑
        console.log('注册信息:', { username, email, password });
        // 这里可以添加你的后端调用代码
        navigate('/'); // 注册成功后的跳转
    };

    return (
        <div className="auth-container">
            <div className="auth-wrapper">
                {/* <img src="https://img.alicdn.com/tfs/TB1yhoIXHzqK1RjSZFgXXa7JXXa-200-200.png" alt="Product Logo" className="product-logo" /> */}
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="用户名"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="邮箱地址"
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
                    <div className="input-group">
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="确认密码"
                            required
                        />
                    </div>
                    <div className="terms-of-service">
                        <label>
                            <input
                                type="checkbox"
                                checked={termsOfService}
                                onChange={(e) => setTermsOfService(e.target.checked)}
                            />
                            我同意隐私政策和条款服务
                        </label>
                    </div>
                    <button type="submit" className="btn">注册</button>
                    <Link to="/login" className="switch-to-login">
                        已有账号？去登录
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default RegisterComponent;
