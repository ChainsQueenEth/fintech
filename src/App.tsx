import { Suspense } from 'react';
import { LazyMotion, domMax } from 'framer-motion';

import { AppLayout } from './components/AppLayout';
import { LoadingScreen } from './components/LoadingScreen';
import { HomeView } from './views/HomeView';
import { AppErrorBoundary } from './components/AppErrorBoundary';

const App = () => (
  <AppErrorBoundary>
    <LazyMotion features={domMax} strict>
      <AppLayout>
        <Suspense fallback={<LoadingScreen />}>
          <HomeView />
        </Suspense>
      </AppLayout>
    </LazyMotion>
  </AppErrorBoundary>
);

export default App;
