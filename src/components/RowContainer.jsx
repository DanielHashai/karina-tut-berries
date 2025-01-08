import React, { useEffect, useRef, useState } from "react";
import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";
import NotFound from "../img/NotFound.svg";
import { FaEye } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import whatsAppIcon from "../images/WhatsApp.svg.webp";
import TranslationToEnglish from "../Translation/TranslationToEnglish";

import { useStateValue } from "../context/StateProvider";
const RowContainer = ({ flag, data, scrollValue }) => {
  const rowContainer = useRef();
  const [{ lang }, dispatch] = useStateValue();
  const [items, setItems] = useState([]);

  useEffect(() => {
    rowContainer.current.scrollLeft += scrollValue;
  }, [scrollValue]);

  return (
    <div
      ref={rowContainer}
      className={`w-full flex items-center gap-3  my-12 scroll-smooth  ${
        flag
          ? "overflow-x-scroll scrollbar-none"
          : "overflow-x-hidden flex-wrap justify-center"
      }`}
    >
      {data && data.length > 0 ? (
        data.map((item) => (
          <div
            key={item?.id}
            className="w-275 h-[185px] min-w-[275px] md:w-300 md:min-w-[300px]   rounded-lg py-2 px-4  my-12  flex flex-col items-center justify-evenly relative"
          >
            <div
              style={{ gap: "10px" }}
              className="w-full flex items-center justify-between "
            >
              <motion.div
                style={{ marginBottom: "15px" }}
                className="w-60 h-40 -mt-2 "
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.75 }}
                transition={{ duration: 0.5 }} // Adjust the duration to your preference
              >
                <Link to={`/item/${item?.id}`}>
                  <img
                    src={item?.imageURL2}
                    alt=""
                    className="w-full h-full object-cover"
                    style={{ borderRadius: "15px" }}
                  />
                </Link>
              </motion.div>
            </div>

            <div className="w-full flex flex-col items-center justify-end -mt-4  ">
              <p className="text-textColor font-semibold text-base md:text-lg ">
                {item?.title}
              </p>
              <div className="flex items-center gap-8 backdrop-blur-lg">
                <p
                  style={{ color: "white" }}
                  className="text-md text-headingColor font-semibold "
                >
                  {lang.rowContainer?.smallBox} {item?.smallBox}
                  <span style={{ color: "white" }} className="text-sm ">
                    ₪
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-8 backdrop-blur-lg">
                <p
                  style={{ color: "white" }}
                  className="text-md text-headingColor font-semibold"
                >
                  {lang.rowContainer?.mediumBox} {item?.mediumBox}
                  <span style={{ color: "white" }} className="text-sm ">
                    ₪
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-8 backdrop-blur-lg">
                <p
                  style={{ color: "white" }}
                  className="text-md text-headingColor font-semibold"
                >
                  {lang.rowContainer?.largeBox} {item?.largeBox}
                  <span style={{ color: "white" }} className="text-sm ">
                    ₪
                  </span>
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full flex flex-col items-center justify-center">
          <img src={NotFound} className="h-340" />
          <p className="text-xl text-headingColor font-semibold my-2">
            Items Not Available
          </p>
        </div>
      )}
    </div>
  );
};

export default RowContainer;
