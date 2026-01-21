'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-20 px-4" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            About <span className="gradient-text">Me</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Photo placeholder */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl gradient-bg p-1">
                <div className="w-full h-full rounded-2xl bg-card flex items-center justify-center">
                  <span className="text-8xl">📸</span>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-orange/20 rounded-full blur-xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue/20 rounded-full blur-xl" />
            </motion.div>

            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-4"
            >
              <p className="text-lg text-foreground/80 leading-relaxed">
                Hello! I&apos;m <span className="text-orange font-semibold">Tom Korený</span>, 
                a passionate developer based in Prague. I love building things that live on the 
                internet and exploring new technologies.
              </p>
              <p className="text-lg text-foreground/80 leading-relaxed">
                When I&apos;m not coding, you can find me exploring new technologies, 
                contributing to open source projects, or enjoying a good cup of coffee.
              </p>
              <p className="text-lg text-foreground/80 leading-relaxed">
                I believe in writing clean, maintainable code and creating experiences 
                that make a <span className="text-blue font-semibold">positive impact</span>.
              </p>

              {/* Quick stats */}
              <div className="flex gap-6 pt-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange">5+</div>
                  <div className="text-sm text-foreground/60">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue">20+</div>
                  <div className="text-sm text-foreground/60">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange">∞</div>
                  <div className="text-sm text-foreground/60">Coffee Cups</div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
