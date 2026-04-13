import { ToastContainer } from 'react-toastify';
import AppProviders from './shared/providers/AppProvider';
import AppRoutes from './shared/routes/AppRoutes';

const App: React.FC = () => {
  return (
    <AppProviders>
      <AppRoutes />
      <ToastContainer />
    </AppProviders>
  );
};

export default App;
