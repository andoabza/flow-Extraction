import React from 'react';
import ReactFlowGraph from './components/ReactFlowGraph';
import MenuExtraction from './components/MenuExtraction';

const App: React.FC = () => {
  return (
    <div>
      <MenuExtraction />
      <ReactFlowGraph />
    </div>
  );
};

export default App;