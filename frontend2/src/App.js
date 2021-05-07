import React from 'react';

import RootContainer from './containers/RootContainer'
import {AuthProvider} from './contexts/AuthContext'

import './App.css';

function App() {
  return (
    <AuthProvider>
      <RootContainer />
    </AuthProvider>
  );
}

export default App;
