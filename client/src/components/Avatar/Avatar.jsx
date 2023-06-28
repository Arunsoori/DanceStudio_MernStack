import {useState,useEffect} from 'react'
import './avatar.css'
import { profilePicture } from '../../services/userApi';
import './avatar.css'

function Avatar({onProfileImageChange}) {




 const[imageSrc, setImageSrc] = useState() 
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    // const reader = new FileReader();
    setImageSrc(file)

   

    // reader.onload = (e) => {
    //   setImageSrc(e.target.result);
    // };

    // if (file) {
    //   reader.readAsDataURL(file);
    // }
  };


  const handleSaveImage = () => {
    if (imageSrc) {
      const formData = new FormData();
      formData.append('image', imageSrc);
      profilePicture(formData).then((response)=>{
        console.log(response.data.image_url, "responseeee");
         onProfileImageChange(response.data.image_url)

      })
    }}

  return (
    <div className='mb-5 vh-100'>
            <label htmlFor="image"> 
        <div className=' imagefield bg-custom-color  d-flex justify-content-center align-items-center' style={{height:'200px', width:'200px'}} > 
        {imageSrc ?(
            <img src={URL.createObjectURL(imageSrc)}  style={{ width: "100%", height: "100%", objectFit: "contain" }}  alt="" />
            )  :
            ('+')}
        <input onChange={handleImageChange} id='image' type="file" className='d-none' />

        </div>

            </label>
            {imageSrc ? (
  <div onClick={handleSaveImage} className='save-btn text-center'>save</div>
) : (
  <div>update profile picture</div>
)}

    </div>
  )
  }


export default Avatar