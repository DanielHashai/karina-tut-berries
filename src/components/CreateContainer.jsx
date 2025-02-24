import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  MdFastfood,
  MdCloudUpload,
  MdDelete,
  MdFoodBank,
  MdAttachMoney,
} from "react-icons/md";
import { categories } from "../utils/data";
import Loader from "./Loader";
import { getAllFoodItems, saveItem } from "../utils/firebaseFunctions";
import { useStateValue } from "../context/StateProvider";
import { SlPresent } from "react-icons/sl";

import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../firebase.config";
import { actionType } from "../context/reducer";

function CreateContainer() {
  const [title, setTitle] = useState("");
  const [largeBox, setLargeBox] = useState("");
  const [smallBox, setSmallBox] = useState("");
  const [mediumBox, setMediumBox] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [imageAsset2, setImageAsset2] = useState(null);
  const [imageAsset3, setImageAsset3] = useState(null);
  const [fields, setFields] = useState(false);
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [isLoading3, setIsLoading3] = useState(false);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [{ foodItems, lang }, dispatch] = useStateValue();
  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
        setFields(true);
        setMsg("Error while uploading : Try AGain 🙇");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageAsset(downloadURL);
          setIsLoading(false);
          setFields(true);
          setMsg("Image uploaded successfully 😊");
          setAlertStatus("success");
          setTimeout(() => {
            setFields(false);
          }, 4000);
        });
      }
    );
  };

  const uploadImage2 = (e) => {
    setIsLoading2(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);

    const uploadTask2 = uploadBytesResumable(storageRef, imageFile);

    uploadTask2.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
        setFields(true);
        setMsg("Error while uploading : Try AGain 🙇");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      },
      () => {
        getDownloadURL(uploadTask2.snapshot.ref).then((downloadURL) => {
          setImageAsset2(downloadURL);
          setIsLoading2(false);
          setFields(true);
          setMsg("Image uploaded successfully 😊");
          setAlertStatus("success");
          setTimeout(() => {
            setFields(false);
          }, 4000);
        });
      }
    );
  };
  const uploadImage3 = (e) => {
    setIsLoading3(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);

    const uploadTask3 = uploadBytesResumable(storageRef, imageFile);

    uploadTask3.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
        setFields(true);
        setMsg("Error while uploading : Try AGain 🙇");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      },
      () => {
        getDownloadURL(uploadTask3.snapshot.ref).then((downloadURL) => {
          setImageAsset3(downloadURL);
          setIsLoading3(false);
          setFields(true);
          setMsg("Image uploaded successfully 😊");
          setAlertStatus("success");
          setTimeout(() => {
            setFields(false);
          }, 4000);
        });
      }
    );
  };

  const deleteImage = () => {
    setIsLoading(true);
    const deleteRef = ref(storage, imageAsset);
    deleteObject(deleteRef).then(() => {
      setImageAsset(null);
      setIsLoading(false);
      setFields(true);
      setMsg("Image deleted successfully 😊");
      setAlertStatus("success");
      setTimeout(() => {
        setFields(false);
      }, 4000);
    });
  };
  const deleteImage2 = () => {
    setIsLoading2(true);
    const deleteRef = ref(storage, imageAsset2);
    deleteObject(deleteRef).then(() => {
      setImageAsset2(null);
      setIsLoading2(false);
      setFields(true);
      setMsg("Image deleted successfully 😊");
      setAlertStatus("success");
      setTimeout(() => {
        setFields(false);
      }, 4000);
    });
  };
  const deleteImage3 = () => {
    setIsLoading3(true);
    const deleteRef = ref(storage, imageAsset3);
    deleteObject(deleteRef).then(() => {
      setImageAsset3(null);
      setIsLoading3(false);
      setFields(true);
      setMsg("Image deleted successfully 😊");
      setAlertStatus("success");
      setTimeout(() => {
        setFields(false);
      }, 4000);
    });
  };

  const saveDetails = () => {
    // setIsLoading(true);

    try {
      if (
        !mediumBox ||
        !smallBox ||
        !largeBox ||
        !category ||
        !imageAsset ||
        !imageAsset2 ||
        !imageAsset3
      ) {
        setFields(true);
        setMsg("Required fields can't be empty");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          // setIsLoading(false);
        }, 4000);
      } else {
        const data = {
          id: `${Date.now()}`,
          title: title,
          imageURL: imageAsset,
          imageURL2: imageAsset2,
          imageURL3: imageAsset3,
          mediumBox: mediumBox,
          smallBox: smallBox,
          largeBox: largeBox,
          category: category,

          qty: 3,
          price: price,
        };
        saveItem(data);
        setIsLoading(false);
        setFields(true);
        setMsg("Data Uploaded successfully 😊");
        setAlertStatus("success");
        setTimeout(() => {
          setFields(false);
        }, 4000);
        clearData();
      }
    } catch (error) {
      console.log(error);
      setFields(true);
      setMsg("Error while uploading : Try AGain 🙇");
      setAlertStatus("danger");
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000);
    }

    fetchData();
  };

  const clearData = () => {
    setTitle("");
    setImageAsset(null);
    setImageAsset2(null);
    setImageAsset3(null);
    setSmallBox("");
    setLargeBox("");
    setMediumBox("");
    setPrice("");
    setCategory("Select Category");
  };

  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
  };
  useEffect(() => {
    fetchData();
  }, []);
  console.log(alertStatus);
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-[90%] md:w-[50%] border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-4">
        {fields && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full h-full p-2 rounded-lg text-center text-lg font-semibold ${
              alertStatus === "danger"
                ? "bg-red-400 text-red-800"
                : "bg-emerald-400 text-emerald-800"
            }`}
          >
            {msg}
          </motion.p>
        )}
        <div className="w-full">
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
          >
            <option value="other" className="bg-white">
              {lang?.createContainer?.select}
            </option>
            {categories &&
              categories.map((item) => (
                <option
                  key={item.id}
                  className="text-base border-0 outline-none capitalize bg-white text-headingColor"
                  value={item.urlParamName}
                >
                  {item.name}
                </option>
              ))}
          </select>
        </div>
        <span
          style={{
            color: "white",
          }}
        >
          {lang.rowContainer?.smallBox}
        </span>
        <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-140 cursor-pointer rounded-lg">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {!imageAsset ? (
                <>
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                      <MdCloudUpload className="text-gray-500 text-3xl hover:text-green-200" />
                      <p className="text-white hover:text-green-200">
                        Click here to upload
                      </p>
                    </div>
                    <input
                      type="file"
                      name="uploadimage"
                      accept="image/*"
                      onChange={uploadImage}
                      className="w-0 h-0"
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className="relative h-full">
                    <img
                      style={{
                        borderRadius: "10px",
                      }}
                      src={imageAsset}
                      alt="uploaded image"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md  duration-500 transition-all ease-in-out"
                      onClick={deleteImage}
                    >
                      <MdDelete className="text-white" />
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
        <span
          style={{
            color: "white",
          }}
        >
          {lang.rowContainer?.mediumBox}
        </span>
        <div className="group flex justify-center items-center  flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-140 cursor-pointer rounded-lg">
          {isLoading2 ? (
            <Loader />
          ) : (
            <>
              {!imageAsset2 ? (
                <>
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                      <MdCloudUpload className="text-gray-500 text-3xl hover:text-green-200" />
                      <p className="text-white hover:text-green-200">
                        Click here to upload
                      </p>
                    </div>
                    <input
                      type="file"
                      name="uploadimage"
                      accept="image/*"
                      onChange={uploadImage2}
                      className="w-0 h-0"
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className="relative h-full">
                    <img
                      style={{
                        borderRadius: "10px",
                      }}
                      src={imageAsset2}
                      alt="uploaded image"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md  duration-500 transition-all ease-in-out"
                      onClick={deleteImage2}
                    >
                      <MdDelete className="text-white" />
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
        <span
          style={{
            color: "white",
          }}
        >
          {lang.rowContainer?.largeBox}
        </span>
        <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-140 cursor-pointer rounded-lg">
          {isLoading3 ? (
            <Loader />
          ) : (
            <>
              {!imageAsset3 ? (
                <>
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                      <MdCloudUpload className="text-gray-500 text-3xl hover:text-green-200" />
                      <p className="text-white hover:text-green-200">
                        Click here to upload
                      </p>
                    </div>
                    <input
                      type="file"
                      name="uploadimage"
                      accept="image/*"
                      onChange={uploadImage3}
                      className="w-0 h-0"
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className="relative h-full">
                    <img
                      style={{
                        borderRadius: "10px",
                      }}
                      src={imageAsset3}
                      alt="uploaded image"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md  duration-500 transition-all ease-in-out"
                      onClick={deleteImage3}
                    >
                      <MdDelete className="text-white" />
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
        <div className="w-full flex flex-col md:flex-row items-center gap-3">
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <SlPresent color="red" className="text-1xl" />
            <input
              type="text"
              required
              value={smallBox}
              onChange={(e) => setSmallBox(e.target.value)}
              placeholder={lang.rowContainer?.smallBox}
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-white text-white"
            />
            <span
              style={{
                color: "white",
                fontSize: "25px",
              }}
            >
              ₪
            </span>
          </div>

          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <SlPresent color="red" className="text-2xl" />
            <input
              type="text"
              required
              value={mediumBox}
              onChange={(e) => setMediumBox(e.target.value)}
              placeholder={lang.rowContainer?.mediumBox}
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-white text-white"
            />
            <span
              style={{
                color: "white",
                fontSize: "25px",
              }}
            >
              ₪
            </span>
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row items-center gap-3">
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <SlPresent color="red" className="text-3xl" />
            <input
              type="text"
              required
              value={largeBox}
              onChange={(e) => setLargeBox(e.target.value)}
              placeholder={lang.rowContainer?.largeBox}
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-white text-white"
            />
            <span
              style={{
                color: "white",
                fontSize: "25px",
              }}
            >
              ₪
            </span>
          </div>
        </div>
        <div
          style={{
            width: "100%",
          }}
          className="flex items-center w-full"
        >
          <button
            style={{
              width: "100%",
            }}
            type="button"
            className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold"
            onClick={saveDetails}
          >
            {lang?.createContainer?.save}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateContainer;
