import React, { useState, useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import uploadImageToCloudinary from './../../Utils/uploadCloudinary';
import { BASE_URL, token } from './../../Utils/config';
// import { toast } from react-toastify;
import { toast } from 'react-toastify';
const Profile = ({ doctorData }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    bio: "",
    gender: "",
   specialization: "",
    ticketPrice: 0,
    qualifications: [
      { startingDate: "", endingDate: "", degree: "", university: "" },
    ],
    experiences: [
      { startingDate: "", endingDate: "", position: "", hospital: "" },
    ],
    timeSlots: [{ day: "", startingTime: "", endingTime: "" }],
    about: "",
    photo: null,
  });
  useEffect(() => {
    setFormData({
      name: doctorData?.name,
      phone: doctorData?.phone,
      bio: doctorData?.bio,
      gender: doctorData?.gender,
      specialization: doctorData?.specialization,
      ticketPrice: doctorData?.ticketPrice,
      qualifications: doctorData?.qualifications,
      experiences: doctorData?.experiences,
      timeSlots: doctorData?.timeSlots,
      about: doctorData?.about,
      photo: doctorData?.photo,
    })
  }, [doctorData]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = async event => { 
    const file = event.target.files[0];
    const data = await uploadImageToCloudinary(file);
    console.log(data);
    setFormData({...formData,photo:data.url})
  };
  
  const updateProfileHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/doctors/${doctorData._id}`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(formData)
      })
      const result = await res.json()
      if (!res.ok)
      {
        throw Error(result.message);
      }
      toast.success(result.message)
    }
    catch (err) {
      toast.error(err.message)
    }
  };

  const addItem = (key, item) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: [...prevFormData[key], item],
    }));
  };
  const handleResableInputChangeFunc = (key, index, event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      const updateItems = [...prevFormData[key]];
      updateItems[index][name] = value;
      return { ...prevFormData, [key]: updateItems };
    });
  };
  const deleteItem = (key, index) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: prevFormData[key].filter((_, i) => i != index),
    }));
  };
  const addQualification = (e) => {
    e.preventDefault();
    addItem("qualifications", {
      startingDate: "",
      endingDate: "",
      degree: "",
      university: "",
    });
  };
  const handleQualificationChange = (event, index) => {
    handleResableInputChangeFunc("qualifications", index, event);
  };
  const deleteQualification = (e, index) => {
    e.preventDefault();
    deleteItem("qualifications", index);
  };

  const addExperience = (e) => {
    e.preventDefault();
    addItem("experiences", {
      startingDate: "",
      endingDate: "",
      position: "",
      hospital: "",
    });
  };
  const handleExperienceChange = (event, index) => {
    handleResableInputChangeFunc("experiences", index, event);
  };
  const deleteExperience = (e, index) => {
    e.preventDefault();
    deleteItem("experiences", index);
  };

  const addTimeSlot = (e) => {
    e.preventDefault();
    addItem("timeSlots", {
      day: "",
      startingTime: "",
      endingTime: "",
    });
  };
  const handleTimeSlotChange = (event, index) => {
    handleResableInputChangeFunc("timeSlots", index, event);
  };
  const deleteTimeSlot = (e, index) => {
    e.preventDefault();
    deleteItem("timeSlots", index);
  };

  return (
    <div>
      <h2 className="text-headingColor font-bold text-[24px] leading-9 mb-10">
        Profile Information
      </h2>
      <form action="">
        <div className="mb-5">
          <p className="form__label">Name*</p>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="John Doe"
            className="form__input"
          />
        </div>
        <div className="mb-5">
          <p className="form__label">Email*</p>
          <input
            type="text"
            name="email"
            value={doctorData.email}
            onChange={handleInputChange}
            placeholder={doctorData.email}
            readOnly
            aria-readonly
            disabled="true"
            className="form__input"
          />
        </div>
        <div className="mb-5">
          <p className="form__label">Phone*</p>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="8xxx7xxx89"
            className="form__input"
          />
        </div>
        <div className="mb-5">
          <p className="form__label">Bio*</p>
          <input
            type="text"
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            placeholder="write your bio here(100 words) "
            className="form__input"
            maxLength={100}
          />
        </div>
        <div className="mb-5 ">
          <div className="ms-[1px]  me-[3rem] grid grid-cols-3 gap-6 m-[30px]">
            <div>
              <p className="form__label">Gender*</p>
              <select
                name="gender"
                id=""
                value={formData.gender}
                onChange={handleInputChange}
                className="form__input py-3.5"
              >
                <option value="">--Select--</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
            </div>
            <div>
              <p className="form__label">Specialization*</p>
              <select
                name="
                specialization"
                id=""
                value={formData.specialization}
                onChange={handleInputChange}
                className="form__input py-3.5"
              >
                <option value="">--Select--</option>
                <option value="clinicalpsychology">Clinical psychology</option>
                <option value="schoolpsychology">School psychology</option>
                <option value="healthpsychology">Health psychology</option>
                <option value="neuropsychology">Neuropsychology</option>
                <option value="Counselingpsychology">
                  Counseling psychology
                </option>
                <option value="educationalpsychology">
                  Educational psychology
                </option>
              </select>
            </div>
            <div>
              <p>Ticket Price*</p>
              <input
                type="number"
                placeholder="100"
                name="ticketPrice"
                value={formData.ticketPrice}
                onChange={handleInputChange}
                className=" mt-4 form__input"
              />
            </div>
          </div>
        </div>
        <div className="mb-5 mt-10">
          <p className="form__label font-semibold">Qualifications*</p>
          {formData.qualifications?.map((item, index) => (
            <div key={index}>
              <div>
                <div className="grid grid-cols-2 gap-5  ms-5">
                  <div>
                    <p className="form__label">Starting Date*</p>
                    <input
                      type="date"
                      name="startingDate"
                      value={item.startingDate}
                      onChange={(e) => handleQualificationChange(e, index)}
                      className="form__input"
                    />
                  </div>
                  <div>
                    <p className="form__label">Ending Date*</p>
                    <input
                      type="date"
                      name="endingDate"
                      value={item.endingDate}
                      onChange={(e) => handleQualificationChange(e, index)}
                      className="form__input"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-5 ms-5 mt-5">
                  <div>
                    <p className="form__label">Degree*</p>
                    <input
                      type="text"
                      name="degree"
                      value={item.degree}
                      onChange={(e) => handleQualificationChange(e, index)}
                      className="form__input"
                    />
                  </div>
                  <div>
                    <p className="form__label">University*</p>
                    <input
                      type="text"
                      name="university"
                      value={item.university}
                      onChange={(e) => handleQualificationChange(e, index)}
                      className="form__input"
                    />
                  </div>
                </div>
                <button
                  className="ms-10 mt-5 bg-purpleColor  p-2 rounded-full text-white"
                  onClick={(e) => deleteQualification(e, index)}
                >
                  <AiOutlineDelete />
                </button>
              </div>
            </div>
          ))}
                <button
                  onClick={addQualification}
                  className="bg-pinkColor mt-4 ms-10 py-1 px-3 rounded text-white cursor-pointer "
                >
                  + Add Qualification
                </button>
        </div>
        <div className="mb-5 mt-10">
          <p className="form__label font-semibold">Experiences*</p>
          {formData.experiences?.map((item, index) => (
            <div key={index}>
              <div>
                <div className="grid grid-cols-2 gap-5  ms-5">
                  <div>
                    <p className="form__label">Starting Date*</p>
                    <input
                      type="date"
                      name="startingDate"
                      value={item.startingDate}
                      onChange={(e) => handleExperienceChange(e, index)}
                      className="form__input"
                    />
                  </div>
                  <div>
                    <p className="form__label">Ending Date*</p>
                    <input
                      type="date"
                      name="endingDate"
                      value={item.endingDate}
                      onChange={(e) => handleExperienceChange(e, index)}
                      className="form__input"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-5 ms-5 mt-5">
                  <div>
                    <p className="form__label">Position*</p>
                    <input
                      type="text"
                      name="position"
                      value={item.position}
                      onChange={(e) => handleExperienceChange(e, index)}
                      className="form__input"
                    />
                  </div>
                  <div>
                    <p className="form__label">Organization*</p>
                    <input
                      type="text"
                      name="hospital"
                      value={item.hospital}
                      onChange={(e) => handleExperienceChange(e, index)}
                      className="form__input"
                    />
                  </div>
                </div>
                <button
                  className="ms-10 mt-5 bg-purpleColor  p-2 rounded-full text-white"
                  onClick={(e) => deleteExperience(e, index)}
                >
                  <AiOutlineDelete />
                </button>
              </div>
            </div>
          ))}
              <button
                onClick={addExperience}
                className="bg-pinkColor ms-10 py-1 px-3 mt-4 rounded text-white cursor-pointer "
              >
                + Add Experience
              </button>
        </div>

        <div className="mb-5 mt-10">
          <p className="form__label font-semibold ">Time Slots*</p>
          {formData.timeSlots?.map((item, index) => (
            <div key={index}>
              <div>
                <div className="grid grid-cols-2  md:grid-cols-4 mb-[30px] gap-5  ms-5">
                  <div>
                    <p className="form__label">Day*</p>
                    <select
                      name="day"
                      id=""
                      value={item.day}
                      className="form__input py-3.5"
                      onChange={(e) => handleTimeSlotChange(e, index)}
                    >
                      <option value="">-Select-</option>
                      <option value="monday">Monday</option>
                      <option value="tuesday">Tuesday</option>
                      <option value="wednesday">Wednesday</option>
                      <option value="thrusday">Thrusday</option>
                      <option value="friday">Friday</option>
                      <option value="saturday">Saturday</option>
                      <option value="sunday">Sunday</option>
                    </select>
                  </div>
                  <div>
                    <p className="form__label">Starting Time*</p>
                    <input
                      type="time"
                      name="startingTime"
                      value={item.startingTime}
                      onChange={(e) => handleTimeSlotChange(e, index)}
                      className="form__input mt-2"
                    />
                  </div>
                  <div>
                    <p className="form__label">Ending Time*</p>
                    <input
                      type="time"
                      name="endingTime"
                      value={item.endingTime}
                      onChange={(e) => handleTimeSlotChange(e, index)}
                      className="form__input mt-2"
                    />
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={(e) => deleteTimeSlot(e, index)}
                      className="ms-5 mt-5 bg-purpleColor  p-2 rounded-full text-white cursor-pointer"
                    >
                      <AiOutlineDelete />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={addTimeSlot}
            className="bg-pinkColor ms-10 py-1 px-3 rounded text-white cursor-pointer "
          >
            + Add Time Slot
          </button>
        </div>
        <div className="mb-5">
          <p className="form__label">About</p>
          <textarea
            name="about"
            id=" "
            className=" form__input ms-4 border rounded border-solid border-pinkColor"
            value={formData.about}
            onChange={handleInputChange}
            // cols={80}
            rows={5}
          ></textarea>
        </div>
        <div className="mb-5  ms-4 flex items-center gap-5">
          {formData.photo && (
            <figure
              className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor
                flex items-center justify-center
                 "
            >
              <img
                src={formData.photo}
                alt=""
                className="w-fit h-[100%] rounded-full"
              />
            </figure>
          )}
          <div className="relative w-[160px] h-[50px] ">
            <input
              type="file"
              name="photo"
              id="customFile"
              onChange={handleFileInputChange}
              accept=".jpg,.png"
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />
            <label
              htmlFor="customFile"
              className="absolute top-0  left-0 w-full h-full flex items-center justify-center px-[1.2rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-pink-100 text-headingColor font-semibold rounded-lg truncate cursor-pointer "
            >
              Upload Photo
            </label>
          </div>
        </div>
        <div className="mt-7">
          <button
            type="submit"
            onClick={updateProfileHandler}
            className="btn w-[95%] "
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
