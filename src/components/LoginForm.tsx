import { useState } from 'react';
import { Eye, EyeOff, LogIn } from 'lucide-react';

interface LoginFormProps {
  onSubmit: (username: string, password: string) => void;
}

export default function LoginForm({ onSubmit }: LoginFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const e: typeof errors = {};
    if (!username.trim()) e.username = 'Username is required.';
    if (!password.trim()) e.password = 'Password is required.';
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    setErrors({});
    onSubmit(username.trim(), password);
  };

  return (
    <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.125rem' }}>
      {/* Username */}
      <div className="form-group">
        <label htmlFor="username" className="form-label">Username</label>
        <input
          id="username"
          type="text"
          autoComplete="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            if (errors.username) setErrors((p) => ({ ...p, username: undefined }));
          }}
          placeholder="Enter your username"
          className={`form-input${errors.username ? ' error' : ''}`}
        />
        {errors.username && <p role="alert" className="form-error">{errors.username}</p>}
      </div>

      {/* Password */}
      <div className="form-group">
        <label htmlFor="password" className="form-label">Password</label>
        <div className="input-wrapper">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) setErrors((p) => ({ ...p, password: undefined }));
            }}
            placeholder="Enter your password"
            className={`form-input${errors.password ? ' error' : ''}`}
            style={{ paddingRight: '3rem' }}
          />
          <button
            type="button"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            onClick={() => setShowPassword((v) => !v)}
            className="input-icon-right"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.password && <p role="alert" className="form-error">{errors.password}</p>}
      </div>

      {/* Submit */}
      <button type="submit" id="login-submit" className="btn btn-primary" style={{ marginTop: '0.5rem' }}>
        <LogIn size={18} />
        Sign In
      </button>
    </form>
  );
}
