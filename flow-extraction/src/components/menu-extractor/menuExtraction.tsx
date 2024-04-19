import React, { useState, useEffect} from "react";
import "../../output.css";

/*
MenuExtractor: functional component
*/

const MenuExtractor: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [extractedMenu, setExtractedMenu] = useState<string[]>([]);
  
  useEffect(() => {
    document.title = "Menu Extractor";
    }, []);

  const extractHandler = () => {
    const regex = /\b\d+\.\s*(\w+\s*)+/g;
    const items = input.split("\n");
    const extractedItems: any = [];

    items.forEach((item) => {
      const text = item.match(regex);
      if (text && text.length > 0) {
        extractedItems.push(text[0]);
      }
    });
    
    if (extractedItems.length > 0) {
      setExtractedMenu(extractedItems);
    } else {
      setExtractedMenu([]);
      setInput(' ');
    }
  };
extractedMenu.sort();

  return (
    <main className="overflow-hidden">
      <div className="p-3 mx-auto">
      <p className="m-2 text-white text-center text-md">
          Enter each item on a new line in the format!.
        </p>

        <textarea
          className="mt-3 mx-auto max-sm:w-60 w-96 h-40 p-2 bg-gray-800 text-white border-2 border-gray-600 rounded-md"
          placeholder="enter menu items here..."
          value={input}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>): void =>
            setInput(e.currentTarget.value)
          }
        />
                <button className="p-2 block mx-auto border-2 text-cyan-300 rounded-md hover:bg-slate-600" onClick={extractHandler}>
          Extract
        </button>
        {input === ' ' ? (
          <p className="text-slate-500 m-2">No valid menu items found</p>
        ) : extractedMenu.length > 0 &&(
          <div className="flex justify-center m-2 font-mono">
          <div className="container border-gray-600 rounded-lg w-[23em] p-2 text-center border-2">
            {(
              <p
                className="text-center text-md font-bold m-2 underline text-cyan-300"
              >
                Extracted Items!
              </p>
            )}

            {extractedMenu.map((value: string, index: number) => (
              <p className="text-white text-left p-1" key={index}>{value}</p>
            ))}
          </div>
          </div>
        )}
      </div>
      </main>
  );
};

export default MenuExtractor;
