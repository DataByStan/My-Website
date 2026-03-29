// @ts-nocheck
import { useState, useEffect, useRef } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --forest: #162218;
    --forest-mid: #1e3422;
    --gold: #c9a44a;
    --gold-light: #e2c97e;
    --cream: #f4ede0;
    --cream-mid: #e8dccb;
    --warm-white: #faf6f0;
    --text-dark: #1a1a1a;
    --text-mid: #4a4a4a;
    --text-light: #8a7f74;
  }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--warm-white);
    color: var(--text-dark);
    overflow-x: hidden;
  }

  .cormorant { font-family: 'Cormorant Garamond', serif; }

  /* NAV */
  nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; justify-content: space-between; align-items: center;
    padding: 1.2rem 4rem;
    background: rgba(22, 34, 24, 0.96);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(201,164,74,0.2);
  }

  .nav-logo {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.3rem; font-weight: 600; color: var(--gold);
    letter-spacing: 0.04em;
  }

  .nav-links { display: flex; gap: 2.2rem; list-style: none; }
  .nav-links a {
    font-size: 0.78rem; font-weight: 500; color: rgba(244,237,224,0.75);
    text-decoration: none; letter-spacing: 0.12em; text-transform: uppercase;
    transition: color 0.2s;
  }
  .nav-links a:hover { color: var(--gold); }

  .nav-cta {
    background: var(--gold); color: var(--forest);
    border: none; padding: 0.55rem 1.4rem;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.78rem; font-weight: 600; letter-spacing: 0.08em;
    text-transform: uppercase; cursor: pointer; border-radius: 2px;
    transition: background 0.2s;
  }
  .nav-cta:hover { background: var(--gold-light); }

  /* HERO */
  .hero {
    min-height: 100vh;
    background: var(--forest);
    display: grid; grid-template-columns: 1fr 1fr;
    align-items: center;
    padding: 0 4rem;
    position: relative; overflow: hidden;
  }

  .hero-bg-pattern {
    position: absolute; inset: 0; opacity: 0.035;
    background-image: repeating-linear-gradient(
      45deg, var(--gold) 0, var(--gold) 1px, transparent 0, transparent 50%
    );
    background-size: 30px 30px;
  }

  .hero-accent-line {
    position: absolute; top: 0; right: 40%;
    width: 1px; height: 100%;
    background: linear-gradient(to bottom, transparent, rgba(201,164,74,0.3), transparent);
  }

  .hero-left { padding-right: 4rem; position: relative; z-index: 1; }

  .hero-eyebrow {
    font-size: 0.7rem; font-weight: 600; letter-spacing: 0.25em;
    text-transform: uppercase; color: var(--gold);
    display: flex; align-items: center; gap: 0.8rem; margin-bottom: 1.8rem;
  }
  .hero-eyebrow::before {
    content: ''; display: block; width: 2rem; height: 1px; background: var(--gold);
  }

  .hero-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(3rem, 5vw, 5rem);
    font-weight: 300; line-height: 1.05;
    color: var(--cream);
    margin-bottom: 0.4rem;
  }

  .hero-name span { font-style: italic; color: var(--gold); }

  .hero-tagline {
    font-size: clamp(1rem, 1.5vw, 1.25rem);
    font-weight: 300; color: rgba(244,237,224,0.6);
    margin-bottom: 2.5rem; line-height: 1.6;
    font-family: 'Cormorant Garamond', serif; font-style: italic;
  }

  .hero-roles {
    display: flex; flex-wrap: wrap; gap: 0.6rem; margin-bottom: 3rem;
  }

  .role-pill {
    padding: 0.4rem 1rem;
    border: 1px solid rgba(201,164,74,0.4);
    border-radius: 999px;
    font-size: 0.72rem; font-weight: 500; letter-spacing: 0.08em;
    text-transform: uppercase; color: rgba(244,237,224,0.7);
    background: rgba(201,164,74,0.08);
  }

  .hero-btns { display: flex; gap: 1rem; }

  .btn-primary {
    background: var(--gold); color: var(--forest);
    border: none; padding: 0.8rem 2rem;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.8rem; font-weight: 600; letter-spacing: 0.1em;
    text-transform: uppercase; cursor: pointer; border-radius: 2px;
    transition: all 0.25s;
  }
  .btn-primary:hover { background: var(--gold-light); transform: translateY(-2px); }

  .btn-ghost {
    background: transparent; color: var(--cream);
    border: 1px solid rgba(244,237,224,0.3); padding: 0.8rem 2rem;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.8rem; font-weight: 500; letter-spacing: 0.1em;
    text-transform: uppercase; cursor: pointer; border-radius: 2px;
    transition: all 0.25s;
  }
  .btn-ghost:hover { border-color: var(--gold); color: var(--gold); }

  /* HERO RIGHT - visual card */
  .hero-right {
    position: relative; z-index: 1;
    display: flex; justify-content: center;
  }

  .hero-card {
    background: rgba(244,237,224,0.06);
    border: 1px solid rgba(201,164,74,0.2);
    border-radius: 4px;
    padding: 2.5rem; width: 100%; max-width: 380px;
  }

  .hero-card-label {
    font-size: 0.65rem; font-weight: 600; letter-spacing: 0.2em;
    text-transform: uppercase; color: var(--gold); margin-bottom: 1.5rem;
  }

  .stat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }

  .stat-item { border-left: 2px solid rgba(201,164,74,0.4); padding-left: 1rem; }
  .stat-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.2rem; font-weight: 600; color: var(--cream); line-height: 1;
  }
  .stat-desc { font-size: 0.7rem; color: rgba(244,237,224,0.5); margin-top: 0.3rem; line-height: 1.4; }

  .hero-divider { margin: 2rem 0; height: 1px; background: rgba(201,164,74,0.15); }

  .hero-card-footer {
    font-size: 0.72rem; color: rgba(244,237,224,0.4);
    font-style: italic; font-family: 'Cormorant Garamond', serif;
  }

  /* WHAT I DO */
  .section { padding: 6rem 4rem; }
  .section-alt { background: var(--cream); }
  .section-dark { background: var(--forest); }

  .section-label {
    font-size: 0.68rem; font-weight: 600; letter-spacing: 0.25em;
    text-transform: uppercase; color: var(--gold);
    display: flex; align-items: center; gap: 0.8rem; margin-bottom: 1rem;
  }
  .section-label::before { content: ''; display: block; width: 1.5rem; height: 1px; background: var(--gold); }

  .section-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2rem, 3.5vw, 3rem);
    font-weight: 400; line-height: 1.1; color: var(--text-dark);
    margin-bottom: 1rem;
  }
  .section-title.light { color: var(--cream); }

  .section-subtitle {
    font-size: 0.95rem; color: var(--text-mid); max-width: 520px; line-height: 1.7;
    margin-bottom: 3.5rem;
  }
  .section-subtitle.light { color: rgba(244,237,224,0.6); }

  .cards-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }

  .role-card {
    background: white; border-radius: 4px; padding: 2rem 1.8rem;
    border: 1px solid var(--cream-mid);
    transition: all 0.3s; cursor: default; position: relative; overflow: hidden;
  }
  .role-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0;
    height: 3px; background: var(--gold);
    transform: scaleX(0); transform-origin: left; transition: transform 0.3s;
  }
  .role-card:hover { box-shadow: 0 12px 40px rgba(0,0,0,0.1); transform: translateY(-4px); }
  .role-card:hover::before { transform: scaleX(1); }

  .role-icon {
    font-size: 1.8rem; margin-bottom: 1.2rem; display: block;
  }
  .role-card-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.3rem; font-weight: 600; color: var(--forest); margin-bottom: 0.6rem;
  }
  .role-card-desc {
    font-size: 0.82rem; color: var(--text-mid); line-height: 1.65;
  }

  /* SERVICES */
  .services-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }

  .service-item {
    display: flex; gap: 1.2rem; align-items: flex-start;
    padding: 1.8rem; border: 1px solid var(--cream-mid);
    border-radius: 4px; background: white;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .service-item:hover { border-color: var(--gold); box-shadow: 0 4px 20px rgba(201,164,74,0.12); }

  .service-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.5rem; font-weight: 600; color: var(--gold);
    min-width: 2rem; line-height: 1;
  }
  .service-title { font-size: 0.9rem; font-weight: 600; color: var(--forest); margin-bottom: 0.4rem; }
  .service-desc { font-size: 0.8rem; color: var(--text-mid); line-height: 1.6; }

  /* GOSPEL SECTION */
  .gospel-inner {
    display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center;
  }

  .gospel-badge {
    display: inline-flex; align-items: center; gap: 0.5rem;
    background: rgba(201,164,74,0.12); border: 1px solid rgba(201,164,74,0.3);
    border-radius: 999px; padding: 0.35rem 1rem;
    font-size: 0.68rem; font-weight: 600; letter-spacing: 0.15em;
    text-transform: uppercase; color: var(--gold); margin-bottom: 1.5rem;
  }

  .gospel-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2rem, 3vw, 2.8rem);
    font-weight: 400; line-height: 1.1; color: var(--cream); margin-bottom: 1rem;
  }
  .gospel-title em { font-style: italic; color: var(--gold); }

  .gospel-desc {
    font-size: 0.9rem; color: rgba(244,237,224,0.6); line-height: 1.75; margin-bottom: 2rem;
  }

  .episode-stack { display: flex; flex-direction: column; gap: 0.8rem; }

  .episode-card {
    display: flex; align-items: center; gap: 1rem;
    background: rgba(244,237,224,0.05); border: 1px solid rgba(201,164,74,0.15);
    border-radius: 4px; padding: 1rem 1.2rem;
    transition: background 0.2s, border-color 0.2s; cursor: pointer;
  }
  .episode-card:hover { background: rgba(201,164,74,0.08); border-color: rgba(201,164,74,0.35); }

  .play-btn {
    width: 36px; height: 36px; border-radius: 50%;
    background: var(--gold); display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; font-size: 0.8rem;
  }
  .episode-info { flex: 1; }
  .episode-title { font-size: 0.82rem; font-weight: 500; color: var(--cream); margin-bottom: 0.15rem; }
  .episode-meta { font-size: 0.7rem; color: rgba(244,237,224,0.4); }

  /* BLOG */
  .blog-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }

  .blog-card {
    border-radius: 4px; overflow: hidden; background: white;
    border: 1px solid var(--cream-mid);
    transition: box-shadow 0.3s, transform 0.3s; cursor: pointer;
  }
  .blog-card:hover { box-shadow: 0 12px 40px rgba(0,0,0,0.1); transform: translateY(-3px); }

  .blog-thumb {
    height: 140px; display: flex; align-items: center; justify-content: center;
    font-size: 2.5rem;
  }

  .blog-body { padding: 1.5rem; }
  .blog-tag {
    font-size: 0.65rem; font-weight: 600; letter-spacing: 0.15em;
    text-transform: uppercase; color: var(--gold); margin-bottom: 0.6rem;
  }
  .blog-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.1rem; font-weight: 600; color: var(--forest); line-height: 1.3;
    margin-bottom: 0.6rem;
  }
  .blog-excerpt { font-size: 0.78rem; color: var(--text-mid); line-height: 1.6; }

  /* CONTACT */
  .contact-inner {
    display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: start;
  }

  .contact-detail { display: flex; flex-direction: column; gap: 1.5rem; }
  .contact-item {
    display: flex; gap: 1rem; align-items: flex-start;
    padding-bottom: 1.5rem; border-bottom: 1px solid var(--cream-mid);
  }
  .contact-item:last-child { border-bottom: none; }
  .contact-icon { font-size: 1.2rem; margin-top: 0.1rem; }
  .contact-label { font-size: 0.68rem; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; color: var(--text-light); margin-bottom: 0.2rem; }
  .contact-value { font-size: 0.9rem; color: var(--text-dark); font-weight: 500; }

  .contact-form { display: flex; flex-direction: column; gap: 1rem; }
  .form-input {
    padding: 0.85rem 1rem; border: 1px solid var(--cream-mid); border-radius: 2px;
    font-family: 'DM Sans', sans-serif; font-size: 0.85rem;
    background: white; color: var(--text-dark); outline: none;
    transition: border-color 0.2s;
  }
  .form-input:focus { border-color: var(--gold); }
  .form-input::placeholder { color: var(--text-light); }
  textarea.form-input { resize: vertical; min-height: 120px; }

  /* FOOTER */
  footer {
    background: var(--forest); padding: 2.5rem 4rem;
    display: flex; justify-content: space-between; align-items: center;
    border-top: 1px solid rgba(201,164,74,0.15);
  }
  .footer-logo {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.1rem; font-weight: 600; color: var(--gold);
  }
  .footer-text { font-size: 0.72rem; color: rgba(244,237,224,0.35); }

  /* SCROLL ANIMATIONS */
  .fade-in { opacity: 0; transform: translateY(24px); transition: opacity 0.7s ease, transform 0.7s ease; }
  .fade-in.visible { opacity: 1; transform: translateY(0); }

  @media (max-width: 900px) {
    nav { padding: 1rem 1.5rem; }
    .nav-links { display: none; }
    .hero { grid-template-columns: 1fr; padding: 6rem 1.5rem 3rem; }
    .hero-right { display: none; }
    .section { padding: 4rem 1.5rem; }
    .cards-grid { grid-template-columns: 1fr 1fr; }
    .services-grid, .gospel-inner, .contact-inner { grid-template-columns: 1fr; gap: 2rem; }
    .blog-grid { grid-template-columns: 1fr; }
    footer { flex-direction: column; gap: 1rem; text-align: center; padding: 2rem 1.5rem; }
  }
`;


const HERO_IMG = "https://i.ibb.co/hRzJN5zn/IMG-20260323-WA0003.jpg";
const ABOUT_IMG = "https://i.ibb.co/rKQvSTQ2/IMG-20260323-WA0004.jpg";

export default function StanleyHomepage() {
  const fadeRefs = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.15 }
    );
    fadeRefs.current.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const addRef = (el: HTMLElement | null) => { if (el && !fadeRefs.current.includes(el)) fadeRefs.current.push(el); };

  return (
    <>
      <style>{styles}</style>

      {/* NAV */}
      <nav>
        <div className="nav-logo">StanleyCreates</div>
        <ul className="nav-links">
          {["About","Services","Gospel","Blog","Contact"].map(l => (
            <li key={l}><a href="#">{l}</a></li>
          ))}
        </ul>
        <button className="nav-cta">Hire Me</button>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg-pattern" />
        <div className="hero-accent-line" />
        <div className="hero-left">
          <div className="hero-eyebrow">Portfolio & Ministry</div>
          <h1 className="hero-name cormorant">
            Stanley<br /><span>Creates</span>
          </h1>
          <p className="hero-tagline">
            Educating minds, designing possibilities,<br />and spreading faith — one word at a time.
          </p>
          <div className="hero-roles">
            {["Educator","Researcher","Designer","Gospel Creator","Administrator"].map(r => (
              <span className="role-pill" key={r}>{r}</span>
            ))}
          </div>
          <div className="hero-btns">
            <button className="btn-primary">Work With Me</button>
            <button className="btn-ghost">Explore My Work</button>
          </div>
        </div>
        <div className="hero-right">
          <div style={{position:"relative", width:"100%", maxWidth:"420px"}}>
            <img src={HERO_IMG} alt="Stanley S. Iribhogbe" style={{
              width:"100%", borderRadius:"4px",
              objectFit:"cover", objectPosition:"center top",
              height:"500px",
              border:"1px solid rgba(201,164,74,0.3)",
              boxShadow:"0 20px 60px rgba(0,0,0,0.4)"
            }}/>
            <div style={{
              position:"absolute", bottom:"1.5rem", left:"1.5rem", right:"1.5rem",
              background:"rgba(22,34,24,0.92)", backdropFilter:"blur(8px)",
              border:"1px solid rgba(201,164,74,0.25)", borderRadius:"4px",
              padding:"1rem 1.2rem", display:"flex", gap:"1.5rem"
            }}>
              {[["8+","Yrs Experience"],["5+","Bible Series"],["∞","Stories"]]
                .map(([n,d]) => (
                <div key={d} style={{textAlign:"center", flex:1}}>
                  <div style={{fontFamily:"Cormorant Garamond,serif", fontSize:"1.5rem", fontWeight:600, color:"var(--gold)", lineHeight:1}}>{n}</div>
                  <div style={{fontSize:"0.62rem", color:"rgba(244,237,224,0.5)", marginTop:"0.2rem"}}>{d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHAT I DO */}
      <section className="section">
        <div ref={addRef} className="fade-in">
          <div className="section-label">What I Do</div>
          <h2 className="section-title cormorant">Four Roles.<br />One Mission.</h2>
          <p className="section-subtitle">
            Every role I carry is connected by a single thread — the desire to equip, inspire, and leave things better than I found them.
          </p>
        </div>
        <div ref={addRef} className="cards-grid fade-in" style={{transitionDelay:"0.15s"}}>
          {[
            { icon: "📚", title: "Educator", desc: "Over 8 years shaping minds in computer science, digital skills, and life skills across schools, institutes, and NGOs." },
            { icon: "🔬", title: "Researcher", desc: "Passionate about data, analysis, and uncovering insight. Pursuing advanced studies in Data Science & Analytics." },
            { icon: "✏️", title: "Designer", desc: "From document design to digital layouts — crafting clear, beautiful, and purposeful visual communication." },
            { icon: "🎙️", title: "Gospel Creator", desc: "Founder of FredStan Gospel — producing Bible story series, podcasts, and faith content for a global audience." },
          ].map(c => (
            <div className="role-card" key={c.title}>
              <span className="role-icon">{c.icon}</span>
              <div className="role-card-title cormorant">{c.title}</div>
              <p className="role-card-desc">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      
      {/* ABOUT */}
      <section className="section section-alt">
        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"4rem", alignItems:"center"}}>
          <div ref={addRef} className="fade-in" style={{position:"relative"}}>
            <img src={ABOUT_IMG} alt="Stanley at FredStan Gospel Podcast" style={{
              width:"100%", borderRadius:"4px",
              objectFit:"cover", height:"480px",
              objectPosition:"center top",
              boxShadow:"0 16px 50px rgba(0,0,0,0.15)",
              border:"1px solid var(--cream-mid)"
            }}/>
            <div style={{
              position:"absolute", bottom:"-1.5rem", right:"-1.5rem",
              background:"var(--forest)", color:"var(--gold)",
              padding:"1.2rem 1.5rem", borderRadius:"4px",
              fontFamily:"Cormorant Garamond,serif", fontSize:"1rem",
              fontStyle:"italic", maxWidth:"220px", lineHeight:1.4,
              border:"1px solid rgba(201,164,74,0.3)"
            }}>
              "Teaching is planting seeds that outlive the sower."
            </div>
          </div>
          <div ref={addRef} className="fade-in" style={{transitionDelay:"0.15s"}}>
            <div className="section-label">About Me</div>
            <h2 className="section-title cormorant">Educator. Creator.<br/>Man of Faith.</h2>
            <p style={{fontSize:"0.85rem", fontWeight:600, color:"var(--forest)", letterSpacing:"0.05em", marginBottom:"1rem", marginTop:"-0.5rem"}}>Stanley Solomon Iribhogbe</p>
            <p style={{fontSize:"0.9rem", color:"var(--text-mid)", lineHeight:1.8, marginBottom:"1rem"}}>
              With over 8 years of experience spanning education, administration, NGO fieldwork, and digital content creation, I am driven by one purpose — to equip people and spread truth.
            </p>
            <p style={{fontSize:"0.9rem", color:"var(--text-mid)", lineHeight:1.8, marginBottom:"1rem"}}>
              I am the founder of <strong style={{color:"var(--forest)"}}>FredStan Gospel</strong>, a faith content ministry producing Bible story series, podcasts, and devotional media for a global audience.
            </p>
            <p style={{fontSize:"0.9rem", color:"var(--text-mid)", lineHeight:1.8, marginBottom:"2rem"}}>
              Based in Kaduna, Nigeria, I work with clients and audiences across the world — combining professional excellence with gospel purpose.
            </p>
            <button className="btn-primary" style={{background:"var(--forest)", color:"var(--gold)"}}>Download My CV</button>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section section-alt">
        <div ref={addRef} className="fade-in">
          <div className="section-label">Services</div>
          <h2 className="section-title cormorant">How I Can Help You</h2>
          <p className="section-subtitle">
            Professional services built on real-world experience — delivered with precision, care, and a teacher's clarity.
          </p>
        </div>
        <div ref={addRef} className="services-grid fade-in" style={{transitionDelay:"0.1s"}}>
          {[
            { n:"01", t:"Document Production", d:"CVs, cover letters, reports, proposals, and formatted professional documents for global clients." },
            { n:"02", t:"Computer Training", d:"Digital literacy, Microsoft Office, and ICT training programs for individuals and organisations." },
            { n:"03", t:"Administrative Support", d:"Operations management, data entry, record-keeping, and virtual assistance for businesses and NGOs." },
            { n:"04", t:"Content Writing & Research", d:"Well-researched articles, blog posts, educational content, and curriculum development." },
            { n:"05", t:"Gospel Content Creation", d:"Scripted Bible story videos, voiceovers, and podcast production for faith-based platforms." },
            { n:"06", t:"Academic Consultation", d:"Study guidance, research assistance, and structured learning support for students." },
          ].map(s => (
            <div className="service-item" key={s.n}>
              <div className="service-num cormorant">{s.n}</div>
              <div>
                <div className="service-title">{s.t}</div>
                <div className="service-desc">{s.d}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FREDSTAN GOSPEL */}
      <section className="section section-dark">
        <div className="gospel-inner">
          <div ref={addRef} className="fade-in">
            <div className="gospel-badge">🎙️ FredStan Gospel</div>
            <h2 className="gospel-title cormorant">
              Faith Stories<br />That <em>Move</em> People
            </h2>
            <p className="gospel-desc">
              FredStan Gospel is a faith content ministry producing scripted Bible story series, podcast episodes, and devotional media — bringing ancient truths alive for the modern world.
            </p>
            <div style={{display:"flex", gap:"1rem", flexWrap:"wrap"}}>
              <button className="btn-primary">Listen Now</button>
              <button className="btn-ghost">Watch on YouTube</button>
            </div>
          </div>
          <div ref={addRef} className="episode-stack fade-in" style={{transitionDelay:"0.15s"}}>
            {[
              { t: "When Everything Falls Apart", s: "Episode 01 • Ruth & Naomi Series", d: "28 min" },
              { t: "The Three Who Wouldn't Bow", s: "Shadrach, Meshach & Abednego", d: "32 min" },
              { t: "Running From Your Purpose", s: "Jonah Series • Part 1", d: "24 min" },
              { t: "From the Pit to the Palace", s: "Joseph Series • Part 1", d: "30 min" },
            ].map(ep => (
              <div className="episode-card" key={ep.t}>
                <div className="play-btn">▶</div>
                <div className="episode-info">
                  <div className="episode-title">{ep.t}</div>
                  <div className="episode-meta">{ep.s} · {ep.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section className="section">
        <div ref={addRef} className="fade-in">
          <div className="section-label">Resources & Blog</div>
          <h2 className="section-title cormorant">Ideas Worth Sharing</h2>
          <p className="section-subtitle">
            Articles, guides, and free resources for educators, learners, and those on a journey of faith.
          </p>
        </div>
        <div ref={addRef} className="blog-grid fade-in" style={{transitionDelay:"0.1s"}}>
          {[
            { bg:"#e8f4e8", icon:"📊", tag:"Data & Research", title:"Getting Started with Data Science in Africa", excerpt:"Why now is the best time for African professionals to pivot into data — and how to begin without leaving home." },
            { bg:"#f4ede0", icon:"✍️", tag:"Career & Freelance", title:"How I Built a Freelance Portfolio from Scratch", excerpt:"A practical guide for educators and administrators transitioning into remote and freelance work." },
            { bg:"#e8e8f4", icon:"📖", tag:"Faith & Devotion", title:"What Ruth Teaches Us About Loyalty in Hard Times", excerpt:"Lessons from the Book of Ruth that apply powerfully to friendship, work, and calling in modern life." },
          ].map(b => (
            <div className="blog-card" key={b.title}>
              <div className="blog-thumb" style={{background: b.bg}}>{b.icon}</div>
              <div className="blog-body">
                <div className="blog-tag">{b.tag}</div>
                <div className="blog-title cormorant">{b.title}</div>
                <p className="blog-excerpt">{b.excerpt}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section className="section section-alt">
        <div ref={addRef} className="fade-in">
          <div className="section-label">Contact</div>
          <h2 className="section-title cormorant">Let's Work Together</h2>
        </div>
        <div ref={addRef} className="contact-inner fade-in" style={{transitionDelay:"0.1s"}}>
          <div>
            <p className="section-subtitle" style={{marginBottom:"2rem"}}>
              Whether you need a skilled professional, a faith-inspired creative, or an educator — I'd love to hear from you.
            </p>
            <div className="contact-detail">
              {[
                { icon:"📧", label:"Email", val:"stanleysiribhogbe@gmail.com" },
                { icon:"📱", label:"Phone / WhatsApp", val:"+234 803 972 5496" },
                { icon:"📍", label:"Based In", val:"Kaduna, Nigeria · Available Globally" },
              ].map(c => (
                <div className="contact-item" key={c.label}>
                  <span className="contact-icon">{c.icon}</span>
                  <div>
                    <div className="contact-label">{c.label}</div>
                    <div className="contact-value">{c.val}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="contact-form">
            <input className="form-input" placeholder="Your Name" />
            <input className="form-input" placeholder="Your Email" />
            <input className="form-input" placeholder="Subject (e.g. Freelance Project, Collaboration)" />
            <textarea className="form-input" placeholder="Tell me about your project or enquiry..." />
            <button className="btn-primary" style={{alignSelf:"flex-start"}}>Send Message</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-logo">StanleyCreates</div>
        <div className="footer-text">© 2026 · Educator · Designer · Gospel Creator · Kaduna, Nigeria</div>
      </footer>
    </>
  );
}
