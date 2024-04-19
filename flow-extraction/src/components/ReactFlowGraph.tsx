import { useState } from 'react';
import React from 'react';
import removeElements from 'react-flow-renderer';
import ReactFlow, {
  addEdge,
  Controls,
  MiniMap,
  Background,
} from 'reactflow';
// react flow canvas for visualizing and interaction of extracted items.
const ReactFlowGraph = () => {
  const [elements, setElements] = useState<any>(); 
  const onElementsRemove = (elementsToRemove: any) =>
    setElements((els: any) => removeElements(elementsToRemove, els));
  const onConnect = (params: any) => setElements((els: any) => addEdge(params, els));
  return (
    <div style={{ height: 300, border: '1px solid #e0e0e0' }}>
      <ReactFlow
        elements={elements}
        onElementsRemove={onElementsRemove}
        onConnect={onConnect}
        deleteKeyCode={46}
      >
        <Controls />
        <MiniMap />
        <Background />
      </ReactFlow>
    </div>
  );
};
export default ReactFlowGraph;