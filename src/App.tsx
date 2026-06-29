import React, { useState, useEffect, useRef } from 'react';
import {
  Mail, Phone, MapPin, ExternalLink, Code2, Server, Database,
  GitBranch, Layers, Award, BookOpen, Briefcase,
  GraduationCap, Menu, X, Star, Globe, Download, Building2,
  Cpu, Zap, Users, CheckCircle2, ChevronDown, Sun, Moon,
  ArrowUp, Send,
} from 'lucide-react';

// ─── Theme Context ────────────────────────────────────────────────────────────

const ThemeContext = React.createContext<{
  dark: boolean;
  toggle: () => void;
}>({ dark: false, toggle: () => {} });

// ─── Helpers ──────────────────────────────────────────────────────────────────

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, inView };
}


// ─── Data ─────────────────────────────────────────────────────────────────────

const NAV = [
  { id: 'about',      label: 'About'      },
  { id: 'skills',     label: 'Skills'     },
  { id: 'internship', label: 'Experience' },
  { id: 'projects',   label: 'Projects'   },
  { id: 'education',  label: 'Education'  },
  { id: 'contact',    label: 'Contact'    },
];

const FEATURED_PROJECTS = [
  {
    title: 'Golf Charity Subscription Platform',
    description: 'A full-stack web application that combines golf score tracking, monthly prize draws, and charitable giving. Users can subscribe to the platform, maintain their latest golf scores, participate in draw-based reward programs, and contribute to charities of their choice. The platform includes a comprehensive admin panel for managing users, subscriptions, draws, charities, winners, and payouts, along with secure authentication and payment processing. DEMO Credentials: Admin (Subscribed User + Admin Access) → Email: secure@gmail.com | Password: 123456 User (Non-Subscribed) → Email: user2@gmail.com | Password: 123456',
    tech: ['React.js', 'Node.js', 'PostgreSQL', 'REST API', 'JWT', 'Razorpay/Stripe'],
    live: 'https://golf-frontend-mu.vercel.app/',
    image: 'https://www.kidsofmacarthur.com.au/wp-content/uploads/charity-golf-day-image.jpg',
  },
  {
    title: 'LeadFlow CRM',
    description: 'Built a full-stack CRM application to streamline lead management and sales operations. Admins can create and assign leads to sales representatives, while sales users can track lead status, manage customer interactions, and update lead progress. Implemented JWT authentication, role-based access control, lead assignment workflow, advanced filtering, search, pagination, and analytics dashboards. DEMO Credentials Admin Login Email-pratiksha@gmail.com Password-123456 Sales Login Email-divya@gmail.com Password-123456',
    tech: ['React.js', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB', 'JWT'],
    live: 'https://leadflow-crm-gilt.vercel.app',
    image: 'https://www.engagebay.com/blog/wp-content/uploads/2019/12/CRM-3-1080x675.jpg',
  },
  {
    title: 'JobYaari – Job & Blog Platform',
    description: 'A full-stack blog management application that enables users to browse, search, and filter blogs dynamically without page reloads using AJAX and jQuery. The platform includes an admin dashboard for creating, updating, and deleting blogs, along with category management and image uploads. Built with PHP/Laravel, MySQL, and responsive frontend technologies to deliver a seamless user experience across devices. DEMO Credentials: Admin Login Email-divya@gmail.com Password: 12345678 User Login Email-riya@gmail.com Password-123456789',
    tech: ['Laravel', 'PHP', 'Tailwind CSS', 'MySQL', 'JavaScript', 'AJAX'],
    live: 'https://jobyaari-blog-production.up.railway.app',
    image: 'https://www.jobsoid.com/wp-content/uploads/2020/03/Free-Job-Description-Builder-for-Hiring-Teams-Blog-Image.jpg',
  },
];

const OTHER_PROJECTS = [
  {
    title: 'GitHub Clone Platform',
    description: 'Built a GitHub-inspired collaboration platform with authentication, repository management, pull requests, and issue tracking. Implemented JWT-secured user sessions, role-based permissions, and RESTful APIs for repository CRUD, branch management, and collaborative workflows inspired by GitHub Actions. DEMO Credentials: User → Email: siddhi@gmail.com | Password: 123456',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT Auth', 'REST API'],
    live: 'https://github-clone-project-seven.vercel.app/',
    image: 'https://cdn.mos.cms.futurecdn.net/W5LnBksnN2E3PTCdgDF9g3-1200-80.png',
  },
  {
    title: 'AI Support Dashboard',
    description: 'Built a modern AI-powered support dashboard with ticket management, analytics, and real-time KPI monitoring. Implemented interactive charts, global search, role-based navigation, notifications, and a responsive SaaS-style interface using reusable React components. DEMO Credentials Admin Login admin@demo.com Password-demo123',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT Auth', 'REST API'],
    live: 'https://ai-dashboard-tau-eight.vercel.app/',
    image: 'https://growth-onomics.com/wp-content/uploads/2025/05/image_c0978627130cb7fdeef556d5cbb0f31a-1024x683.jpeg',
  },
  {
    title: 'ATS Resume Checker',
    description: 'Built an AI-powered ATS Resume Checker that analyzes resumes for ATS compatibility, keyword matching, section validation, and overall resume quality. Implemented secure PDF upload, instant ATS scoring, personalized improvement tips, and a modern responsive interface to help job seekers optimize their resumes for better interview opportunities.',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT Auth', 'REST API'],
    live: 'https://ats-resume-checker-ecru-zeta.vercel.app/',
    image: 'https://assets.hipcv.com/content/Illustrations-for-content/ats-checker.jpeg',
  },
];

const SKILLS_GRID = [
  {
    category: 'Programming Languages',
    icon: Code2,
    skills: [
      { name: 'JavaScript (ES6+)', level: 90 },
      { name: 'TypeScript',        level: 65 },
      { name: 'C#',                level: 80 },
      { name: 'HTML5 / CSS3',      level: 85 },
    ],
  },
  {
    category: 'Frameworks & Libraries',
    icon: Layers,
    skills: [
      { name: 'React.js',    level: 92 },
      { name: 'Node.js',     level: 88 },
      { name: 'Express.js',  level: 85 },
      { name: 'Tailwind CSS',level: 60 },
    ],
  },
  {
    category: 'Database Systems',
    icon: Database,
    skills: [
      { name: 'MongoDB',      level: 82 },
      { name: 'PostgreSQL',   level: 80 },
      { name: 'MySQL',        level: 85 },
      { name: 'MS SQL Server',level: 70 },
    ],
  },
  {
    category: 'Tools & Platforms',
    icon: GitBranch,
    skills: [
      { name: 'Git / GitHub',    level: 88 },
      { name: 'Docker',          level: 60 },
      { name: 'Postman',         level: 85 },
      { name: 'Vercel / Render', level: 80 },
    ],
  },
  {
    category: 'Backend & APIs',
    icon: Server,
    skills: [
      { name: 'REST APIs',      level: 90 },
      { name: 'JWT Auth',       level: 85 },
      { name: 'ASP.NET Core',   level: 72 },
      { name: 'Laravel / PHP',  level: 50 },
    ],
  },
  {
    category: 'Cloud & DevOps',
    icon: Globe,
    skills: [
      { name: 'Vercel',      level: 82 },
      { name: 'Railway',     level: 78 },
      { name: 'Render',      level: 78 },
      { name: 'ServiceNow',  level: 70 },
    ],
  },
];

const EDUCATION = [
  {
    degree: 'B.Tech – Electronics & Telecommunication',
    institution: "Bharati Vidyapeeth's College of Engineering, Maharashtra",
    grade: 'CGPA: 7.77',
    period: 'Sep 2022 – May 2025',
    icon: GraduationCap,
  },
  {
    degree: 'Diploma – Electronics & Telecommunication',
    institution: 'Government Polytechnic Kolhapur, Maharashtra',
    grade: 'CGPA: 8.57',
    period: 'Jun 2019 – May 2022',
    icon: BookOpen,
  },
  {
    degree: 'Secondary / 10th',
    institution: 'Kalamba Girls Highschool, Kalamba, Maharashtra',
    grade: '85.80%',
    period: 'Mar 2018 – May 2019',
    icon: Award,
  },
];



// ─── Scroll Progress Bar ───────────────────────────────────────────────────────

function ScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el  = document.documentElement;
      const top = el.scrollTop || document.body.scrollTop;
      const h   = el.scrollHeight - el.clientHeight;
      setPct(h > 0 ? (top / h) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div
      className="scroll-progress"
      style={{ width: `${pct}%` }}
    />
  );
}

// ─── Floating Particles ────────────────────────────────────────────────────────

function Particles() {
  const items = Array.from({ length: 18 }, (_, i) => i);
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {items.map(i => (
        <div
          key={i}
          className="particle"
          style={{
            left:            `${5 + (i * 5.5) % 90}%`,
            bottom:          `${(i * 7) % 40}%`,
            animationDelay:  `${(i * 0.45) % 8}s`,
            animationDuration:`${6 + (i % 5)}s`,
            width:           `${2 + (i % 3)}px`,
            height:          `${2 + (i % 3)}px`,
            opacity:          0,
          }}
        />
      ))}
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar() {
  const { dark, toggle } = React.useContext(ThemeContext);
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);
  const [active,   setActive]   = useState('hero');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const found = [...NAV].reverse().find(l => {
        const el = document.getElementById(l.id);
        return el && el.getBoundingClientRect().top <= 120;
      });
      if (found) setActive(found.id);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <nav
      style={{
        background: scrolled ? 'var(--nav-bg)' : 'transparent',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
      }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    >
      <div className="page-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={() => go('hero')} className="flex items-center gap-2.5 group">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-lg"
              style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-2))' }}
            >
              PT
            </div>
            <span
              className="font-bold text-sm tracking-wide hidden sm:block"
              style={{ color: 'var(--text-primary)' }}
            >
              Pratiksha Tivale
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV.map(l => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className="px-3.5 py-1.5 text-sm font-semibold rounded-xl transition-all duration-200"
                style={{
                  color:      active === l.id ? 'var(--accent)' : 'var(--text-secondary)',
                  background: active === l.id ? 'var(--accent-light)' : 'transparent',
                }}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            {/* Dark/Light Toggle */}
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="theme-toggle"
              style={{ background: dark ? 'var(--accent)' : 'var(--border)' }}
            >
              <span className="theme-toggle-knob" style={{ transform: dark ? 'translateX(20px)' : '' }}>
                {dark ? <Moon size={10} color="#6366f1" /> : <Sun size={10} color="#f59e0b" />}
              </span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2 rounded-xl transition-colors"
              style={{ color: 'var(--text-secondary)', background: 'var(--accent-light)' }}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div
            className="md:hidden pb-4 pt-2"
            style={{ borderTop: '1px solid var(--border)' }}
          >
            {NAV.map(l => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className="w-full text-left px-4 py-2.5 text-sm font-semibold rounded-xl transition-colors mb-0.5"
                style={{
                  color:      active === l.id ? 'var(--accent)' : 'var(--text-secondary)',
                  background: active === l.id ? 'var(--accent-light)' : 'transparent',
                }}
              >
                {l.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function HeroSection() {
  const [typed, setTyped] = useState('');
  const roles = ['Full Stack Developer', 'ASP.NET Core Developer', 'MERN Stack Developer', 'React Developer'];
  const [ri,  setRi]  = useState(0);
  const [ci,  setCi]  = useState(0);
  const [del, setDel] = useState(false);

  useEffect(() => {
    const cur = roles[ri];
    const t = setTimeout(() => {
      if (!del && ci < cur.length)       { setTyped(cur.slice(0, ci + 1)); setCi(c => c + 1); }
      else if (!del && ci === cur.length) { setTimeout(() => setDel(true), 1800); }
      else if (del && ci > 0)            { setTyped(cur.slice(0, ci - 1)); setCi(c => c - 1); }
      else                               { setDel(false); setRi(i => (i + 1) % roles.length); }
    }, del ? 50 : 80);
    return () => clearTimeout(t);
  }, [ci, del, ri]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 py-20 mt-16 overflow-hidden"
      style={{ background: 'var(--gradient-hero)' }}
    >
      {/* Orbs */}
      <div className="orb orb-1" aria-hidden />
      <div className="orb orb-2" aria-hidden />
      <div className="orb orb-3" aria-hidden />

      {/* Particles */}
      <Particles />

      {/* Grid overlay — subtle dots, hidden */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{ display: 'none' }}
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Avatar */}
        <div className="animate-fsu flex justify-center mb-7">
          <div className="avatar-glow relative inline-block">
            <div className="w-36 h-36 rounded-full overflow-hidden border-4 shadow-2xl"
              style={{ borderColor: 'var(--bg-card)' }}>
              <img
                src="/1773587143894.png"
                alt="Pratiksha Tivale"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Online indicator */}
            <div
              className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full border-4 flex items-center justify-center"
              style={{ background: '#22c55e', borderColor: 'var(--bg-primary)' }}
            >
              <div className="w-3 h-3 bg-white rounded-full animate-ping" style={{ animationDuration: '1.5s' }} />
            </div>
          </div>
        </div>

        {/* Badge */}
        <div className="animate-fsu-1 mb-3">
          <span className="badge-glow text-xs">✦ Available for Work ✦</span>
        </div>

        {/* Name */}
        <div className="animate-fsu-2 mb-3">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight"
            style={{ color: 'var(--text-primary)' }}>
            Pratiksha Tivale
          </h1>
        </div>

        {/* Typing role */}
        <div className="animate-fsu-3 mb-7">
          <div
            className="inline-flex items-center gap-1 px-6 py-3 rounded-full text-sm sm:text-base font-bold shadow-lg"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
          >
            <span className="gradient-text">&lt;</span>
            <span style={{ color: 'var(--text-primary)', fontFamily: "'Fira Code', monospace" }}>{typed}</span>
            <span className="typing-cursor" />
            <span className="gradient-text">/&gt;</span>
          </div>
        </div>

        {/* Bio */}
        <div className="animate-fsu-4 mb-10 max-w-2xl mx-auto">
          <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Passionate Full Stack Developer specializing in{' '}
            <span style={{ color: 'var(--accent)', fontWeight: 700 }}>MERN Stack</span> and{' '}
            <span style={{ color: 'var(--accent)', fontWeight: 700 }}>C# ASP.NET Core</span>.
            Building scalable web apps, secure APIs, and pixel-perfect UIs with a focus on
            performance and user experience.
          </p>
        </div>

        {/* Buttons */}
        <div className="animate-fsu-4 flex items-center justify-center gap-4 flex-wrap mb-8">
          <a href="mailto:pratikshativale05@gmail.com" className="btn-primary">
            <Send size={15} />
            Hire Me
          </a>
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-outline"
          >
            <Globe size={15} />
            View Projects
          </button>
        </div>

        {/* Social icons */}
        <div className="animate-fsu-5 flex items-center justify-center gap-3 flex-wrap">
          {[
            {
              href: 'https://www.linkedin.com/in/pratikshativale/',
              label: 'LinkedIn',
              hoverBg: '#2563eb',
              icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              ),
            },
            {
              href: 'https://github.com/pratut04',
              label: 'GitHub',
              hoverBg: '#1a1a2e',
              icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              ),
            },
            {
              href: 'https://wa.me/917972215888',
              label: 'WhatsApp',
              hoverBg: '#16a34a',
              icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              ),
            },
            {
              href: 'mailto:pratikshativale05@gmail.com',
              label: 'Email',
              hoverBg: '#dc2626',
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              ),
            },
          ].map(({ href, label, hoverBg, icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              aria-label={label}
              title={label}
              className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-250 hover:scale-110 hover:shadow-lg"
              style={{
                border: '2px solid var(--border)',
                color: 'var(--text-secondary)',
                background: 'var(--bg-card)',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = hoverBg;
                el.style.borderColor = hoverBg;
                el.style.color = '#fff';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = 'var(--bg-card)';
                el.style.borderColor = 'var(--border)';
                el.style.color = 'var(--text-secondary)';
              }}
            >
              {icon}
            </a>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
        style={{ color: 'var(--text-muted)' }}
        aria-label="Scroll down"
      >
        <ChevronDown size={28} />
      </button>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────

function AboutSection() {
  const { ref, inView } = useInView();

  return (
    <section id="about" ref={ref} className="py-20 scroll-mt-16"
      style={{ background: 'var(--bg-secondary)' }}>
      <div className="page-container">
        <h2 className="section-heading">About <span className="gradient-text">Me</span></h2>
        <div className="section-divider" />

        <div className={`grid lg:grid-cols-2 gap-6 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Bio card */}
          <div className="card p-7 flex flex-col">
            <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              Hello! I'm{' '}
              <span className="gradient-text">Pratiksha Tivale</span>
            </h3>
            <p className="text-sm leading-relaxed flex-1 text-justify" style={{ color: 'var(--text-secondary)' }}>
              Passionate and results-driven <span style={{ color: 'var(--accent)', fontWeight: 700 }}>Full Stack Developer</span> with
              hands-on experience in building scalable and responsive web applications using React.js, Node.js, Express.js, MongoDB, C#, and ASP.NET Core.
              Skilled in developing secure RESTful APIs, authentication systems, and database-driven solutions while following clean architecture and industry best practices.
              <br /><br />
              Strong foundation in Object-Oriented Programming (OOP), Data Structures &amp; Algorithms (DSA), and modern software development principles.
              Experienced in creating intuitive user interfaces, optimizing application performance, and delivering reliable, maintainable, and high-quality code.
              Committed to continuous learning and leveraging technology to build innovative solutions that solve real-world business challenges.
            </p>
            <a href="mailto:pratikshativale05@gmail.com" className="btn-primary mt-6 self-start text-sm">
              <Mail size={14} />
              Contact Me
            </a>
          </div>

          {/* Stats + why */}
          <div className="space-y-4">
            {[
              { icon: Code2,     value: '6+',  label: 'Projects Completed' },
              { icon: Briefcase, value: '1',   label: 'Internship Completed' },
              { icon: Award,     value: '3',   label: 'Certifications Earned' },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="stat-card">
                <div className="stat-icon">
                  <Icon size={20} style={{ color: 'var(--accent)' }} />
                </div>
                <div>
                  <div className="text-2xl font-black" style={{ color: 'var(--text-primary)' }}>{value}</div>
                  <div className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>{label}</div>
                </div>
              </div>
            ))}

            <div className="card p-5">
              <h4 className="font-bold mb-4 text-sm" style={{ color: 'var(--text-primary)' }}>Why Choose Me?</h4>
              <div className="space-y-3">
                {[
                  { icon: CheckCircle2, title: 'Quality Focused',  desc: 'Meticulous attention to detail and clean code practices' },
                  { icon: Zap,          title: 'Fast Learner',     desc: 'Quickly adapts to new technologies and frameworks' },
                  { icon: Users,        title: 'Problem Solver',   desc: 'Passionate about solving complex technical challenges' },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex items-start gap-3">
                    <div className="icon-glow w-9 h-9 flex items-center justify-center flex-shrink-0">
                      <Icon size={14} className="text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{title}</p>
                      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Skills ───────────────────────────────────────────────────────────────────

function SkillsSection() {
  const { ref, inView } = useInView();

  return (
    <section id="skills" ref={ref} className="py-20 scroll-mt-16"
      style={{ background: 'var(--bg-primary)' }}>
      <div className="page-container">
        <h2 className="section-heading">Skills &amp; <span className="gradient-text">Expertise</span></h2>
        <div className="section-divider" />
        <p className="text-center text-sm max-w-lg mx-auto mb-12" style={{ color: 'var(--text-muted)' }}>
          A comprehensive set of technical skills for delivering scalable digital solutions
        </p>

        <div className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-5 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {SKILLS_GRID.map(({ category, icon: Icon, skills }, i) => (
            <div
              key={category}
              className="card p-6 hover:-translate-y-1"
              style={{ transitionDelay: `${i * 80}ms`, transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease' }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="icon-glow w-10 h-10 flex items-center justify-center">
                  <Icon size={18} className="text-white" />
                </div>
                <h3 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{category}</h3>
              </div>
              <div className="space-y-4">
                {skills.map(({ name, level }) => (
                  <div key={name}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>{name}</span>
                      <span
                        className="text-xs font-black"
                        style={{
                          color: 'var(--accent)',
                          opacity: inView ? 1 : 0,
                          transition: 'opacity 0.5s ease',
                          transitionDelay: `${i * 80 + 400}ms`,
                        }}
                      >
                        {level}%
                      </span>
                    </div>
                    <div className="skill-bar-track">
                      <div
                        className="skill-bar-fill"
                        style={{ width: inView ? `${level}%` : '0%', transitionDelay: `${i * 80 + 200}ms` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Internship ───────────────────────────────────────────────────────────────

function InternshipSection() {
  const { ref, inView } = useInView();

  return (
    <section id="internship" ref={ref} className="py-20 scroll-mt-16"
      style={{ background: 'var(--bg-secondary)' }}>
      <div className="page-container">
        <h2 className="section-heading">Work <span className="gradient-text">Experience</span></h2>
        <div className="section-divider" />

        <div className={`max-w-3xl mx-auto transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="card p-7 relative overflow-hidden">
            {/* Accent bar */}
            <div
              className="absolute top-0 left-0 w-1.5 h-full rounded-l-2xl"
              style={{ background: 'linear-gradient(180deg, var(--accent), var(--accent-2))' }}
            />
            <div className="pl-4">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6">
                <div className="flex items-start gap-4">
                  <div
                    className="w-13 h-13 rounded-xl border flex items-center justify-center flex-shrink-0"
                    style={{ background: 'var(--accent-light)', borderColor: 'var(--border-hover)', width: 52, height: 52 }}
                  >
                    <Building2 size={22} style={{ color: 'var(--accent)' }} />
                  </div>
                  <div>
                    <h3 className="font-black text-lg" style={{ color: 'var(--text-primary)' }}>ServiceNow Virtual Intern</h3>
                    <p className="font-semibold text-sm mt-0.5" style={{ color: 'var(--accent)' }}>SmartBridge (AICTE) · Remote</p>
                  </div>
                </div>
                <span
                  className="px-3 py-1.5 text-xs font-bold rounded-full whitespace-nowrap self-start"
                  style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)', color: '#16a34a' }}
                >
                  Feb 2026 – Apr 2026
                </span>
              </div>

              <ul className="space-y-2.5 mb-6">
                {[
                  'Completed ServiceNow (Zurich) and AI Fundamentals training through SmartBridge (AICTE)',
                  'Gained knowledge of ServiceNow administration, workflows, and platform navigation',
                  'Hands-on experience with ServiceNow Next Experience, Lists & Filters, Forms',
                  'Task Management and platform-level configuration and customization skills',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <div
                      className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                      style={{ background: 'var(--accent)' }}
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <div
                className="flex flex-wrap items-center gap-2 pt-4"
                style={{ borderTop: '1px solid var(--border)' }}
              >
                {['ServiceNow', 'AI Fundamentals', 'Workflow Automation', 'ITSM'].map(t => (
                  <span key={t} className="tech-pill">{t}</span>
                ))}
                <a
                  href="https://drive.google.com/file/d/1MW5iHpCxEEjA4umtIjoU-PgmtWsKOYxM/view?usp=sharing"
                  target="_blank" rel="noopener noreferrer"
                  className="ml-auto flex items-center gap-1.5 text-xs font-bold hover:underline"
                  style={{ color: 'var(--accent)' }}
                >
                  <Award size={13} /> View Certificate <ExternalLink size={11} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Projects ─────────────────────────────────────────────────────────────────

function highlightDesc(text: string) {
  const regex = /(DEMO\s+Credentials[:]?|[\w.+\-]+@[\w.\-]+\.[a-zA-Z]{2,}|Password[-:]\s*\w+|Password\s+\d+)/gi;
  const parts: React.ReactNode[] = [];
  let last = 0, m: RegExpExecArray | null;
  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    parts.push(<span key={m.index} style={{ color: 'var(--accent)', fontWeight: 700 }}>{m[0]}</span>);
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

function ProjectDescription({ text, clamp = 4 }: { text: string; clamp?: number }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="mb-4">
      <p
        className="text-sm leading-relaxed"
        style={{
          color: 'var(--text-secondary)',
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: expanded ? 'unset' : clamp,
          overflow: 'hidden',
        } as React.CSSProperties}
      >
        {highlightDesc(text)}
      </p>
      <button
        onClick={() => setExpanded(v => !v)}
        className="mt-1 text-xs font-bold transition-colors"
        style={{ color: 'var(--accent)' }}
      >
        {expanded ? '▲ Less' : '▼ More'}
      </button>
    </div>
  );
}

function FeaturedCard({ p, i }: { p: typeof FEATURED_PROJECTS[0]; i: number }) {
  return (
    <div
      className="card overflow-hidden group hover:-translate-y-1"
      style={{ transitionDelay: `${i * 130}ms`, transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease' }}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={p.image}
          alt={p.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="img-overlay" />
        <span
          className="absolute top-3 left-3 flex items-center gap-1 px-3 py-1 text-white text-xs font-bold rounded-full shadow-lg"
          style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-2))' }}
        >
          <Star size={10} /> Featured
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-black text-base mb-2" style={{ color: 'var(--text-primary)' }}>{p.title}</h3>
        <ProjectDescription text={p.description} clamp={4} />
        <div className="flex flex-wrap gap-1.5 mb-4">
          {p.tech.map(t => <span key={t} className="tech-pill">{t}</span>)}
        </div>
        <div
          className="flex items-center gap-4 pt-3 text-sm"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          <a
            href={p.live} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-bold transition-all hover:gap-2.5"
            style={{ color: 'var(--accent)' }}
          >
            <Globe size={14} /> Live Demo <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </div>
  );
}

function OtherCard({ p, i }: { p: typeof OTHER_PROJECTS[0]; i: number }) {
  return (
    <div
      className="card overflow-hidden group hover:-translate-y-1"
      style={{ transitionDelay: `${(i + 3) * 100}ms`, transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease' }}
    >
      <div className="h-36 overflow-hidden relative">
        <img src={p.image} alt={p.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        <div className="img-overlay" />
      </div>
      <div className="p-4">
        <h4 className="font-black text-sm mb-1.5" style={{ color: 'var(--text-primary)' }}>{p.title}</h4>
        <ProjectDescription text={p.description} clamp={3} />
        <div className="flex flex-wrap gap-1 mb-3">
          {p.tech.slice(0, 4).map(t => <span key={t} className="tech-pill">{t}</span>)}
        </div>
        <div className="flex items-center justify-between pt-2" style={{ borderTop: '1px solid var(--border)' }}>
          <a href={p.live} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-bold hover:gap-2 transition-all"
            style={{ color: 'var(--accent)' }}
          >
            <Globe size={13} /> View Live
          </a>
        </div>
      </div>
    </div>
  );
}

function ProjectsSection() {
  const { ref, inView } = useInView();
  return (
    <section id="projects" ref={ref} className="py-20 scroll-mt-16"
      style={{ background: 'var(--bg-primary)' }}>
      <div className="page-container">
        <h2 className="section-heading">Featured <span className="gradient-text">Projects</span></h2>
        <div className="section-divider" />
        <p className="text-center text-sm max-w-lg mx-auto mb-12" style={{ color: 'var(--text-muted)' }}>
          A showcase of my recent work demonstrating various technologies and problem-solving approaches
        </p>

        <div className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {FEATURED_PROJECTS.map((p, i) => <FeaturedCard key={p.title} p={p} i={i} />)}
        </div>

        <h3 className="text-center font-black text-lg mb-6" style={{ color: 'var(--text-primary)' }}>
          Other <span className="gradient-text">Projects</span>
        </h3>
        <div className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-5 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {OTHER_PROJECTS.map((p, i) => <OtherCard key={p.title} p={p} i={i} />)}
        </div>
      </div>
    </section>
  );
}

// ─── Education ────────────────────────────────────────────────────────────────

function EducationSection() {
  const { ref, inView } = useInView();
  return (
    <section id="education" ref={ref} className="py-20 scroll-mt-16"
      style={{ background: 'var(--bg-secondary)' }}>
      <div className="page-container">
        <h2 className="section-heading">Education &amp; <span className="gradient-text">Certifications</span></h2>
        <div className="section-divider" />

        <div className={`grid lg:grid-cols-2 gap-6 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Education */}
          <div className="card p-6">
            <div className="flex items-center gap-3 mb-6 pb-4" style={{ borderBottom: '1px solid var(--border)' }}>
              <div className="icon-glow w-10 h-10 flex items-center justify-center">
                <GraduationCap size={18} className="text-white" />
              </div>
              <h3 className="font-black" style={{ color: 'var(--text-primary)' }}>Education</h3>
            </div>
            <div className="space-y-6">
              {EDUCATION.map(({ degree, institution, grade, period }, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center pt-1">
                    <div className="timeline-dot" />
                    {i < EDUCATION.length - 1 && (
                      <div className="w-px flex-1 mt-2" style={{ background: 'var(--border)' }} />
                    )}
                  </div>
                  <div className="pb-2 flex-1 min-w-0">
                    <h4 className="font-bold text-sm leading-snug" style={{ color: 'var(--text-primary)' }}>{degree}</h4>
                    <p className="text-xs font-black mt-0.5" style={{ color: 'var(--accent)' }}>{grade}</p>
                    <div className="flex items-center gap-1 mt-1 text-xs" style={{ color: 'var(--text-secondary)' }}>
                      <GraduationCap size={11} /> {institution}
                    </div>
                    <div className="flex items-center gap-1 mt-0.5 text-xs" style={{ color: 'var(--text-muted)' }}>
                      <MapPin size={11} /> {period}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="card p-6">
            <div className="flex items-center gap-3 mb-6 pb-4" style={{ borderBottom: '1px solid var(--border)' }}>
              <div className="icon-glow w-10 h-10 flex items-center justify-center">
                <Award size={18} className="text-white" />
              </div>
              <h3 className="font-black" style={{ color: 'var(--text-primary)' }}>Certifications</h3>
            </div>
            <div className="space-y-3">
              {[
                { name: 'MERN Stack Web Development',    issuer: 'Apna College',          period: '2026',             icon: Code2   },
                { name: 'C# & ASP.NET Core Development', issuer: 'Udemy',                 period: '2026',             icon: Layers  },
                { name: 'ServiceNow Virtual Intern',      issuer: 'SmartBridge (AICTE)',   period: 'Feb – Apr 2026',   icon: Cpu     },
              ].map(({ name, issuer, period, icon: Icon }) => (
                <div
                  key={name}
                  className="flex items-center gap-4 p-4 rounded-2xl transition-all duration-200"
                  style={{
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border)',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)';
                    (e.currentTarget as HTMLElement).style.background = 'var(--accent-light)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                    (e.currentTarget as HTMLElement).style.background = 'var(--bg-secondary)';
                  }}
                >
                  <div className="icon-glow w-10 h-10 flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-black text-sm leading-snug" style={{ color: 'var(--text-primary)' }}>{name}</p>
                    <p className="text-xs font-bold mt-0.5" style={{ color: 'var(--accent)' }}>{issuer}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{period}</p>
                  </div>
                  <CheckCircle2 size={18} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────

function ContactSection() {
  const { ref, inView } = useInView();
  return (
    <section id="contact" ref={ref} className="py-20 scroll-mt-16"
      style={{ background: 'var(--bg-primary)' }}>
      <div className="page-container">
        <h2 className="section-heading">Let's <span className="gradient-text">Connect</span></h2>
        <div className="section-divider" />

        <div className={`max-w-2xl mx-auto transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="card p-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-green-500 font-black text-sm">Available for Work</span>
            </div>
            <p className="text-center text-sm leading-relaxed mb-8 max-w-md mx-auto" style={{ color: 'var(--text-secondary)' }}>
              I'm actively looking for roles as a{' '}
              <span style={{ color: 'var(--accent)', fontWeight: 700 }}>Full Stack Developer</span> or{' '}
              <span style={{ color: 'var(--accent)', fontWeight: 700 }}>React Developer</span>.
              Open to full-time roles, freelance projects, and consulting engagements.
            </p>

            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Mail,  label: 'Email',         value: 'pratikshativale05@gmail.com', href: 'mailto:pratikshativale05@gmail.com' },
                { icon: Phone, label: 'Phone / Call',  value: '7972215888',                  href: 'tel:+917972215888' },
                {
                  label: 'WhatsApp', value: '7972215888', href: 'https://wa.me/917972215888',
                  icon: () => (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  ),
                },
                {
                  label: 'LinkedIn', value: 'pratikshativale', href: 'https://www.linkedin.com/in/pratikshativale/',
                  icon: () => (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  ),
                },
              ].map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="contact-item group"
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-white transition-all"
                    style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-2))' }}
                  >
                    <Icon size={16} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{label}</p>
                    <p className="text-sm font-bold truncate" style={{ color: 'var(--text-primary)' }}>{value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="py-8 footer-bg">
      <div className="page-container flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-black text-xs"
            style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-2))' }}
          >
            PT
          </div>
          <span className="text-sm font-semibold" style={{ color: 'var(--footer-text)' }}>Pratiksha Tivale</span>
        </div>

        <p className="text-sm" style={{ color: 'var(--footer-text)' }}>
          © 2026 Pratiksha Tivale · Built with{' '}
          <span style={{ color: 'var(--accent)' }}>React + TypeScript</span>
        </p>

        <div className="flex items-center gap-3">
          <a href="mailto:pratikshativale05@gmail.com"
            className="transition-colors hover:text-blue-400" style={{ color: 'var(--footer-text)' }}>
            <Mail size={16} />
          </a>
          <a href="tel:+917972215888"
            className="transition-colors hover:text-blue-400" style={{ color: 'var(--footer-text)' }}>
            <Phone size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}

// ─── Floating Action Button ───────────────────────────────────────────────────

function FloatingButtons() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed bottom-8 right-8 flex flex-col gap-3 z-50">
      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        className={`back-to-top fab ${show ? 'visible' : ''}`}
        style={{ width: 44, height: 44 }}
        title="Back to top"
      >
        <ArrowUp size={18} />
      </button>

      {/* Quick contact FAB */}
      <a
        href="mailto:pratikshativale05@gmail.com"
        aria-label="Email me"
        className="fab"
        title="Email Pratiksha"
      >
        <Mail size={22} />
      </a>
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [dark, setDark] = useState(false);

  // Persist theme preference
  useEffect(() => {
    const saved = localStorage.getItem('pt-theme');
    if (saved === 'dark') { setDark(true); document.documentElement.setAttribute('data-theme', 'dark'); }
  }, []);

  const toggle = () => {
    setDark(d => {
      const next = !d;
      document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light');
      localStorage.setItem('pt-theme', next ? 'dark' : 'light');
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ dark, toggle }}>
      {/* Premium overlays */}
      <ScrollProgress />
      <FloatingButtons />

      <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <InternshipSection />
          <ProjectsSection />
          <EducationSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </ThemeContext.Provider>
  );
}
