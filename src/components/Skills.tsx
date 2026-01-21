'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const skills = [
  { name: 'JavaScript', level: 90, color: 'bg-orange' },
  { name: 'TypeScript', level: 85, color: 'bg-blue' },
  { name: 'React', level: 90, color: 'bg-orange' },
  { name: 'Next.js', level: 85, color: 'bg-blue' },
  { name: 'Node.js', level: 80, color: 'bg-orange' },
  { name: 'Python', level: 75, color: 'bg-blue' },
  { name: 'CSS/Tailwind', level: 85, color: 'bg-orange' },
  { name: 'Git', level: 90, color: 'bg-blue' },
];

const tools = [
  { name: 'VS Code', icon: '💻' },
  { name: 'Docker', icon: '🐳' },
  { name: 'Figma', icon: '🎨' },
  { name: 'Vercel', icon: '▲' },
  { name: 'GitHub', icon: '🐙' },
  { name: 'AWS', icon: '☁️' },
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-20 px-4 bg-card/50" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            My <span className="gradient-text">Skills</span>
          </h2>

          {/* Skill bars */}
          <div className="space-y-6 mb-16">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-foreground/60">{skill.level}%</span>
                </div>
                <div className="h-3 bg-card-border rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full ${skill.color} rounded-full`}
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${skill.level}%` } : {}}
                    transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tools */}
          <h3 className="text-2xl font-bold text-center mb-8">
            Tools & <span className="text-orange">Technologies</span>
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: index * 0.1 + 0.5 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="px-6 py-4 bg-card rounded-xl border border-card-border shadow-lg flex items-center gap-2"
              >
                <span className="text-2xl">{tool.icon}</span>
                <span className="font-medium">{tool.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
