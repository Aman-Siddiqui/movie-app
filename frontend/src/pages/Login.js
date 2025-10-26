import React, { useState } from 'react';
import api, { setAuthToken } from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { email, password });
      const token = res.data?.access_token;
      if (token) {
       
        if (remember) localStorage.setItem('token', token);
        else sessionStorage.setItem('token', token);

       
        setAuthToken(token);

       
        navigate('/movies'); 
      } else {
        setError('Invalid server response');
      }
    } catch (err) {
      setError(err?.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

 
  React.useEffect(() => {
    const t = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (t) setAuthToken(t);
  }, []);

  return (
    <div className="app-bg flex items-center justify-center min-h-screen">
      <div className="absolute inset-0 pointer-events-none">
      
        <div className="wave" />
      </div>

      <div className="w-full max-w-md p-8">
        <div className="bg-transparent flex flex-col items-center mb-6">
         

          <h1 className="text-4xl text-white font-semibold mb-2">Sign in</h1>
        </div>

        <form onSubmit={onSubmit} className="bg-white/5 backdrop-blur-md rounded-lg p-6 shadow-lg">
          {error && (
            <div className="text-sm text-red-300 bg-red-900/30 p-2 rounded mb-4">{error}</div>
          )}

          <div className="mb-4">
            <label className="block text-sm text-white/80 mb-2">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              className="w-full px-3 py-2 rounded bg-white/5 border border-white/5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Email"
            />
          </div>

          <div className="mb-2">
            <label className="block text-sm text-white/80 mb-2">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              className="w-full px-3 py-2 rounded bg-white/5 border border-white/5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Password"
            />
          </div>

          <div className="flex items-center justify-between text-sm text-white/80 my-4">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
              <span>Remember me</span>
            </label>
            <button type="button" className="text-white/60 hover:underline">Forgot?</button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded bg-green-400 text-white font-semibold hover:bg-green-500 transition"
          >
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>
      </div>

    
{/* <svg className="wave-svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
  <path fill="#15484f" fillOpacity="1" d="M0,224L48,224C96,224,192,224,288,186.7C384,149,480,75,576,64C672,53,768,107,864,106.7C960,107,1056,53,1152,53.3C1248,53,1344,107,1392,133.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
</svg> */}

    </div>
  );
}
