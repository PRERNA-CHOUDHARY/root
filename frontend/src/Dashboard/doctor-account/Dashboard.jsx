/**
 * @fileoverview Doctor account dashboard component. It is used to show the doctor's profile and appointments.
 */

// Import the necessary modules.
import { useState } from "react";

// Import the necessary components.
import Tabs from "./Tabs";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import Profile from "./Profile";
import Appointment from "./Appointment";

// Import the custom hooks.
import useGetProfile from "../../hooks/FetchData";

// Import the utility functions.
import { BASE_URL } from "../../Utils/config";

// Import the star icon.
import starIcon from "../../assets/images/Star.png";

// Import the DoctorAbout pages.
import DoctorAbout from "../../pages/Doctors/DoctorAbout";

// Define the Dashboard component.
const Dashboard = () => {
  // Define the state variables.
  const { data, loading, error } = useGetProfile(
    `${BASE_URL}/doctors/profile/me`
  );
  const [tab, setTab] = useState("overview");

  return (
    <section>
      {console.log(data)}
      <div className="max-w-[1170px] px-5 mx-auto">
        {loading && !error && <Loading />}

        {error && !loading && <Error err={error} />}

        {!loading && !error && (
          <div className="grid lg:grid-cols-3 gap-[30px] lg:gap-[50px]">
            <Tabs tab={tab} setTab={setTab} />
            <div className="lg:col-span-2">
              {data.isApproved == "pending" && (
                <div className="flex p-4 mb-4 text-yellow-800 bg-yellow-50 rounded-lg">
                  ℹ️
                  <span className="sr-only">Info</span>
                  <div className="ml-3 text-[.75rem] font-medium">
                    To get approval please complete your profile. We&apos;ll
                    review and approve it within 4 working days.
                  </div>
                </div>
              )}
              <div className="mt-8">
                {tab == "overview" && (
                  <div>
                    <div className="flex items-center gap-4 mb-16">
                      <figure className="max-w-[200px] max-h-[200px]">
                        {" "}
                        <img src={data?.photo} alt="" className="w-full" />
                      </figure>
                      <div>
                        <span className="bg-fuchsia-50 text-irisBlueColor py-1 px-4 lg:py-2 lg:px-6 rounded text-[12px] leading-4 lg:text-[16px] lg:leading-6 font-semibold ">
                          {data.specialization}
                        </span>
                        <h3 className="text-[22px] font-bold text-headingColor mt-3 leading-9 ">
                          {data.name}
                        </h3>
                        <div className="flex items-center gap-[6px] text-headingColor text-[14px] leading-5 lg:text-[16px] lg:leading-6 font-semibold ">
                          <img src={starIcon} alt="" />
                          {data.averageRating}
                          <span className="text-textColor text-[14px] leading-5 lg:text-[16px] lg:leading-6 font-semibold">
                            ({data.totalRating})
                          </span>
                        </div>
                        <p className="text__para font-[15px] lg:max-w-[390px]">
                          {data?.bio}
                        </p>
                      </div>
                    </div>
                    <DoctorAbout
                      name={data.name}
                      about={data.about}
                      qualifications={data.qualifications}
                      experiences={data.experiences}
                    />
                  </div>
                )}
                {tab == "appointments" && (
                  <Appointment appointments={data.appointments} />
                )}
                {tab == "settings" && <Profile doctorData={data} />}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
