import { motion } from 'framer-motion';
import { motionHoverProps } from '@/design-system/motion/motion-presets';

export const Footer = () => (
  <footer id="support" className="mt-24 px-6 pt-10 pb-8 border-t border-white/5 bg-slate-900/60">
    <div className="mx-auto max-w-[1200px] grid gap-8 text-slate-400 md:grid-cols-3">
      <div className="group">
        <motion.p
          {...motionHoverProps(2, 1.005)}
          className="font-semibold text-white mb-3 transition group-hover:-translate-y-0.5 group-hover:z-10"
        >
          VeroVault
        </motion.p>
        <p>Smarter financial journeys powered by adaptive automation and human-centred design.</p>
      </div>
      <div className="group">
        <motion.p
          {...motionHoverProps(2, 1.005)}
          className="font-semibold text-white mb-3 transition group-hover:-translate-y-0.5 group-hover:z-10"
        >
          Need help?
        </motion.p>
        <ul className="space-y-2">
          <li>
            <motion.a
              {...motionHoverProps(2, 1.005)}
              className="inline-flex items-center hover:text-white transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40"
              href="mailto:help@verovault.app"
            >
              help@verovault.app
            </motion.a>
          </li>
          <li>Live chat — 24/7</li>
          <li>Global support centre</li>
        </ul>
      </div>
      <div className="group">
        <motion.p
          {...motionHoverProps(2, 1.005)}
          className="font-semibold text-white mb-3 transition group-hover:-translate-y-0.5 group-hover:z-10"
        >
          Legal
        </motion.p>
        <ul className="space-y-2">
          <li>Privacy &amp; security</li>
          <li>Terms of service</li>
          <li>Licensing &amp; compliance</li>
        </ul>
      </div>
    </div>
    <p className="mt-8 mx-auto max-w-[1200px] text-slate-400 text-[0.85rem] text-center">
      © {new Date().getFullYear()} VeroVault Technologies. Crafted for the forward-thinking finance generation.
    </p>
  </footer>
);
