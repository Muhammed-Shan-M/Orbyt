import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';


const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen font-sans bg-[#F8F9FA]">
      
      {/* LEFT SIDE: THE FORM */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-24 py-12">
        
        <div className="mb-16 flex items-center font-bold text-slate-900 tracking-widest text-sm uppercase">
          <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 21h18"></path><path d="M5 21V7l8-4v18"></path><path d="M19 21V11l-6-3"></path><path d="M9 9v.01"></path><path d="M9 13v.01"></path><path d="M9 17v.01"></path>
          </svg>
          Architectural<br/>Investor
        </div>

        <div className="max-w-xs w-full">
          <h1 className="text-4xl font-light text-slate-900 mb-4 tracking-tight leading-tight">Welcome<br/>Back</h1>
          <p className="text-sm text-slate-500 mb-12 leading-relaxed">
            Access your curated<br/>investment portfolio.
          </p>

          {error && <div className="mb-6 text-xs text-red-500 bg-red-50 p-3 rounded">{error}</div>}

          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="group relative">
              <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1">Email Address</label>
              <input
                type="email"
                required
                placeholder="investor@firm.com"
                className="w-full border-b border-slate-200 py-2 focus:border-slate-900 outline-none transition-colors bg-transparent text-sm placeholder:text-slate-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="group relative">
              <div className="flex justify-between items-center mb-1">
                <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-400">Password</label>
                <Link to="/forgot-password" className="text-[10px] font-bold text-[#0F1D2E] uppercase tracking-widest">Forgot Password?</Link>
              </div>
              <input
                type="password"
                required
                placeholder="••••••••"
                className="w-full border-b border-slate-200 py-2 focus:border-slate-900 outline-none transition-colors bg-transparent text-lg tracking-widest placeholder:text-slate-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#0F1D2E] text-white py-4 rounded font-medium hover:bg-slate-800 transition-colors mt-8 flex justify-center items-center gap-2"
            >
              {loading ? 'Logging in...' : 'Login'}
              {!loading && <span className="text-lg">→</span>}
            </button>
          </form>

          <p className="text-center mt-12 text-sm text-slate-500 font-medium">
            New to the platform? <Link to="/signup" className="text-[#0F1D2E] hover:underline font-bold">Create<br/>Account</Link>
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: THE HERO SECTION */}
      <div className="w-full md:w-1/2 bg-[#234A56] text-white p-12 md:p-24 flex flex-col justify-center relative overflow-hidden">
        
        {/* Background building overlay */}
        <div className="absolute inset-x-0 bottom-0 top-1/3 opacity-20 pointer-events-none mix-blend-overlay bg-gradient-to-t from-black/80 to-transparent">
             <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />
        </div>

        <div className="relative z-10 max-w-lg">
          <div className="text-6xl text-slate-400/50 mb-6 font-serif">""</div>
          <h2 className="text-5xl font-light leading-tight mb-16 tracking-tight">
            "The<br/>investor of<br/>today does<br/>not profit<br/>from<br/>yesterday's<br/>growth."
          </h2>
          
          <div className="flex items-center gap-4 border-l border-white/20 pl-4">
            <div>
              <p className="font-bold text-[10px] tracking-widest uppercase">Warren Buffett</p>
              <p className="text-[8px] text-white/50 uppercase tracking-widest mt-1">Strategic Insights</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
