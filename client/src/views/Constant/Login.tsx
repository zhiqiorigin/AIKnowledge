import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './auth.scss'
interface LoginProps {
    // 如果有需要，可以在这里定义 props
}

const LoginComponent: React.FC<LoginProps> = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // 处理登录逻辑
        console.log('登录信息:', { username, password, rememberMe });
        // 这里可以添加你的后端调用代码
        navigate('/'); // 登录成功后的跳转
    };

    return (
        <div className="auth-container">
            <div className="auth-wrapper">
                <h2>登录</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="username">用户名或邮箱：</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="请输入你的用户名或邮箱"
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
                            placeholder="请输入你的密码"
                            required
                        />
                    </div>
                    <div className="remember-me">
                        <label>
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            记住我
                        </label>
                    </div>
                    <button type="submit" className="btn">登录</button>
                    <a href="/register" className="switch-to-register">
                        没有账号？去注册
                    </a>
                </form>
                <a href="/forgot-password" className="forgot-password">
                    忘记密码?
                </a>
            </div>
        </div>
    );
};

export default LoginComponent;
