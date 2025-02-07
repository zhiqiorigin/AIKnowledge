import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './auth.scss'
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
                <h2>注册</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="username">用户名：</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="请输入你的用户名"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">邮箱：</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="请输入你的邮箱地址"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">密码：</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="请输入密码"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="confirm-password">确认密码：</label>
                        <input
                            type="password"
                            id="confirm-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="请再次输入密码"
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
                    <a href="/login" className="switch-to-login">
                        已有账号？去登录
                    </a>
                </form>
            </div>
        </div>
    );
};

export default RegisterComponent;
