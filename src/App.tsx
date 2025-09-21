import { Suspense } from 'react';

import { AppLayout } from './components/AppLayout';
import { LoadingScreen } from './components/LoadingScreen';
import { HomeView } from './views/HomeView';

const App = () => (
  <AppLayout>
    <Suspense fallback={<LoadingScreen />}>
      <HomeView />
    </Suspense>
  </AppLayout>
);

export default App;
