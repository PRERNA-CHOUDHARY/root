import React from "react";
import DocImg1 from "../assets/images/hero-img01.png";
import DocImg2 from "../assets/images/hero-img02.png";
import DocImg3 from "../assets/images/hero-img03.png";
import icon1 from "../assets/images/icon01.png";
import icon2 from "../assets/images/icon02.png";
import icon3 from "../assets/images/icon03.png";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import About from "../components/About/About";
import ServiceList from "../components/Services/ServiceList";
const Home = () => {
  return (
    <>
      {/* ==============first section======= */}
      <section className="hero__section pt-[60px] 2xl:h-[800px]  ">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-[90px] item-center justify-between ">
            {/* ===========content=============== */}
            <div>
              <div className="lg:w-[570px] ">
                <h1 className="text-[36px] leading-[46px]  text-headingColor font-[800] md:text-[50px] md:leading-[60px]">
                  EMPOWERING LIVES: UNLEASHING JOY, CULTIVATING SERENITY
                </h1>
                <p className="text__para">
                  Step into a realm where happiness reigns supreme and stress
                  becomes a distant memory. Our mission is to guide you towards
                  a life filled with joy and serenity. Welcome to your journey
                  of empowerment!
                </p>
                <button className="btn"> Make an Apponintment</button>
              </div>
              {/* counter=================== */}
              <div className="mt-30px lg:mt-[70px] flex flex-row lg:flex-row lg:items-center gap-5 lg:lag-[30px] ">
                {/* year of exp */}
                <div>
                  <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor ">
                    5+
                  </h2>
                  <span className="w-[50px] h-2 bg-yellowColor  rounded-full block mt-[-16px] "></span>
                  <p className="text__para">Years </p>
                </div>

                <div className="ms-[100px]">
                  <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor ">
                    100+
                  </h2>
                  <span className="w-[80px] h-2 bg-yellow-600 rounded-full block mt-[-16px] "></span>
                  <p className="text__para">Theripist</p>
                </div>

                <div className="ms-[100px]">
                  <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor ">
                    20K+
                  </h2>
                  <span className="w-[89px] h-2 bg-irisBlueColor  rounded-full block mt-[-16px] "></span>
                  <p className="text__para">Users</p>
                </div>
              </div>
            </div>

            {/* content================= */}
            <div className="flex gap-[30px] justify-end   ">
              <div>
                <img className="w-full " src={DocImg1} alt="" />
              </div>
              <div className="mt-[30px] ">
                <img src={DocImg2} alt="" className="w-full mb-[30px]" />
                <img src={DocImg3} alt="" className="w-full " />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ==============first section ends============= */}

      <section>
        <div className="container">
          <div className="lg:w-[470px] mx-auto ">
            <h2 className="heading text-center">Providing the best services</h2>
            <p className="text__para text-center">
              World-Class care for everyone. Our health system offers unmatched
              care
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-[30px] mt-[30px] lg:mt-[55px] ">
            <div className="py-[30px] px-5 ">
              <div className="flex items-center justify-center">
                <img src={icon1} alt="" />
              </div>
              <div className="mt-[30px]">
                <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center ">
                  Health Blogs
                </h2>
                <p className="text-textColor text-[16px] leading-7 font-[400] mt-4 text-center ">
                Informative articles promoting wellness and health-related insights for readers.
                </p>
                <Link
                  to="/doctors"
                  className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                >
                  <BsArrowRight className="group-hover:text-white w-6 h-5" />
                </Link>
              </div>
            </div>

            <div className="py-[30px] px-5 ">
              <div className="flex items-center justify-center">
                <img src={icon2} alt="" />
              </div>
              <div className="mt-[30px]">
                <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center ">
                  Meet a Theripist
                </h2>
                <p className="text-textColor text-[16px] leading-7 font-[400] mt-4 text-center ">
                Encounter a compassionate guide for your emotional well-being journey.
                </p>
                <Link
                  to="/doctors"
                  className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                >
                  <BsArrowRight className="group-hover:text-white w-6 h-5" />
                </Link>
              </div>
            </div>

            <div className="py-[30px] px-5 ">
              <div className="flex items-center justify-center">
                <img src={icon3} alt="" />
              </div>
              <div className="mt-[30px]">
                <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center ">
                  Book Appontment
                </h2>
                <p className="text-textColor text-[16px] leading-7 font-[400] mt-4 text-center ">
                  Unparalleled support for all. Our psychological consultancy
                  ensures world-class care tailored to your needs.
                </p>
                <Link
                  to="/doctors"
                  className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                >
                  <BsArrowRight className="group-hover:text-white w-6 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===========about section=============== */}
      <About />

      {/* service section===================== */}
      <div className="container">
        <div className="xl:w-[470px] mx-auto ">
          <h2 className="heading text-center"> Our services</h2>
          <p className="text__para__small text-center">
            Unparalleled support for all. Our psychological consultancy ensures
            world-class care tailored to your needs.
          </p>
        </div>
        <ServiceList/>
      </div>
    </>
  );
};

export default Home;
