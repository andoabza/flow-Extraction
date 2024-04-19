import "./output.css";
import FlowGraph from "./components/flowGraph/FlowGraph";
import MenuExtraction from "./components/menu-extractor/menuExtraction"  

function App() {
  return (
    <main className="bg-gray-800 h-100">
      <div className="bg-slate-700 text-center p-3">
          <h1 className="text-2xl text-white ">React Flow Menu Extractor <span className="text-red-500">By Andamlak</span></h1>        
      </div>
      <div className="container mx-auto mt-5 rounded-lg p-2">
        <div className="text-center">
          <MenuExtraction />
        </div>
        <div className="w-full h-[30em] mb-4">
          <FlowGraph />
        </div>
      </div>
      </main>
  );
}

export default App;
