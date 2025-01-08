import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "../../node_modules/swiper/swiper-bundle.min.css";
import { SlPresent } from "react-icons/sl";
import { useStateValue } from "../context/StateProvider";
import whatsAppIcon from "../images/WhatsApp.svg.webp";
import { MdDeliveryDining } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { getAllFoodItems, saveItem } from "../utils/firebaseFunctions";
import { GiStrawberry } from "react-icons/gi";

import {
  collection,
  doc,
  deleteDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";

import { firestore } from "../firebase.config";
import { actionType } from "../context/reducer";

function Item() {
  const { itemId } = useParams();
  const [{ foodItems, user, lang }, dispatch] = useStateValue();
  const [index, setIndex] = useState();
  const navigate = useNavigate();
  const [deleterNotification, setDeleterNotification] = useState(false);
  const [itemDeleted, setItemDeleted] = useState(false);
  useEffect(() => {
    for (let i = 0; i < foodItems?.length; i++) {
      if (foodItems[i]?.id === itemId) {
        setIndex(foodItems[i]);
      }
    }
  }, [foodItems, itemId]);

  const deleteItem = async () => {
    try {
      const itemRef = doc(firestore, "foodItems", itemId);
      await deleteDoc(itemRef);
      setItemDeleted(true);
      fetchData();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };
  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
  };
  return (
    <AnimatePresence>
      {itemDeleted && (
        <div
          style={{
            fontSize: "20px",
            textAlign: "center",
            backgroundColor: "lightgreen",
            color: "white",
          }}
          className="ml-0 md:ml-auto md:w-auto border-none outline-none bg-red-500 px-12 py-2 rounded-lg text-lg text-white font-semibold"
        >
          Item was delted
        </div>
      )}

      {!itemDeleted && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        >
            {user &&
            (user?.email === "danielhashai.dh@gmail.com" ||
              user?.email === "karinaorlyanskaya1@gmail.com") && (
              <button
                type="button"
                className="ml-0 md:ml-auto md:w-auto border-none outline-none bg-red-500 px-12 py-2 rounded-lg text-lg text-white font-semibold"
                onClick={deleteItem}
              >
                Delete Item
              </button>
            )}

          {user && (user.email === "danielhashai.dh@gmail.com" ||
            user.email === "karinaorlyanskaya1@gmail.com") && (
            <Link to={`/edit/${itemId}`}>
              <button
                type="button"
                className="ml-0 md:ml-auto md:w-auto border-none outline-none bg-blue-500 px-12 py-2 rounded-lg text-lg text-white font-semibold"
              >
                Edit Item
              </button>
            </Link>
          )}
        </div>
      )}

      {index && !itemDeleted && (
        <motion.section
          key={itemId} // Key to trigger component re-render
          initial={{ opacity: 0, rotateY: -180 }}
          animate={{ opacity: 1, rotateY: 0 }}
          exit={{ opacity: 0, rotateY: 180 }}
          transition={{ duration: 0.9 }}
          style={{
            borderRadius: "10px",
            boxShadow:
              "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 backdrop-blur "
          id="home"
        >
          <div
            style={{
              width: "100%",
              margin: "auto",
            }}
            className="flex justify-center items-center backdrop-blur-md"
          >
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              onSlideChange={() => console.log()}
              onSwiper={(swiper) => console.log(swiper)}
              style={{
                display: "flex",
                justifyContent: "center",
                borderRadius: "15px",
                boxShadow:
                  "0 4px 6px rgba(0, 0, 0, 0.1),10px 50px 50px 30px rgba(0, 0, 0, 0.08)",
              }}
            >
              <SwiperSlide>
                <img
                  src={index?.imageURL2}
                  style={{
                    width: "100%",
                    height: "380px",
                    objectFit: "cover",
                  }}
                  alt=""
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src={index?.imageURL}
                  style={{
                    width: "100%",
                    height: "380px",
                    objectFit: "cover",
                  }}
                  alt=""
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src={index?.imageURL3}
                  style={{
                    width: "100%",
                    height: "380px",
                    objectFit: "cover",
                  }}
                  alt=""
                />
              </SwiperSlide>
            </Swiper>
          </div>
          <div style={{}} className=" relative">
            <div
              style={{
                width: "100%",
              }}
              className="w-flex-wrapull w-full h-full top-0  flex items-center justify-center  py-4 gap-4 flex-wrap "
            >
              {index && (
                <div
                  style={{
                    gap: "4px",
                    height: "100%",
                    width: "100%",
                    display: "grid",
                    backgroundColor: "#62452C",
                    boxShadow:
                      "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
                  }}
                  className="  p-4  rounded-3xl flex flex-col items-center justify-center "
                >
                  <motion.div
                    // whileHover={{ scale: 1.2 }}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                      backgroundColor: "white",
                      borderRadius: "10px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                    className="px-4 py-1 "
                  >
                    <div
                      style={{
                        display: "flex",
                      }}
                    >
                      <SlPresent
                        style={{
                          color: "red",
                        }}
                        className="text-2xl"
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                        }}
                      >
                        &nbsp;&nbsp;{lang.rowContainer?.smallBox}&nbsp;
                        <span>9</span>
                        <span>x</span>
                        <GiStrawberry
                          style={{
                            height: "20px",
                            width: "20px",
                          }}
                          color="red"
                        />
                      </div>
                    </div>
                    <span
                      style={{
                        fontWeight: "800",
                      }}
                    >
                      {index.smallBox}₪
                    </span>
                  </motion.div>
                  <motion.div
                    // whileHover={{ scale: 1.2 }}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                      backgroundColor: "white",
                      borderRadius: "10px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                    className="px-4 py-1 "
                  >
                    <div
                      style={{
                        display: "flex",
                      }}
                    >
                      <SlPresent
                        style={{
                          color: "red",
                        }}
                        className="text-2xl"
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                        }}
                      >
                        &nbsp;&nbsp;{lang.rowContainer?.mediumBox}&nbsp;
                        <span>15</span>
                        <span>x</span>
                        <GiStrawberry
                          style={{
                            height: "20px",
                            width: "20px",
                          }}
                          color="red"
                        />
                      </div>
                    </div>
                    <span
                      style={{
                        fontWeight: "800",
                      }}
                    >
                      {index.mediumBox}₪
                    </span>
                  </motion.div>
                  <motion.div
                    // whileHover={{ scale: 1.2 }}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                      backgroundColor: "white",
                      borderRadius: "10px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                    className="px-4 py-1 "
                  >
                    <div
                      style={{
                        display: "flex",
                      }}
                    >
                      <SlPresent
                        style={{
                          color: "red",
                        }}
                        className="text-2xl"
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                        }}
                      >
                        &nbsp;&nbsp;{lang.rowContainer?.largeBox}&nbsp;
                        <span>20</span>
                        <span>x</span>
                        <GiStrawberry
                          style={{
                            height: "20px",
                            width: "20px",
                          }}
                          color="red"
                        />
                      </div>
                    </div>
                    <span
                      style={{
                        fontWeight: "800",
                      }}
                    >
                      {index.largeBox}₪
                    </span>
                  </motion.div>
                  <div
                    style={{
                      backgroundColor: "white",
                      borderRadius: "10px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                    className="flex items-center gap-2 justify-center px-2 "
                  >
                    <p className="text-base  font-semibold">
                      {lang.home?.topDelivery}
                    </p>
                    <div
                      style={{
                        backgroundColor: "#62452C",
                      }}
                      className="w-10 h-10 bg-white rounded-full overflow-hidden drop-shadow-xl"
                    >
                      <MdDeliveryDining
                        style={{
                          color: "white",
                        }}
                        className="w-full h-full object-contain"
                        alt="delivery"
                      />
                    </div>
                  </div>
                  <Link to="https://wa.me/message/XZ3JQHZWYXHWD1">
                    <motion.div whileTap={{ scale: 0.75 }}>
                      <img
                        className="img-animation cursor-pointer"
                        style={{
                          width: "20%",
                          margin: "auto",
                        }}
                        src="https://firebasestorage.googleapis.com/v0/b/karina-super-fruits.appspot.com/o/website%20cloud%20images%2FWhatsApp.svg.webp?alt=media&token=8e49114a-e19f-4016-91a0-df0a0f771360"
                        alt=""
                      />
                    </motion.div>
                  </Link>
                  <div style={{ textAlign: "center", color: "white" }}>
                    {lang.item.whatsapp}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}

export default Item;
