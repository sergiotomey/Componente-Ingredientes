import PropTypes from "prop-types";
import { useState } from "react";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";

function TablaIngredientes({ cartArray, updateArray, ingredients }) {
  const [selectedIngredient, setSelectedIngredient] = useState("");

  const convertToNumber = (priceStr) => {
    return parseFloat(priceStr.replace(/[$,]/g, "").replace(",", "."));
  };

  const handleAmountChange = (id, newAmount) => {
    if (newAmount < 0) return;
    if (isNaN(newAmount)) {
      newAmount = 0;
    }
    const updatedCartArray = cartArray.map((ingredient) =>
      ingredient.id === id ? { ...ingredient, amount: newAmount } : ingredient
    );
    updateArray(updatedCartArray);
  };

  const handleRemoveIngredient = (id) => {
    const updatedCartArray = cartArray.filter((item) => item.id !== id);
    updateArray(updatedCartArray);
  };

  const handleAddIngredient = () => {
    const ingredientToAdd = ingredients.find(
      (ingredient) => ingredient.id === selectedIngredient
    );
    if (ingredientToAdd) {
      const updatedCartArray = [
        ...cartArray,
        { ...ingredientToAdd, amount: 1 },
      ];
      updateArray(updatedCartArray);
    }
    setSelectedIngredient("");
  };

  const totalPrice = cartArray.reduce(
    (total, ingredient) =>
      total + convertToNumber(ingredient.precio) * ingredient.amount,
    0
  );

  return (
    <div className="flex flex-col lg:flex-row p-5 space-y-5 lg:space-y-0 lg:space-x-5">
      <div className="flex-1 bg-white shadow-md rounded-lg p-4">
        <label
          htmlFor="ingredient"
          className="block text-sm font-semibold mb-2"
        >
          Ingredientes:
        </label>
        <div className="flex items-center space-x-2">
          <select
            id="ingredient"
            name="ingredient"
            value={selectedIngredient}
            onChange={(e) => setSelectedIngredient(e.target.value)}
            className="border border-gray-300 rounded-md p-2"
          >
            <option value="">Selecciona un ingrediente</option>
            {ingredients.map((ingredient) => (
              <option key={ingredient.id} value={ingredient.id}>
                {ingredient.nombre}
              </option>
            ))}
          </select>
          <button
            onClick={handleAddIngredient}
            disabled={!selectedIngredient}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
          >
            Agregar Ingrediente
          </button>
        </div>
      </div>

      <ul className="flex-1 bg-white shadow-md rounded-lg border border-gray-200 p-4 space-y-3">
        {cartArray.map((ingredient) => (
          <li
            className="flex items-center justify-between p-3 border border-gray-200 rounded-md shadow-sm"
            key={ingredient.id}
          >
            <div className="flex items-center space-x-3">
              <span className="font-medium">{ingredient.nombre}</span>
              <button
                onClick={() => handleRemoveIngredient(ingredient.id)}
                className="text-red-500 hover:text-red-600"
                aria-label={`Remove ${ingredient.nombre}`}
              >
                <FaTrash />
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() =>
                  handleAmountChange(ingredient.id, ingredient.amount + 1)
                }
                className="text-green-500 hover:text-green-600"
                aria-label={`Increase amount of ${ingredient.nombre}`}
              >
                <FaPlus />
              </button>
              <input
                type="number"
                value={ingredient.amount}
                onChange={(e) =>
                  handleAmountChange(ingredient.id, parseFloat(e.target.value))
                }
                step="0.01"
                min="0.01"
                className="w-24 text-sm text-center border border-gray-300 rounded-md p-1"
                aria-label={`Amount of ${ingredient.nombre}`}
              />
              <button
                onClick={() =>
                  handleAmountChange(ingredient.id, ingredient.amount - 1)
                }
                disabled={ingredient.amount <= 0.01}
                className="text-red-500 hover:text-red-600 disabled:opacity-50"
                aria-label={`Decrease amount of ${ingredient.nombre}`}
              >
                <FaMinus />
              </button>
              <span>{ingredient.unidad}</span>
              <span className="font-bold">
                $
                {(
                  convertToNumber(ingredient.precio) * ingredient.amount
                ).toFixed(2)}
              </span>
            </div>
          </li>
        ))}
        <div className="flex-none bg-white shadow-md rounded-lg p-4 text-center">
          <h1 className="text-lg font-bold mt-3">
            Total: ${totalPrice.toFixed(2)}
          </h1>
        </div>
      </ul>
    </div>
  );
}

TablaIngredientes.propTypes = {
  cartArray: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      nombre: PropTypes.string.isRequired,
      unidad: PropTypes.string.isRequired,
      precio: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
    })
  ).isRequired,
  updateArray: PropTypes.func.isRequired,
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      nombre: PropTypes.string.isRequired,
      unidad: PropTypes.string.isRequired,
      precio: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default TablaIngredientes;
