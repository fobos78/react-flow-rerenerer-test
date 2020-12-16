import React, { useEffect } from "react";

import "./MyBody.css";

function MyBody({ setNavBg }) {
  useEffect(() => {
    setNavBg({ home: false, mybody: true });
  }, [setNavBg]);
  return (
    <>
      <div className="myBody">
        <p>
          На рисунке — схема дорог, связывающих города А, Б, В, Г, Д, Е. По
          каждой дороге можно двигаться только в одном направлении, указанном
          стрелкой. Сколько существует различных путей из города А в город Е?
        </p>

        <img src="/img/1.png" alt="" />
      </div>
    </>
  );
}

export default MyBody;
