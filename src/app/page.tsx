'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

// SVG icon components
const icons: Record<string, JSX.Element> = {
  github: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>,
  linkedin: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>,
  mastodon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.268 5.313c-.35-2.578-2.617-4.61-5.304-5.004C17.51.242 15.792 0 11.813 0h-.03c-3.98 0-4.835.242-5.288.309C3.882.692 1.496 2.518.917 5.127.64 6.412.61 7.837.661 9.143c.074 1.874.088 3.745.26 5.611.118 1.24.325 2.47.62 3.68.55 2.237 2.777 4.098 4.96 4.857 2.336.792 4.849.923 7.256.38.265-.061.527-.132.786-.213.585-.184 1.27-.39 1.774-.753a.057.057 0 00.023-.043v-1.809a.052.052 0 00-.02-.041.053.053 0 00-.046-.01 20.282 20.282 0 01-4.709.547c-2.73 0-3.463-1.284-3.674-1.818a5.593 5.593 0 01-.319-1.433.053.053 0 01.066-.054 19.648 19.648 0 004.581.536h.344c1.705 0 3.42-.107 5.088-.476 2.059-.456 3.86-1.9 4.06-4.975.011-.17.011-3.495.011-3.667 0-1.136.032-2.318-.126-3.366zM19.69 14.657h-3.165v-6.31c0-1.329-.56-2.003-1.68-2.003-1.237 0-1.857.8-1.857 2.382v3.454H9.846V8.726c0-1.583-.62-2.382-1.857-2.382-1.12 0-1.68.674-1.68 2.003v6.31H3.144V8.49c0-1.329.339-2.384 1.02-3.166.702-.782 1.621-1.183 2.764-1.183 1.324 0 2.327.508 2.993 1.525L11 7.272l1.08-1.606c.666-1.017 1.669-1.525 2.993-1.525 1.143 0 2.062.401 2.764 1.183.68.782 1.02 1.837 1.02 3.166v6.167z" /></svg>,
  matrix: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M.632.55v22.9H2.28V24H0V0h2.28v.55zm7.043 7.26v1.157h.033c.309-.443.683-.784 1.117-1.024.433-.245.936-.365 1.5-.365.54 0 1.033.107 1.488.323.455.214.791.593 1.01 1.138.266-.488.623-.876 1.084-1.159.46-.281.982-.421 1.564-.421.435 0 .842.065 1.224.196.38.129.712.346.996.648.284.303.507.69.668 1.16.159.471.241 1.06.241 1.767v5.82h-2.16v-5.14c0-.373-.021-.718-.073-1.034a2.007 2.007 0 00-.263-.81 1.268 1.268 0 00-.54-.53c-.227-.126-.532-.19-.916-.19-.385 0-.695.07-.933.207a1.534 1.534 0 00-.572.55 2.153 2.153 0 00-.286.828 5.752 5.752 0 00-.078.961v5.158h-2.16v-4.97c0-.344-.005-.677-.026-.999a2.44 2.44 0 00-.2-.866 1.282 1.282 0 00-.501-.622c-.22-.158-.538-.237-.958-.237-.124 0-.282.03-.475.083a1.582 1.582 0 00-.556.297c-.176.148-.328.36-.46.635-.13.277-.198.643-.198 1.1v5.578h-2.16V7.81zm16.045-7.26v22.9h-1.649V24H24V0h-2.28v.55z" /></svg>,
  gitea: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M4.186 2.553a.5.5 0 00-.429.084L.63 5.249a1.5 1.5 0 00-.14 2.19l9.975 10.478a1.5 1.5 0 001.062.483h.3a1.5 1.5 0 001.062-.483l9.975-10.478a1.5 1.5 0 00-.14-2.19l-3.126-2.612a.5.5 0 00-.429-.084l-3.733.934a2.5 2.5 0 01-1.089.043l-3.208-.642a2.5 2.5 0 00-.894-.02L4.186 2.553z" /></svg>,
  lobster: <span className="text-xl">🦞</span>,
  email: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
  sun: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
  moon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>,
};

const sections = [
  {
    title: '// socials',
    links: [
      { label: 'GitHub', href: 'https://github.com/tomkoreny', icon: 'github', accent: false },
      { label: 'LinkedIn', href: 'https://linkedin.com/in/tomkoreny', icon: 'linkedin', accent: false },
      { label: 'Mastodon', href: 'https://mstdn.tomkoreny.com/@tom', icon: 'mastodon', accent: false },
      { label: 'Matrix', href: 'https://matrix.to/#/@tom:tomkoreny.com', icon: 'matrix', accent: false },
    ],
  },
  {
    title: '// projects',
    links: [
      { label: 'Gitea', href: 'https://git.tomkoreny.com', icon: 'gitea', accent: true },
      { label: 'OpenClaw', href: 'https://openclaw.ai', icon: 'lobster', accent: true },
    ],
  },
  {
    title: '// contact',
    links: [
      { label: 'Email', href: 'mailto:tom@tomkoreny.com', icon: 'email', accent: false },
    ],
  },
];

const techStack = [
  'NixOS', 'Docker', 'Kubernetes', 'TypeScript', 'Node.js',
  'Terraform', 'Proxmox', 'Grafana', 'PostgreSQL', 'Tailscale',
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
              Software Dev · DevOps · Self-Hoster · Rally Driver
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
