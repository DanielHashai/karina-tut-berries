import React, { useEffect, useState } from "react";
import { IoFastFood } from "react-icons/io5";
import { categories } from "../utils/data";
import { motion } from "framer-motion";
import RowContainer from "./RowContainer";
import { useStateValue } from "../context/StateProvider";
import strawberry from "../images/icons8-chocolate-48.png";
import RowContainerMenu from "./RowContainerMenu";

const MenuContainer = ({ data }) => {
  const [filter, setFilter] = useState("Mix");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [{ foodItems, lang }, dispatch] = useStateValue();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function languageGenerator(name) {
    if (name === "Dark") {
      return lang?.menuContainer?.darkChocolate;
    } else if (name === "Milk") {
      return lang?.menuContainer?.milkChocolate;
    } else if (name === "Pink") {
      return lang?.menuContainer?.pinkChocolate;
    } else if (name === "White") {
      return lang?.menuContainer?.goldChocolate;
    } else if (name === "Wine") {
      return lang?.menuContainer?.beverages;
    } else if (name === "Mix") {
      return lang?.menuContainer?.mix;
    }
  }

  return (
    <section className="w-full " id="strawberries-category">
      <div className="w-full flex flex-col items-center justify-center ">
        <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-16 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr  from-cartTotal to-cartTotal transition-all ease-in-out duration-100 mr-auto">
          {lang?.menuContainer?.topContent}
        </p>

        <div className="w-full flex items-center justify-start lg:justify-center gap-3 py-6 overflow-x-scroll scrollbar-none md:justify-center sm:justify-center scroll-smooth">
          {categories &&
            categories.map((category) => (
              <motion.div
                key={category.id}
                className={`group ${
                  filter === category.urlParamName ? "bg-cartNumBg" : "bg-card"
                } w-50 min-w-[94px] h-38 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center hover:bg-cartNumBg p-2`}
                onClick={() => {
                  setFilter(category.urlParamName);
                  console.log(category.urlParamName);
                }}
                whileTap={windowWidth > 600 ? { scale: 0.75 } : {}}
                whileHover={windowWidth > 600 ? { scale: 1.2 } : {}}
                transition={{ duration: 0.5 }}
              >
                <div
                  className={`w-10 h-10 rounded-full shadow-lg ${
                    filter === category.urlParamName
                      ? "bg-white"
                      : "bg-cartNumBg"
                  } group-hover:bg-white flex items-center justify-center`}
                >
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/karina-super-fruits.appspot.com/o/website%20cloud%20images%2Ficons8-chocolate-48.png?alt=media&token=104d7231-81d8-4209-b1bb-3a74aba4d6ea"
                    alt=""
                    className={`${
                      filter === category.urlParamName
                        ? "text-textColor"
                        : "text-white"
                    } group-hover:text-textColor text-lg`}
                  />
                  <IoFastFood
                    className={`${
                      filter === category.urlParamName
                        ? "text-textColor"
                        : "text-white"
                    } group-hover:text-textColor text-lg`}
                  />
                </div>
                <p
                  className={`text-sm ${
                    filter === category.urlParamName
                      ? "text-white"
                      : "text-textColor"
                  } group-hover:text-white`}
                >
                  {languageGenerator(category.name)}
                </p>
              </motion.div>
            ))}
        </div>

        <div
          style={{
            
          }}
          className="w-full  scrollbar-none"
        >
          <RowContainerMenu
            style={{
              height: "100%",
              overflow: "auto",
              
            }}
            flag={false}
            data={foodItems?.filter((n) => n.category == filter)}
          />
        </div>
      </div>
    </section>
  );
};

export default MenuContainer;
