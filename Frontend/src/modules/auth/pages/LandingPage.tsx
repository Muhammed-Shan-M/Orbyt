import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const LandingPage: React.FC = () => {
  const [activeRole, setActiveRole] = useState<'founder' | 'investor'>('founder')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

 

  useEffect(() => {
    
  })

  return (
    <div className="min-h-screen bg-orbyt-bg text-orbyt-text font-body overflow-x-hidden">

      {/* ── NAV ── */}
      <nav className="sticky top-0 z-50 border-b border-orbyt-border"
        style={{ background: 'rgba(7,8,12,0.88)', backdropFilter: 'blur(20px)' }}>
        <div className="max-w-6xl mx-auto px-6 h-[60px] flex items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-orbyt-emerald flex items-center justify-center flex-shrink-0">
              <span className="font-display font-800 text-orbyt-bg text-xs">O</span>
            </div>
            <span className="font-display font-800 text-orbyt-text text-base tracking-tight">Orbyt</span>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {['Platform', 'For Founders', 'For Investors', 'Community'].map((item) => (
              <button key={item}
                className="px-3.5 py-2 rounded-lg text-[13px] text-orbyt-muted hover:text-orbyt-text hover:bg-orbyt-surface transition-all duration-200">
                {item}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2.5">
            <Link to="/login"
              className="hidden sm:block text-[13px] text-orbyt-muted hover:text-orbyt-text transition-colors px-3 py-2">
              Log in
            </Link>
            <Link to="/signup"
              className="bg-orbyt-emerald text-orbyt-bg text-[13px] font-display font-600 px-4 py-2 rounded-lg hover:bg-orbyt-emerald3 transition-colors">
              Get started
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative pt-24 pb-20 px-6 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(#00C896 1px, transparent 1px), linear-gradient(90deg, #00C896 1px, transparent 1px)',
            backgroundSize: '72px 72px',
          }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px]"
          style={{ background: 'radial-gradient(ellipse, rgba(0,200,150,0.07) 0%, transparent 70%)' }} />
        <div className="absolute top-32 right-0 w-[400px] h-[400px]"
          style={{ background: 'radial-gradient(circle, rgba(0,200,150,0.04) 0%, transparent 70%)' }} />

        <div className="relative max-w-6xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orbyt-emerald/20 bg-orbyt-emerald/5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-orbyt-emerald animate-pulse-soft" />
            <span className="text-orbyt-emerald text-xs font-display font-600 tracking-wider uppercase">
              AI-Powered Startup Ecosystem
            </span>
          </div>

          <h1 className="font-display font-800 text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.02] mb-6">
            Where Founders Meet<br />
            <span className="text-orbyt-emerald">the Right Investors</span>
          </h1>
          <p className="text-orbyt-muted font-body font-300 text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
            No noise. No spam. Just meaningful connections — powered by AI that understands both sides of the table.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16">
            <Link to="/signup"
              className="bg-orbyt-emerald text-orbyt-bg font-display font-600 text-sm px-7 py-3.5 rounded-xl hover:bg-orbyt-emerald3 transition-all hover:-translate-y-0.5 hover:shadow-emerald-glow">
              Launch your startup ↗
            </Link>
            <Link to="/signup"
              className="bg-transparent border border-orbyt-border text-orbyt-text font-body text-sm px-7 py-3.5 rounded-xl hover:border-orbyt-border2 hover:bg-orbyt-surface transition-all">
              I'm an investor
            </Link>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 md:gap-12 flex-wrap">
            {[
              { val: '2,400+', label: 'Startups listed' },
              { val: '$180M+', label: 'Capital deployed' },
              { val: '860+', label: 'Active investors' },
              { val: '94%', label: 'Match accuracy' },
            ].map((s, i) => (
              <React.Fragment key={s.label}>
                {i > 0 && <div className="hidden md:block w-px h-8 bg-orbyt-border" />}
                <div className="text-center">
                  <div className="font-display font-800 text-2xl text-orbyt-emerald">{s.val}</div>
                  <div className="text-orbyt-muted text-xs mt-0.5">{s.label}</div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 px-6 border-t border-orbyt-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-[10px] font-display font-700 tracking-[0.2em] uppercase text-orbyt-emerald mb-3">
              The process
            </div>
            <h2 className="font-display font-800 text-3xl md:text-4xl tracking-tight">
              The Seamless Path to Connection
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-0 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-orbyt-border z-0" />

            {[
              { n: '01', title: 'Create profile', desc: 'Deep profile setup for precise matching logic.' },
              { n: '02', title: 'Get matched', desc: 'Our AI surfaces the most relevant connections.' },
              { n: '03', title: 'Show interest', desc: 'Opt-in to conversations with zero friction.' },
              { n: '04', title: 'Connect & discuss', desc: 'High-signal environment for final execution.' },
            ].map((step) => (
              <div key={step.n} className="relative z-10 flex flex-col items-start md:items-center text-left md:text-center px-6 py-4">
                <div className="w-12 h-12 rounded-xl bg-orbyt-surface border border-orbyt-border flex items-center justify-center mb-5 flex-shrink-0">
                  <span className="font-display font-800 text-sm text-orbyt-emerald">{step.n}</span>
                </div>
                <h3 className="font-display font-700 text-base text-orbyt-text mb-2">{step.title}</h3>
                <p className="text-orbyt-muted text-sm font-body font-300 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BUILT FOR INTENT ── */}
      <section className="py-24 px-6 bg-orbyt-surface border-y border-orbyt-border">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start mb-16">
            <div>
              <div className="text-[10px] font-display font-700 tracking-[0.2em] uppercase text-orbyt-emerald mb-3">Platform</div>
              <h2 className="font-display font-800 text-3xl md:text-4xl tracking-tight leading-tight">
                Built for Intent.
              </h2>
            </div>
            <div className="flex items-end">
              <p className="text-orbyt-muted font-body font-300 text-base leading-relaxed">
                A curated ecosystem where every interaction is intentional, structured, and verified.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                ),
                title: 'AI-powered matchmaking',
                desc: 'Deep analysis of investor thesis vs founder trajectory.',
              },
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                ),
                title: 'Structured pitch discovery',
                desc: 'Standardized data points for instant, comparative analysis.',
              },
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                  </svg>
                ),
                title: 'No spam communication',
                desc: 'Messaging only opens once mutual interest is established.',
              },
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: 'Verified investor network',
                desc: 'Rigorous vetting process for all participants in the network.',
              },
            ].map((f) => (
              <div key={f.title}
                className="bg-orbyt-bg border border-orbyt-border rounded-xl p-6 hover:border-orbyt-border2 transition-all duration-200 group">
                <div className="w-10 h-10 rounded-lg bg-orbyt-emerald/10 border border-orbyt-emerald/15 flex items-center justify-center mb-5 text-orbyt-emerald group-hover:bg-orbyt-emerald/15 transition-colors">
                  {f.icon}
                </div>
                <h3 className="font-display font-700 text-[15px] text-orbyt-text mb-2 leading-tight">{f.title}</h3>
                <p className="text-orbyt-muted text-[13px] font-body font-300 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLATFORM INTELLIGENCE ── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-[10px] font-display font-700 tracking-[0.2em] uppercase text-orbyt-emerald mb-3">Features</div>
          <h2 className="font-display font-800 text-3xl md:text-4xl tracking-tight mb-12">Platform Intelligence</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: 'Mutual Match System', desc: 'Connections only happen when both sides say yes.' },
              { title: 'Controlled Messaging', desc: 'Rich media messaging with expiration and privacy controls.' },
              { title: 'Structured Pitch Feed', desc: 'No long PDFs. Interactive data visualizations of startup metrics.' },
              { title: 'Investor Intent Posts', desc: 'Investors share exactly what they are looking for this month.' },
              { title: 'Booking System', desc: 'Integrated calendar scheduling for seamless intro calls.' },
              {
                title: 'Explore more',
                desc: '',
                cta: true,
              },
            ].map((item) => (
              <div key={item.title}
                className={`rounded-xl p-6 border transition-all duration-200 ${
                  item.cta
                    ? 'bg-orbyt-emerald text-orbyt-bg border-orbyt-emerald cursor-pointer hover:bg-orbyt-emerald3 flex flex-col justify-between min-h-[140px]'
                    : 'bg-orbyt-surface border-orbyt-border hover:border-orbyt-border2'
                }`}>
                <h3 className={`font-display font-700 text-[15px] mb-2 ${item.cta ? 'text-orbyt-bg' : 'text-orbyt-text'}`}>
                  {item.title}
                </h3>
                {item.desc && (
                  <p className={`text-[13px] font-body font-300 leading-relaxed ${item.cta ? 'text-orbyt-bg/70' : 'text-orbyt-muted'}`}>
                    {item.desc}
                  </p>
                )}
                {item.cta && (
                  <div className="flex items-center justify-end mt-4">
                    <svg className="w-5 h-5 text-orbyt-bg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECURITY ── */}
      <section className="py-20 px-6 bg-orbyt-surface border-y border-orbyt-border">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-[10px] font-display font-700 tracking-[0.2em] uppercase text-orbyt-emerald mb-3">Trust</div>
              <h2 className="font-display font-800 text-3xl tracking-tight leading-tight mb-4">
                Security and integrity<br />at our core.
              </h2>
              <p className="text-orbyt-muted font-body font-300 text-[15px] leading-relaxed">
                We operate with the confidentiality of a private bank and the efficiency of modern tech.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ),
                  label: 'Verified investors',
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                    </svg>
                  ),
                  label: 'No spam policy',
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  ),
                  label: 'Controlled access',
                },
              ].map((t) => (
                <div key={t.label} className="flex flex-col items-center text-center gap-3 p-4 bg-orbyt-bg border border-orbyt-border rounded-xl">
                  <div className="text-orbyt-emerald">{t.icon}</div>
                  <span className="text-orbyt-text text-xs font-display font-600">{t.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOR FOUNDERS / INVESTORS ── */}
      <section className="grid md:grid-cols-2 min-h-[400px]">
        <div className="bg-orbyt-surface border-r border-orbyt-border p-12 md:p-16 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="text-[10px] font-display font-700 tracking-[0.2em] uppercase text-orbyt-emerald">For Founders</div>
            <h2 className="font-display font-800 text-3xl tracking-tight text-orbyt-text">
              Build your narrative with structured data.
            </h2>
            <p className="text-orbyt-muted font-body font-300 text-[15px] leading-relaxed max-w-sm">
              Get in front of investors who actually invest in your stage and sector.
            </p>
          </div>
          <Link to="/signup"
            className="inline-flex items-center gap-2 bg-orbyt-emerald text-orbyt-bg font-display font-600 text-sm px-6 py-3 rounded-lg hover:bg-orbyt-emerald3 transition-colors w-fit mt-8">
            Join as Founder
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

        <div className="p-12 md:p-16 flex flex-col justify-between"
          style={{ background: 'linear-gradient(160deg, #0D1410 0%, #0A1210 100%)' }}>
          <div className="space-y-4">
            <div className="text-[10px] font-display font-700 tracking-[0.2em] uppercase text-orbyt-emerald">For Investors</div>
            <h2 className="font-display font-800 text-3xl tracking-tight text-orbyt-text">
              Reclaim your time.
            </h2>
            <p className="text-orbyt-muted font-body font-300 text-[15px] leading-relaxed max-w-sm">
              Set your thesis, and let our engine bring you high-signal deals that match your exact parameters.
            </p>
          </div>
          <Link to="/signup"
            className="inline-flex items-center gap-2 bg-transparent border border-orbyt-emerald/40 text-orbyt-emerald font-display font-600 text-sm px-6 py-3 rounded-lg hover:bg-orbyt-emerald/10 transition-colors w-fit mt-8">
            Join as Investor
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-orbyt-border px-6 py-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-orbyt-emerald flex items-center justify-center">
              <span className="font-display font-800 text-orbyt-bg text-[10px]">O</span>
            </div>
            <span className="font-display font-700 text-orbyt-text text-sm">Orbyt</span>
          </div>
          <div className="flex items-center gap-6">
            {['Privacy', 'Terms', 'Blog', 'Contact'].map((item) => (
              <button key={item} className="text-orbyt-muted text-xs hover:text-orbyt-text transition-colors">
                {item}
              </button>
            ))}
          </div>
          <p className="text-orbyt-muted text-xs">© 2025 Orbyt, Inc.</p>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
