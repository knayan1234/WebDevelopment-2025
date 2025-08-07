import { useState } from "react";
export default function App() {
  const [toggle, setToggle] = useState({
    HTML: false,
    CSS: false,
    JS: false,
  });

  const handleToggle = (key) => {
    setToggle((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));

    /**
      State in React is immutable. You should never directly modify the existing state—instead, always create and set a new object.
      React doesn’t care about the contents of your state — it watches the reference.
      For booleans and other primitives, new values = new reference ✅
      For objects/arrays, you must create a new copy for React to detect a change ✅
     */
  };

  return (
    <div>
      <div>
        <div onClick={() => handleToggle("HTML")} style={{ cursor: "pointer" }}>
          HTML
        </div>
        {!toggle.HTML && (
          <div>
            The HyperText Markup Language or HTML is the standard markup
            language for documents designed to be displayed in a web browser.
          </div>
        )}
      </div>
      <div>
        <div onClick={() => handleToggle("CSS")} style={{ cursor: "pointer" }}>
          CSS
        </div>
        {!toggle.CSS && (
          <div>
            Cascading Style Sheets is a style sheet language used for describing
            the presentation of a document written in a markup language such as
            HTML or XML.
          </div>
        )}
      </div>
      <div>
        <div onClick={() => handleToggle("JS")} style={{ cursor: "pointer" }}>
          JavaScript
        </div>
        {!toggle.JS && (
          <div>
            JavaScript, often abbreviated as JS, is a programming language that
            is one of the core technologies of the World Wide Web, alongside
            HTML and CSS.
          </div>
        )}
      </div>
    </div>
  );
}
