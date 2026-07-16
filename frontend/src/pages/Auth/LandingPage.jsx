import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Menu, X } from "lucide-react";
import "../../styles/landing.css";

export default function LandingPage() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState("");

  const markLoaded = useCallback(() => setVideoLoaded(true), []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    // If the browser already has data by the time this effect runs
    // (common after a React StrictMode double-mount in dev), the
    // loadeddata event has already fired and we'd miss it — so check
    // readyState directly as a fallback.
    if (el.readyState >= 2) {
      markLoaded();
    }
    // The autoPlay attribute alone can silently fail to fire in a React
    // SPA (mount timing, StrictMode remounts). Explicitly request
    // playback as a backup; browsers may reject the promise if the tab
    // isn't foregrounded yet, which is fine — .catch swallows that.
    el.play?.().catch(() => {});
    // Safety net: never leave the video invisible for more than 2s.
    const fallback = setTimeout(markLoaded, 2000);
    return () => clearTimeout(fallback);
  }, [markLoaded]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    // Hand the email off to your signup flow / API here
    navigate("/register", { state: { email } });
  };

  return (
    <div className="lp-page">
      {/* BACKGROUND VIDEO */}
      <video
        ref={videoRef}
        className={`lp-video ${videoLoaded ? "lp-video--loaded" : ""}`}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onLoadedData={markLoaded}
        onCanPlay={markLoaded}
        onPlaying={markLoaded}
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Solid black base so nothing but black shows before the video paints */}
      <div className="lp-video-base" />

      {/* BOTTOM FADE (keeps footer/email area readable) */}
      <div className="lp-fade-bottom" />

      {/* NAV */}
      <nav className="lp-nav">
        <span className="lp-brand">HealthCircle AI</span>

        {/* Desktop nav */}
        <div className="lp-nav-links">
          <button onClick={() => navigate("/login")} className="lp-link">
            Log in
          </button>
          <button
            onClick={() => navigate("/register")}
            className="lp-glass lp-btn-pill"
          >
            Register
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lp-glass lp-hamburger"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu panel */}
      {menuOpen && (
        <div className="lp-glass lp-mobile-menu">
          <button
            onClick={() => {
              setMenuOpen(false);
              navigate("/login");
            }}
            className="lp-mobile-link"
          >
            Log in
          </button>
          <button
            onClick={() => {
              setMenuOpen(false);
              navigate("/register");
            }}
            className="lp-mobile-link"
          >
            Register
          </button>
        </div>
      )}

      {/* HERO CONTENT */}
      <div className="lp-hero">
        <h1 className="lp-heading">See tomorrow's health risks, today.</h1>

        <p className="lp-sub">
          HealthCircle AI reads the quiet signals your body sends every day
          and turns them into early warnings — giving you and your doctor the
          lead time that real prevention needs.
        </p>

        {/* EMAIL CAPTURE */}
        <form onSubmit={handleSubmit} className="lp-glass lp-form">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="lp-input"
          />
          <button type="submit" aria-label="Submit email" className="lp-submit">
            <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}