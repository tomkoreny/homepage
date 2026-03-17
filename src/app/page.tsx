'use client';

import { motion } from 'framer-motion';

const links = [
  { label: 'GitHub', href: 'https://github.com/tomkoreny', icon: '⌘', accent: false },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/tomkoreny', icon: '◆', accent: false },
  { label: 'Gitea', href: 'https://git.tomkoreny.com', icon: '◈', accent: true },
  { label: 'Mastodon', href: 'https://mstdn.tomkoreny.com/@tom', icon: '◎', accent: false },
  { label: 'Matrix', href: 'https://matrix.to/#/@tom:tomkoreny.com', icon: '▣', accent: true },
  { label: 'Email', href: 'mailto:tom@tomkoreny.com', icon: '▶', accent: false },
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
  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-12 md:py-20 relative overflow-hidden">
      {/* decorative background shapes */}
      <div className="fixed top-20 -right-16 w-64 h-64 bg-blue/10 border-3 border-blue/20 rotate-12 -z-10" />
      <div className="fixed bottom-20 -left-12 w-48 h-48 bg-orange/10 border-3 border-orange/20 -rotate-6 -z-10" />
      <div className="fixed top-1/2 left-1/4 w-4 h-4 bg-orange rotate-45 -z-10" />
      <div className="fixed top-1/3 right-1/3 w-3 h-3 bg-blue rotate-12 -z-10" />

      <motion.div
        className="w-full max-w-md space-y-8"
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
            <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-none relative">
              <span className="relative inline-block">
                <span className="relative z-10">Tom</span>
                <span className="absolute -bottom-1 left-0 right-0 h-3 bg-orange/30 -z-0" />
              </span>
              <br />
              <span className="text-blue relative inline-block -rotate-2 mt-1">
                Korený
                <span className="absolute -right-6 -top-4 font-mono text-[0.6rem] font-bold bg-orange text-white px-1.5 py-0.5 rotate-12 border-2 border-border">
                  .com
                </span>
              </span>
            </h1>
            <p className="font-mono text-xs mt-3 text-fg/60 tracking-[0.2em] uppercase">
              DevOps · Self-Hoster · Rally Driver
            </p>
          </div>

          {/* bio */}
          <div className="neo-card p-4 text-left relative corner-mark">
            <p className="text-[0.95rem] leading-relaxed">
              Infrastructure nerd based in Czech Republic. I build homelabs, automate everything,
              and race electric cars on weekends. Passionate about{' '}
              <span className="bg-blue text-white px-1 font-bold">self-hosting</span>,{' '}
              <span className="bg-orange text-white px-1 font-bold">open source</span>, and
              keeping things running at 3 AM so you don&apos;t have to.
            </p>
          </div>
        </motion.header>

        {/* links */}
        <motion.section variants={stagger.item} className="space-y-3">
          <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-fg/50 ml-1">
            // find me
          </h2>
          {links.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`neo-link ${link.accent ? 'neo-link-accent' : ''}`}
              variants={stagger.item}
              custom={i}
            >
              <span className="text-xl w-8 text-center font-mono">{link.icon}</span>
              <span>{link.label}</span>
              <span className="ml-auto font-mono text-xs text-fg/40">→</span>
            </motion.a>
          ))}
        </motion.section>

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
