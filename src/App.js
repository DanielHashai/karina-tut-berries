import React, { useEffect } from "react";
import { CreateContainer, Header, Item, MainContainer } from "./components";
import { Routes, Route } from "react-router-dom";
import { getAllFoodItems } from "./utils/firebaseFunctions";
import { actionType } from "./context/reducer";
import { useStateValue } from "./context/StateProvider";
import EditContainer from "./components/EditContainer";

function App() {
  const [{ foodItems }, dispatch] = useStateValue();

  const fetchData = async () => {
    console.log(foodItems?.length);
    await getAllFoodItems().then((data) => {
      console.log(data);
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="w-screen h-auto flex flex-col ">
      <Header />

      <main className="mt-14 md:mt-20 px-4 md:px-16 py-1 w-full  ">
        <Routes>
          <Route path="/createItem" element={<CreateContainer />} />
          <Route path="/item/:itemId" element={<Item />} />
          <Route path="/edit/:itemId" element={<EditContainer />} />

          <Route path="*" element={<MainContainer />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
