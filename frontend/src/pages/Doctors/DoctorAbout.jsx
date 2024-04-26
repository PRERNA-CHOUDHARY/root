import React from "react";
import { formatDate } from "../../Utils/formatDate";
const DoctorAbout = ({name,about,qualifications,experiences }) => {
  return (
    <>
      {/* {console.log(name,about,qualifications,experiences)} */}
      <div>
        <h3 className=" text-[20px] leading-[30px] text-headingColor font-[400] flex items-center gap-2 ">
          {" "}
          About
          <span className="text-irisBlueColor font-[600]">Theripist {name}</span>
        </h3>
        <p className="text__para__small font-[600]">
          {/* A seasoned psychiatrist, has devoted the past three years to
          unraveling the complexities of the human mind. Specializing in
          cognitive behavioral therapy, he employs a unique blend of empathy and
          analytical prowess to guide his patients toward mental well-being.
          Imaginary or not, his commitment to understanding the intricacies of
          the human psyche sets him apart. Driven by an insatiable curiosity, he
          navigates the delicate terrain of emotions with finesse, helping
          individuals overcome their psychological hurdles. With a calming
          presence and an innovative approach, Dr. Harper embodies the epitome
          of a dedicated healer, shaping a brighter, more resilient future for
          those under his compassionate care */}
          {about}
        </p>
          </div>
          <div className="mt-12">
              <h3 className="text-[20px] leading-[30px] text-headingColor font-[400] ">Education</h3>
        <ul className="pt-4 md:p-5">
          {qualifications?.map((item, index) => 
            
                  <li key ={index} className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 ">
                      <div className="text-irisBlueColor text-[15px] leading-6 font-[400]"> {formatDate(item.startingDate)} - {formatDate(item.endingDate)}
                      <p className=" text-[16px]  leading-6 font-medium text-textColor ">{item.degree}</p>
                      </div>
                      <p className=" text-[14px]  leading-6 me-10 font-medium text-textColor ">{item.university}</p>
                  </li>
          )}
                  {/* <li className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]">
                      <div className="text-irisBlueColor text-[15px] leading-6 font-[400]"> {formatDate('12-04-2010')}- {formatDate('05-25-2012')}
                      <p className=" text-[16px]  leading-6 font-medium text-textColor ">PHD in human psychology</p>
                      </div>
                      <p className=" text-[14px]  leading-6 font-medium text-textColor ">Apollo Hospital</p>
                  </li> */}
                  
              </ul>
          </div>
          <div className="mt-5">
              <h3 className="text-[20px] leading-[30px] text-headingColor font-[400] ">Experience</h3>
        <ul className="grid sm:grid-cols-2 gap-[30px] pt-4 md:p-5">
          {experiences?.map((item, index) => 
            
            <li key={index} className=" p-4 rounded bg-pink-200 ">
                      <span className="text-purpleColor text-[15px] leading-6 font-[400] "> {formatDate(item.startingDate)}- {formatDate(item.endingDate)}</span>
                      <p className=" text-[17px]  leading-6 font-medium   ">{item.position}</p>
              <p className=" text-[14px]  leading-2 font-medium  ">{item.hospital}</p>
                  </li>
        )}
                  {/* <li className=" p-4 rounded bg-pink-200 ">
                      <span className="text-purpleColor text-[15px] leading-6 font-[400] "> {formatDate('05-4-2015')}- {formatDate('05-25-2017')}</span>
                      <p className=" text-[17px]  leading-6 font-medium   ">Theripist</p>
                      <p className=" text-[14px]  leading-2 font-medium  ">Happy Life Hospital,Mumbai</p>
                  </li> */}
              </ul>
              </div>
    </>
  );
};

export default DoctorAbout;
