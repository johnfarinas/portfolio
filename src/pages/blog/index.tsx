import { useNavigate } from "react-router";
import { Badge } from "@/components/ui/badge";
import { BLOG_POSTS } from "@/data/blog-posts";
import { Clock, Calendar, ArrowRight, Code2, Github, Linkedin, Mail } from "lucide-react";
import { useEffect, useState } from "react";

export default function BlogPage() {
  const navigate = useNavigate();
  const [isDark] = useState<boolean>(() => {
    return document.documentElement.classList.contains("dark");
  });

  useEffect(() => {
    window.scrollTo({ top: 0 });

    // Scroll-reveal observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" },
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--port-bg)", color: "var(--port-text)", fontFamily: "sans-serif" }}>
      <style>{`
        :root {
          --port-bg:        #f0f4f8;
          --port-surface:   #ffffff;
          --port-surface-2: #e2e8f0;
          --port-border:    #cbd5e1;
          --port-text:      #334155;
          --port-text-muted:#64748b;
          --port-heading:   #0f172a;
          --port-accent:    #0891b2;
          --port-accent-2:  #0e7490;
          --port-navy:      #f8fafc;
          --port-slate:     #e2e8f0;
        }
        html.dark {
          --port-bg:        #0d1b2a;
          --port-surface:   #112240;
          --port-surface-2: #1a3357;
          --port-border:    #1e3a5f;
          --port-text:      #ccd6f6;
          --port-text-muted:#8892b0;
          --port-heading:   #e6f1ff;
          --port-accent:    #00d4d4;
          --port-accent-2:  #00a8a8;
          --port-navy:      #0a192f;
          --port-slate:     #233554;
        }
        html { scroll-behavior: smooth; }
        .blog-card {
          background: var(--port-surface);
          border: 1px solid var(--port-border);
          border-radius: 14px;
          padding: 1.75rem;
          cursor: pointer;
          transition: border-color 0.2s, box-shadow 0.2s, transform 0.22s;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .blog-card:hover {
          border-color: var(--port-accent);
          box-shadow: 0 6px 32px rgba(0,212,212,0.1);
          transform: translateY(-3px);
        }
        .blog-tag {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          background: rgba(0,212,212,0.1);
          color: var(--port-accent);
          border: 1px solid rgba(0,212,212,0.25);
          border-radius: 5px;
          padding: 0.2rem 0.55rem;
        }
        .port-section-tag {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--port-accent);
          margin-bottom: 0.5rem;
          display: block;
        }
        .reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .reveal-delay-1 { transition-delay: 0.08s; }
        .reveal-delay-2 { transition-delay: 0.16s; }
        .reveal-delay-3 { transition-delay: 0.24s; }
        .reveal-delay-4 { transition-delay: 0.32s; }
        .reveal-delay-5 { transition-delay: 0.4s; }
        .port-nav-link {
          color: var(--port-text);
          font-size: 0.875rem;
          font-weight: 500;
          text-decoration: none;
          transition: color 0.2s;
          cursor: pointer;
          background: transparent;
          border: none;
        }
        .port-nav-link:hover { color: var(--port-accent); }
        .port-icon-btn {
          color: var(--port-text-muted);
          transition: color 0.2s, transform 0.2s;
          display: inline-flex;
          align-items: center;
          text-decoration: none;
        }
        .port-icon-btn:hover {
          color: var(--port-accent);
          transform: translateY(-2px);
        }
        .read-more-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--port-accent);
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0;
          transition: gap 0.2s;
        }
        .blog-card:hover .read-more-btn { gap: 0.65rem; }
        .section-divider {
          height: 1px;
          background: linear-gradient(to right, transparent, var(--port-border), transparent);
        }
      `}</style>

      {/* ── NAV ── */}
      <header
        className="sticky top-0 z-40 border-b"
        style={{
          background: "color-mix(in srgb, var(--port-bg) 95%, transparent)",
          backdropFilter: "blur(12px)",
          borderColor: "var(--port-border)",
        }}>
        <nav className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 bg-transparent border-none cursor-pointer">
            <Code2 size={20} style={{ color: "var(--port-accent)" }} />
            <span className="font-bold text-sm tracking-wide" style={{ color: "var(--port-heading)" }}>
              JAT<span style={{ color: "var(--port-accent)" }}>F</span>
            </span>
          </button>
          <div className="flex items-center gap-6">
            <button onClick={() => navigate("/")} className="port-nav-link">
              Portfolio
            </button>
            <button
              className="port-nav-link"
              style={{
                color: "var(--port-accent)",
                borderBottom: "2px solid var(--port-accent)",
                paddingBottom: "2px",
              }}>
              Blog
            </button>
          </div>
        </nav>
      </header>

      {/* ── HERO ── */}
      <section
        className="py-20 px-6 text-center relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, var(--port-navy) 0%, var(--port-surface) 100%)",
        }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 60%, rgba(0,212,212,0.06) 0%, transparent 65%)" }}
        />
        <div className="relative max-w-3xl mx-auto">
          <span className="port-section-tag">Writing</span>
          <h1
            className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4"
            style={{ color: "var(--port-heading)" }}>
            The <span style={{ color: "var(--port-accent)" }}>Blog</span>
          </h1>
          <p className="text-base md:text-lg max-w-xl mx-auto" style={{ color: "var(--port-text-muted)" }}>
            Practical insights on IT operations, incident management, monitoring tools, and full-stack development --
            from 16+ years in the trenches.
          </p>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── POSTS GRID ── */}
      <section className="py-16 px-6" style={{ background: "var(--port-bg)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {BLOG_POSTS.map((post, i) => (
              <article
                key={post.slug}
                className={`blog-card reveal reveal-delay-${Math.min(i + 1, 5)}`}
                onClick={() => navigate(`/blog/${post.slug}`)}
                role="button"
                tabIndex={0}
                aria-label={`Read: ${post.title}`}
                onKeyDown={(e) => e.key === "Enter" && navigate(`/blog/${post.slug}`)}>
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="blog-tag">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h2 className="text-lg font-bold leading-snug" style={{ color: "var(--port-heading)" }}>
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--port-text-muted)" }}>
                  {post.excerpt}
                </p>

                {/* Meta + CTA */}
                <div
                  className="flex items-center justify-between pt-3"
                  style={{ borderTop: "1px solid var(--port-border)" }}>
                  <div className="flex items-center gap-4" style={{ color: "var(--port-text-muted)" }}>
                    <span className="flex items-center gap-1.5 text-xs">
                      <Calendar size={13} />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs">
                      <Clock size={13} />
                      {post.readTime}
                    </span>
                  </div>
                  <button className="read-more-btn">
                    Read more <ArrowRight size={13} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── FOOTER ── */}
      <footer className="py-8 px-6 text-center" style={{ background: "var(--port-navy)" }}>
        <p className="text-sm mb-3" style={{ color: "var(--port-text-muted)" }}>
          Written by <span style={{ color: "var(--port-accent)", fontWeight: 600 }}>John Anthony T. Fariñas</span>
        </p>
        <div className="flex justify-center gap-5">
          <a
            href="https://linkedin.com/in/john-farinas"
            target="_blank"
            rel="noopener noreferrer"
            className="port-icon-btn"
            aria-label="LinkedIn">
            <Linkedin size={17} />
          </a>
          <a
            href="https://github.com/johnf"
            target="_blank"
            rel="noopener noreferrer"
            className="port-icon-btn"
            aria-label="GitHub">
            <Github size={17} />
          </a>
          <a href="mailto:farinas.janthony@gmail.com" className="port-icon-btn" aria-label="Email">
            <Mail size={17} />
          </a>
        </div>
      </footer>
    </div>
  );
}
