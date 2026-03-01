import { useState, useEffect, useRef } from "react";

// ─── Utility: Intersection Observer Hook ───
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// ─── Sparkle / Bubble Particles ───
function Sparkles() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 8,
    duration: 4 + Math.random() * 6,
    size: 4 + Math.random() * 10,
    opacity: 0.15 + Math.random() * 0.3,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            bottom: "-20px",
            width: p.size,
            height: p.size,
            background: `radial-gradient(circle, rgba(167,243,100,${p.opacity}) 0%, transparent 70%)`,
            animation: `floatUp ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

// ─── Animated Counter ───
function Counter({ end, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView();
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── Cleaner Character SVG Illustration ───
function BroomIcon({ className = "", ...props }) {
  return (
    <svg className={className} viewBox="0 0 88 80" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* === HER - the Cleaner === */}
      {/* Hair - long, flowing, behind head */}
      <path d="M22 14 C20 8 28 2 34 2 C40 2 46 6 46 14 C46 16 45 20 44 24 L42 22 C42 16 40 10 34 8 C28 8 24 12 24 18 L22 14Z" fill="#3D2314" />
      <path d="M42 18 C44 22 46 28 44 34 C43 30 42 26 40 24" fill="#3D2314" opacity="0.7" />
      {/* Head */}
      <ellipse cx="34" cy="16" rx="10" ry="11" fill="#F5D0A9" />
      {/* Hair front - side-swept bangs */}
      <path d="M24 12 C24 8 30 5 34 5 C38 5 42 7 43 11 L40 13 C39 10 37 8 34 8 C31 8 28 9 26 12Z" fill="#3D2314" />
      {/* Eyes - feminine lashes */}
      <ellipse cx="30" cy="15" rx="1.3" ry="1.5" fill="#0B1120" opacity="0.7" />
      <ellipse cx="38" cy="15" rx="1.3" ry="1.5" fill="#0B1120" opacity="0.7" />
      <path d="M28 13.5 L31.5 13" stroke="#0B1120" strokeWidth="0.8" strokeLinecap="round" opacity="0.4" />
      <path d="M36.5 13 L40 13.5" stroke="#0B1120" strokeWidth="0.8" strokeLinecap="round" opacity="0.4" />
      {/* Subtle blush */}
      <circle cx="28" cy="17" r="2" fill="#F5A0A0" opacity="0.15" />
      <circle cx="40" cy="17" r="2" fill="#F5A0A0" opacity="0.15" />
      {/* Warm smile */}
      <path d="M30 19 Q34 23 38 19" stroke="#C07060" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.5" />
      {/* Neck */}
      <rect x="31" y="26" width="6" height="4" rx="3" fill="#F5D0A9" />
      {/* Body - fitted uniform dress */}
      <path d="M26 30 C26 30 28 28 34 28 C40 28 42 30 42 30 L44 42 L43 58 C43 58 39 60 34 60 C29 60 25 58 25 58 L24 42 Z" fill="#A7F364" opacity="0.85" />
      {/* Waist belt */}
      <rect x="25" y="40" width="18" height="2.5" rx="1.2" fill="#8BD94E" opacity="0.7" />
      <circle cx="34" cy="41.2" r="1.5" fill="#6BA830" opacity="0.5" />
      {/* Collar - V-neck */}
      <path d="M28 30 L34 35 L40 30" stroke="white" strokeWidth="1" opacity="0.35" fill="none" strokeLinecap="round" />
      {/* Short sleeves */}
      <path d="M26 30 L20 34 L22 36 L26 33" fill="#A7F364" opacity="0.75" />
      <path d="M42 30 L48 34 L46 36 L42 33" fill="#A7F364" opacity="0.75" />
      {/* Arms - feminine, relaxed at sides */}
      <path d="M22 36 L18 50 L20 50" stroke="#F5D0A9" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M46 36 L50 50 L48 50" stroke="#F5D0A9" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* Hands */}
      <circle cx="19" cy="50.5" r="2" fill="#F5D0A9" />
      <circle cx="49" cy="50.5" r="2" fill="#F5D0A9" />
      {/* Skirt flare */}
      <path d="M25 56 L22 70 C22 71 34 72 34 72 C34 72 46 71 46 70 L43 56" fill="#A7F364" opacity="0.7" />
      {/* Legs */}
      <line x1="30" y1="70" x2="29" y2="76" stroke="#F5D0A9" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="38" y1="70" x2="39" y2="76" stroke="#F5D0A9" strokeWidth="2.5" strokeLinecap="round" />
      {/* Shoes - small heels */}
      <ellipse cx="28" cy="77" rx="3.5" ry="1.8" fill="#1A1A2E" opacity="0.6" />
      <ellipse cx="40" cy="77" rx="3.5" ry="1.8" fill="#1A1A2E" opacity="0.6" />
      {/* Voice waves - warm voice */}
      <path d="M46 16 C48 14 48 18 46 16" stroke="#A7F364" strokeWidth="1" opacity="0.5" />
      <path d="M49 14 C52 11 52 21 49 18" stroke="#A7F364" strokeWidth="0.8" opacity="0.3" />
      <path d="M52 12 C56 8 56 24 52 20" stroke="#A7F364" strokeWidth="0.6" opacity="0.15" />

      {/* === BROOM - standing upright to the right, touching the floor === */}
      <g transform="translate(62, 2)">
        <rect x="0" y="0" width="3" height="50" rx="1.5" fill="#C8B88A" />
        <path d="M-7 50 C-7 46 10 46 10 50 L11 70 C11 74 -8 74 -8 70 Z" fill="#A7F364" opacity="0.9" />
        <path d="M-4 53 L-4 69" stroke="#0B1120" strokeWidth="1.2" strokeLinecap="round" opacity="0.25" />
        <path d="M1.5 52 L1.5 70" stroke="#0B1120" strokeWidth="1.2" strokeLinecap="round" opacity="0.25" />
        <path d="M7 53 L7 69" stroke="#0B1120" strokeWidth="1.2" strokeLinecap="round" opacity="0.25" />
      </g>
    </svg>
  );
}

// ─── Prism SVG Illustration ───
function PrismIcon({ className = "", animated = false, ...props }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* Prism body */}
      <path d="M32 6 L56 54 L8 54 Z" fill="rgba(167,243,100,0.08)" stroke="#A7F364" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M32 18 L46 48 L18 48 Z" fill="rgba(167,243,100,0.05)" />
      {/* Incoming light */}
      <line x1="0" y1="38" x2="18" y2="38" stroke="white" strokeWidth="2.5" opacity="0.4" strokeLinecap="round" />
      {/* Refracted spectrum */}
      <line x1="46" y1="26" x2="64" y2="16" stroke="#A7F364" strokeWidth="2" opacity="0.9" strokeLinecap="round" />
      <line x1="47" y1="32" x2="64" y2="30" stroke="#64B5F3" strokeWidth="2" opacity="0.7" strokeLinecap="round" />
      <line x1="47" y1="38" x2="64" y2="44" stroke="#F3B664" strokeWidth="2" opacity="0.7" strokeLinecap="round" />
      <line x1="46" y1="44" x2="64" y2="58" stroke="#CB64F3" strokeWidth="2" opacity="0.5" strokeLinecap="round" />
      {/* Center glow dot */}
      <circle cx="32" cy="38" r="3" fill="#A7F364" opacity="0.3" />
    </svg>
  );
}

// ─── AI REV Green Icon (tree emblem from airev.us) ───
function AIRevGreenIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="430 0 185 160" xmlns="http://www.w3.org/2000/svg">
      <path d="m467.12 133.84c-.11-1.91 1-3.59 1.82-5.3 10-20.18 21.42-39.59 32.55-59.15q6-10.59 12.16-21.12a30.1 30.1 0 0 1 2.11-3.27c2.92-3.81 7.16-3.9 9.92 0 4 5.74 7.2 12 10.69 18.11 11.74 20.51 23.63 40.89 34.47 61.89a45.2 45.2 0 0 1 3.45 7.83 4.58 4.58 0 0 1 -1.11 4.85c-1.37 1.33-3.17 1.23-4.95.55a13.38 13.38 0 0 1 -4-2.86c-7.41-6.65-15.47-12.23-25-15.56-14.4-5-28.44-4.08-42.25 2.12a72.85 72.85 0 0 0 -19.18 13 15.27 15.27 0 0 1 -4.7 3.34c-3.55 1.33-6.1-.5-5.98-4.43z" fill="#6BC928"/>
      <path d="m574.59 154.38c-7.21-.38-14.58-.68-21.71-2.83-1.69-.51-4.32-.83-4.17-2.73.08-1.13 3-.95 4.74-1 8.38-.45 16.73-1.13 24.75-3.87a30.5 30.5 0 0 0 6.26-2.92c3.67-2.26 4.7-4.31 3.83-8.55-2-9.62-5.54-18.74-9.62-27.61-11.25-24.5-26.16-46.67-42.62-67.87a112.65 112.65 0 0 0 -9.55-11.14c-4.42-4.37-7.77-4.32-12 .2-11.38 12.07-20.81 25.64-29.9 39.44-10.68 16.2-20.35 33-27 51.28a113 113 0 0 0 -4.6 14.22c-1.27 5.78-.37 7.67 4.82 10.64s11.2 4.2 17.15 4.94c5.12.64 10.28.89 15.42 1.37.77.07 1.92-.09 2.12.85.26 1.16-1 1.49-1.74 1.82a46.31 46.31 0 0 1 -12.34 2.84c-11.09 1.35-22.07 1.26-32.8-2.38a16.92 16.92 0 0 1 -3-1.26c-6.7-3.82-7.13-5.49-5.5-11.68 2.43-9.16 6.44-17.67 10.63-26.08 14.94-30 31.86-58.92 51.76-86 4.43-6 9-12 14.76-16.85 5.29-4.52 7.71-4.49 12.87.22 6.59 6 11.94 13.08 17.13 20.25 17.12 23.67 31.88 48.78 45.33 74.68a216.88 216.88 0 0 1 13.5 30.64c.32 1 .62 1.93.86 2.91 1.67 6.69.72 8.81-5.51 11.93-7.46 3.73-15.58 4.16-23.87 4.54z" fill="#A7F364"/>
    </svg>
  );
}

// ─── Broom-Only Icon (for button / small usage) ───
function BroomOnlyIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="30" y="4" width="4" height="34" rx="2" fill="#C8B88A" stroke="#0B1120" strokeWidth="1.5" />
      <path d="M22 38 C22 34 42 34 42 38 L44 56 C44 60 20 60 20 56 Z" fill="#A7F364" opacity="0.9" stroke="#0B1120" strokeWidth="1.5" />
      <path d="M26 42 L26 56" stroke="#0B1120" strokeWidth="1.5" strokeLinecap="round" opacity="0.3"/>
      <path d="M32 40 L32 56" stroke="#0B1120" strokeWidth="1.5" strokeLinecap="round" opacity="0.3"/>
      <path d="M38 42 L38 56" stroke="#0B1120" strokeWidth="1.5" strokeLinecap="round" opacity="0.3"/>
    </svg>
  );
}

// ─── Phone Mockup ───
function PhoneMockup() {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setPulse(p => !p), 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative mx-auto" style={{ width: 220, height: 440 }}>
      {/* Phone frame */}
      <div className="absolute inset-0 rounded-3xl border-2 border-white/10 bg-gradient-to-b from-gray-900 to-gray-950 shadow-2xl overflow-hidden">
        {/* Notch */}
        <div className="mx-auto mt-2 w-20 h-5 bg-black rounded-full" />
        {/* Screen */}
        <div className="flex flex-col items-center justify-center h-full px-4 -mt-4">
          <div className="flex flex-col items-center mb-6">
            <AIRevGreenIcon className="w-8 h-8" />
            <span className="text-xs font-bold tracking-tight mt-1" style={{ fontFamily: "'Syne', sans-serif" }}>AI <span className="text-green-400">REV</span></span>
          </div>
          {/* The Button - broom only */}
          <button
            className="relative w-28 h-28 rounded-full flex items-center justify-center transition-all duration-500"
            style={{
              background: pulse
                ? "radial-gradient(circle, #A7F364 0%, #6BC928 60%, #3A7A10 100%)"
                : "radial-gradient(circle, #5A8A30 0%, #3A6A18 60%, #1A3A08 100%)",
              boxShadow: pulse
                ? "0 0 40px rgba(167,243,100,0.6), 0 0 80px rgba(167,243,100,0.2)"
                : "0 0 20px rgba(167,243,100,0.15)",
            }}
          >
            <BroomOnlyIcon className="w-12 h-12" />
            {pulse && (
              <div className="absolute inset-0 rounded-full border-2 border-green-400/40 animate-ping" />
            )}
          </button>
          <p className="mt-4 text-green-300 text-xs font-semibold tracking-wider animate-pulse">
            {pulse ? "LISTENING..." : "TAP TO CLEAN"}
          </p>
        </div>
      </div>
    </div>
  );
}



// ─── Feature Card ───
function FeatureCard({ icon, title, desc, delay = 0 }) {
  const [ref, inView] = useInView(0.1);
  return (
    <div
      ref={ref}
      className="group relative p-6 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm transition-all duration-700 hover:border-green-400/20 hover:bg-green-400/[0.03]"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      <div className="text-3xl mb-3 transition-transform duration-300 group-hover:scale-110">{icon}</div>
      <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
      <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

// ─── Character Portrait SVGs ───
function PortraitLady({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Hair - long flowing */}
      <path d="M24 22 C22 12 32 4 40 4 C48 4 56 10 56 22 C56 26 55 32 54 36 L52 32 C52 20 48 12 40 10 C32 12 28 20 28 32 L24 22Z" fill="#3D2314" />
      <path d="M52 28 C54 34 56 42 54 48" stroke="#3D2314" strokeWidth="4" strokeLinecap="round" />
      <path d="M28 28 C26 34 24 42 26 48" stroke="#3D2314" strokeWidth="4" strokeLinecap="round" />
      {/* Head */}
      <ellipse cx="40" cy="26" rx="14" ry="15" fill="#F5D0A9" />
      {/* Hair front */}
      <path d="M26 20 C28 12 34 7 40 7 C46 7 52 12 54 20 L50 22 C48 16 44 12 40 12 C36 12 32 16 30 22Z" fill="#3D2314" />
      {/* Eyes */}
      <ellipse cx="34" cy="25" rx="1.8" ry="2" fill="#0B1120" opacity="0.7" />
      <ellipse cx="46" cy="25" rx="1.8" ry="2" fill="#0B1120" opacity="0.7" />
      <path d="M31.5 22.5 L36 22" stroke="#0B1120" strokeWidth="0.8" strokeLinecap="round" opacity="0.4" />
      <path d="M44 22 L48.5 22.5" stroke="#0B1120" strokeWidth="0.8" strokeLinecap="round" opacity="0.4" />
      {/* Blush */}
      <circle cx="32" cy="28" r="2.5" fill="#F5A0A0" opacity="0.15" />
      <circle cx="48" cy="28" r="2.5" fill="#F5A0A0" opacity="0.15" />
      {/* Smile */}
      <path d="M35 31 Q40 36 45 31" stroke="#C07060" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.5" />
      {/* Neck */}
      <rect x="37" y="40" width="6" height="5" rx="3" fill="#F5D0A9" />
      {/* Body - blouse */}
      <path d="M30 45 C30 45 34 43 40 43 C46 43 50 45 50 45 L52 65 L28 65Z" fill="#F3B664" opacity="0.8" />
      <path d="M34 45 L40 49 L46 45" stroke="white" strokeWidth="0.8" opacity="0.3" fill="none" />
      {/* Skirt */}
      <path d="M28 65 L24 78 L56 78 L52 65Z" fill="#F3B664" opacity="0.6" />
    </svg>
  );
}

function PortraitMan({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Head */}
      <ellipse cx="40" cy="24" rx="14" ry="15" fill="#D4A574" />
      {/* Hair - short, neat */}
      <path d="M26 18 C26 8 34 3 40 3 C46 3 54 8 54 18 L52 20 C50 12 46 8 40 8 C34 8 30 12 28 20Z" fill="#1A1A2E" />
      {/* Eyes */}
      <ellipse cx="34" cy="23" rx="1.5" ry="1.8" fill="#0B1120" opacity="0.7" />
      <ellipse cx="46" cy="23" rx="1.5" ry="1.8" fill="#0B1120" opacity="0.7" />
      <path d="M31 21 L37 21" stroke="#0B1120" strokeWidth="1" strokeLinecap="round" opacity="0.35" />
      <path d="M43 21 L49 21" stroke="#0B1120" strokeWidth="1" strokeLinecap="round" opacity="0.35" />
      {/* Stubble hint */}
      <rect x="34" y="30" width="12" height="4" rx="2" fill="#1A1A2E" opacity="0.05" />
      {/* Smile */}
      <path d="M36 30 Q40 33 44 30" stroke="#0B1120" strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.35" />
      {/* Neck */}
      <rect x="37" y="38" width="6" height="5" rx="3" fill="#D4A574" />
      {/* Body - shirt + tie */}
      <path d="M28 43 C28 43 34 41 40 41 C46 41 52 43 52 43 L54 65 L26 65Z" fill="#64B5F3" opacity="0.7" />
      <path d="M38 43 L40 55 L42 43" fill="#1A1A2E" opacity="0.4" />
      {/* Suit jacket */}
      <path d="M26 65 L24 78 L56 78 L54 65Z" fill="#2A3A5C" opacity="0.7" />
    </svg>
  );
}

function PortraitScientist({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Head */}
      <ellipse cx="40" cy="24" rx="13" ry="14" fill="#F0D5B8" />
      {/* Hair - silver/grey, pulled back */}
      <path d="M27 18 C27 6 36 2 40 2 C44 2 53 6 53 18 L50 16 C48 10 44 7 40 7 C36 7 32 10 30 16Z" fill="#9CA3AF" />
      {/* Glasses */}
      <circle cx="34" cy="23" r="5" stroke="#C8B88A" strokeWidth="1.2" fill="none" opacity="0.6" />
      <circle cx="46" cy="23" r="5" stroke="#C8B88A" strokeWidth="1.2" fill="none" opacity="0.6" />
      <line x1="39" y1="23" x2="41" y2="23" stroke="#C8B88A" strokeWidth="1" opacity="0.5" />
      <line x1="29" y1="22" x2="27" y2="20" stroke="#C8B88A" strokeWidth="0.8" opacity="0.4" />
      <line x1="51" y1="22" x2="53" y2="20" stroke="#C8B88A" strokeWidth="0.8" opacity="0.4" />
      {/* Eyes behind glasses */}
      <ellipse cx="34" cy="23" rx="1.2" ry="1.5" fill="#0B1120" opacity="0.6" />
      <ellipse cx="46" cy="23" rx="1.2" ry="1.5" fill="#0B1120" opacity="0.6" />
      {/* Knowing smile */}
      <path d="M36 30 Q40 33 44 30" stroke="#0B1120" strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.35" />
      {/* Neck */}
      <rect x="37" y="37" width="6" height="5" rx="3" fill="#F0D5B8" />
      {/* Lab coat */}
      <path d="M26 42 C26 42 33 40 40 40 C47 40 54 42 54 42 L56 65 L24 65Z" fill="white" opacity="0.85" />
      <line x1="40" y1="42" x2="40" y2="65" stroke="#E5E7EB" strokeWidth="0.5" opacity="0.5" />
      {/* Coat buttons */}
      <circle cx="40" cy="48" r="1" fill="#9CA3AF" opacity="0.4" />
      <circle cx="40" cy="54" r="1" fill="#9CA3AF" opacity="0.4" />
      <circle cx="40" cy="60" r="1" fill="#9CA3AF" opacity="0.4" />
      {/* Coat lower */}
      <path d="M24 65 L22 78 L58 78 L56 65Z" fill="white" opacity="0.7" />
    </svg>
  );
}

function PortraitSpark({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Head */}
      <ellipse cx="40" cy="24" rx="13" ry="14" fill="#8B6B4A" />
      {/* Hair - bold, textured, short sides high top */}
      <path d="M28 16 C28 4 36 0 40 0 C44 0 52 4 52 16 L50 18 C48 8 44 5 40 5 C36 5 32 8 30 18Z" fill="#0B1120" />
      <path d="M32 4 C36 -1 44 -1 48 4" stroke="#0B1120" strokeWidth="3" strokeLinecap="round" />
      {/* Eyes - confident */}
      <ellipse cx="34" cy="23" rx="1.5" ry="1.8" fill="#0B1120" opacity="0.7" />
      <ellipse cx="46" cy="23" rx="1.5" ry="1.8" fill="#0B1120" opacity="0.7" />
      <path d="M31 21 L36.5 21.5" stroke="#0B1120" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
      <path d="M43.5 21.5 L49 21" stroke="#0B1120" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
      {/* Confident grin */}
      <path d="M35 30 Q40 34 45 30" stroke="#0B1120" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.4" />
      {/* Neck */}
      <rect x="37" y="37" width="6" height="5" rx="3" fill="#8B6B4A" />
      {/* Body - hoodie */}
      <path d="M26 42 C26 42 33 40 40 40 C47 40 54 42 54 42 L56 65 L24 65Z" fill="#F36464" opacity="0.7" />
      {/* Hood */}
      <path d="M32 42 L40 46 L48 42" stroke="white" strokeWidth="0.8" opacity="0.2" fill="none" />
      {/* Hoodie pocket */}
      <rect x="32" y="54" width="16" height="6" rx="3" fill="#D94E4E" opacity="0.3" />
      {/* Lower */}
      <path d="M24 65 L22 78 L58 78 L56 65Z" fill="#1A1A2E" opacity="0.6" />
    </svg>
  );
}

// ─── Voice Card (unused, kept for reference) ───
function VoiceCard({ name, emoji, personality, tone, color }) {
  const [hovering, setHovering] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className="relative p-5 rounded-2xl border border-white/5 bg-white/[0.02] transition-all duration-500 cursor-pointer hover:border-white/10"
      style={{
        boxShadow: hovering ? `0 0 40px ${color}22, 0 0 80px ${color}08` : "none",
      }}
    >
      <div className="text-4xl mb-3">{emoji}</div>
      <p className="text-white font-bold text-base mb-1">{name}</p>
      <p className="text-white/30 text-xs font-mono mb-2">{tone}</p>
      <p className="text-white/50 text-sm leading-relaxed">{personality}</p>
      {hovering && (
        <div
          className="absolute top-3 right-3 w-2 h-2 rounded-full animate-pulse"
          style={{ background: color }}
        />
      )}
    </div>
  );
}

// ─── Timeline Step ───
function TimelineStep({ index, step, time, title, desc }) {
  const [ref, inView] = useInView(0.2);
  return (
    <div
      ref={ref}
      className="flex gap-5 transition-all duration-700"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateX(0)" : "translateX(-40px)",
        transitionDelay: `${index * 150}ms`,
      }}
    >
      <div className="flex-shrink-0">
        <div className="w-12 h-12 rounded-xl bg-green-400/10 border border-green-400/20 flex items-center justify-center">
          <span className="text-green-400 font-bold text-sm" style={{ fontFamily: "'Space Mono', monospace" }}>{step}</span>
        </div>
      </div>
      <div>
        <p className="text-green-400/60 text-xs font-mono mb-1">{time}</p>
        <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
        <p className="text-white/45 text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

// ─── Main Component ───
export default function AIRevLanding() {
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [page, setPage] = useState("landing");

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [heroRef, heroInView] = useInView(0.1);
  const [featRef, featInView] = useInView(0.05);
  const [howRef, howInView] = useInView(0.05);
  const [persRef, persInView] = useInView(0.05);

  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-x-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Space+Mono:wght@400;700&family=Syne:wght@400;600;700;800&display=swap');

        @keyframes floatUp {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) scale(0.5); opacity: 0; }
        }
        @keyframes sweep {
          0% { transform: rotate(-15deg); }
          50% { transform: rotate(15deg); }
          100% { transform: rotate(-15deg); }
        }
        @keyframes dash {
          to { stroke-dashoffset: 0; }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes wobble {
          0%, 100% { transform: rotate(-3deg) scale(1); }
          25% { transform: rotate(3deg) scale(1.05); }
          50% { transform: rotate(-2deg) scale(1); }
          75% { transform: rotate(2deg) scale(1.02); }
        }
        .shimmer-text {
          background: linear-gradient(90deg, #A7F364, #6BC928, #A7F364, #D4FF9E);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 4s linear infinite;
        }
        .prism-text {
          background: linear-gradient(90deg, #A7F364, #64B5F3, #F3B664, #CB64F3, #A7F364);
          background-size: 300% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 6s linear infinite;
        }
        .prism-text-subtle {
          background: linear-gradient(90deg, #64B5F3, #CB64F3, #64B5F3);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 5s linear infinite;
        }
        @keyframes prismGlow {
          0%, 100% { box-shadow: 0 0 30px rgba(100,181,243,0.15), 0 0 60px rgba(203,100,243,0.05); }
          50% { box-shadow: 0 0 40px rgba(203,100,243,0.2), 0 0 80px rgba(100,181,243,0.08); }
        }
        .stagger-1 { animation: fadeSlideUp 0.8s ease forwards 0.1s; opacity: 0; }
        .stagger-2 { animation: fadeSlideUp 0.8s ease forwards 0.25s; opacity: 0; }
        .stagger-3 { animation: fadeSlideUp 0.8s ease forwards 0.4s; opacity: 0; }
        .stagger-4 { animation: fadeSlideUp 0.8s ease forwards 0.55s; opacity: 0; }
        .stagger-5 { animation: fadeSlideUp 0.8s ease forwards 0.7s; opacity: 0; }
      `}</style>

      {/* ── NAV ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrollY > 50 ? "rgba(11,17,32,0.85)" : "transparent",
          backdropFilter: scrollY > 50 ? "blur(20px)" : "none",
          borderBottom: scrollY > 50 ? "1px solid rgba(255,255,255,0.05)" : "none",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => { setPage("landing"); window.scrollTo(0, 0); }} className="flex items-center gap-2">
            <BroomOnlyIcon className="w-7 h-7" style={{ animation: "wobble 3s ease-in-out infinite" }} />
            <span
              className="text-xl font-bold tracking-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              AI <span className="text-green-400">REV</span>
            </span>
          </button>
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => { setPage("partner"); window.scrollTo(0, 0); }}
              className="px-5 py-2 text-sm font-semibold rounded-full text-gray-950 transition-all duration-300 hover:shadow-lg hover:shadow-green-400/20"
              style={{ background: "linear-gradient(135deg, #A7F364, #6BC928)" }}
            >
              Join the Study
            </button>
          </div>
          <button className="md:hidden text-white/70" onClick={() => setMenuOpen(!menuOpen)}>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-gray-950/95 backdrop-blur-xl border-t border-white/5 px-6 py-4 flex flex-col gap-3">
            <button onClick={() => { setPage("partner"); setMenuOpen(false); window.scrollTo(0, 0); }} className="text-sm font-semibold text-gray-950 text-center py-2 rounded-full" style={{ background: "linear-gradient(135deg, #A7F364, #6BC928)" }}>Join the Study</button>
          </div>
        )}
      </nav>

      <div style={{ display: page === "landing" ? "contents" : "none" }}>
      {/* ── HERO ── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden">
        <Sparkles />
        {/* Gradient orbs */}
        <div
          className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{
            background: "radial-gradient(circle, #A7F364, transparent)",
            top: "10%",
            left: "15%",
            transform: `translate(${scrollY * 0.02}px, ${scrollY * 0.01}px)`,
          }}
        />
        <div
          className="absolute w-72 h-72 rounded-full opacity-10 blur-3xl"
          style={{
            background: "radial-gradient(circle, #6BC928, transparent)",
            bottom: "20%",
            right: "10%",
            transform: `translate(${-scrollY * 0.015}px, ${scrollY * 0.02}px)`,
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto text-center">

          <h1
            className="stagger-2 font-extrabold leading-none tracking-tight mb-6"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            <span className="block text-5xl sm:text-6xl lg:text-8xl">Dirty notes?</span>
            <span className="block shimmer-text text-3xl sm:text-4xl lg:text-5xl mt-3 tracking-wide">AI REV cleans.</span>
          </h1>

          <p className="stagger-3 text-lg sm:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed mb-4">
            <span className="text-green-300">The Cleaner</span> sweeps up your messy CRM notes{" "}, telepatically connected to 
            <span className="prism-text-subtle"> The Prism</span> - ultimate sales intelligence, trained on 100K+ sales notes.
          </p>
          <p className="stagger-4 text-sm text-white/30 max-w-lg mx-auto mb-10">
            No more "I'll update Salesforce later." AI REV won't let you. Persistent like that.
          </p>

          <div className="stagger-5 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => { setPage("partner"); window.scrollTo(0, 0); }}
              className="px-8 py-3.5 text-base font-bold rounded-full text-gray-950 transition-all duration-300 hover:shadow-xl hover:shadow-green-400/25 hover:scale-105"
              style={{ background: "linear-gradient(135deg, #A7F364, #6BC928)" }}
            >
              Join the Study
            </button>
            <button
              onClick={() => window.scrollTo({ top: window.innerHeight * 0.75, behavior: "smooth" })}
              className="px-8 py-3.5 text-base font-semibold rounded-full border border-white/10 text-white/70 hover:border-green-400/30 hover:text-green-300 transition-all duration-300"
            >
              See More ↓
            </button>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-3 gap-8 max-w-md mx-auto">
            {[
              { value: 15, suffix: "min", label: "average note delay", source: null },
              { value: 71, suffix: "%", label: "time being optimized", source: "Salesforce State of Sales, 2024 - 5,500 respondents, 27 countries" },
              { value: 20, suffix: "%", label: "more selling", source: "McKinsey B2B Sales Study - ~500 companies, cross-industry" },
            ].map((s, i) => (
              <div key={i} className="text-center group relative">
                <p className="text-2xl sm:text-3xl font-bold text-green-400" style={{ fontFamily: "'Space Mono', monospace" }}>
                  <Counter end={s.value} />{s.suffix}
                </p>
                <p className="text-white/30 text-xs mt-1">{s.label}{s.source && <span className="text-white/15 cursor-help"> *</span>}</p>
                {s.source && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 px-3 py-2 rounded-lg bg-gray-900 border border-white/10 text-white/50 text-[10px] leading-snug opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
                    {s.source}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce transition-opacity duration-500"
          style={{ opacity: scrollY > 100 ? 0 : 1, pointerEvents: scrollY > 100 ? "none" : "auto" }}
        >
          <span className="text-white/20 text-xs font-mono">scroll</span>
          <svg className="w-4 h-6 text-white/20" fill="none" viewBox="0 0 16 24" stroke="currentColor">
            <rect x="1" y="1" width="14" height="22" rx="7" strokeWidth="1.5" />
            <circle cx="8" cy="8" r="2" fill="currentColor" />
          </svg>
        </div>
      </section>

      {/* ── THE DUO ── */}
      <section className="relative py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
              Need advice? <span className="prism-text">Prism knows.</span>
            </h2>
          </div>

          <div className="max-w-5xl mx-auto">
            {/* Desktop: card - link - card in a row */}
            <div className="hidden md:flex items-stretch">
              {/* The Cleaner */}
              <div className="group flex-1 p-8 rounded-2xl border border-green-400/15 bg-green-400/[0.02] transition-all duration-500 hover:border-green-400/30 hover:bg-green-400/[0.04]">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 rounded-xl bg-green-400/10 border border-green-400/20 flex items-center justify-center">
                    <BroomOnlyIcon className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-xl" style={{ fontFamily: "'Syne', sans-serif" }}>The Cleaner</h3>
                    <p className="text-green-400/60 text-xs font-mono">does the work</p>
                  </div>
                </div>
                <ul className="space-y-3 text-white/50 text-sm">
                  <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&#9656;</span> Debriefs you after every meeting</li>
                  <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&#9656;</span> Collects your messy thoughts naturally</li>
                  <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&#9656;</span> Formats & pushes to CRM automatically</li>
                  <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&#9656;</span> Chases follow-ups so you don't have to</li>
                </ul>
              </div>

              {/* Telepathic link - between cards */}
              <div className="flex flex-col items-center justify-center px-5">
                <div className="flex items-center gap-0">
                  <div className="w-8 h-px bg-gradient-to-r from-green-400/40 to-green-400/10" />
                  <div className="relative flex items-center justify-center">
                    <div className="w-20 h-7 rounded-full border border-white/10 bg-gray-950 flex items-center justify-center gap-1.5">
                      <div className="w-1 h-1 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-white/25 text-[8px] font-mono tracking-widest uppercase">link</span>
                      <div className="w-1 h-1 rounded-full bg-purple-400 animate-pulse" style={{ animationDelay: "0.5s" }} />
                    </div>
                    <div className="absolute inset-0 rounded-full opacity-20 animate-ping" style={{ background: "linear-gradient(90deg, rgba(167,243,100,0.2), rgba(203,100,243,0.2))", animationDuration: "3s" }} />
                  </div>
                  <div className="w-8 h-px bg-gradient-to-r from-purple-400/10 to-purple-400/40" />
                </div>
              </div>

              {/* The Manager - Prism */}
              <div className="group flex-1 p-8 rounded-2xl border border-purple-400/15 bg-purple-400/[0.02] transition-all duration-500 hover:border-purple-400/30 hover:bg-purple-400/[0.04]" style={{ animation: "prismGlow 4s ease-in-out infinite" }}>
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 rounded-xl bg-purple-400/10 border border-purple-400/20 flex items-center justify-center">
                    <PrismIcon className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-xl" style={{ fontFamily: "'Syne', sans-serif" }}>The <span className="prism-text">Prism</span></h3>
                    <p className="text-purple-400/60 text-xs font-mono">knows the way</p>
                  </div>
                </div>
                <ul className="space-y-3 text-white/50 text-sm">
                  <li className="flex items-start gap-2"><span className="text-purple-400 mt-0.5">&#9656;</span> Trained on 100K+ real sales notes</li>
                  <li className="flex items-start gap-2"><span className="text-purple-400 mt-0.5">&#9656;</span> Knows the insides of strategic approach to sales</li>
                  <li className="flex items-start gap-2"><span className="text-purple-400 mt-0.5">&#9656;</span> Suggests tailored questions to the Cleaner</li>
                  <li className="flex items-start gap-2"><span className="text-purple-400 mt-0.5">&#9656;</span> Adapts to your vertical and deal stage</li>
                </ul>
              </div>
            </div>

            {/* Mobile: stacked with link in between */}
            <div className="flex md:hidden flex-col">
              <div className="group p-8 rounded-2xl border border-green-400/15 bg-green-400/[0.02]">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 rounded-xl bg-green-400/10 border border-green-400/20 flex items-center justify-center">
                    <BroomOnlyIcon className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-xl" style={{ fontFamily: "'Syne', sans-serif" }}>The Cleaner</h3>
                    <p className="text-green-400/60 text-xs font-mono">Does the work</p>
                  </div>
                </div>
                <ul className="space-y-3 text-white/50 text-sm">
                  <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&#9656;</span> Debriefs you after every meeting</li>
                  <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&#9656;</span> Collects your messy thoughts naturally</li>
                  <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&#9656;</span> Formats & pushes to CRM automatically</li>
                  <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&#9656;</span> Chases follow-ups so you don't have to</li>
                </ul>
              </div>
              {/* Mobile telepathic link */}
              <div className="flex items-center justify-center py-3">
                <div className="flex items-center gap-0">
                  <div className="w-10 h-px bg-gradient-to-r from-green-400/30 to-green-400/10" />
                  <div className="w-16 h-6 rounded-full border border-white/10 bg-gray-950 flex items-center justify-center gap-1.5">
                    <div className="w-1 h-1 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-white/25 text-[7px] font-mono tracking-widest uppercase">link</span>
                    <div className="w-1 h-1 rounded-full bg-purple-400 animate-pulse" style={{ animationDelay: "0.5s" }} />
                  </div>
                  <div className="w-10 h-px bg-gradient-to-r from-purple-400/10 to-purple-400/30" />
                </div>
              </div>
              <div className="group p-8 rounded-2xl border border-purple-400/15 bg-purple-400/[0.02]" style={{ animation: "prismGlow 4s ease-in-out infinite" }}>
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 rounded-xl bg-purple-400/10 border border-purple-400/20 flex items-center justify-center">
                    <PrismIcon className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-xl" style={{ fontFamily: "'Syne', sans-serif" }}>The Manager - <span className="prism-text">Prism</span></h3>
                    <p className="text-purple-400/60 text-xs font-mono">Knows the way</p>
                  </div>
                </div>
                <ul className="space-y-3 text-white/50 text-sm">
                  <li className="flex items-start gap-2"><span className="text-purple-400 mt-0.5">&#9656;</span> Trained on 100K+ real sales notes</li>
                  <li className="flex items-start gap-2"><span className="text-purple-400 mt-0.5">&#9656;</span> Knows the insides of strategic approach to sales</li>
                  <li className="flex items-start gap-2"><span className="text-purple-400 mt-0.5">&#9656;</span> Suggests tailored questions to the Cleaner</li>
                  <li className="flex items-start gap-2"><span className="text-purple-400 mt-0.5">&#9656;</span> Adapts to your vertical and deal stage</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ── HOW IT WORKS ── */}
      <section id="how" ref={howRef} className="relative py-32 px-6 overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }} />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <p className="text-green-400 text-xs font-mono tracking-widest uppercase mb-3">The Process</p>
            <h2
              className="text-4xl sm:text-5xl font-extrabold tracking-tight"
              style={{
                fontFamily: "'Syne', sans-serif",
                opacity: howInView ? 1 : 0,
                transform: howInView ? "translateY(0)" : "translateY(30px)",
                transition: "all 0.8s ease",
              }}
            >
              How the
              <span className="text-green-400"> cleaning </span>
              ceremony works
            </h2>
          </div>

          {/* Timeline */}
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Steps */}
            <div className="space-y-8">
              <TimelineStep index={0} step="01" time="After your meeting" title="The Meeting Ends. The Cleaning Begins." desc={"Just walked out of an in-person meeting? AI REV calls you for a quick debrief. Virtual meeting on Zoom, Teams, or Meet? AI REV stays on after everyone leaves and asks about next steps - using the transcript it already has."} />
              <TimelineStep index={1} step="02" time="2 minutes later" title="It Asks. You Answer. Done." desc="AI REV knows what matters. Deal size? Next steps? Blockers? You get guided through the essential details based on patterns from top-performing reps." />
              <TimelineStep index={2} step="03" time="Instantly" title="CRM Gets the Royal Treatment." desc="Your note appears in the CRM - formatted, structured, with visual next steps. Not a wall of text. A beautiful briefing so clean, it's like wiping the sensor on a clear day." />
              <TimelineStep index={3} step="04" time="Ongoing" title="The Sweeping Never Stops." desc="Action items get monitored, deadlines get flagged, and if you're too busy - the follow-up email gets drafted automatically. Your pipeline stays clean 24/7." />

            </div>

            {/* Mockup */}
            <div>
              <PhoneMockup />
            </div>
          </div>

          {/* Voice prompt examples - full width */}
          <div className="mt-12 p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
            <p className="text-green-400/60 text-xs font-mono tracking-widest uppercase mb-4">Just say:</p>
            <div className="grid sm:grid-cols-3 gap-x-8 gap-y-3">
              {[
                "I just had a meeting with Acme Corp...",
                "What next steps are on me today?",
                "Brief me before my next meeting.",
                "Log that they pushed the timeline to Q3.",
                "Who haven't I followed up with this week?",
                "Draft a recap email for the Globex meeting.",
                "Flag this deal - champion went silent.",
                "What objections came up most this month?",
                "Remind me to check in with Dana on Friday.",
              ].map((prompt, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <svg className="w-4 h-4 mt-0.5 text-green-400/40 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                  <p className="text-white/50 text-sm italic leading-relaxed">"{prompt}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── VOICE PERSONALITIES ── */}
      <section className="relative py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-green-400 text-xs font-mono tracking-widest uppercase mb-3">Pick Your Voice</p>
          <p className="text-center text-white/50 text-sm mb-12 max-w-lg mx-auto">Different personality, same spotless results. Choose the voice that matches your energy - the broom does the rest.</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Bestie", Portrait: PortraitLady, tone: "Warm • Conversational", desc: "Chatty, warm, makes note-taking feel like gossip with a friend.", color: "#F3B664" },
              { name: "Executive", Portrait: PortraitMan, tone: "Confident • Structured", desc: "Professional, polished, asks sharp questions. Boardroom energy.", color: "#64B5F3" },
              { name: "Analyst", Portrait: PortraitScientist, tone: "Precise • Insightful", desc: "Data-driven, methodical, spots patterns in your pipeline you'd miss.", color: "#9CA3AF" },
              { name: "Closer", Portrait: PortraitSpark, tone: "Direct • Urgent", desc: "No-nonsense, fast-paced, cuts to what matters for the deal.", color: "#F36464" },
            ].map((v, i) => (
              <div key={i} className="group flex flex-col items-center text-center">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-16 h-16 rounded-xl border border-white/10 bg-white/[0.02] flex items-center justify-center overflow-hidden p-1">
                    <v.Portrait className="w-12 h-14" />
                  </div>
                  <span className="text-white/20 text-lg font-light">+</span>
                  <div className="w-12 h-12 rounded-xl border border-green-400/15 bg-green-400/[0.03] flex items-center justify-center p-1.5">
                    <BroomOnlyIcon className="w-7 h-7" />
                  </div>
                  <span className="text-white/20 text-lg font-light">=</span>
                  <div
                    className="relative w-16 h-16 rounded-xl border flex items-center justify-center overflow-hidden p-1 transition-all duration-500 group-hover:scale-105"
                    style={{
                      borderColor: `${v.color}30`,
                      background: `${v.color}08`,
                      boxShadow: `0 0 20px ${v.color}10`,
                    }}
                  >
                    <v.Portrait className="w-10 h-12" />
                    <BroomOnlyIcon className="w-6 h-14 absolute top-1 right-0 opacity-70" />
                  </div>
                </div>
                <h4 className="text-white font-bold text-base mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>{v.name}</h4>
                <p className="text-xs font-mono mb-2" style={{ color: `${v.color}AA` }}>{v.tone}</p>
                <p className="text-white/45 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRISM INTELLIGENCE ── */}
      <section id="prism" className="relative py-32 px-6 overflow-hidden">
        {/* Subtle prism-colored gradient background */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          background: "linear-gradient(135deg, #64B5F3 0%, #CB64F3 30%, #F3B664 60%, #A7F364 100%)",
        }} />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <p className="prism-text-subtle text-xs font-mono tracking-widest uppercase mb-3">Premium Intelligence</p>
            <h2
              className="text-4xl sm:text-5xl font-extrabold tracking-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              The brain behind the broom.
              <br />
              <span className="prism-text">That's Prism.</span>
            </h2>
            <p className="text-white/40 text-base mt-5 max-w-2xl mx-auto leading-relaxed">
              Prism is the intelligence layer your competitors don't have. Trained on hundreds of thousands of real sales notes
              across SaaS, manufacturing, finance, healthcare, and more - it knows what a deal-closing note looks like
              in <em>your</em> industry.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-16">
            {/* Prism insight cards */}
            {[
              {
                color: "#A7F364",
                title: "Pattern Recognition",
                stat: "100K+",
                statLabel: "sales notes analyzed",
                desc: "Prism has seen every kind of deal. It recognizes the patterns that separate closed-won from closed-lost - and tells the Cleaner what to capture.",
              },
              {
                color: "#64B5F3",
                title: "Your Data, Your Playbook",
                stat: "∞",
                statLabel: "custom adaptability",
                desc: "Prism adapts to your internal datasets and processes - or starts with an industry template. Either way, it learns how your team wins and tunes itself accordingly.",
              },
              {
                color: "#CB64F3",
                title: "Predict & Prescribe",
                stat: "92%",
                statLabel: "close-rate accuracy",
                desc: "Prism accurately predicts closing chances for every deal and recommends the best next step - so your reps always know exactly what to do to move the needle.",
              },
            ].map((card, i) => (
              <div
                key={i}
                className="relative p-6 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm transition-all duration-500 hover:border-white/15"
                style={{ "--accent": card.color }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <PrismIcon className="w-6 h-6 opacity-60" />
                  <h3 className="text-white font-bold text-base">{card.title}</h3>
                </div>
                <div className="mb-4">
                  <span className="text-3xl font-black" style={{ fontFamily: "'Space Mono', monospace", color: card.color }}>
                    {card.stat}
                  </span>
                  <span className="text-white/30 text-xs ml-2">{card.statLabel}</span>
                </div>
                <p className="text-white/45 text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>

          {/* Prism Insight Demo */}
          <div className="max-w-2xl mx-auto rounded-2xl border border-purple-400/15 bg-gray-950/80 backdrop-blur-sm p-6 shadow-2xl" style={{ animation: "prismGlow 4s ease-in-out infinite" }}>
            <div className="flex items-center gap-2 mb-4">
              <PrismIcon className="w-5 h-5" />
              <span className="prism-text-subtle text-sm font-bold tracking-wide">Prism Insight</span>
              <span className="ml-auto text-white/20 text-xs font-mono">live</span>
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            </div>
            <div className="space-y-3">
              <div className="bg-white/[0.03] rounded-xl p-4 border border-white/5">
                <p className="text-white/30 text-xs font-mono mb-2">OBJECTION DETECTED</p>
                <p className="text-white/70 text-sm leading-relaxed">
                  Acme Corp raised <span className="text-purple-300 font-semibold">"We need to check with legal first"</span> -
                  this objection appeared in <span className="text-green-300 font-semibold">34 of your deals</span> this quarter.
                  Here's what worked:
                </p>
              </div>
              <div className="flex gap-3">
                {[
                  { label: "Offer a joint legal meeting", rate: "68%", color: "green" },
                  { label: "Send a pre-approved security packet", rate: "54%", color: "blue" },
                  { label: "Ask for a specific timeline", rate: "31%", color: "purple" },
                ].map((o, i) => (
                  <div key={i} className={`flex-1 bg-${o.color}-400/5 rounded-lg p-3 border border-${o.color}-400/10`} style={{ background: `color-mix(in srgb, ${o.color === "green" ? "#4ade80" : o.color === "blue" ? "#60a5fa" : "#c084fc"} 5%, transparent)`, borderColor: `color-mix(in srgb, ${o.color === "green" ? "#4ade80" : o.color === "blue" ? "#60a5fa" : "#c084fc"} 10%, transparent)` }}>
                    <p className="text-xs font-mono mb-1.5" style={{ color: `color-mix(in srgb, ${o.color === "green" ? "#4ade80" : o.color === "blue" ? "#60a5fa" : "#c084fc"} 60%, transparent)` }}>{o.rate} WIN RATE</p>
                    <p className="text-white/50 text-xs">"{o.label}"</p>
                  </div>
                ))}
              </div>
              <p className="text-white/25 text-xs text-center font-mono">Based on 142 closed deals in your Salesforce this quarter</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" ref={featRef} className="relative py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-green-400 text-xs font-mono tracking-widest uppercase mb-3">Cleaning equipment included</p>
            <h2
              className="text-4xl sm:text-5xl font-extrabold tracking-tight"
              style={{
                fontFamily: "'Syne', sans-serif",
                opacity: featInView ? 1 : 0,
                transform: featInView ? "translateY(0)" : "translateY(30px)",
                transition: "all 0.8s ease",
              }}
            >
              They don't just clean.
              <br />
              <span className="text-white/40">They run the whole silo.</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">

            {/* 1 - Post-Meeting Sweep: hero feature, wide */}
            {(() => {
              const [ref, inView] = useInView(0.1);
              return (
                <div ref={ref} className="sm:col-span-2 relative p-6 rounded-2xl border border-green-400/15 bg-green-400/[0.02] overflow-hidden transition-all duration-700 hover:border-green-400/30" style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(40px)" }}>
                  <div className="flex flex-col sm:flex-row gap-5">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-green-400/10 border border-green-400/20 flex items-center justify-center">
                          <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                        </div>
                        <h3 className="text-white font-bold text-lg">Post-Meeting Sweep</h3>
                      </div>
                      <p className="text-white/50 text-sm leading-relaxed mb-4">
                        After an in-person meeting, AI REV calls you for a quick 2-minute debrief. For virtual meetings, it joins your Zoom, Teams, or Meet call, and stays on after everyone leaves - asking only about next steps based on the transcript.
                      </p>
                      <div className="flex items-center gap-4 text-xs">
                        <div className="flex items-center gap-1.5 text-green-400/60"><span className="w-1.5 h-1.5 rounded-full bg-green-400/60" /> In-person debrief</div>
                        <div className="flex items-center gap-1.5 text-green-400/60"><span className="w-1.5 h-1.5 rounded-full bg-green-400/60" /> Zoom / Teams / Meet</div>
                        <div className="flex items-center gap-1.5 text-green-400/60"><span className="w-1.5 h-1.5 rounded-full bg-green-400/60" /> In-App</div>
                      </div>
                    </div>
                    {/* Mini timeline */}
                    <div className="sm:w-44 flex flex-row sm:flex-col items-center sm:items-start gap-2 sm:gap-3 text-[10px] font-mono text-white/30">
                      <div className="flex items-center gap-2"><div className="w-6 h-6 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-white/40">📅</div><span>Meeting ends</span></div>
                      <div className="hidden sm:block w-px h-3 ml-3 bg-green-400/20" />
                      <div className="text-white/15 sm:hidden">→</div>
                      <div className="flex items-center gap-2"><div className="w-6 h-6 rounded-md bg-green-400/10 border border-green-400/20 flex items-center justify-center text-green-400/60">🎙</div><span className="text-green-400/50">AI REV stays on</span></div>
                      <div className="hidden sm:block w-px h-3 ml-3 bg-green-400/20" />
                      <div className="text-white/15 sm:hidden">→</div>
                      <div className="flex items-center gap-2"><div className="w-6 h-6 rounded-md bg-green-400/15 border border-green-400/25 flex items-center justify-center text-green-300/70">✓</div><span className="text-green-300/50">Next steps captured</span></div>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* 2 - Prism-Powered Notes */}
            {(() => {
              const [ref, inView] = useInView(0.1);
              return (
                <div ref={ref} className="relative p-6 rounded-2xl border border-purple-400/15 bg-purple-400/[0.02] overflow-hidden transition-all duration-700 hover:border-purple-400/30" style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(40px)", transitionDelay: "100ms" }}>
                  <PrismIcon className="w-8 h-8 mb-3" />
                  <h3 className="text-white font-bold text-lg mb-2">Prism-Powered Notes</h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-4">
                    100K+ winning notes studied. Prism tells the Cleaner exactly what to ask - your messy thoughts become structured CRM gold, tuned to your industry.
                  </p>
                  <div className="flex items-center gap-1 text-[10px] font-mono">
                    <span className="px-2 py-0.5 rounded-full bg-purple-400/10 text-purple-300/60 border border-purple-400/10">SaaS</span>
                    <span className="px-2 py-0.5 rounded-full bg-blue-400/10 text-blue-300/60 border border-blue-400/10">Insurance</span>
                    <span className="px-2 py-0.5 rounded-full bg-green-400/10 text-green-300/60 border border-green-400/10">MFG</span>
                    <span className="px-2 py-0.5 rounded-full bg-yellow-400/10 text-yellow-300/60 border border-yellow-400/10">+40</span>
                  </div>
                </div>
              );
            })()}

            {/* 3 - Visual CRM Notes: rich visual notebook */}
            {(() => {
              const [ref, inView] = useInView(0.1);
              return (
                <div ref={ref} className="lg:col-span-2 relative p-5 rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden transition-all duration-700 hover:border-green-400/20" style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(40px)", transitionDelay: "200ms" }}>
                  <div className="flex items-center gap-2 mb-3">
                    <svg className="w-5 h-5 text-green-400/70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    <h3 className="text-white font-bold text-lg">Visual CRM Notes</h3>
                    <span className="text-white/20 text-xs ml-auto font-mono">not a wall of text</span>
                  </div>
                  {/* SVG visual notebook - polished, lines from node edges */}
                  <svg className="w-full" viewBox="0 0 560 320" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0" y="0" width="560" height="320" rx="12" fill="#080E1C" />
                    {/* Grid dots - notebook feel */}
                    {Array.from({length: 20}).map((_, r) => Array.from({length: 30}).map((_, c) => (
                      <circle key={`${r}-${c}`} cx={18 + c * 18} cy={16 + r * 16} r="0.4" fill="white" opacity="0.06" />
                    )))}

                    {/* ═══ Connections: edge-to-edge from center ellipse to each node ═══ */}
                    {/* Center→Austin (upper-left exit → right edge of rect) */}
                    <path d="M228 85 C198 76 170 67 150 63" stroke="#A7F364" strokeWidth="1.5" opacity="0.2" strokeLinecap="round" />
                    {/* Center→Hail risk (lower-left exit → upper-right edge of ellipse) */}
                    <path d="M229 115 C198 126 160 138 122 146" stroke="#64B5F3" strokeWidth="1.5" opacity="0.2" strokeLinecap="round" />
                    {/* Center→Umbrella (bottom-left exit → top edge of rect) */}
                    <path d="M262 131 C254 168 228 208 199 240" stroke="#F3B664" strokeWidth="1.5" opacity="0.2" strokeLinecap="round" />
                    {/* Center→Hail comp (upper-right exit → left edge of rect) */}
                    <path d="M332 86 C356 79 380 72 400 68" stroke="#F36464" strokeWidth="1.5" opacity="0.2" strokeLinecap="round" />
                    {/* Center→Inspection (lower-right exit → upper-left edge of ellipse) */}
                    <path d="M328 118 C358 130 396 146 427 155" stroke="#64F3C8" strokeWidth="1.5" opacity="0.2" strokeLinecap="round" />
                    {/* Center→Prism (bottom-right exit → top edge of rect) */}
                    <path d="M307 129 C328 168 382 218 420 250" stroke="#CB64F3" strokeWidth="1.2" opacity="0.15" strokeLinecap="round" />

                    {/* Cross-links between nodes - dashed, edge-to-edge */}
                    {/* Austin bottom → Hail risk top */}
                    <path d="M95 68 C90 95 84 120 80 138" stroke="white" strokeWidth="0.6" opacity="0.08" strokeDasharray="3 4" />
                    {/* Hail comp bottom → Inspection top */}
                    <path d="M470 73 C470 100 470 130 470 150" stroke="white" strokeWidth="0.6" opacity="0.08" strokeDasharray="3 4" />
                    {/* Umbrella right → Prism left */}
                    <path d="M245 259 C280 263 310 268 340 272" stroke="#CB64F3" strokeWidth="0.6" opacity="0.1" strokeDasharray="3 4" />

                    {/* ═══ CENTER: Thompson ═══ */}
                    <ellipse cx="280" cy="100" rx="58" ry="32" fill="#A7F364" fillOpacity="0.08" stroke="#A7F364" strokeWidth="2" strokeDasharray="4 3" opacity="0.4" />
                    <text x="280" y="96" textAnchor="middle" fill="#A7F364" fontSize="15" fontWeight="bold" opacity="0.9" style={{fontFamily:"'Syne',sans-serif"}}>🏠 Thompson</text>
                    <text x="280" y="114" textAnchor="middle" fill="#A7F364" fontSize="9" opacity="0.4">Home + Auto · $4.2K</text>

                    {/* ═══ Austin→Denver (top-left) ═══ */}
                    <rect x="40" y="28" width="110" height="40" rx="8" fill="#A7F364" fillOpacity="0.05" stroke="#A7F364" strokeWidth="1" opacity="0.3" />
                    <text x="95" y="46" textAnchor="middle" fill="white" fontSize="10" opacity="0.7">✈️ Austin→Denver</text>
                    <text x="95" y="60" textAnchor="middle" fill="#A7F364" fontSize="8" opacity="0.35">closing Mar 18</text>
                    {/* ═══ Hail risk (left) ═══ */}
                    <ellipse cx="75" cy="160" rx="60" ry="22" fill="#64B5F3" fillOpacity="0.05" stroke="#64B5F3" strokeWidth="1.2" opacity="0.3" />
                    <text x="75" y="157" textAnchor="middle" fill="white" fontSize="11" opacity="0.7">⚡ Hail risk</text>
                    <text x="75" y="172" textAnchor="middle" fill="#64B5F3" fontSize="7" opacity="0.3">prev claim TX</text>

                    {/* ═══ Umbrella (bottom-left) ═══ */}
                    <rect x="130" y="240" width="115" height="38" rx="19" fill="#F3B664" fillOpacity="0.05" stroke="#F3B664" strokeWidth="1.2" opacity="0.3" />
                    <text x="188" y="256" textAnchor="middle" fill="white" fontSize="11" opacity="0.7">☂️ Umbrella $1M</text>
                    <text x="188" y="270" textAnchor="middle" fill="#F3B664" fontSize="8" opacity="0.3">bundle discount?</text>

                    {/* ═══ Hail comp (top-right) ═══ */}
                    <rect x="400" y="25" width="140" height="48" rx="8" fill="#F36464" fillOpacity="0.06" stroke="#F36464" strokeWidth="1.2" opacity="0.35" />
                    <text x="470" y="43" textAnchor="middle" fill="#F36464" fontSize="10" fontWeight="bold" opacity="0.8">① Hail comp</text>
                    <text x="470" y="58" textAnchor="middle" fill="#F36464" fontSize="8" opacity="0.4">📧 by Wednesday</text>

                    {/* ═══ Inspection (mid-right) ═══ */}
                    <ellipse cx="470" cy="172" rx="65" ry="22" fill="#64F3C8" fillOpacity="0.04" stroke="#64F3C8" strokeWidth="1" opacity="0.3" />
                    <text x="470" y="169" textAnchor="middle" fill="white" fontSize="10" opacity="0.6">② Inspection 📋</text>
                    <text x="470" y="183" textAnchor="middle" fill="#64F3C8" fontSize="7" opacity="0.3">photos or PDF</text>

                    {/* ═══ Prism insight (bottom-right) ═══ */}
                    <rect x="340" y="250" width="200" height="44" rx="8" fill="#CB64F3" fillOpacity="0.04" stroke="#CB64F3" strokeWidth="1" strokeDasharray="4 2" opacity="0.25" />
                    <text x="440" y="268" textAnchor="middle" fill="#CB64F3" fontSize="9" opacity="0.6">🔮 Prism: 48hr = 82% close</text>
                    <text x="440" y="283" textAnchor="middle" fill="#CB64F3" fontSize="7" opacity="0.3">prioritize hail comparison</text>
                    <text x="545" y="262" fill="#CB64F3" fontSize="8" opacity="0.12">✨</text>

                    {/* Junction dots at center ellipse edge exits */}
                    <circle cx="228" cy="85" r="2.5" fill="#A7F364" opacity="0.3" />
                    <circle cx="229" cy="115" r="2.5" fill="#64B5F3" opacity="0.25" />
                    <circle cx="262" cy="131" r="2.5" fill="#F3B664" opacity="0.25" />
                    <circle cx="332" cy="86" r="2.5" fill="#F36464" opacity="0.3" />
                    <circle cx="328" cy="118" r="2.5" fill="#64F3C8" opacity="0.25" />
                    <circle cx="307" cy="129" r="2.5" fill="#CB64F3" opacity="0.2" />
                  </svg>
                </div>
              );
            })()}

            {/* 4 - One Button */}
            {(() => {
              const [ref, inView] = useInView(0.1);
              return (
                <div ref={ref} className="relative p-6 rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden transition-all duration-700 hover:border-green-400/20 flex flex-col" style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(40px)", transitionDelay: "300ms" }}>
                  <h3 className="text-white font-bold text-lg mb-2">One Button. That's It.</h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-2">
                    No loading, no waiting. After an in-person meeting, press and talk. For virtual meetings, AI REV joins the call and handles the rest automatically.
                  </p>
                  <div className="flex-1 flex flex-col items-center justify-center py-6">
                    <div className="relative w-24 h-24 rounded-full flex items-center justify-center" style={{ background: "radial-gradient(circle, #5A8A30 0%, #3A6A18 60%, #1A3A08 100%)", boxShadow: "0 0 30px rgba(167,243,100,0.15)" }}>
                      <BroomOnlyIcon className="w-10 h-10" />
                    </div>
                    <p className="mt-3 text-green-400/50 text-[10px] font-mono tracking-wider">tap → talk → done</p>
                  </div>
                </div>
              );
            })()}

            {/* 5 - The Enforcer */}
            {(() => {
              const [ref, inView] = useInView(0.1);
              return (
                <div ref={ref} className="relative p-6 rounded-2xl border border-yellow-400/10 bg-yellow-400/[0.01] overflow-hidden transition-all duration-700 hover:border-yellow-400/20" style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(40px)", transitionDelay: "400ms" }}>
                  <svg className="w-8 h-8 mb-3 text-yellow-400/70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <h3 className="text-white font-bold text-lg mb-2">The Enforcer</h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-3">
                    Missed a follow-up? Already noticed. Deadline creeping? You'll get pinged. Still too busy? The email gets drafted and shown for approval.
                  </p>
                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex items-center gap-2"><span className="text-green-400">✓</span><span className="text-white/30 line-through">Send proposal to Acme</span></div>
                    <div className="flex items-center gap-2"><span className="text-yellow-400 animate-pulse">!</span><span className="text-yellow-300/50">Follow up with Thompson - due today</span></div>
                    <div className="flex items-center gap-2"><span className="text-white/15">○</span><span className="text-white/25">Schedule demo with NovaTech</span></div>
                  </div>
                </div>
              );
            })()}

            {/* 6 - CRM Autopush */}
            {(() => {
              const [ref, inView] = useInView(0.1);
              return (
                <div ref={ref} className="lg:col-span-2 relative p-6 rounded-2xl border border-green-400/10 bg-green-400/[0.01] overflow-hidden transition-all duration-700 hover:border-green-400/20" style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(40px)", transitionDelay: "450ms" }}>
                  <div className="flex flex-col sm:flex-row gap-5">
                    <div className="flex-1">
                      <svg className="w-8 h-8 mb-3 text-green-400/70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                      <h3 className="text-white font-bold text-lg mb-2">CRM Autopush</h3>
                      <p className="text-white/50 text-sm leading-relaxed">
                        No copy-paste. No tabbing between screens. The meeting ends, the note lands in your CRM - structured, tagged, and field-mapped. Salesforce, HubSpot, you name it.
                      </p>
                    </div>
                    <div className="sm:w-52 flex-shrink-0 bg-gray-950/60 rounded-xl p-3 border border-white/5 space-y-2 text-[10px]">
                      <p className="text-white/25 font-mono tracking-wider uppercase">Auto-mapped</p>
                      <div className="flex items-center justify-between"><span className="text-white/30">Contact</span><span className="text-green-400/60">Thompson, J.</span></div>
                      <div className="flex items-center justify-between"><span className="text-white/30">Stage</span><span className="text-green-400/60">Proposal Sent</span></div>
                      <div className="flex items-center justify-between"><span className="text-white/30">Next Step</span><span className="text-yellow-400/60">Hail comp by Wed</span></div>
                      <div className="flex items-center justify-between"><span className="text-white/30">Deal Value</span><span className="text-green-400/60">$4,200</span></div>
                      <div className="flex items-center justify-between"><span className="text-white/30">Sentiment</span><span className="text-green-400/60">Warm ↑</span></div>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* 7 - The Colleague Who Knows Everything: full width */}
            {(() => {
              const [ref, inView] = useInView(0.1);
              return (
                <div ref={ref} className="sm:col-span-2 lg:col-span-3 relative p-6 rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden transition-all duration-700 hover:border-green-400/20" style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(40px)", transitionDelay: "500ms" }}>
                  <div className="flex flex-col sm:flex-row items-start gap-5">
                    <div className="flex-1">
                      <div className="text-xl mb-2">☕</div>
                      <h3 className="text-white font-bold text-lg mb-2">The Colleague Who Knows Everything</h3>
                      <p className="text-white/50 text-sm leading-relaxed">
                        AI REV isn't just about notes. It keeps you briefed - upcoming meetings, who's involved, what was said last time,
                        company events, team wins, pipeline shifts. Every level of the silo is covered, so you never walk into a room cold.
                      </p>
                    </div>
                    <div className="sm:w-56 flex-shrink-0 bg-gray-950/60 rounded-xl p-3 border border-white/5 space-y-2 text-[10px]">
                      <p className="text-white/25 font-mono tracking-wider uppercase">Today's Intel</p>
                      <div className="flex items-start gap-2 text-white/40"><span className="text-blue-400/60 mt-0.5">●</span> <span>Meeting with <span className="text-white/60">Acme Corp</span> at 2pm - Sarah mentioned budget freeze last time</span></div>
                      <div className="flex items-start gap-2 text-white/40"><span className="text-green-400/60 mt-0.5">●</span> <span><span className="text-white/60">Mike T.</span> closed DataDrive - team high-five</span></div>
                      <div className="flex items-start gap-2 text-white/40"><span className="text-yellow-400/60 mt-0.5">●</span> <span>Company all-hands moved to Thursday 3pm</span></div>
                    </div>
                  </div>
                </div>
              );
            })()}

          </div>
        </div>
      </section>


      {/* ── PERSONALIZATION ── */}
      <section ref={persRef} className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }} />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <p className="text-green-400 text-xs font-mono tracking-widest uppercase mb-3">Adaptive Intelligence</p>
            <h2
              className="text-4xl sm:text-5xl font-extrabold tracking-tight"
              style={{
                fontFamily: "'Syne', sans-serif",
                opacity: persInView ? 1 : 0,
                transform: persInView ? "translateY(0)" : "translateY(30px)",
                transition: "all 0.8s ease",
              }}
            >
              Everything gets remembered.
              <br />
              <span className="text-white/40">About <em>you</em>.</span>
            </h2>
            <p className="text-white/40 text-base mt-5 max-w-2xl mx-auto leading-relaxed">
              AI REV doesn't treat every rep the same. Your style, your pace, your quirks - all learned and
              adapted to. Like a cleaning crew that knows exactly where you leave the mess every time.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <FeatureCard
              delay={0}
              icon="🧬"
              title="Your Voice Profile"
              desc="A profile gets built over time - how you talk, what details you skip, where you rush. Questions adjust to fill your specific gaps."
            />
            <FeatureCard
              delay={100}
              icon="🎧"
              title="Tailored Tone & Pace"
              desc="Prefer quick bullet debriefs? The pace picks up. Love to think out loud? You ramble, it gets structured. Your rhythm, AI REV's format."
            />
            <FeatureCard
              delay={200}
              icon="🗂️"
              title="Deal Context Memory"
              desc="Your pipeline is remembered. 'How did the follow-up with Thompson go?' - already known: who that is, what was discussed, and what was promised."
            />
            <FeatureCard
              delay={300}
              icon="🔄"
              title="Continuous Calibration"
              desc="Every conversation sharpens the system. If you close more deals when budget comes up early - it starts happening automatically."
            />
            <FeatureCard
              delay={400}
              icon="🌡️"
              title="Mood-Aware"
              desc="Had a rough meeting? It gets picked up on. No bombardment with 20 questions - just the essentials, then you move on. Emotional intelligence, calibrated."
            />
            <FeatureCard
              delay={500}
              icon="🏗️"
              title="Silo-Level Depth"
              desc="Like the levels of a silo, it goes deeper the longer you work together. Week one: basic notes. Month three: a strategic partner that knows your entire book of business."
            />
          </div>
        </div>
      </section>


      {/* ── CTA ── */}
      <section id="cta" className="relative py-32 px-6 overflow-hidden">
        <Sparkles />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-400/[0.03] to-transparent" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="flex items-center justify-center gap-4 mb-8">
            <BroomOnlyIcon className="w-14 h-14" style={{ animation: "sweep 2s ease-in-out infinite" }} />
            <span className="text-white/15 text-3xl font-thin">+</span>
            <PrismIcon className="w-14 h-14" />
          </div>
          <h2
            className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Ready for a
            <br />
            <span className="shimmer-text">spotless pipeline?</span>
          </h2>
          <p className="text-white/45 text-lg mb-10 max-w-xl mx-auto">
            Become a Design Partner. Get free access, shape the product, and give your team an unfair advantage.
          </p>

          <button
            onClick={() => { setPage("partner"); window.scrollTo(0, 0); }}
            className="px-10 py-4 text-lg font-bold rounded-full text-gray-950 transition-all duration-300 hover:shadow-lg hover:shadow-green-400/25 hover:scale-105"
            style={{ background: "linear-gradient(135deg, #A7F364, #6BC928)" }}
          >
            Join the Study
          </button>
        </div>
      </section>
      </div>

      {page === "partner" && (
        <section className="relative min-h-screen px-6 pt-32 pb-20">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => { setPage("landing"); window.scrollTo(0, 0); }}
              className="text-white/40 text-sm hover:text-green-400 transition-colors mb-12 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              Back to home
            </button>

            <div className="text-center mb-16">
              <p className="text-green-400 text-xs font-mono tracking-widest uppercase mb-4">Design Partner Program</p>
              <h1
                className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Shape the future of
                <br />
                <span className="shimmer-text">CRM hygiene.</span>
              </h1>
              <p className="text-white/45 text-lg max-w-2xl mx-auto leading-relaxed">
                We're looking for sales teams who want early access to AI REV Voice in exchange for honest, ongoing feedback. Here's how the partnership works.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {/* What you get */}
              <div className="rounded-2xl border border-green-400/15 bg-green-400/[0.02] p-8">
                <p className="text-green-400 text-xs font-mono tracking-widest uppercase mb-6">What you get</p>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-lg bg-green-400/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-green-400 text-sm font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-sm mb-1">Free access to AI REV Voice & Clean</h3>
                      <p className="text-white/40 text-sm leading-relaxed">Full access from April 1 through June 30, 2026. No cost, no strings beyond the partnership terms below.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-lg bg-green-400/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-green-400 text-sm font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-sm mb-1">9 months of discounted access</h3>
                      <p className="text-white/40 text-sm leading-relaxed">After the design phase ends, keep using AI REV at roughly-at-cost pricing for 9 additional months.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-lg bg-green-400/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-green-400 text-sm font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-sm mb-1">AI adoption & education support</h3>
                      <p className="text-white/40 text-sm leading-relaxed">The AI REV team provides hands-on guidance to help your org adopt AI tooling - beyond just our product.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* What we ask */}
              <div className="rounded-2xl border border-purple-400/15 bg-purple-400/[0.02] p-8">
                <p className="text-purple-400 text-xs font-mono tracking-widest uppercase mb-6">What we ask</p>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-lg bg-purple-400/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-purple-400 text-sm font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-sm mb-1">Weekly 1:1 with sales manager</h3>
                      <p className="text-white/40 text-sm leading-relaxed">A short weekly session during the design phase so we can collect structured feedback from leadership.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-lg bg-purple-400/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-purple-400 text-sm font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-sm mb-1">Monthly 1h with each sales rep</h3>
                      <p className="text-white/40 text-sm leading-relaxed">Access to meet individually with each rep once a month to understand how they use the tool day-to-day.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-lg bg-purple-400/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-purple-400 text-sm font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-sm mb-1">Roll out to 5+ sales reps</h3>
                      <p className="text-white/40 text-sm leading-relaxed">Deploy AI REV to your existing CRM with at least 5 active sales representatives using the system.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <p className="text-white/50 text-sm mb-6 font-mono">Only <span className="text-green-400 font-bold">5 spots</span> available.</p>
              <a
                href="mailto:marek@airev.us?subject=Design Partner Program"
                className="inline-block px-10 py-4 text-lg font-bold rounded-full text-gray-950 transition-all duration-300 hover:shadow-lg hover:shadow-green-400/25 hover:scale-105"
                style={{ background: "linear-gradient(135deg, #A7F364, #6BC928)" }}
              >
                Apply to Join
              </a>
              <p className="text-white/25 text-xs mt-4">E-mail <a href="mailto:marek@airev.us" className="text-green-400/70 hover:text-green-400 transition-colors">marek@airev.us</a> to apply.</p>
            </div>
          </div>
        </section>
      )}

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <BroomOnlyIcon className="w-5 h-5" />
            <span className="text-sm font-bold" style={{ fontFamily: "'Syne', sans-serif" }}>
              AI <span className="text-green-400">REV</span>
            </span>
            <span className="text-white/20 text-xs ml-2">Voice</span>
          </div>
          <p className="text-white/15 text-xs font-mono">© 2026 AI REV. Clean data, clean deals.</p>
        </div>
      </footer>
    </div>
  );
}
