import React, { useState } from 'react';
import { Rocket, BarChart3, ShieldCheck } from 'lucide-react';

interface SignupForm {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  userType: 'founder' | 'investor';
}

const Signup: React.FC = () => {
  const [form, setForm] = useState<SignupForm>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'founder',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen font-sans bg-[#F8F9FA]">
      

      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-24 py-12">
        <div className="mb-12">
          <img 
            src="/path-to-your-orbyt-logo.png" 
            alt="Orbyt Logo" 
            className="h-12 w-auto object-contain"
          />
        </div>

        <div className="max-w-md w-full">
          <h1 className="text-4xl font-light text-slate-900 mb-2">Create your account</h1>
          <p className="text-slate-500 mb-10 leading-relaxed">
            Join the elite network of startup curators and visionary founders.
          </p>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            {/* Input Fields */}
            <div className="group">
              <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1">Full Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="Alexander Hamilton"
                className="w-full border-b border-slate-200 py-2 focus:border-slate-900 outline-none transition-colors bg-transparent"
                onChange={handleInputChange}
              />
            </div>

            <div className="group">
              <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="alex@firm.com"
                className="w-full border-b border-slate-200 py-2 focus:border-slate-900 outline-none transition-colors bg-transparent"
                onChange={handleInputChange}
              />
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="group">
                <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="w-full border-b border-slate-200 py-2 focus:border-slate-900 outline-none transition-colors bg-transparent"
                  onChange={handleInputChange}
                />
              </div>
              <div className="group">
                <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1">Confirm</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="••••••••"
                  className="w-full border-b border-slate-200 py-2 focus:border-slate-900 outline-none transition-colors bg-transparent"
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Role Selector */}
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-4">I am signing up as a</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setForm({...form, userType: 'founder'})}
                  className={`flex flex-col items-center justify-center p-4 rounded-md border transition-all ${
                    form.userType === 'founder' 
                    ? 'border-[#0F1D2E] bg-white shadow-sm scale-105' 
                    : 'border-slate-100 bg-slate-50 opacity-60'
                  }`}
                >
                  <Rocket size={20} className="mb-2 text-slate-700" />
                  <span className="text-[10px] font-bold tracking-tighter uppercase">Founder</span>
                </button>
                <button
                  type="button"
                  onClick={() => setForm({...form, userType: 'investor'})}
                  className={`flex flex-col items-center justify-center p-4 rounded-md border transition-all ${
                    form.userType === 'investor' 
                    ? 'border-[#0F1D2E] bg-[#BAE6FF] shadow-sm scale-105' 
                    : 'border-slate-100 bg-slate-50 opacity-60'
                  }`}
                >
                  <BarChart3 size={20} className="mb-2 text-slate-700" />
                  <span className="text-[10px] font-bold tracking-tighter uppercase">Investor</span>
                </button>
              </div>
            </div>

            <button className="w-full bg-[#0F1D2E] text-white py-4 rounded-md font-medium hover:bg-slate-800 transition-colors mt-8">
              Create Account
            </button>
          </form>

          <p className="text-center mt-8 text-sm text-slate-500">
            Already have an account? <a href="#" className="text-blue-600 font-medium">Log in here</a>
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: THE HERO SECTION */}
      <div className="w-full md:w-1/2 bg-[#0F1D2E] text-white p-12 md:p-24 flex flex-col justify-between relative overflow-hidden">
        
        {/* Background Geometric Lines (SVG for precision) */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <circle cx="100" cy="50" r="45" stroke="white" strokeWidth="0.1" fill="none" />
            <circle cx="100" cy="50" r="60" stroke="white" strokeWidth="0.1" fill="none" />
            <line x1="0" y1="100" x2="100" y2="0" stroke="white" strokeWidth="0.1" />
          </svg>
        </div>

        {/* Stats */}
        <div className="flex justify-end gap-12 text-right relative z-10">
          <div>
            <h3 className="text-2xl font-bold">$4.2B</h3>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest">Total Curated Assets</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold">180+</h3>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest">Portfolio Founders</p>
          </div>
        </div>

        {/* Quote Section */}
        <div className="relative z-10 max-w-lg">
          <div className="w-12 h-1 bg-blue-300 mb-8" />
          <h2 className="text-5xl font-light leading-tight mb-12">
            "Architecture is not just about building structures, but about curating the foundations of future growth."
          </h2>
          
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded bg-slate-700 overflow-hidden">
              <img src="https://via.placeholder.com/150" alt="Marcus" className="w-full h-full object-cover grayscale" />
            </div>
            <div>
              <p className="font-bold text-sm">Marcus V. Sterling</p>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest">Managing Director, Architectural Ventures</p>
            </div>
          </div>
        </div>

        {/* Security Badge */}
        <div className="absolute bottom-8 right-8 bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-lg flex items-center gap-3">
          <ShieldCheck className="text-emerald-400" size={20} />
          <div>
            <p className="text-[10px] font-bold">Security Verified</p>
            <p className="text-[8px] text-slate-400">256-bit encrypted enrollment</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;