import React, { useEffect, useState } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  removeElements,
} from "react-flow-renderer";

import "./Home.css";

const initialElements = [
  { id: "1", type: "input", data: { label: "А" }, position: { x: 0, y: 0 } },
  { id: "2", data: { label: "Г" }, position: { x: 50, y: 50 } },
  {
    id: "3",
    type: "output", // выходной узел
    data: { label: "Е" },
    position: { x: 100, y: 100 },
  },
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "2", target: "3" },
];

const MindNode = ({ setNavBg }) => {
  useEffect(() => {
    setNavBg({ home: true, mybody: false });
  }, [setNavBg]);

  const [elements, setElements] = useState(initialElements);
  const [elementClick, setElementClick] = useState("А");//выбраный элемент
  const [quantityEdgeOut, setQuantityEdgeOut] = useState([]); // исходящии ребра
  const [quantityEdgeIn, setQuantityEdgeIn] = useState([]); // входящие ребра
  const [quantityWays, setQuantityWays] = useState(0); // количество возможных путей
  const [name, setName] = useState("");
  function addNode() { // добавление нового узла (города)
    console.log(name);
    setElements((prev) => 
      prev.concat({
        id: (prev.length + 1).toString(),
        data: { label: `${name}` },
        position: {
          x: window.innerWidth/4,
          y: window.innerHeight/4,
        },
      })
    );
    setName("");
  }
  const onElementClick = (event, element) => {
    console.log("element", element);
    let count = 0;

    function quant(arr) { // рекурсия производит подсчет ребер определенного узла
      arr.forEach((el) => {
        if (el.source === "1") {
          count++;
        } else {
          const node = elements.find((item) => item.id === el.source);
          const arrQuantityEdgeIn = elements.filter(
            (el) => el.target === node.id
          );
          quant(arrQuantityEdgeIn); // передаем массив входящих ребер предедущего узла
        }
      });
      return count;
    }

    setElementClick(
      element.data
        ? element.data.label
        : `${element.source} - ${element.target}`
    );
    const arrQuantityEdgeOut = elements.filter(
      (el) => el.source === element.id
    );
    const arrQuantityEdgeIn = elements.filter((el) => el.target === element.id);
    setQuantityEdgeOut(arrQuantityEdgeOut);
    setQuantityEdgeIn(arrQuantityEdgeIn);
    if (element.type === "input") {
      setQuantityWays(count);
    } else {
      setQuantityWays(quant(arrQuantityEdgeIn));
    }
  };
  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));
  const onLoad = (reactFlowInstsnce) => {
    reactFlowInstsnce.fitView();
    console.log("reactFlowInstsnce", reactFlowInstsnce);
  };
  const onConnect = (params) => {
    setElements((e) => addEdge(params, e));
    console.log("params", params);
  };
  return (
    <>
      <div className="main-wrapper">
        <div className="wrap1">
          <ReactFlow
            deleteKeyCode={46}
            elements={elements}
            onLoad={onLoad}
            style={{ width: "100%", height: 600 }}
            onElementsRemove={onElementsRemove}
            onElementClick={onElementClick}
            onConnect={onConnect}
            connectionLineStyle={{ stroke: "#ddd", strokeWidth: 2 }}
            connectionLineType="bazier"
            snapToGrid={true}
            snapGrid={[16, 16]}
          >
            <Background color="red" gap={16} />
            <MiniMap
              nodeColor={(n) => {
                if (n.type === "input") return "red";
                return "blue";
              }}
            />
            <Controls />
          </ReactFlow>
          <div className="wrap-input">
            <span>
              Введите город{' '}
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                name="title"
              />
              <button type="button" onClick={addNode}>
                Добавить
              </button>
            </span>
          </div>
        </div>
        <div className="wrap2">
          <h3>Вы выбрали город {elementClick}</h3>
          <h3>Количество исходящих ребер {quantityEdgeOut.length}</h3>
          <h3>Количество входящих ребер {quantityEdgeIn.length}</h3>
          <h3>Количество возможных путей {quantityWays}</h3>
        </div>
      </div>
    </>
  );
};

export default MindNode;
