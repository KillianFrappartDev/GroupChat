import React from 'react';

// Local Imports
import AppView from './views/AppView/index';
import AuthView from './views/AuthView/index';
import Modal from './components/Shared/Modal/index';

const App: React.FC = () => {
  return (
    <>
      <AppView />
      <Modal backClick={() => console.log('Clicked')} />
    </>
  );
};

export default App;
