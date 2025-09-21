import { PropsWithChildren } from 'react';

import { DebugConsole } from './DebugConsole';
import { Footer } from './Footer';
import { Header } from './Header';

export const AppLayout = ({ children }: PropsWithChildren) => (
  <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-blue-600/15 via-cyan-400/10 to-slate-900/60">
    <div
      aria-hidden="true"
      className="absolute -top-[30%] -left-[50%] right-[-50%] h-[60vh] rounded-full [background:radial-gradient(circle_at_center,rgba(34,211,238,0.4),transparent_60%)] blur-[120px] opacity-70 pointer-events-none"
    />
    <Header />
    <main className="relative z-[1]">{children}</main>
    <Footer />
    <DebugConsole />
  </div>
);
