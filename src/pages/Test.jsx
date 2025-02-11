import { useState } from "react";
import { motion } from "framer-motion"

const initialElements = [];

export default function Test() {
  const [elements, setElements] = useState(initialElements);
  const [selectedElement, setSelectedElement] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [attributes, setAttributes] = useState({ width: "", height: "", color: "" });

  const handleDragStart = (type) => {
    setSelectedElement({ type, id: `el${elements.length}`, children: [], attributes: {} });
    setShowPopup(true);
  };
  

  const handleDrop = () => {
    if (selectedElement) {
      setElements([...elements, { ...selectedElement, attributes }]);
      setShowPopup(false);
      setSelectedElement(null);
    }
  };

  const updateAttribute = (e) => {
    setAttributes({ ...attributes, [e.target.name]: e.target.value });
  };

  const renderElements = (list) => {
    return list.map((el) => (
      <div
        key={el.id}
        className="p-2 border rounded flex justify-center items-center"
        style={{ backgroundColor: el.attributes.color, width: el.attributes.width, height: el.attributes.height }}
      >
        {el.type}
      </div>
    ));
  };

  const generateXML = () => {
    return `<app>\n  <screen>\n    ${elements.map((el) => `      <${el.type} width="${el.attributes.width}" height="${el.attributes.height}" color="${el.attributes.color}" />\n`).join("")}  </screen>\n</app>`;
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className="flex space-x-2">
        {["text", "button", "input", "container", "column", "row"].map((type) => (
          <motion.div key={type} className="p-2 bg-gray-200 cursor-pointer" onClick={() => handleDragStart(type)}
            
          />
        ))}
      </div>
      <div className="w-[375px] h-[667px] mt-4 p-4 border relative" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
        <div className="flex flex-col space-y-2">{renderElements(elements)}</div>
      </div>
      <h4 className="mt-4 text-lg font-bold">Generated XML:</h4>
      <pre className="bg-gray-100 p-2 w-full max-w-md overflow-auto">{generateXML()}</pre>

      {showPopup && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 border shadow-lg">
          <label>Width: <input name="width" value={attributes.width} onChange={updateAttribute} /></label>
          <label>Height: <input name="height" value={attributes.height} onChange={updateAttribute} /></label>
          <label>Color: <input type="color" name="color" value={attributes.color} onChange={updateAttribute} /></label>
          <button onClick={handleDrop}>Save</button>
        </div>
      )}
    </div>
  );
}