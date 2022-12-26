import { upload } from '@testing-library/user-event/dist/upload';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React from 'react'
import { setIsLoading, useState,useStateValue } from 'react';
import { motion } from "framer-motion";
import { MdFastfood ,MdCloudUpload , MdDelete  ,MdAttachMoney} from 'react-icons/md';
import { storage } from '../firebase.config';
import {categories} from '../utils/data'
import { getAllFoodItems, saveItem } from '../utils/firebasefunction';
import Loader from './Loader';
import { actionType } from '../context/reducer';



const CreateContainer =  () => {

const [title, setTitle] = useState("");
const [calories, setcalories] = useState("");
const [price, setprice] = useState("");
const [category, setcategory] = useState(null);
const [imageAsset, setImageAsset] = useState(null)
const [fields, setfields] = useState(false);
const [alertStatus, setalertStatus] = useState("danger");
const [msg, setmsg] = useState(null);
const [isLoading, setIsLoading] = useState(false);
const [{foodItems}, dispatch] = useStateValue();


const uploadimage = (e) => {
  setIsLoading(true);
  const imageFile = e.target.files[0];
  const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`)
  const uploadTask = uploadBytesResumable(storageRef, imageFile);


  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    },
  (error) => {
    console.log(error);
    setfields(true);
    setmsg('Error while uploading : Try Again ');
    setalertStatus('danger');
    setTimeout(() => {
      setfields(false);
      setIsLoading(false);
    }, 4000);
  }, 
  () => {
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
       setImageAsset(downloadURL);
       setIsLoading(false);
       setfields(true);
       setmsg('Image uploaded successfully');
       setalertStatus('success');
      setTimeout(()=> {
        setfields(false);
     }, 4000);
    });
  }

 

  )
};

const deleteImage = () => {
  setIsLoading(true);
  const deletRef = ref(storage, imageAsset);
  deleteObject(deletRef).then(() => {
    setImageAsset(null);
    setIsLoading(false);
    setfields(true);
      setmsg("Image deleted sucessfully ");
      setalertStatus("success");
      setTimeout(()=>{
        setfields(false)
      },4000);
  })
}

const saveDetails = () => {
  setIsLoading(true);
  try{
    if((!title || !calories || !imageAsset || !price || !category)){
      
      setfields(true);
      setmsg('Required field cant be empty ');
      setalertStatus('danger');
      setTimeout(() => {
        setfields(false);
        setIsLoading(false);
      }, 4000);
    }else{
      const data = {
        id: '$(Date.now())',
        title :title,
        imageURL :imageAsset,
        category : category,
        qty : 1,
        price : price
      }
      saveItem(data)
      setIsLoading(false);
      setfields(true);
      setmsg("Data Uploaded sucessfully ");
      clearData();
      setalertStatus("success");
      setTimeout(()=>{
        setfields(false)
        
      },4000);
    }

  } catch(error){
    console.log(error);
    setfields(true);
    setmsg('Error while uploading : Try Again ');
    setalertStatus('danger');
    setTimeout(() => {
      setfields(false);
      setIsLoading(false);
    }, 4000);
  }
};

const clearData = () => {
  setTitle("");
  setImageAsset();
  setcalories("");
  setprice("");
  setcalories("Select Category")
};

const fetchData = async () => {
  await getAllFoodItems().then((data) => {
    dispatch({
      type : actionType.SET_FOOD_ITEMS,
      foodItems : data,
    })
  });
};


  return (
    <div className='w-full min-h-screen flex items-center justify-center'>

      <div className='w-[90%] md:w-[75%] border border-gray-300 rounded-lg p-4
      flex flex-col items-center justify-center gap-2'>
       {fields && (
          <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${
            alertStatus === "danger"
              ? "bg-red-400 text-red-800"
              : "bg-emerald-400 text-emerald-800"
          }`}
        >
          {msg}
        </motion.p>
        )}

          <div className='w-full py-2 border-b border-gray-300 flex
          items-center gap-2'>
            <MdFastfood className='text-xl text-gray-700'/>
            <input 
              type="text" 
              required 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              placeholder='Give me a title'
              className='w-full h-full text-lg bg-transparent 
              outline-none border-none placeholder:text-gray-400
              text-textColor'/>
          </div>
          <div className='w-full'>
            <select onChange={(e)=> setcategory(e.target.value)} 
            className="outline-none w-full text-base border-b-2
            border-gray-200 p-2 rounded-md cursor-pointer
            "
            >
              <option value="other" className='bg-white'>
                Select Category
                </option>
              {categories && 
              categories.map((item) => (
                <option key={item.id} className="text-base-border-0 
                outline-none capitalize bg-white text-headingColor"
                value={item.urlParaName}
                >
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div className='group flex justify-center items-center flex-col
          border-2 border-dotted border-gray-300 w-full h-225 md:h-420
          cursor-pointer rounded-lg'>

            {isLoading ? (

            <Loader />) :( <>
                {!imageAsset ? (
                <>

                <label className='w-full h-full flex flex-col items-center 
                justify-center cursor-pointer'>
                  <div className='w-full h-full flex flex-col items-center 
                justify-center cursor-pointer gap-2'>
                  <MdCloudUpload className='text-gray-500 text-3xl
                  hover:text-gray-700'/>
                  <p className='text-gray-500 hover:text-gray-700'>Click here to upload</p>

                </div>
                <input 
                type="file" 
                name='uploadimage' 
                accept='image/*' 
                onChange={uploadimage}
                className="w-0 h-0"
                />
                </label> 
               </> 
                ):( 
                <><div className='relative h-full'>
                  <img
                      src={imageAsset}
                      alt="uploaded image"
                      className="w-full h-full object-cover"
                    />
                  <button type='button' className='absolute bottom-3
                  right-3 p-3 rounded-full bg-red-500 text-xl
                  cursor-pointer outline-none hove:shadow-md 
                  duration-500 transition-all ease-in-out'
                  onClick={deleteImage}
                  >
                    <MdDelete className='text-white' />
                  </button>
                  </div></>
                  )}  
            </>
          )} 
          </div>

          <div className='w-full flex flex-col md:flex-row items-center gap-3'>
            <div className='w-full py-2 border-b border-gray-300 flex
            items-center gap-2'>
              <MdFastfood 
              className='text-gray-700 text-2xl'/>

              <input 
              type="text" 
              required 
              value={calories}
              onChange={(e) => setcalories(e.target.value)}
              placeholder='Calories' 
              className='w-full h-full text-lg bg-transparent outline-none border-none 
              placeholder:text-gray-400 text-textColor'/>
            </div>
            <div>
            <div className='w-full py-2 border-b border-gray-300 flex
            items-center gap-2'>

              <MdAttachMoney className='text-gray-700 text-2xl'/>
              <input 
              type="text" 
              required 
              value={price}
              onChange={(e) => setprice(e.target.value)}
              placeholder='Price' 
              className='w-full h-full text-lg bg-transparent outline-none border-none 
              placeholder:text-gray-400 text-textColor'/>
            </div>
            </div>
          </div>

          <div className='flex items-center w-full'>
            <button type='button' className='ml-0 md:ml-auto w-full md:w-auto
            border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg
            text-lg text-white font-semibold ' 
            onClick={saveDetails}> 

            Save
            </button>
          </div>
      </div>
    </div>
  );
};

export default CreateContainer