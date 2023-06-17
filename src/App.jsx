import React from 'react';
import { AppProvider } from './context/AppContext';
import TabComponent from './pages/TabComponent/TabComponent';

export default function App() {
  return (
    <AppProvider>
      <TabComponent />
    </AppProvider>
  );
}
