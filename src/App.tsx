/**
 * Main application component with providers and routing setup
 */

import { ChakraProvider as Provider } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from './components/ui/toaster';
import AppRoutes from './routes/AppRoutes';
import { system } from './theme';

function App() {
  return (
    <Provider value={system}>
      <Router>
        <AppRoutes />
      </Router>
      <Toaster />
    </Provider>
  );
}

export default App;
