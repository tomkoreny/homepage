'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

// SVG icon components
const icons: Record<string, JSX.Element> = {
  github: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>,
  linkedin: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>,
  mastodon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.268 5.313c-.35-2.578-2.617-4.61-5.304-5.004C17.51.242 15.792 0 11.813 0h-.03c-3.98 0-4.835.242-5.288.309C3.882.692 1.496 2.518.917 5.127.64 6.412.61 7.837.661 9.143c.074 1.874.088 3.745.26 5.611.118 1.24.325 2.47.62 3.68.55 2.237 2.777 4.098 4.96 4.857 2.336.792 4.849.923 7.256.38.265-.061.527-.132.786-.213.585-.184 1.27-.39 1.774-.753a.057.057 0 00.023-.043v-1.809a.052.052 0 00-.02-.041.053.053 0 00-.046-.01 20.282 20.282 0 01-4.709.547c-2.73 0-3.463-1.284-3.674-1.818a5.593 5.593 0 01-.319-1.433.053.053 0 01.066-.054 19.648 19.648 0 004.581.536h.344c1.705 0 3.42-.107 5.088-.476 2.059-.456 3.86-1.9 4.06-4.975.011-.17.011-3.495.011-3.667 0-1.136.032-2.318-.126-3.366zM19.69 14.657h-3.165v-6.31c0-1.329-.56-2.003-1.68-2.003-1.237 0-1.857.8-1.857 2.382v3.454H9.846V8.726c0-1.583-.62-2.382-1.857-2.382-1.12 0-1.68.674-1.68 2.003v6.31H3.144V8.49c0-1.329.339-2.384 1.02-3.166.702-.782 1.621-1.183 2.764-1.183 1.324 0 2.327.508 2.993 1.525L11 7.272l1.08-1.606c.666-1.017 1.669-1.525 2.993-1.525 1.143 0 2.062.401 2.764 1.183.68.782 1.02 1.837 1.02 3.166v6.167z" /></svg>,
  matrix: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M.632.55v22.9H2.28V24H0V0h2.28v.55zm7.043 7.26v1.157h.033c.309-.443.683-.784 1.117-1.024.433-.245.936-.365 1.5-.365.54 0 1.033.107 1.488.323.455.214.791.593 1.01 1.138.266-.488.623-.876 1.084-1.159.46-.281.982-.421 1.564-.421.435 0 .842.065 1.224.196.38.129.712.346.996.648.284.303.507.69.668 1.16.159.471.241 1.06.241 1.767v5.82h-2.16v-5.14c0-.373-.021-.718-.073-1.034a2.007 2.007 0 00-.263-.81 1.268 1.268 0 00-.54-.53c-.227-.126-.532-.19-.916-.19-.385 0-.695.07-.933.207a1.534 1.534 0 00-.572.55 2.153 2.153 0 00-.286.828 5.752 5.752 0 00-.078.961v5.158h-2.16v-4.97c0-.344-.005-.677-.026-.999a2.44 2.44 0 00-.2-.866 1.282 1.282 0 00-.501-.622c-.22-.158-.538-.237-.958-.237-.124 0-.282.03-.475.083a1.582 1.582 0 00-.556.297c-.176.148-.328.36-.46.635-.13.277-.198.643-.198 1.1v5.578h-2.16V7.81zm16.045-7.26v22.9h-1.649V24H24V0h-2.28v.55z" /></svg>,
  instagram: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>,
  facebook: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>,
  x: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>,
  reddit: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 0-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" /></svg>,
  discord: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" /></svg>,
  twitch: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z" /></svg>,
  steam: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.454 1.012zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015z" /></svg>,
  forgejo: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16.777 0a2.9 2.9 0 1 1 0 5.8 2.9 2.9 0 0 1 0-5.8zm-9.554 0a2.9 2.9 0 1 1 0 5.8 2.9 2.9 0 0 1 0-5.8zM12 9.1a2.9 2.9 0 1 1 0 5.8 2.9 2.9 0 0 1 0-5.8zm0 9.1a2.9 2.9 0 1 1 0 5.8 2.9 2.9 0 0 1 0-5.8z" /></svg>,
  email: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
  sun: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
  moon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>,
};

const sections = [
  {
    title: '// socials',
    links: [
      { label: 'Instagram', href: 'https://instagram.com/tomkoreny', icon: 'instagram', accent: false },
      { label: 'Facebook', href: 'https://facebook.com/puma2254', icon: 'facebook', accent: false },
      { label: 'X / Twitter', href: 'https://x.com/tomkoreny', icon: 'x', accent: false },
      { label: 'LinkedIn', href: 'https://linkedin.com/in/tomkoreny', icon: 'linkedin', accent: false },
      { label: 'Mastodon', href: 'https://mstdn.tomkoreny.com/@tom', icon: 'mastodon', accent: false },
      { label: 'Discord', href: 'https://discordapp.com/users/213647399812464640', icon: 'discord', accent: false },
      // { label: 'Reddit', href: 'https://reddit.com/u/Pumicek', icon: 'reddit', accent: false },
      // { label: 'Twitch', href: 'https://twitch.tv/pumpicek', icon: 'twitch', accent: false },
      { label: 'Steam', href: 'https://steamcommunity.com/id/puma2254', icon: 'steam', accent: false },
    ],
  },
  {
    title: '// projects',
    links: [
      { label: 'GitHub', href: 'https://github.com/tomkoreny', icon: 'github', accent: true },
      { label: 'Git', href: 'https://git.tomkoreny.com', icon: 'forgejo', accent: true },
    ],
  },
  {
    title: '// contact',
    links: [
      { label: 'Email', href: 'mailto:tom@tomkoreny.com', icon: 'email', accent: false },
      { label: 'Matrix', href: 'https://matrix.to/#/@tom:tomkoreny.com', icon: 'matrix', accent: false },
    ],
  },
];

const techStack = [
  'TypeScript', 'Python', 'Go', 'Ruby', 'Nix', 'React', 'Next.js', 'Vue', 'Angular',
  'Node.js', 'NestJS', 'Fastify', 'FastAPI', 'LVGL', 'Docker', 'Kubernetes', 'Proxmox',
  'NixOS', 'Terraform', 'PostgreSQL', 'Grafana', 'Prometheus', 'Loki',
  'Tailscale', 'Traefik', 'Git', 'CI/CD', 'ArgoCD', 'Linux',
];

const stagger = {
  container: { transition: { staggerChildren: 0.06 } },
  item: {
    hidden: { opacity: 0, y: 20, rotate: -1 },
    show: { opacity: 1, y: 0, rotate: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 20 } },
  },
};

export default function Home() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDark = () => {
    setDark((d) => {
      const next = !d;
      document.documentElement.classList.toggle('dark', next);
      localStorage.setItem('theme', next ? 'dark' : 'light');
      return next;
    });
  };

  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-12 md:py-20 relative overflow-hidden">
      {/* dark mode toggle */}
      <motion.button
        onClick={toggleDark}
        className="fixed top-5 right-5 z-50 neo-card p-2.5 cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle dark mode"
      >
        {dark ? icons.sun : icons.moon}
      </motion.button>

      {/* decorative background shapes */}
      <div className="fixed top-20 -right-16 w-64 h-64 bg-blue/10 border-3 border-blue/20 rotate-12 -z-10" />
      <div className="fixed bottom-20 -left-12 w-48 h-48 bg-orange/10 border-3 border-orange/20 -rotate-6 -z-10" />
      <div className="fixed top-1/2 left-1/4 w-4 h-4 bg-orange rotate-45 -z-10" />

      <motion.div
        className="w-full max-w-lg space-y-8"
        initial="hidden"
        animate="show"
        variants={stagger.container}
      >
        {/* header / identity */}
        <motion.header variants={stagger.item} className="text-center space-y-4">
          {/* avatar */}
          <div className="relative inline-block">
            <div className="w-28 h-28 rounded-full avatar-ring bg-blue flex items-center justify-center text-5xl relative corner-mark">
              <span className="select-none">🧑‍💻</span>
            </div>
            {/* online dot */}
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-orange border-3 border-border rounded-full" />
          </div>

          <div className="relative">
            <h1 className="leading-[0.85] relative uppercase">
              <span className="graffiti-orange text-7xl md:text-9xl inline-block rotate-2">
                <span className="text-[1.15em]">T</span>om
              </span>
              <br />
              <span className="graffiti-blue text-6xl md:text-8xl inline-block -rotate-3 mt-1 relative">
                <span className="text-[1.15em]">K</span>orený
                <span className="absolute -right-3 -top-6 font-mono text-[0.55rem] font-bold bg-orange text-white px-1.5 py-0.5 rotate-12 border-2 border-white" style={{ fontFamily: "'Space Mono', monospace", WebkitTextStroke: '0', textShadow: 'none', filter: 'none' }}>
                  .com
                </span>
              </span>
            </h1>
            <p className="font-mono text-xs mt-4 text-fg/60 tracking-[0.2em] uppercase">
              Software Dev · DevOps · Rally Driver
            </p>
          </div>

          {/* bio */}
          <div className="neo-card p-4 text-left relative corner-mark">
            <p className="text-[0.95rem] leading-relaxed">
              Software developer &amp; infrastructure nerd based in Prague, 🇨🇿. I
              write code, automate everything, and race electric cars on weekends. Passionate about{' '}
              <span className="bg-orange text-white px-1 font-bold">open source</span>,{' '}
              <span className="bg-blue text-white px-1 font-bold">self-hosting</span>,{' '}
              and <span className="bg-red-600 text-white px-1 font-bold">AI</span> 🦞 —
              keeping things running at 3 AM so you don&apos;t have to.
            </p>
          </div>
        </motion.header>

        {/* link sections */}
        {sections.map((section) => (
          <motion.section key={section.title} variants={stagger.item} className="space-y-3">
            <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-fg/50 ml-1">
              {section.title}
            </h2>
            {section.links.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`neo-link ${link.accent ? 'neo-link-accent' : ''}`}
                variants={stagger.item}
                custom={i}
              >
                <span className="w-8 flex justify-center">{icons[link.icon]}</span>
                <span>{link.label}</span>
                <span className="ml-auto font-mono text-xs text-fg/40">→</span>
              </motion.a>
            ))}
          </motion.section>
        ))}

        {/* tech stack marquee */}
        <motion.section variants={stagger.item} className="space-y-3">
          <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-fg/50 ml-1">
            // tech stack
          </h2>
          <div className="neo-card overflow-hidden p-0">
            <div className="overflow-hidden py-3">
              <div className="marquee-track flex gap-4 whitespace-nowrap w-max">
                {[...techStack, ...techStack].map((tech, i) => (
                  <span key={i} className="neo-tag inline-block">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* footer */}
        <motion.footer
          variants={stagger.item}
          className="text-center pt-4 space-y-2"
        >
          <div className="flex items-center justify-center gap-3 font-mono text-xs text-fg/40">
            <span>▪</span>
            <span>tomkoreny.com</span>
            <span>▪</span>
            <span>{new Date().getFullYear()}</span>
            <span>▪</span>
          </div>
          <p className="font-mono text-[0.65rem] text-fg/30 uppercase tracking-wider">
            self-hosted with love
          </p>
        </motion.footer>
      </motion.div>
    </main>
  );
}
