import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const VerifyEmail: React.FC = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  
  // Dummy email for display
  const email = "j.arch********@investor.com";

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-advance
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = () => {
    // static verify implementation
    navigate('/login');
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen font-sans bg-[#F8F9FA]">
      {/* LEFT SIDE: THE FORM */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-24 py-12 relative">
        <div className="max-w-md w-full">
          <h1 className="text-4xl font-light text-slate-900 mb-4">Verify your identity</h1>
          <p className="text-slate-500 mb-12 text-sm leading-relaxed">
            We've sent a 6-digit security code to <br/>
            <strong>{email}</strong>. Please enter it below to<br/>
            secure your account.
          </p>

          <div className="mb-6 flex gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => { inputRefs.current[index] = el; }}
                type="text"
                maxLength={1}
                className="w-12 h-10 border-b-2 border-slate-200 text-center text-xl font-medium focus:border-slate-900 outline-none transition-colors bg-transparent placeholder:text-slate-200"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
              />
            ))}
          </div>

          <div className="flex justify-between items-center mb-10 text-[10px] font-bold uppercase tracking-widest text-slate-500">
            <div className="flex items-center gap-1">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              Time remaining: 02:45
            </div>
            <button className="text-[#0F1D2E] hover:underline">Resend OTP</button>
          </div>

          <button 
            onClick={handleSubmit} 
            className="w-full bg-[#0F1D2E] text-white py-4 rounded font-medium hover:bg-slate-800 transition-colors mt-8"
          >
            Verify Account
          </button>

          <div className="mt-16">
            <Link to="/login" className="text-sm font-medium text-slate-500 hover:text-slate-900 flex items-center gap-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
              Back to Login
            </Link>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: THE HERO SECTION */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-[#1b343f] to-[#0A111A] text-white p-12 flex flex-col justify-center items-center relative overflow-hidden">
        <div className="max-w-md w-full relative z-10 flex flex-col items-center">
          
          {/* Abstract architecture image placeholder */}
          <div className="w-64 h-80 bg-slate-800 rounded mb-16 overflow-hidden shadow-2xl relative">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=2071&auto=format&fit=crop')] bg-cover bg-center grayscale contrast-125" />
          </div>

          <div className="w-full">
            <h2 className="text-5xl font-light leading-tight mb-4 tracking-tight border-b border-white/10 pb-8">
              "The best way to<br/>predict the future is<br/>to design it."
            </h2>
            <div className="text-[10px] text-white/40 uppercase tracking-widest text-center mt-4">
              Strategic Investment Advisory
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
