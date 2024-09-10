import { useState, useEffect } from "react";
import TablaIngredientes from "./Component/TablaIngredientes";

function App() {
  const [cartArray, setCartArray] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    fetch("src/ingredientes.json")
      .then((response) => response.json())
      .then((data) => setIngredients(data.ingredientes))
      .catch((error) => console.error("Error fetching ingredients:", error));
  }, []);

  const updateArray = (newArray) => {
    setCartArray(newArray);
  };

  return (
    <div className="App">
      <TablaIngredientes
        cartArray={cartArray}
        updateArray={updateArray}
        ingredients={ingredients}
      />
    </div>
  );
}

export default App;
