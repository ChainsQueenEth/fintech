import { Suspense } from 'react';
import { LazyMotion, domAnimation } from 'framer-motion';

import { AppLayout } from './components/AppLayout';
import { LoadingScreen } from './components/LoadingScreen';
import { HomeView } from './views/HomeView';
import { AppErrorBoundary } from './components/AppErrorBoundary';

const App = () => (
  <AppLayout>
    <AppErrorBoundary>
      <LazyMotion features={domAnimation} strict>
        <Suspense fallback={<LoadingScreen />}>
          <HomeView />
        </Suspense>
      </LazyMotion>
    </AppErrorBoundary>
  </AppLayout>
);

export default App;
