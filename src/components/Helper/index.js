import React, { useEffect, useState } from "react";
import { bounce, pulse, jello, bounceInDown } from "react-animations";
import styled, { keyframes } from "styled-components";

import "./Helper.css";

const FadeInDown = styled.div`
  animation: 0.6s ${keyframes`${bounceInDown}`};
`;

const Bounce = styled.div`
  animation: 2s ${keyframes`${pulse}`} infinite;
`;

function Helper() {
  const [flagHelper, setFlagHelper] = useState(true);
  const [addAnswer, setAddAnswer] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    setTimeout(() => {
        // console.log('test');
        setFlagHelper(false);
    }, 5000);
  }, []);

  return (
    <>
      {flagHelper ? (
        <div className="helper">
          <p className="helper_p" onClick={() => setFlagHelper(false)}>
            Помогатор{"  "}&#9650;
          </p>
        </div>
      ) : (
        <FadeInDown>
          <div className="helper_fixed">
            <p
              className="helper_fixed_p"
              onClick={() => {
                setFlagHelper(true);
                setAddAnswer(false);
              }}
            >
              Помогатор{"  "}&#9660;
            </p>
            <div className="helper_fixed_info">
              <label htmlFor="quest">
                <span>
                  <Bounce>&#9731;</Bounce>
                  <p className="helper_quest_p">
                    {" "}
                    Добрый день. Задайте Ваш вопрос:
                  </p>
                </span>
                <input
                  name="quest"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </label>
              <button
                type="button"
                onClick={() => {
                  setAddAnswer(true);
                  setName("");
                }}
              >
                Отправить
              </button>
              {addAnswer && (
                <p className="helper_quest_p">
                  Ваш вопрос отпаравлен в поддержку
                </p>
              )}
            </div>
          </div>
        </FadeInDown>
      )}
    </>
  );
}

export default Helper;
