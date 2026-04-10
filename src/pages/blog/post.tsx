import { useNavigate, useParams } from "react-router";
import { BLOG_POSTS } from "@/data/blog-posts";
import { Clock, Calendar, ArrowLeft, Code2, Github, Linkedin, Mail, ArrowRight } from "lucide-react";
import { useEffect } from "react";

function renderContent(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let key = 0;

  const renderInline = (text: string): React.ReactNode => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={i} style={{ color: "var(--port-heading)", fontWeight: 700 }}>
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={key++} className="text-xl font-bold mt-8 mb-3" style={{ color: "var(--port-heading)" }}>
          {line.slice(3)}
        </h2>,
      );
    } else if (line.startsWith("# ")) {
      elements.push(
        <h1 key={key++} className="text-2xl font-bold mt-8 mb-4" style={{ color: "var(--port-heading)" }}>
          {line.slice(2)}
        </h1>,
      );
    } else if (line === "---") {
      elements.push(<hr key={key++} style={{ borderColor: "var(--port-border)", margin: "2rem 0" }} />);
    } else if (line.startsWith("- ")) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        listItems.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={key++} className="flex flex-col gap-2 my-3 pl-2">
          {listItems.map((item, idx) => (
            <li key={idx} className="flex gap-2 text-sm leading-relaxed" style={{ color: "var(--port-text)" }}>
              <span style={{ color: "var(--port-accent)", flexShrink: 0, marginTop: "0.2rem" }}>▸</span>
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ul>,
      );
      continue;
    } else if (line.trim() === "") {
      // skip empty lines
    } else {
      elements.push(
        <p key={key++} className="text-base leading-relaxed my-3" style={{ color: "var(--port-text)" }}>
          {renderInline(line)}
        </p>,
      );
    }
    i++;
  }
  return elements;
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  const postIndex = BLOG_POSTS.findIndex((p) => p.slug === slug);
  const prevPost = postIndex > 0 ? BLOG_POSTS[postIndex - 1] : null;
  const nextPost = postIndex < BLOG_POSTS.length - 1 ? BLOG_POSTS[postIndex + 1] : null;

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [slug]);

  if (!post) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-4"
        style={{ background: "var(--port-bg)" }}>
        <p style={{ color: "var(--port-text-muted)" }}>Post not found.</p>
        <button onClick={() => navigate("/blog")} className="port-back-btn">
          Back to Blog
        </button>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--port-bg)", color: "var(--port-text)", fontFamily: "sans-serif" }}>
      <style>{`
        :root {
          --port-bg:#f0f4f8;--port-surface:#ffffff;--port-surface-2:#e2e8f0;
          --port-border:#cbd5e1;--port-text:#334155;--port-text-muted:#64748b;
          --port-heading:#0f172a;--port-accent:#0891b2;--port-accent-2:#0e7490;
          --port-navy:#f8fafc;--port-slate:#e2e8f0;
        }
        html.dark {
          --port-bg:#0d1b2a;--port-surface:#112240;--port-surface-2:#1a3357;
          --port-border:#1e3a5f;--port-text:#ccd6f6;--port-text-muted:#8892b0;
          --port-heading:#e6f1ff;--port-accent:#00d4d4;--port-accent-2:#00a8a8;
          --port-navy:#0a192f;--port-slate:#233554;
        }
        html { scroll-behavior: smooth; }
        .blog-tag{font-size:.72rem;font-weight:700;letter-spacing:.06em;background:rgba(0,212,212,.1);color:var(--port-accent);border:1px solid rgba(0,212,212,.25);border-radius:5px;padding:.2rem .55rem;}
        .port-nav-link{color:var(--port-text);font-size:.875rem;font-weight:500;text-decoration:none;transition:color .2s;cursor:pointer;background:transparent;border:none;}
        .port-nav-link:hover{color:var(--port-accent);}
        .port-back-btn{display:inline-flex;align-items:center;gap:.45rem;font-size:.85rem;font-weight:600;color:var(--port-accent);background:transparent;border:1.5px solid var(--port-accent);border-radius:7px;padding:.45rem 1rem;cursor:pointer;transition:background .2s,box-shadow .2s;}
        .port-back-btn:hover{background:rgba(0,212,212,.1);box-shadow:0 0 12px rgba(0,212,212,.2);}
        .nav-post-card{background:var(--port-surface);border:1px solid var(--port-border);border-radius:10px;padding:1rem 1.25rem;cursor:pointer;transition:border-color .2s,transform .2s;flex:1;}
        .nav-post-card:hover{border-color:var(--port-accent);transform:translateY(-2px);}
        .port-icon-btn{color:var(--port-text-muted);transition:color .2s,transform .2s;display:inline-flex;align-items:center;text-decoration:none;}
        .port-icon-btn:hover{color:var(--port-accent);transform:translateY(-2px);}
        .section-divider{height:1px;background:linear-gradient(to right,transparent,var(--port-border),transparent);}
      `}</style>

      {/* NAV */}
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
            <button onClick={() => navigate("/blog")} className="port-nav-link" style={{ color: "var(--port-accent)" }}>
              Blog
            </button>
          </div>
        </nav>
      </header>

      {/* ARTICLE */}
      <main className="max-w-3xl mx-auto px-6 py-12">
        {/* Back */}
        <button onClick={() => navigate("/blog")} className="port-back-btn mb-8">
          <ArrowLeft size={15} /> Back to Blog
        </button>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <span key={tag} className="blog-tag">
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-extrabold leading-tight mb-4" style={{ color: "var(--port-heading)" }}>
          {post.title}
        </h1>

        {/* Meta */}
        <div
          className="flex items-center gap-5 mb-8 pb-6"
          style={{ borderBottom: "1px solid var(--port-border)", color: "var(--port-text-muted)" }}>
          <span className="flex items-center gap-1.5 text-sm">
            <Calendar size={14} /> {post.date}
          </span>
          <span className="flex items-center gap-1.5 text-sm">
            <Clock size={14} /> {post.readTime}
          </span>
        </div>

        {/* Content */}
        <article>{renderContent(post.content)}</article>

        {/* Author card */}
        <div
          className="mt-12 p-5 rounded-xl flex items-start gap-4"
          style={{ background: "var(--port-surface)", border: "1px solid var(--port-border)" }}>
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-lg font-bold"
            style={{ background: "rgba(0,212,212,0.15)", color: "var(--port-accent)" }}>
            JF
          </div>
          <div>
            <p className="font-bold text-sm mb-0.5" style={{ color: "var(--port-heading)" }}>
              John Anthony T. Fariñas
            </p>
            <p className="text-xs mb-2" style={{ color: "var(--port-accent)" }}>
              Incident Management Analyst · Full-Stack Developer
            </p>
            <p className="text-xs leading-relaxed" style={{ color: "var(--port-text-muted)" }}>
              16+ years in IT operations and digital infrastructure. Sharing what I've learned in NOC environments, ITSM
              tools, monitoring stacks, and full-stack development.
            </p>
          </div>
        </div>

        {/* Post navigation */}
        {(prevPost || nextPost) && (
          <div className="mt-10">
            <div className="section-divider mb-8" />
            <div className="flex gap-4 flex-col sm:flex-row">
              {prevPost && (
                <div className="nav-post-card" onClick={() => navigate(`/blog/${prevPost.slug}`)}>
                  <p
                    className="text-xs font-semibold mb-1 flex items-center gap-1"
                    style={{ color: "var(--port-text-muted)" }}>
                    <ArrowLeft size={11} /> Previous
                  </p>
                  <p className="text-sm font-bold leading-snug" style={{ color: "var(--port-heading)" }}>
                    {prevPost.title}
                  </p>
                </div>
              )}
              {nextPost && (
                <div className="nav-post-card text-right ml-auto" onClick={() => navigate(`/blog/${nextPost.slug}`)}>
                  <p
                    className="text-xs font-semibold mb-1 flex items-center gap-1 justify-end"
                    style={{ color: "var(--port-text-muted)" }}>
                    Next <ArrowRight size={11} />
                  </p>
                  <p className="text-sm font-bold leading-snug" style={{ color: "var(--port-heading)" }}>
                    {nextPost.title}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <div className="section-divider" />
      <footer className="py-8 px-6 text-center" style={{ background: "var(--port-navy)" }}>
        <p className="text-sm mb-3" style={{ color: "var(--port-text-muted)" }}>
          Written by <span style={{ color: "var(--port-accent)", fontWeight: 600 }}>John Anthony T. Fariñas</span>
        </p>
        <div className="flex justify-center gap-5">
          <a
            href="https://linkedin.com/in/john-farinas"
            target="_blank"
            rel="noopener noreferrer"
            className="port-icon-btn">
            <Linkedin size={17} />
          </a>
          <a href="https://github.com/johnf" target="_blank" rel="noopener noreferrer" className="port-icon-btn">
            <Github size={17} />
          </a>
          <a href="mailto:farinas.janthony@gmail.com" className="port-icon-btn">
            <Mail size={17} />
          </a>
        </div>
      </footer>
    </div>
  );
}
