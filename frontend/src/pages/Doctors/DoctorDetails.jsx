import { useState } from "react";
import starIcon from "../../assets/images/Star.png";
import DoctorAbout from "./DoctorAbout";
import Feedback from "./Feedback";
import SidePanel from "./SidePanel";
import { BASE_URL } from '../../Utils/config';
import useFetchData from './../../hooks/FetchData';
import Loader from '../../components/Loader/Loading';
import Error from '../../components/Error/Error';
import { useParams } from "react-router-dom";
const DoctorDetails = () => {
  
  const [tab, setTab] = useState("about");
  const { id } = useParams();

  const { data: doctor, loading, error } =  useFetchData(`${BASE_URL}/doctors/${id}`)

  const {
    name,
    bio,
    about,
    averageRating,
    totalRating,
   specialization,
    ticketPrice,
    qualifications,
    experiences,
    timeSlots,
    photo,
    reviews
  }=doctor
  
  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto  ">
      {loading && <Loader />}
        {error && <Error />}
        
       { !loading && !error && (<div className="grid md:grid-cols-3 gap-[50px] ">
          <div className="md:col-span-2">
            <div className="flex items-centers gap-5">
              <figure className="max-w-[200px] max-h-[200px] ">
                <img src={photo} alt="" className="w-full" />
              </figure>

              <div>
                <span className="bg-pink-200 text-irisBlueColor py-1 px-6 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded-md">
                  {specialization}
                </span>
                <h3 className="text-[22px] text-headingColor leading-9 mt-3 font-bold   ">
                   Dr. {name}
                </h3>
                <div className="flex items-center gap-[6px]">
                  <span className="flex items-center gap-[6px] text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-[500] text-headingColor ">
                    <img src={starIcon} alt="" />
                    {averageRating}
                  </span>
                  <span className="text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-[400] text-textColor">
                    ({totalRating})
                  </span>
                </div>
                <p className="text-gray-600 text-[14px] text__para__small  leading-5 md:text-[16px] lg:max-w-[390px]  ">
                  {bio}
                </p>
              </div>
            </div>
            <div className="mt-[50px] border-b border-solid border-pinkColor ">
              <button
                onClick={() => setTab("about")}
                className={`${
                  tab == "about" && "border-b border-solid border-primaryColor"
                } py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-[400] `}
              >
                About
              </button>
              <button
                onClick={() => setTab("feedback")}
                className={` ${
                  tab == "feedback" &&
                  "border-b border-solid border-primaryColor"
                } py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-[400] `}
              >
                Feedback
              </button>
            </div>
            <div className="mt-[50px] ">
              {tab == "about" && <DoctorAbout name={name} about={about} qualifications={qualifications} experiences ={experiences } />}
              {tab == "feedback" && <Feedback reviews={reviews} totalRating={totalRating} />}
            </div>
          </div>
            <div >
            <SidePanel timeSlots={timeSlots} doctorId={doctor._id } ticketPrice={ticketPrice} />
            </div>
        </div>)}
      </div>
    </section>
  );
};

export default DoctorDetails;