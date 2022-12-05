import React, { useState, useRef } from 'react'
import './PostShare.css'
import { UilScenery } from '@iconscout/react-unicons'
import { UilPlayCircle } from '@iconscout/react-unicons'
import { UilLocationPoint } from '@iconscout/react-unicons'
import { UilSchedule } from '@iconscout/react-unicons'
import { UilTimes } from '@iconscout/react-unicons'
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage, uploadPost } from '../../actions/UploadAction'

const PostShare = () => {
  const [image, setImage] = useState(null);
  const imageRef = useRef();
  const desc = useRef();
  const { user } = useSelector((state) => state.authReducer.authData);
  const loading = useSelector((state) => state.postReducer.uploading);
  const dispatch = useDispatch()
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];

      setImage(img)
    }
  }


  const reset = () => {
    setImage(null);
    desc.current.value = "";
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPost = {
      userId: user._id,
      desc: desc.current.value
    }

    if (image) {
      const data = new FormData();
      const filename = Date.now() + image.name;
      data.append("name", filename);
      data.append("file", image)
      newPost.image = filename

      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error);
      }

    }

    dispatch(uploadPost(newPost));
    reset();
  }

  return (
    <div className="PostShare">
      <img 
      src={user.profilePicture ? serverPublic + user.profilePicture : serverPublic+"defaultProfile.jpg"} 
      alt="" />
      <div>
        <input type="text" placeholder="What's happening" ref={desc} required />
        <div className="postOptions">
          <div
            className="option"
            style={{ color: "#4CB256" }}
            onClick={() => imageRef.current.click()}
          >
            <UilScenery />
            Photo
          </div>

          <div
            className="option"
            style={{ color: "#4A4EB7" }}
          >
            <UilPlayCircle />
            Video
          </div>

          <div
            className="option"
            style={{ color: "#EF5757" }}
          >
            <UilLocationPoint />
            Location
          </div>

          <div
            className="option"
            style={{ color: "#E1AE4A" }}
          >
            <UilSchedule />
            Schedule
          </div>

          <button
            className="button ps-button"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Uploading..." : "Share"}
          </button>

          <div style={{ display: "none" }}>
            <input type="file" name="myImage" ref={imageRef} onChange={onImageChange} />
          </div>
        </div>

        {image && (
          <div className="previewImage">
            <UilTimes onClick={() => setImage(null)} />
            <img src={URL.createObjectURL(image)} alt="" />
          </div>
        )}

      </div>
    </div>
  )
}

export default PostShare
