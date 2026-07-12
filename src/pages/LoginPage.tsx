import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import LoginForm from '../components/LoginForm';
import { Shield } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);

  const handleSubmit = (username: string, _password: string) => {
    login(username);
    navigate('/home', { replace: true });
  };

  return (
    <div className="page-center">
      {/* Ambient blobs */}
      <div className="blob blob-brand" style={{ width: 380, height: 380, top: '20%', left: '-10%' }} />
      <div className="blob blob-accent" style={{ width: 340, height: 340, bottom: '15%', right: '-8%' }} />

      <div className="animate-slide-up" style={{ width: '100%', maxWidth: '26rem', position: 'relative' }}>
        <div className="login-card">
          <div className="login-card-header">
            <div className="login-icon-wrap">
              <Shield size={26} color="#fff" />
            </div>
            <h1 className="login-title">Welcome back</h1>
            <p className="login-sub">Sign in to your InsureAI account</p>
          </div>

          <LoginForm onSubmit={handleSubmit} />
        </div>

        <p className="login-footer">
          InsureAI &middot; AI-Native Insurance Automation
        </p>
      </div>
    </div>
  );
}
