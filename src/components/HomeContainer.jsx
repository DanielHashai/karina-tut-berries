import React, { useEffect, useState } from "react";
import strawberry from "../images/strawberry.jpeg";
import leftSideImage from "../images/heroBg.png";
import { heroData } from "../utils/data";
import { MdDeliveryDining } from "react-icons/md";
import { motion } from "framer-motion";
import { DefaultPlayer as Video } from "react-html5video";
import "react-html5video/dist/styles.css";
import introStrawberryVideo from "../videos/VIDEO-2023-12-06-09-22-59.mp4";
import whatsappIcon from "../images/WhatsApp.svg.webp";
import instagramIcon from "../images/IMG8.png";
import TranslationToEnglish from "../Translation/TranslationToEnglish";
import { useStateValue } from "../context/StateProvider";
import { Link } from "react-router-dom";

function HomeContainer() {
  const [{ user, lang }, dispatch] = useStateValue();
  const [isScreenSmaller, setIsScreenSmaller] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsScreenSmaller(window.innerWidth <= 768); // Adjust the breakpoint as needed
    };

    // Initial check on mount
    handleResize();

    // Listen to window resize events
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const hoverStyles = isScreenSmaller
    ? {} // Apply no styles on smaller screens
    : {
        whileTap: { scale: 0.75 },
        whileHover: { scale: 1.4 },
        transition: { duration: 0.5 },
      };

  return (
    <motion.section
      initial={{ opacity: 0, x: 800 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 800 }}
      style={{
        boxShadow:
          "0 4px 6px rgba(0, 0, 0, 0.1),10px 50px 50px 30px rgba(0, 0, 0, 0.08)",
        padding: "5px 15px",
        borderRadius: "15px",
        textAlign: "center",
      }}
      className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full backdrop-blur-lg "
      id="strawberries-home"
    >
      <div className="py-2 flex-1 flex flex-col items-start justify-center gap-2">
        <p
          style={{
            color: "white",
            textAlign: "center",
          }}
          className="text-[2.5rem]  font-bold tracking-wide text-headingColor"
        >
          {lang.home?.topContent}
          <span className="text-orange-600 text-[3rem] md:text-[3rem]">🍓</span>
        </p>
        <p
          style={{
            color: "white",
          }}
          className="text-base text-center md:text-center"
        >
          {lang.home?.middleContent}
        </p>
        <div
          style={{
            display: "flex",
            gap: "10px",
            width: "100%",
            marginTop: "10px",
          }}
        >
          <Link to="https://wa.me/message/XZ3JQHZWYXHWD1">
            <motion.div
              {...hoverStyles}
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
              {...hoverStyles}
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
      </div>

      {!isScreenSmaller && (
        <div
          style={{ margin: "auto", overflow: "hidden" }}
          className="py-2 flex-1 flex items-center relative right-0"
        >
          <Video
            style={{
              width: "50%",
              height: "auto",
              margin: "auto",
            }}
            // autoplay={true}
            loop
          >
            <source src={introStrawberryVideo} />
          </Video>
        </div>
      )}
    </motion.section>
  );
}

export default HomeContainer;
