import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MotionConfig } from 'framer-motion';
import { AuthProvider } from './hooks/useAuth';
import { Routes } from './routes';

const queryClient = new QueryClient();

function App() {
  return (
    <MotionConfig reduceMotion="user">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </QueryClientProvider>
    </MotionConfig>
  );
}

export default App;
