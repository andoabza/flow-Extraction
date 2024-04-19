import React, { useCallback, useEffect, useState, Dispatch, SetStateAction } from "react";
/* tailwind css disabling the react flow components using custom css. */
import "reactflow/dist/style.css";
import "./style.css";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Edge,
  Node,
  Connection,
  OnNodesChange,
  OnEdgesChange,
} from "reactflow";

/* 
InitialNode: initial node 

@params id: string
@params position: x: number, y: number
@params data: label: string
*/
type InitialNode = {
  id: string;
  position: { x: number; y: number };
  data: { label: string };
};

/* 
NodeType: type of node

@ id:params string
@ data:params label: string
@ style:params backgroundColor: string
*/
type NodeType = {
  id: string;
  data: {
    label: string;
  };
  style: {
    backgroundColor: string;
  };
};

/*
Update: update node
@params selectedId: string
@params node: NodeType[]
@params setNodes: React.Dispatch<React.SetStateAction<NodeType[]>>
*/

type Update = {
  selectedId: string;
  node: NodeType[];
  setNodes: React.Dispatch<React.SetStateAction<NodeType[]>>;
};

/* 
UpdateNode:  a functional component to update the node 
@params selectedId: string
*/

const UpdateNode: React.FC<Update> = ({
  selectedId,
  node,
  setNodes,
}) => {
  const [nodeName, setNodeName] = useState("");
  const [nodeBg, setNodeBg] = useState("");
  const [allow, setAllow] = useState(false);

  useEffect(() => {
    if (!allow) return;

    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedId) {

          return {
            ...node,
            data: {
              ...node.data,
              label: nodeName,
            },
            style: {
              ...node.style,
              backgroundColor: nodeBg,
            },
          };
        }
        return node;
      })
    );
  }, [selectedId, nodeName, nodeBg, allow, setNodes]);

  return (
    <div className="controls">
      <label>Node Name:</label>
      <input className="text" placeholder="enter node name"
        onInput={(e) => setNodeName(e.currentTarget.value)}
      />

      <label className="label">Node Background:</label>
      <input className="text" placeholder="enter background" onChange={(e) => setNodeBg(e.currentTarget.value)} />

      <div className="checkboxwrapper">
        
      <label>
          Update
        </label>
        <input className="checkbox"
          type="checkbox"
          checked={allow}
          onChange={(e) => setAllow(e.target.checked)}
        />
      </div>
    </div>
  );
};

/* 
InitialEdge: initial edge
@params id: string
@params source: string
@params target: string
@params animated: boolean
*/

const initialNodes: InitialNode[] = [
  { id: "1", position: { x: 300, y: 100 }, data: { label: "Node-1" } },
  { id: "2", position: { x: 250, y: 300 }, data: { label: "Node-2" } },
];

/*
InitialEdge: initial edge
@params id: string
@params source: string
@params target: string
@params animated: boolean
*/

type InitialEdge = {
  id: string;
  source: string;
  target: string;
  animated: boolean;
};

const initialEdges: InitialEdge[] = [
  { id: "e1", source: "1", target: "2", animated: true },
];


/*
FlowGraph: a functional component to create a flow graph
*/

const FlowGraph: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNodeId, setSelectedNodeId] = useState<string>("");
  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const AddNode = useCallback(() => {
    
    const newId = `${nodes.length + 1}`;
    
    const newNode = {
      id: newId,
      position: {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
      },
      data: { label: `Node- ${newId}` },
    };
    setNodes((nodes) => nodes.concat(newNode));
  }, [nodes, setNodes]);
  const onSelect = useCallback((nodeId: string) => {
    setSelectedNodeId(nodeId);
  }, []);

  const DeleteNode = useCallback(
    (nodeId: string) => {
      setNodes((nodes) => nodes.filter((node) => node.id !== nodeId));
      setEdges((node) =>
        node.filter((x) => x.source !== nodeId && x.target !== nodeId)
      );
    },
    [setNodes, setEdges]
  );

  
  const DuplicateNode = useCallback(
    (nodeId: string) => {
      const duplicateId = nodes.find((node) => node.id === nodeId);
      if (duplicateId) {
        const newId = (nodes.length + 1).toString();
        const newNode = {
          ...duplicateId,
          id: newId,
          position: {
            ...duplicateId.position,
            x: duplicateId.position.x + 250,
          },
        };
        setNodes((nodes) => nodes.concat(newNode));
      }
    },
    [nodes, setNodes]
  );

  return (
    <div className="container">
      <ReactFlow
        nodes={nodes as Node[]}
        edges={edges as Edge[]}
        onNodesChange={onNodesChange as OnNodesChange}
        onEdgesChange={onEdgesChange as OnEdgesChange}
        onConnect={onConnect}
        onSelectionChange={(arg) => {

          const Nodes = arg.nodes as Node[] | undefined;
          if (Nodes && Nodes.length === 1) {
            onSelect(Nodes[0].id);
          } else {
            setSelectedNodeId(' ');
          }
        }}
      >
        <div className="button-container">
          <button onClick={AddNode}>Add Node</button>
          <button onClick={() => DeleteNode(selectedNodeId)}>
            Delete Node
          </button>
          <button onClick={() => DuplicateNode(selectedNodeId)}>
            Duplicate Node
          </button>
        </div>
        <UpdateNode
          selectedId={selectedNodeId ?? ""}
          node={nodes as NodeType[]}
          setNodes={setNodes as Dispatch<SetStateAction<NodeType[]>>}
        />
        <Controls />
        <MiniMap />
        <Background variant={"dots" as any} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};

export default FlowGraph;

