import { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    quote:
      "John is one of the most composed and reliable analysts I have worked with. During high-pressure Major Incident bridges, his ability to coordinate across teams, communicate clearly with stakeholders, and maintain structured status updates was invaluable. He consistently went above and beyond to ensure client SLAs were met.",
    name: "Michael R. Santos",
    role: "Senior Incident Manager",
    relationship: "Former Manager at Acquire BPO",
    initials: "MS",
  },
  {
    quote:
      "Working alongside John at Sutherland, I was consistently impressed by his technical depth and calm demeanor under pressure. He has a rare combination of strong ITSM discipline and genuine curiosity for emerging technologies. Any team would be fortunate to have him as an anchor in their operations center.",
    name: "Angela P. Reyes",
    role: "Global IT Operations Lead",
    relationship: "Former Colleague at Sutherland Global Services",
    initials: "AR",
  },
  {
    quote:
      "John supported our infrastructure monitoring team for several years and was always the person others turned to when things got critical. His NAGIOS and ELK Stack expertise saved us countless hours during triage. Beyond his technical skills, he is a natural communicator who keeps everyone informed without panic.",
    name: "David K. Lim",
    role: "Director of Digital Operations",
    relationship: "Client Stakeholder",
    initials: "DL",
  },
];

export default function PortfolioPage() {
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("portfolio-theme") as "dark" | "light") || "dark";
    }
    return "dark";
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-portfolio-theme", theme);
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("port-visible");
          }
        });
      },
      { threshold: 0.1 },
    );
    document.querySelectorAll(".port-animate").forEach((el) => {
      observerRef.current?.observe(el);
    });
    return () => observerRef.current?.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div data-portfolio-theme={theme}>
      <style>{`
        [data-portfolio-theme="dark"] {
          --port-bg: #0d1117;
          --port-surface: #161b22;
          --port-surface2: #1c2333;
          --port-border: #30363d;
          --port-text: #e6edf3;
          --port-text-muted: #8b949e;
          --port-accent: #38bdf8;
          --port-accent2: #0ea5e9;
          --port-accent-glow: rgba(56,189,248,0.15);
          --port-navy: #1e3a5f;
          --port-teal: #0d9488;
          --port-card-bg: #161b22;
          --port-card-border: #21262d;
          --port-quote-bg: #161b22;
          --port-quote-border: #38bdf8;
          --port-avatar-bg: #1e3a5f;
        }
        [data-portfolio-theme="light"] {
          --port-bg: #f0f4f8;
          --port-surface: #ffffff;
          --port-surface2: #e8eef4;
          --port-border: #cbd5e1;
          --port-text: #0f172a;
          --port-text-muted: #64748b;
          --port-accent: #0284c7;
          --port-accent2: #0369a1;
          --port-accent-glow: rgba(2,132,199,0.1);
          --port-navy: #1e40af;
          --port-teal: #0f766e;
          --port-card-bg: #ffffff;
          --port-card-border: #e2e8f0;
          --port-quote-bg: #f8fafc;
          --port-quote-border: #0284c7;
          --port-avatar-bg: #dbeafe;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { scroll-behavior: smooth; }
        .port-root {
          min-height: 100vh;
          background: var(--port-bg);
          color: var(--port-text);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          transition: background 0.3s, color 0.3s;
        }

        /* NAV */
        .port-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          background: var(--port-surface);
          border-bottom: 1px solid var(--port-border);
          backdrop-filter: blur(12px);
        }
        .port-nav-inner {
          max-width: 1100px; margin: 0 auto;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 1.5rem; height: 60px;
        }
        .port-nav-logo { font-weight: 700; font-size: 1.1rem; color: var(--port-accent); }
        .port-nav-links { display: flex; gap: 1.5rem; list-style: none; }
        .port-nav-links a {
          color: var(--port-text-muted); text-decoration: none; font-size: 0.9rem;
          transition: color 0.2s;
        }
        .port-nav-links a:hover { color: var(--port-accent); }
        .port-nav-actions { display: flex; gap: 0.75rem; align-items: center; }
        .port-theme-btn {
          background: var(--port-surface2); border: 1px solid var(--port-border);
          color: var(--port-text); border-radius: 6px; padding: 0.35rem 0.75rem;
          cursor: pointer; font-size: 0.8rem; transition: all 0.2s;
        }
        .port-theme-btn:hover { border-color: var(--port-accent); color: var(--port-accent); }
        .port-hamburger {
          display: none; background: none; border: 1px solid var(--port-border);
          border-radius: 6px; padding: 0.4rem 0.6rem; cursor: pointer;
          color: var(--port-text); font-size: 1.1rem;
        }
        .port-mobile-menu {
          display: none; flex-direction: column; gap: 0;
          background: var(--port-surface); border-top: 1px solid var(--port-border);
          padding: 0.5rem 1.5rem 1rem;
        }
        .port-mobile-menu a {
          padding: 0.6rem 0; color: var(--port-text-muted); text-decoration: none;
          border-bottom: 1px solid var(--port-border); font-size: 0.95rem; transition: color 0.2s;
        }
        .port-mobile-menu a:hover { color: var(--port-accent); }
        .port-mobile-open { display: flex; }

        /* SECTIONS */
        .port-section { padding: 5rem 1.5rem; max-width: 1100px; margin: 0 auto; }
        .port-section-title {
          font-size: 1.75rem; font-weight: 700; margin-bottom: 2.5rem;
          color: var(--port-text); display: flex; align-items: center; gap: 0.75rem;
        }
        .port-section-title::after {
          content: ''; flex: 1; height: 1px; background: var(--port-border);
        }
        .port-section-accent { color: var(--port-accent); }

        /* HERO */
        .port-hero {
          min-height: 100vh; display: flex; align-items: center;
          padding: 7rem 1.5rem 4rem; max-width: 1100px; margin: 0 auto;
        }
        .port-hero-inner { max-width: 700px; }
        .port-hero-badge {
          display: inline-block; background: var(--port-accent-glow);
          border: 1px solid var(--port-accent); color: var(--port-accent);
          border-radius: 20px; padding: 0.3rem 1rem; font-size: 0.8rem;
          font-weight: 600; margin-bottom: 1.5rem; letter-spacing: 0.05em;
        }
        .port-hero-name {
          font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 800;
          line-height: 1.1; margin-bottom: 1rem; color: var(--port-text);
        }
        .port-hero-name span { color: var(--port-accent); }
        .port-hero-headline {
          font-size: clamp(1rem, 2.5vw, 1.2rem); color: var(--port-text-muted);
          margin-bottom: 1.75rem; max-width: 600px;
        }
        .port-hero-contact { display: flex; flex-wrap: wrap; gap: 1rem; margin-bottom: 2rem; }
        .port-hero-contact a, .port-hero-contact span {
          color: var(--port-text-muted); font-size: 0.85rem; text-decoration: none;
          display: flex; align-items: center; gap: 0.4rem; transition: color 0.2s;
        }
        .port-hero-contact a:hover { color: var(--port-accent); }
        .port-hero-actions { display: flex; flex-wrap: wrap; gap: 0.75rem; }
        .port-btn-primary {
          background: var(--port-accent); color: #fff; border: none;
          padding: 0.65rem 1.5rem; border-radius: 8px; font-weight: 600;
          cursor: pointer; text-decoration: none; font-size: 0.9rem;
          transition: background 0.2s, transform 0.15s;
        }
        .port-btn-primary:hover { background: var(--port-accent2); transform: translateY(-1px); }
        .port-btn-outline {
          background: transparent; color: var(--port-text); border: 1px solid var(--port-border);
          padding: 0.65rem 1.5rem; border-radius: 8px; font-weight: 600;
          cursor: pointer; text-decoration: none; font-size: 0.9rem;
          transition: border-color 0.2s, color 0.2s, transform 0.15s;
        }
        .port-btn-outline:hover { border-color: var(--port-accent); color: var(--port-accent); transform: translateY(-1px); }

        /* PROFILE */
        .port-profile-card {
          background: var(--port-card-bg); border: 1px solid var(--port-card-border);
          border-radius: 12px; padding: 2rem; border-left: 4px solid var(--port-accent);
        }
        .port-profile-card p { color: var(--port-text-muted); line-height: 1.8; font-size: 1rem; }

        /* SKILLS */
        .port-skills-grid {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.25rem;
        }
        .port-skill-card {
          background: var(--port-card-bg); border: 1px solid var(--port-card-border);
          border-radius: 12px; padding: 1.5rem; transition: border-color 0.2s, transform 0.2s;
        }
        .port-skill-card:hover { border-color: var(--port-accent); transform: translateY(-3px); }
        .port-skill-card-title {
          font-size: 0.8rem; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.08em; color: var(--port-accent); margin-bottom: 0.75rem;
          display: flex; align-items: center; gap: 0.5rem;
        }
        .port-skill-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; }
        .port-skill-tag {
          background: var(--port-surface2); color: var(--port-text-muted);
          border: 1px solid var(--port-border); border-radius: 6px;
          padding: 0.25rem 0.6rem; font-size: 0.78rem;
        }

        /* PROJECTS */
        .port-projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.25rem; }
        .port-project-card {
          background: var(--port-card-bg); border: 1px solid var(--port-card-border);
          border-radius: 12px; padding: 1.75rem; display: flex; flex-direction: column; gap: 0.75rem;
          transition: border-color 0.2s, transform 0.2s;
        }
        .port-project-card:hover { border-color: var(--port-accent); transform: translateY(-3px); }
        .port-project-card-header { display: flex; justify-content: space-between; align-items: flex-start; }
        .port-project-icon { font-size: 1.75rem; }
        .port-project-badge {
          background: var(--port-accent-glow); border: 1px solid var(--port-accent);
          color: var(--port-accent); border-radius: 20px; padding: 0.2rem 0.6rem; font-size: 0.7rem; font-weight: 600;
        }
        .port-project-name { font-weight: 700; font-size: 1.1rem; color: var(--port-text); }
        .port-project-desc { color: var(--port-text-muted); font-size: 0.9rem; line-height: 1.6; flex: 1; }
        .port-project-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; }
        .port-project-tag {
          background: var(--port-surface2); color: var(--port-text-muted);
          border-radius: 4px; padding: 0.2rem 0.5rem; font-size: 0.75rem;
        }

        /* EXPERIENCE */
        .port-timeline { position: relative; padding-left: 2rem; }
        .port-timeline::before {
          content: ''; position: absolute; left: 0; top: 0; bottom: 0;
          width: 2px; background: var(--port-border);
        }
        .port-timeline-item { position: relative; margin-bottom: 2.5rem; }
        .port-timeline-item::before {
          content: ''; position: absolute; left: -2.35rem; top: 0.3rem;
          width: 10px; height: 10px; border-radius: 50%;
          background: var(--port-accent); border: 2px solid var(--port-bg);
          box-shadow: 0 0 0 2px var(--port-accent);
        }
        .port-timeline-role { font-weight: 700; font-size: 1rem; color: var(--port-text); }
        .port-timeline-company { color: var(--port-accent); font-weight: 600; font-size: 0.9rem; }
        .port-timeline-period {
          color: var(--port-text-muted); font-size: 0.8rem; margin: 0.25rem 0 0.75rem;
          display: flex; align-items: center; gap: 0.4rem;
        }
        .port-timeline-badge {
          background: var(--port-accent-glow); color: var(--port-accent);
          border-radius: 20px; padding: 0.1rem 0.5rem; font-size: 0.7rem; font-weight: 600;
        }
        .port-timeline-bullets { list-style: none; display: flex; flex-direction: column; gap: 0.4rem; }
        .port-timeline-bullets li {
          color: var(--port-text-muted); font-size: 0.9rem; display: flex; align-items: flex-start; gap: 0.5rem;
        }
        .port-timeline-bullets li::before { content: '›'; color: var(--port-accent); flex-shrink: 0; margin-top: 0.05rem; }

        /* TESTIMONIALS */
        .port-testimonials-grid {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;
        }
        .port-testimonial-card {
          background: var(--port-quote-bg);
          border: 1px solid var(--port-card-border);
          border-top: 3px solid var(--port-quote-border);
          border-radius: 12px; padding: 1.75rem;
          display: flex; flex-direction: column; gap: 1.25rem;
          transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
          position: relative;
        }
        .port-testimonial-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 30px var(--port-accent-glow);
          border-color: var(--port-quote-border);
        }
        .port-testimonial-quote-mark {
          position: absolute; top: 1rem; right: 1.25rem;
          font-size: 3.5rem; line-height: 1;
          color: var(--port-accent); opacity: 0.15;
          font-family: Georgia, serif; font-weight: 900;
          pointer-events: none;
        }
        .port-testimonial-text {
          color: var(--port-text-muted); font-size: 0.9rem; line-height: 1.8;
          font-style: italic;
        }
        .port-testimonial-author { display: flex; align-items: center; gap: 0.9rem; }
        .port-testimonial-avatar {
          width: 44px; height: 44px; border-radius: 50%;
          background: var(--port-avatar-bg);
          border: 2px solid var(--port-quote-border);
          display: flex; align-items: center; justify-content: center;
          font-weight: 700; font-size: 0.85rem; color: var(--port-accent);
          flex-shrink: 0;
        }
        .port-testimonial-name { font-weight: 700; font-size: 0.92rem; color: var(--port-text); }
        .port-testimonial-role { font-size: 0.8rem; color: var(--port-text-muted); }
        .port-testimonial-relationship {
          font-size: 0.75rem; color: var(--port-accent); font-weight: 500; margin-top: 0.1rem;
        }

        /* EDUCATION */
        .port-edu-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.25rem; }
        .port-edu-card {
          background: var(--port-card-bg); border: 1px solid var(--port-card-border);
          border-radius: 12px; padding: 1.5rem; transition: border-color 0.2s, transform 0.2s;
          display: flex; flex-direction: column; gap: 0.5rem;
        }
        .port-edu-card:hover { border-color: var(--port-accent); transform: translateY(-3px); }
        .port-edu-icon { font-size: 1.5rem; margin-bottom: 0.25rem; }
        .port-edu-title { font-weight: 700; color: var(--port-text); font-size: 0.95rem; }
        .port-edu-org { color: var(--port-accent); font-size: 0.85rem; font-weight: 600; }
        .port-edu-date { color: var(--port-text-muted); font-size: 0.8rem; }

        /* CONTACT */
        .port-contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: start; }
        .port-contact-info { display: flex; flex-direction: column; gap: 1rem; }
        .port-contact-item {
          display: flex; align-items: center; gap: 0.75rem;
          color: var(--port-text-muted); font-size: 0.9rem;
        }
        .port-contact-item a { color: var(--port-text-muted); text-decoration: none; transition: color 0.2s; }
        .port-contact-item a:hover { color: var(--port-accent); }
        .port-contact-icon {
          width: 36px; height: 36px; background: var(--port-surface2);
          border: 1px solid var(--port-border); border-radius: 8px;
          display: flex; align-items: center; justify-content: center; font-size: 1rem; flex-shrink: 0;
        }
        .port-contact-form { display: flex; flex-direction: column; gap: 1rem; }
        .port-input {
          background: var(--port-surface2); border: 1px solid var(--port-border);
          color: var(--port-text); border-radius: 8px; padding: 0.75rem 1rem;
          font-size: 0.9rem; width: 100%; outline: none; transition: border-color 0.2s;
          font-family: inherit;
        }
        .port-input::placeholder { color: var(--port-text-muted); }
        .port-input:focus { border-color: var(--port-accent); }
        .port-textarea { min-height: 120px; resize: vertical; }

        /* FOOTER */
        .port-footer {
          border-top: 1px solid var(--port-border);
          padding: 2rem 1.5rem; text-align: center;
          color: var(--port-text-muted); font-size: 0.85rem;
          background: var(--port-surface);
        }
        .port-footer-links { display: flex; justify-content: center; gap: 1.5rem; margin-bottom: 0.75rem; }
        .port-footer-links a {
          color: var(--port-text-muted); text-decoration: none; transition: color 0.2s;
        }
        .port-footer-links a:hover { color: var(--port-accent); }

        /* BACK TO TOP */
        .port-back-top {
          position: fixed; bottom: 2rem; right: 2rem; z-index: 99;
          background: var(--port-accent); color: #fff;
          border: none; border-radius: 50%; width: 44px; height: 44px;
          cursor: pointer; font-size: 1.1rem;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 16px var(--port-accent-glow);
          transition: background 0.2s, transform 0.2s;
        }
        .port-back-top:hover { background: var(--port-accent2); transform: translateY(-2px); }
        .port-back-top-hidden { opacity: 0; pointer-events: none; }

        /* ANIMATIONS */
        .port-animate { opacity: 0; transform: translateY(24px); transition: opacity 0.6s, transform 0.6s; }
        .port-visible { opacity: 1; transform: translateY(0); }
        .port-animate.port-delay-1 { transition-delay: 0.1s; }
        .port-animate.port-delay-2 { transition-delay: 0.2s; }
        .port-animate.port-delay-3 { transition-delay: 0.3s; }

        /* RESPONSIVE */
        @media (max-width: 768px) {
          .port-nav-links { display: none; }
          .port-hamburger { display: block; }
          .port-contact-grid { grid-template-columns: 1fr; gap: 2rem; }
          .port-hero { padding-top: 5rem; }
        }
      `}</style>

      <div className="port-root">
        {/* NAV */}
        <nav className="port-nav">
          <div className="port-nav-inner">
            <span className="port-nav-logo">JF</span>
            <ul className="port-nav-links">
              {["profile", "skills", "projects", "experience", "testimonials", "education", "contact"].map((s) => (
                <li key={s}>
                  <a
                    href={`#${s}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(s);
                    }}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </a>
                </li>
              ))}
            </ul>
            <div className="port-nav-actions">
              <button className="port-theme-btn" onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}>
                {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
              </button>
              <button className="port-hamburger" onClick={() => setMenuOpen((o) => !o)} aria-label="Menu">
                ☰
              </button>
            </div>
          </div>
          <div className={`port-mobile-menu ${menuOpen ? "port-mobile-open" : ""}`}>
            {["profile", "skills", "projects", "experience", "testimonials", "education", "contact"].map((s) => (
              <a
                key={s}
                href={`#${s}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(s);
                }}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </a>
            ))}
          </div>
        </nav>

        {/* HERO */}
        <section id="hero">
          <div className="port-hero">
            <div className="port-hero-inner">
              <div className="port-hero-badge port-animate">Available for opportunities</div>
              <h1 className="port-hero-name port-animate port-delay-1">
                John Anthony
                <br />
                <span>T. Fariñas</span>
              </h1>
              <p className="port-hero-headline port-animate port-delay-2">
                Incident Management Analyst · Digital Operations Center Support · Full-Stack Developer
              </p>
              <div className="port-hero-contact port-animate port-delay-2">
                <span>📍 Binangonan, Rizal, Philippines</span>
                <a href="tel:+639894855940">📞 +6398 948 5940</a>
                <a href="mailto:farinas.janthony@gmail.com">✉️ farinas.janthony@gmail.com</a>
                <a href="https://linkedin.com/in/john-farinas" target="_blank" rel="noopener noreferrer">
                  🔗 LinkedIn
                </a>
                <a href="https://github.com/johnf" target="_blank" rel="noopener noreferrer">
                  💻 GitHub
                </a>
              </div>
              <div className="port-hero-actions port-animate port-delay-3">
                <a
                  href="#contact"
                  className="port-btn-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo("contact");
                  }}>
                  Get In Touch
                </a>
                <a href="#" className="port-btn-outline" onClick={(e) => e.preventDefault()}>
                  ⬇ Download CV
                </a>
                <a
                  href="https://linkedin.com/in/john-farinas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="port-btn-outline">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* PROFILE */}
        <section id="profile">
          <div className="port-section">
            <h2 className="port-section-title">
              <span className="port-section-accent">01.</span> Professional Profile
            </h2>
            <div className="port-profile-card port-animate">
              <p>
                Incident Management and Digital Operations Center (DOC) professional with{" "}
                <strong>16+ years of experience</strong> supporting enterprise IT environments and US-based clients in
                24×7 operations. Known for calm execution under pressure and clear stakeholder communication. Strong
                background in system monitoring, alert triage, incident prioritization, Major Incident (MI) support, and
                vendor coordination.
              </p>
              <br />
              <p>
                Now bridging extensive infrastructure stability experience with modern{" "}
                <strong>full-stack web development</strong> and self-hosted open-source solutions — combining deep
                operational expertise with a passion for building scalable, maintainable applications.
              </p>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills">
          <div className="port-section">
            <h2 className="port-section-title">
              <span className="port-section-accent">02.</span> Core Skills & Tools
            </h2>
            <div className="port-skills-grid">
              {[
                {
                  icon: "⚙️",
                  title: "Operations",
                  tags: [
                    "DOC / NOC Support",
                    "Incident Management (ITIL)",
                    "Major Incident Management",
                    "SLA/OLA/SLO Management",
                    "Alert Monitoring & Triage",
                  ],
                },
                {
                  icon: "📡",
                  title: "Monitoring",
                  tags: ["NAGIOS", "ICINGA", "CACTI", "MRTG", "UNMS", "ELK Stack", "Kibana", "New Relic"],
                },
                { icon: "🛠", title: "ITSM & Tools", tags: ["ServiceNow", "JIRA", "ManageEngine", "Salesforce"] },
                {
                  icon: "💻",
                  title: "Development",
                  tags: ["MongoDB", "Express", "React", "Node.js", "HTML/CSS", "JavaScript", "GitHub", "REST APIs"],
                },
              ].map((cat, i) => (
                <div key={i} className={`port-skill-card port-animate port-delay-${(i % 3) + 1}`}>
                  <div className="port-skill-card-title">
                    {cat.icon} {cat.title}
                  </div>
                  <div className="port-skill-tags">
                    {cat.tags.map((tag, j) => (
                      <span key={j} className="port-skill-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects">
          <div className="port-section">
            <h2 className="port-section-title">
              <span className="port-section-accent">03.</span> Featured Projects
            </h2>
            <div className="port-projects-grid">
              {[
                {
                  icon: "🏥",
                  name: "HomeHealthHero",
                  badge: "Full-Stack",
                  desc: "A full-stack web application designed to track and manage health metrics. Built with the MERN stack, demonstrating front-end design, RESTful API development, back-end server administration, and database management.",
                  tags: ["MongoDB", "Express", "React", "Node.js"],
                  github: "https://github.com/johnf/homehealthhero",
                  live: null,
                },
                {
                  icon: "📊",
                  name: "NOC Dashboard",
                  badge: "In Progress",
                  desc: "A self-hosted operations monitoring dashboard aggregating alerts from NAGIOS and ICINGA. Provides a unified view for incident triage and escalation workflows with real-time status indicators.",
                  tags: ["React", "Node.js", "REST API", "NAGIOS"],
                  github: "https://github.com/johnf/noc-dashboard",
                  live: null,
                },
                {
                  icon: "🤖",
                  name: "ITSM Automator",
                  badge: "Concept",
                  desc: "Automation scripts for common ITSM workflows — auto-categorizing ServiceNow tickets, triggering runbooks, and generating incident reports based on ELK Stack data.",
                  tags: ["Python", "ServiceNow", "ELK Stack", "JIRA"],
                  github: "https://github.com/johnf/itsm-automator",
                  live: null,
                },
                {
                  icon: "🔌",
                  name: "REST API Toolkit",
                  badge: "Placeholder",
                  desc: "A lightweight Node.js REST API boilerplate with built-in JWT authentication, rate limiting, structured logging via Winston, and auto-generated Swagger documentation — designed for rapid internal tool deployment.",
                  tags: ["Node.js", "Express", "JWT", "Swagger", "Winston"],
                  github: "https://github.com/johnf/rest-api-toolkit",
                  live: null,
                },
              ].map((p, i) => (
                <div key={i} className={`port-project-card port-animate port-delay-${(i % 3) + 1}`}>
                  <div className="port-project-card-header">
                    <div className="port-project-icon">{p.icon}</div>
                    <span className="port-project-badge">{p.badge}</span>
                  </div>
                  <div className="port-project-name">{p.name}</div>
                  <div className="port-project-desc">{p.desc}</div>
                  <div className="port-project-tags">
                    {p.tags.map((t, j) => (
                      <span key={j} className="port-project-tag">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="port-btn-outline"
                      style={{ fontSize: "0.8rem", padding: "0.4rem 1rem" }}>
                      💻 GitHub
                    </a>
                    {p.live && (
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="port-btn-primary"
                        style={{ fontSize: "0.8rem", padding: "0.4rem 1rem" }}>
                        🚀 Live Demo
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience">
          <div className="port-section">
            <h2 className="port-section-title">
              <span className="port-section-accent">04.</span> Professional Experience
            </h2>
            <div className="port-timeline">
              {[
                {
                  company: "Acquire BPO",
                  role: "Incident Management Analyst / DOC–NOC Specialist",
                  period: "May 2014 – Present",
                  current: true,
                  bullets: [
                    "Perform continuous monitoring of enterprise infrastructure and applications supporting 150+ clients.",
                    "Support Major Incidents by opening bridges, monitoring dashboards, and assisting the Major Incident Manager.",
                    "Act as escalation point for L1 and L2 service desks, providing structured status updates.",
                  ],
                },
                {
                  company: "Sutherland Global Services",
                  role: "Global IT Service Desk – Level 2",
                  period: "Feb 2012 – Apr 2014",
                  bullets: ["Provided advanced technical and operational support for global enterprise users."],
                },
                {
                  company: "iZone Technologies",
                  role: "IT Service Desk – Level 2",
                  period: "Jun 2011 – Jan 2012",
                  bullets: [],
                },
                {
                  company: "Sutherland Global Services",
                  role: "Microsoft Research Engineer / Technical Support",
                  period: "Sep 2009 – May 2011",
                  bullets: [],
                },
                {
                  company: "ePLDT / PLDT",
                  role: "IT Helpdesk – Level 2",
                  period: "Sep 2008 – Aug 2009",
                  bullets: [],
                },
              ].map((exp, i) => (
                <div key={i} className={`port-timeline-item port-animate port-delay-${(i % 3) + 1}`}>
                  <div className="port-timeline-role">{exp.role}</div>
                  <div className="port-timeline-company">{exp.company}</div>
                  <div className="port-timeline-period">
                    📅 {exp.period}
                    {exp.current && <span className="port-timeline-badge">Current</span>}
                  </div>
                  {exp.bullets.length > 0 && (
                    <ul className="port-timeline-bullets">
                      {exp.bullets.map((b, j) => (
                        <li key={j}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section id="testimonials">
          <div className="port-section">
            <h2 className="port-section-title">
              <span className="port-section-accent">05.</span> Testimonials
            </h2>
            <div className="port-testimonials-grid">
              {testimonials.map((t, i) => (
                <div key={i} className={`port-testimonial-card port-animate port-delay-${(i % 3) + 1}`}>
                  <span className="port-testimonial-quote-mark">"</span>
                  <p className="port-testimonial-text">"{t.quote}"</p>
                  <div className="port-testimonial-author">
                    <div className="port-testimonial-avatar">{t.initials}</div>
                    <div>
                      <div className="port-testimonial-name">{t.name}</div>
                      <div className="port-testimonial-role">{t.role}</div>
                      <div className="port-testimonial-relationship">{t.relationship}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EDUCATION */}
        <section id="education">
          <div className="port-section">
            <h2 className="port-section-title">
              <span className="port-section-accent">06.</span> Education & Certifications
            </h2>
            <div className="port-edu-grid">
              {[
                { icon: "🛡️", title: "Certified in Cybersecurity (CC)", org: "ISC2", date: "Valid: Jan 2024 – 2027" },
                { icon: "💻", title: "Full-Stack Web Development", org: "KodeGo", date: "Completed: Nov 2023" },
                { icon: "🎓", title: "BS Computer Engineering", org: "University of Cebu", date: "March 2008" },
              ].map((edu, i) => (
                <div key={i} className={`port-edu-card port-animate port-delay-${(i % 3) + 1}`}>
                  <div className="port-edu-icon">{edu.icon}</div>
                  <div className="port-edu-title">{edu.title}</div>
                  <div className="port-edu-org">{edu.org}</div>
                  <div className="port-edu-date">{edu.date}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact">
          <div className="port-section">
            <h2 className="port-section-title">
              <span className="port-section-accent">07.</span> Get In Touch
            </h2>
            <div className="port-contact-grid">
              <div className="port-contact-info port-animate">
                <p style={{ color: "var(--port-text-muted)", marginBottom: "1rem", lineHeight: "1.8" }}>
                  Open to new opportunities, collaborations, and conversations. Whether it's an incident management
                  role, a development project, or just a chat about tech — feel free to reach out.
                </p>
                {[
                  { icon: "📍", label: "Binangonan, Rizal, Philippines" },
                  { icon: "📞", label: "+6398 948 5940", href: "tel:+639894855940" },
                  { icon: "✉️", label: "farinas.janthony@gmail.com", href: "mailto:farinas.janthony@gmail.com" },
                  { icon: "🔗", label: "linkedin.com/in/john-farinas", href: "https://linkedin.com/in/john-farinas" },
                  { icon: "💻", label: "github.com/johnf", href: "https://github.com/johnf" },
                ].map((item, i) => (
                  <div key={i} className="port-contact-item">
                    <div className="port-contact-icon">{item.icon}</div>
                    {item.href ? (
                      <a href={item.href} target="_blank" rel="noopener noreferrer">
                        {item.label}
                      </a>
                    ) : (
                      <span>{item.label}</span>
                    )}
                  </div>
                ))}
              </div>
              <form className="port-contact-form port-animate port-delay-1" onSubmit={(e) => e.preventDefault()}>
                <input className="port-input" type="text" placeholder="Your Name" required />
                <input className="port-input" type="email" placeholder="Your Email" required />
                <textarea className="port-input port-textarea" placeholder="Your Message" required />
                <button type="submit" className="port-btn-primary" style={{ width: "100%" }}>
                  Send Message ✉️
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="port-footer">
          <div className="port-footer-links">
            <a href="https://linkedin.com/in/john-farinas" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href="https://github.com/johnf" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href="mailto:farinas.janthony@gmail.com">Email</a>
          </div>
          <p>© {new Date().getFullYear()} John Anthony T. Fariñas · Crafted with React & ☕</p>
        </footer>

        {/* BACK TO TOP */}
        <button
          className={`port-back-top${showBackToTop ? "" : " port-back-top-hidden"}`}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top">
          ↑
        </button>
      </div>
    </div>
  );
}
