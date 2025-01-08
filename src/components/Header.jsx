import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md";
import tutBerryLogo from "../images/клубника 6 JPG.jpg";
import { FaTimes } from "react-icons/fa"; // Importing FaTimes icon for the close button

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import businessLogo from "../images/logo 1.png";
import { app } from "../firebase.config";
import { useLocation } from "react-router-dom";
import { TbGridDots } from "react-icons/tb";
import whatsapplogo from "../images/WhatsApp.svg.webp";
import { FaArrowRight } from "react-icons/fa";
import Translation from "../Translation/Data.json";
import TranslationToEnglish from "../Translation/TranslationToEnglish";
import { MdLanguage } from "react-icons/md";
import { ImGoogle3 } from "react-icons/im";
import { RxHamburgerMenu } from "react-icons/rx";
import whatsappIcon from "../images/WhatsApp.svg.webp";
import instagramIcon from "../images/IMG8.png";

function Header() {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const location = useLocation();
  const isItemPage = location.pathname.includes("/item"); // Assuming your item route starts with "/item"
  // provider.setCustomParameters({ prompt: "select_account" }); // This line sets the prompt option

  const [{ user, lang }, dispatch] = useStateValue();

  const [isMenu, setIsMenu] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const login = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      localStorage.setItem("user", JSON.stringify(providerData[0]));
    } else {
      setIsMenu(!isMenu);
    }
  };
  const dropDown = () => {
    setIsMenu(!isMenu);
  };

  const logout = () => {
    setIsMenu(false);
    localStorage.clear();

    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };

  return (
    <header
      style={{
        boxShadow:
          "0 4px 6px rgba(0, 0, 0, 0.1),10px 50px 50px 30px rgba(0, 0, 0, 0.08)",
        backgroundColor: "#62452C",
      }}
      className="fixed z-50 w-screen p-1 px-2 md:p-2 md:px-16 "
    >
      <div className="hidden md:flex w-full h-full items-center justify-between">
        <Link to={"/"} className="flex items-center gap-2">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/karina-super-fruits.appspot.com/o/website%20cloud%20images%2F%D0%BA%D0%BB%D1%83%D0%B1%D0%BD%D0%B8%D0%BA%D0%B0%206%20JPG.jpg?alt=media&token=b7a6b865-082b-423c-9520-343648ec162f"
            style={{
              height: "50px",
              width: "50px",

              borderRadius: "50%",
            }}
            alt=""
          />
          {/* <p className="text-headingColor text-xl font-bold"> Tut Berries</p> */}
        </Link>

        <div className="flex items-center gap-8">
          {!isItemPage && (
            <motion.ul
              initial={{ opacity: 0, x: 200 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 200 }}
              className="flex items-center gap-24 "
            >
              <motion.li
                style={{
                  color: "white",
                }}
                whileTap={{ scale: 0.75 }}
                whileHover={{ scale: 1.4 }}
                className="text-lg  hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer"
                onClick={() => {
                  setIsMenu(false);
                  const strawberriesSection =
                    document.getElementById("strawberries-home");
                  if (strawberriesSection) {
                    const yOffset = -80; // You can adjust this value to fine-tune the scroll position
                    const y =
                      strawberriesSection.getBoundingClientRect().top +
                      window.pageYOffset +
                      yOffset;
                    window.scrollTo({ top: y, behavior: "smooth" });
                  }
                }}
              >
                {lang.header?.home}
              </motion.li>
              <motion.li
                style={{
                  color: "white",
                }}
                whileTap={{ scale: 0.75 }}
                whileHover={{ scale: 1.4 }}
                className="text-lg  hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer"
                onClick={() => {
                  setIsMenu(false);
                  const strawberriesSection = document.getElementById(
                    "strawberries-section"
                  );
                  if (strawberriesSection) {
                    const yOffset = -80; // You can adjust this value to fine-tune the scroll position
                    const y =
                      strawberriesSection.getBoundingClientRect().top +
                      window.pageYOffset +
                      yOffset;
                    window.scrollTo({ top: y, behavior: "smooth" });
                  }
                }}
              >
                {lang.header?.strawberries}
              </motion.li>

              <motion.li
                style={{
                  color: "white",
                }}
                whileTap={{ scale: 0.75 }}
                whileHover={{ scale: 1.4 }}
                className="text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer"
                onClick={() => {
                  setIsMenu(false);
                  const strawberriesSection = document.getElementById(
                    "strawberries-category"
                  );
                  if (strawberriesSection) {
                    const yOffset = -80; // You can adjust this value to fine-tune the scroll position
                    const y =
                      strawberriesSection.getBoundingClientRect().top +
                      window.pageYOffset +
                      yOffset;
                    window.scrollTo({ top: y, behavior: "smooth" });
                  }
                }}
              >
                {lang.header?.categories}
              </motion.li>

              {((user && user.email === "karinaorlyanskaya1@gmail.com") ||
                (user && user.email === "danielhashai.dh@gmail.com")) && (
                <motion.div>
                  <Link to={"/createItem"}>
                    <p
                      className="px-4 py-2 flex items-center gap-3 cursor-pointer  duration-100 ease-in-out text-white text-base"
                      onClick={() => setIsMenu(false)}
                    >
                      {lang.header?.newItem} <MdAdd />
                    </p>
                  </Link>
                </motion.div>
              )}
              <motion.div
                whileTap={{ scale: 0.75 }}
                whileHover={{ scale: 1.4 }}
                transition={{ duration: 0.5 }} // Adjust the duration to your preference
              >
                <TranslationToEnglish />
              </motion.div>
            </motion.ul>
          )}
          {isItemPage && (
            <Link to={"/"} className="flex items-center gap-2">
              <FaArrowRight
                style={{ color: "white" }}
                className="text-3xl cursor-pointer"
              />
            </Link>
          )}
        </div>
      </div>

      {/* mobile */}
      <div className="flex items-center justify-between w-full h-full md:hidden">
        <div className="relative flex items-center justify-center">
          <motion.div
            whileTap={{ scale: 0.75 }}
            whileHover={{ scale: 1.2 }}
            transition={{ duration: 0.5 }}
          >
            <TranslationToEnglish />
          </motion.div>
        </div>
        <motion.div whileTap={{ scale: 0.75 }}>
          <Link to={"/"} className="flex items-center gap-2">
            <img
              style={{
                height: "50px",
                width: "50px",
                borderRadius: "50%",
              }}
              src={tutBerryLogo}
              className="w-8"
              alt="logo"
            />
          </Link>
        </motion.div>

        <div className="relative">
          <motion.div whileTap={{ scale: 0.6 }}>
            {!isItemPage ? (
              <RxHamburgerMenu
                style={{ color: "white" }}
                className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
                onClick={toggleMenu}
              />
            ) : (
              <Link to={"/"} className="flex items-center gap-2">
                <FaArrowRight
                  style={{ color: "white" }}
                  className="text-3xl cursor-pointer"
                />
              </Link>
            )}
          </motion.div>

          {menuOpen && (
            <motion.div
              style={{
                backgroundColor: "#62452C",
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-opacity-90"
            >
              <FaTimes
                className="absolute top-4 right-4 text-white text-3xl cursor-pointer"
                onClick={toggleMenu}
              />
              {((user && user.email === "karinaorlyanskaya1@gmail.com") ||
                (user && user.email === "danielhashai.dh@gmail.com")) && (
                <Link to={"/createItem"} onClick={() => setMenuOpen(false)}>
                  <p className="text-white text-2xl mb-4">
                    {lang.header?.newItem} <MdAdd />
                  </p>
                </Link>
              )}
              <ul className="flex flex-col items-center">
                <li
                  className="text-white text-2xl mb-4 cursor-pointer"
                  onClick={() => {
                    setMenuOpen(false);
                    const strawberriesSection =
                      document.getElementById("strawberries-home");
                    if (strawberriesSection) {
                      const yOffset = -80;
                      const y =
                        strawberriesSection.getBoundingClientRect().top +
                        window.pageYOffset +
                        yOffset;
                      window.scrollTo({ top: y, behavior: "smooth" });
                    }
                  }}
                >
                  {lang.header?.home}
                </li>
                <li
                  className="text-white text-2xl mb-4 cursor-pointer"
                  onClick={() => {
                    setMenuOpen(false);
                    const strawberriesSection = document.getElementById(
                      "strawberries-section"
                    );
                    if (strawberriesSection) {
                      const yOffset = -80;
                      const y =
                        strawberriesSection.getBoundingClientRect().top +
                        window.pageYOffset +
                        yOffset;
                      window.scrollTo({ top: y, behavior: "smooth" });
                    }
                  }}
                >
                  {lang.header?.strawberries}
                </li>
                <li
                  className="text-white text-2xl mb-4 cursor-pointer"
                  onClick={() => {
                    setMenuOpen(false);
                    const strawberriesSection = document.getElementById(
                      "strawberries-category"
                    );
                    if (strawberriesSection) {
                      const yOffset = -80;
                      const y =
                        strawberriesSection.getBoundingClientRect().top +
                        window.pageYOffset +
                        yOffset;
                      window.scrollTo({ top: y, behavior: "smooth" });
                    }
                  }}
                >
                  {lang.header?.categories}
                </li>
                {!user && (
                  <li
                    className="text-white text-2xl mb-4 cursor-pointer flex items-center"
                    onClick={() => {
                      setMenuOpen(false);
                      login();
                    }}
                  >
                    {lang.header?.login}
                    <ImGoogle3
                      style={{
                        color: "rgba(110, 44, 0, 1)",
                        marginLeft: "8px",
                      }}
                    />
                  </li>
                )}
              </ul>
              {user && (
                <p
                  className="text-white text-2xl mb-4 cursor-pointer flex items-center"
                  onClick={() => {
                    setMenuOpen(false);
                    logout();
                  }}
                >
                  {lang.header?.logout} &nbsp; <MdLogout />
                </p>
              )}
              <div style={{ display: "flex", gap: "5px" }}>
                <Link to="https://wa.me/message/XZ3JQHZWYXHWD1">
                  <motion.div
                    style={{
                      display: "flex",
                      padding: "5px",
                      color: "#6E2C00",
                      fontWeight: "800",
                      borderRadius: "10px",
                      cursor: "pointer",
                    }}
                  >
                    <img
                      src={whatsappIcon}
                      style={{ height: "60px", width: "60px" }}
                      alt=""
                    />
                  </motion.div>
                </Link>
                <Link to="https://www.instagram.com/karina_tut_berriess?igshid=OGQ5ZDc2ODk2ZA==">
                  <motion.div
                    style={{
                      display: "flex",
                      padding: "5px",
                      color: "#6E2C00",
                      fontWeight: "800",
                      borderRadius: "10px",
                      cursor: "pointer",
                    }}
                  >
                    <img
                      src={instagramIcon}
                      alt=""
                      style={{ height: "50px", width: "80px" }}
                    />
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
