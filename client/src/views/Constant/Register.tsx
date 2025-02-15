import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './auth.scss';
import Link from '@/components/Link';

import { registerDataType } from '@/types/user';
import { postRegisterAPI } from '@/api/user';

const RegisterComponent: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [termsOfService, setTermsOfService] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Validation checks
        if (password !== confirmPassword) {
            setError('两次输入的密码不一致');
            return;
        }
        if (!termsOfService) {
            setError('请同意隐私政策和条款服务');
            return;
        }

        const registerData: registerDataType = { username, email, password };
        try {
            const response = await postRegisterAPI(registerData);
            if (response && response.data) {
                console.log('注册成功:', response);
                navigate('/login', { replace: true });
            } else {
                setError('注册失败：服务器返回数据格式不正确');
            }
        } catch (err: any) {
            console.error('注册失败:', err);
            setError(err.response?.data?.message || '注册失败，请稍后重试');
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
                <h1>注册账号</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="请输入用户名"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="请输入邮箱"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="请输入密码"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="请确认密码"
                            required
                        />
                    </div>
                    <div className="terms-group">
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={termsOfService}
                                onChange={(e) => setTermsOfService(e.target.checked)}
                                id="terms"
                            />
                            <span>同意隐私政策和条款服务</span>
                        </label>
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" className="btn">立即注册</button>
                    <Link to="/login" className="switch-to-register">
                        已有账号？去登录
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default RegisterComponent;