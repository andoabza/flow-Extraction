import React, { useState } from 'react';

const MenuExtraction: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [extractedItems, setExtractedItems] = useState<string[]>([]);
 
  const extractMenuItems = () => {
     const regex = /^\d+\. .+$/gm;
     const matches = inputText.match(regex);
     if (matches) {
       setExtractedItems(matches);
     } else {
       setExtractedItems(['No valid menu items found']);
     }
  };
 
  return (
     <div>
       <textarea
         value={inputText}
         onChange={(e) => setInputText(e.target.value)}
         placeholder="Paste text containing potential menu structures here..."
       />
       <button onClick={extractMenuItems}>Extract</button>
       <div>
         {extractedItems.map((item, index) => (
           <p key={index}>{item}</p>
         ))}
       </div>
     </div>
  );
 };
 
export default MenuExtraction;