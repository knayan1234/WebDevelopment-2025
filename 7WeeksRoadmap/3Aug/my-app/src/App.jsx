import Accordion from "./component/Accordion";

//sample data
const items = [
  {
    id: "item-1",
    title: "First Question",
    content: "This is the answer to the first question.",
  },
  {
    id: "item-2",
    title: "Second Question",
    content: "This is the answer to the second question.",
  },
];

const App = () => {
  return (
    <div>
      <h1>Simple Accordion</h1>
      <Accordion>
        {/* render prop or function as a children  */}
        {/* here we are only defining a function , not running it and passing it as children to accordion componenent,It is just being passed along as a variable. */}
        {({ openItemId, toggleItem }) => (
          <div>
            {items.map((item) => {
              const isOpen = item.id === openItemId;
              return (
                <div key={item.id}>
                  <div
                    onClick={() => toggleItem(item.id)}
                    style={{
                      cursor: "pointer",
                      fontWeight: "bold",
                      padding: "10px",
                      border: "1px solid black",
                    }}
                  >
                    {item.title}
                  </div>
                  {isOpen && (
                    <div
                      style={{
                        padding: "10px",
                        border: "1px solid black",
                        borderTop: "none",
                      }}
                    >
                      {item.content}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </Accordion>
    </div>
  );
};

export default App;
