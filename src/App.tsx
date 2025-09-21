import { Suspense } from 'react';

import { AppLayout } from './components/AppLayout';
import { LoadingScreen } from './components/LoadingScreen';
import { HomeView } from './views/HomeView';
import { AppErrorBoundary } from './components/AppErrorBoundary';

const App = () => (
  <AppLayout>
    <AppErrorBoundary>
      <Suspense fallback={<LoadingScreen />}>
        <HomeView />
      </Suspense>
    </AppErrorBoundary>
  </AppLayout>
);

export default App;
