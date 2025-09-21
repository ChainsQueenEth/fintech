import { useEffect, useMemo, useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { motionHoverProps } from '@/design-system/motion/motion-presets';

import { useDebug } from '@/utils/debug';

type DeviceSnapshot = {
  timezone: string;
  locale: string;
  connection?: string;
  memory?: string;
};

const getDeviceSnapshot = (): DeviceSnapshot => {
  if (typeof window === 'undefined') {
    return {
      timezone: 'N/A',
      locale: 'N/A'
    };
  }

  const nav = window.navigator as Navigator & { connection?: { effectiveType?: string } };
  return {
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    locale: navigator.language,
    connection: nav.connection?.effectiveType,
    memory: (navigator as Navigator & { deviceMemory?: number }).deviceMemory
      ? `${(navigator as Navigator & { deviceMemory?: number }).deviceMemory} GB`
      : undefined
  };
};

export const DebugConsole = () => {
  const { isDebug, toggleDebug } = useDebug();
  const [snapshot, setSnapshot] = useState<DeviceSnapshot>(() => getDeviceSnapshot());
  const [mountTime] = useState(() => performance.now());

  useEffect(() => {
    if (!isDebug) return;
    const onVisibility = () => setSnapshot(getDeviceSnapshot());

    window.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('focus', onVisibility);
    return () => {
      window.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('focus', onVisibility);
    };
  }, [isDebug]);

  const uptime = useMemo(() => {
    if (!isDebug) return '—';
    const elapsed = performance.now() - mountTime;
    return `${(elapsed / 1000).toFixed(1)}s`;
  }, [isDebug, mountTime]);

  return (
    <>
      <m.button
        type="button"
        {...motionHoverProps(3, 1.01)}
        onClick={() => toggleDebug()}
        aria-pressed={isDebug}
        className="fixed right-5 bottom-5 z-30 rounded-full px-4 py-2 font-semibold text-slate-900 bg-gradient-to-tr from-blue-600 to-cyan-400 shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:shadow-xl hover:z-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40 active:scale-95"
      >
        {isDebug ? 'Exit debug' : 'Debug mode'}
      </m.button>
      <AnimatePresence>
        {isDebug ? (
          <m.section
            key="debug-panel"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25 }}
            className="fixed right-5 bottom-[4.5rem] z-30 w-[min(320px,90vw)] rounded-[16px] border border-cyan-400/35 bg-slate-900/90 p-4 text-slate-200 backdrop-blur-[20px] shadow-[0_20px_45px_rgba(15,23,42,0.45)]"
          >
            <h3 className="text-sm font-semibold mb-2 text-cyan-200">Runtime diagnostics</h3>
            <div className="space-y-1.5 text-slate-400 text-[0.85rem]">
              <div className="flex justify-between">
                Locale <span className="text-slate-200 font-semibold">{snapshot.locale}</span>
              </div>
              <div className="flex justify-between">
                Timezone <span className="text-slate-200 font-semibold">{snapshot.timezone}</span>
              </div>
              <div className="flex justify-between">
                Network <span className="text-slate-200 font-semibold">{snapshot.connection ?? 'unknown'}</span>
              </div>
              <div className="flex justify-between">
                Memory <span className="text-slate-200 font-semibold">{snapshot.memory ?? 'unknown'}</span>
              </div>
              <div className="flex justify-between">
                Session uptime <span className="text-slate-200 font-semibold">{uptime}</span>
              </div>
            </div>
          </m.section>
        ) : null}
      </AnimatePresence>
    </>
  );
};
