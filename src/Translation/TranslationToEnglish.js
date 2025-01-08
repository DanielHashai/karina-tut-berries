import React, { useEffect, useState } from "react";
import Translation from "./Data.json";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

function TranslationToEnglish() {
  const [language, setLanguage] = useState(
    localStorage.getItem("language") !== null
      ? localStorage.getItem("language")
      : "ENG"
  );
  const [content, setContent] = useState({});
  let [{ user, lang }, dispatch] = useStateValue();

  useEffect(() => {
    if (language === "ENG") {
      setContent(Translation.english);
      lang = Translation.english;
      dispatch({
        type: actionType.SET_CART_SHOW,
        lang: Translation.english,
      });
      localStorage.setItem("language", "ENG");
    } else if (language === "RUS") {
      setContent(Translation.russian);
      lang = Translation.russian;
      dispatch({
        type: actionType.SET_CART_SHOW,
        lang: Translation.russian,
      });
      localStorage.setItem("language", "RUS");
    } else if (language === "HEB") {
      setContent(Translation.hebrew);
      lang = Translation.hebrew;
      dispatch({
        type: actionType.SET_CART_SHOW,
        lang: Translation.hebrew,
      });
      localStorage.setItem("language", "HEB");
    }
  }, [language]);
  return (
    <div>
      <select
        style={{
          borderRadius: "10px",
          // border: "2px dotted ",
          backgroundColor: "transparent",
          outline: "none",
          color: "white",
          // boxShadow:
          //   "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
          cursor: "pointer",
          fontSize: "15px",
        }}
        value={language}
        onChange={(e) => {
          setLanguage(e.target.value);
        }}
      >
        <option>ENG</option>
        <option>RUS</option>
        <option>HEB</option>
      </select>
    </div>
  );
}

export default TranslationToEnglish;
