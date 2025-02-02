// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import SplitText from "../components/SplitText";
import BlurText from "../components/BlurText";
import Hyperspeed from "../components/Hyperspeed";
import Profilepic from "../assets/pngpic.png";
import Logo from "../components/Logo";
import InfiniteScroll from "../components/InfiniteScroll";
import { Input } from "@heroui/input";
import Footer from "../components/Footer";
import "aos/dist/aos.css"; // Import AOS styles
import AOS from "aos"; // Import AOS functionality

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const handleAnimationComplete = () => {
  console.log("All letters have animated!");
};

const items = [
  { content: <p>Graphic Designer</p> },

  { content: <p>Web Designer</p> },

  { content: <p>Front End Web Dev</p> },

  { content: <p>3d Product Designer</p> },

  { content: <p>Digital Media Expert</p> },

  { content: <p>UI/UX Designer</p> },

  { content: <p>Motion Graphic Designer</p> },
];

export const hyperspeedPresets = {
  akira: {
    onSpeedUp: () => {},
    onSlowDown: () => {},
    distortion: "mountainDistortion",
    length: 400,
    roadWidth: 9,
    islandWidth: 2,
    lanesPerRoad: 3,
    fov: 90,
    fovSpeedUp: 150,
    speedUp: 2,
    carLightsFade: 0.4,
    totalSideLightSticks: 50,
    lightPairsPerRoadWay: 50,
    shoulderLinesWidthPercentage: 0.05,
    brokenLinesWidthPercentage: 0.1,
    brokenLinesLengthPercentage: 0.5,
    lightStickWidth: [0.12, 0.5],
    lightStickHeight: [1.3, 1.7],

    movingAwaySpeed: [60, 80],
    movingCloserSpeed: [-120, -160],
    carLightsLength: [400 * 0.05, 400 * 0.15],
    carLightsRadius: [0.05, 0.14],
    carWidthPercentage: [0.3, 0.5],
    carShiftX: [-0.2, 0.2],
    carFloorSeparation: [0.05, 1],
    colors: {
      roadColor: 0x080808,
      islandColor: 0x0a0a0a,
      background: 0x000000,
      shoulderLines: 0x131318,
      brokenLines: 0x131318,
      leftCars: [0xff102a, 0xeb383e, 0xff102a],
      rightCars: [0xdadafa, 0xbebae3, 0x8f97e4],
      sticks: 0xdadafa,
    },
  },
};

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Duration of the animation in milliseconds
      once: true, // Only trigger once when the element comes into view
    });
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission and page refresh

    // Prepare the form data to be sent to Google Sheets via Google Apps Script
    const url =
      "https://script.google.com/macros/s/AKfycbxdiODMwngWk3m_QOjz1ht89u0SklafoVhl6nfPKesqUDmWuAjcfCuhY4KMg97JswXo/exec"; // Replace with the URL from Apps Script
    const form = new FormData();
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("phone", formData.phone);
    form.append("country", formData.country);

    try {
      const response = await fetch(url, {
        method: "POST",
        body: form,
      });
      if (response.ok) {
        alert("Form submitted! Thank you for reaching out.");
      } else {
        alert("There was an issue with the form submission.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting the form.");
    }

    setFormData({ name: "", email: "", phone: "", country: "" });
  };
  return (
    <div className="overflow-hidden">
      <div>
        {/* <Hyperspeed
          effectOptions={{
            onSpeedUp: () => {},
            onSlowDown: () => {},
            distortion: "turbulentDistortion",
            length: 400,
            roadWidth: 10,
            islandWidth: 2,
            lanesPerRoad: 4,
            fov: 90,
            fovSpeedUp: 150,
            speedUp: 2,
            carLightsFade: 0.4,
            totalSideLightSticks: 20,
            lightPairsPerRoadWay: 40,
            shoulderLinesWidthPercentage: 0.05,
            brokenLinesWidthPercentage: 0.1,
            brokenLinesLengthPercentage: 0.5,
            lightStickWidth: [0.12, 0.5],
            lightStickHeight: [1.3, 1.7],
            movingAwaySpeed: [60, 80],
            movingCloserSpeed: [-120, -160],
            carLightsLength: [400 * 0.03, 400 * 0.2],
            carLightsRadius: [0.05, 0.14],
            carWidthPercentage: [0.3, 0.5],
            carShiftX: [-0.8, 0.8],
            carFloorSeparation: [0, 5],
            colors: {
              roadColor: 0x080808,
              islandColor: 0x0a0a0a,
              background: 0x000000,
              shoulderLines: 0xffffff,
              brokenLines: 0xffffff,
              leftCars: [0xd856bf, 0x6750a2, 0xc247ac],
              rightCars: [0x03b3c3, 0x0e5ea5, 0x324555],
              sticks: 0x03b3c3,
            },
          }}
        /> */}
      </div>
      <div className="min-h-screen bg-black flex flex-col justify-center text-white ">
        {/* Hello Section */}
        <div className="flex flex-col justify-center items-center p-8">
          <SplitText
            text="Hello!"
            className="text-8xl font-bold text-center"
            delay={150}
            animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
            animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
            easing="easeOutCubic"
            threshold={0.2}
            rootMargin="-50px"
            onLetterAnimationComplete={handleAnimationComplete}
          />
        </div>
        {/* Welcome Text Section */}
        <div className="text-center  flex items-center justify-center pb-8">
          <BlurText
            text="Welcome to my portfolio"
            delay={150}
            animateBy="words"
            direction="top"
            onAnimationComplete={handleAnimationComplete}
            className="text-2xl mb-8"
          />
        </div>
      </div>

      <div className="  bg-white overflow-hidden">
        <div className="text-center grid lg:grid-cols-2 sm:grid-cols-1 items-center">
          <div className="flex flex-col flex-1">
            <h2
              data-aos="fade-up"
              className="text-black font-semibold  p-8 sm:pb-4 md:pb-4 lg:pb-4  text-center text-4xl  md:text-4xl sm:text-4xl"
            >
              {" "}
              About Me{" "}
            </h2>
            <p
              data-aos="fade-up"
              className="text-black px-8 text-center lg:text-xl  sm:text-lg"
            >
              {" "}
              I’m Mirza Ibrahim, a UI/UX Designer and Graphic Designer with 5+
              years of experience. I specialize in creating intuitive user
              interfaces and visually engaging designs, blending creativity with
              functionality to deliver impactful solutions.{" "}
            </p>
          </div>
          <div data-aos="fade-left" className="flex 200 sm:mt-10 m-0 flex-1 ">
            <img src={Profilepic} alt="profile" />
          </div>
        </div>
      </div>

      <div className="h-auto p-4 bg-black flex justify-center overflow-hidden items-center ">
        <div className="flex-1 grid sm:grid-cols-1 lg:grid-cols-2  gap-0">
          <div data-aos="fade-right" className="h-[500px] text-white flex-1  ">
            <InfiniteScroll
              items={items}
              isTilted={true}
              tiltDirection="left"
              autoplay={true}
              autoplaySpeed={0.3}
              autoplayDirection="down"
              pauseOnHover={true}
            />
          </div>
          <div className="flex-1 p-16 h-auto sm:p-10 lg:p-16">
            <div>
              <h3
                data-aos="fade-up"
                className="text-3xl sm:text-4xl font-semibold py-4 sm:py-8 text-white"
              >
                Experience
              </h3>
            </div>
            <div className="text-white  flex-1">
              <Accordion type="single" collapsible>
                <AccordionItem data-aos="fade-up" value="item-1">
                  <AccordionTrigger className="text-md sm:text-sm ">
                    MultiMedia Designer - 2019 to 2021
                  </AccordionTrigger>
                  <AccordionContent className="text-base sm:text-sm">
                    Worked as a Multimedia Designer at Efforts Pvt Ltd. My role
                    was to create stunning designs for corporate clients, where
                    I used software like Adobe Illustrator, Adobe Photoshop,
                    Adobe XD, Figma, Corel Draw, After Effects, Blender, etc.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem data-aos="fade-up" value="item-2">
                  <AccordionTrigger className="text-md sm:text-sm">
                    Sr. MultiMedia Designer - 2022 to 2024
                  </AccordionTrigger>
                  <AccordionContent className="text-base sm:text-sm">
                    At Smart Advertising, I worked as a Multimedia Designer. My
                    role was to create responsive UI designs for applications
                    and web applications for clients and create designs for
                    print and digital media.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem data-aos="fade-up" value="item-3">
                  <AccordionTrigger className="text-md sm:text-sm">
                    Sr. Visual Designer - 2024 to Present
                  </AccordionTrigger>
                  <AccordionContent className="text-base sm:text-sm">
                    At Optimum Business Solutions, I worked as a Sr. Visual
                    Designer, responsible for their application UI and web panel
                    UI, as well as front-end development for the application and
                    web panel dashboard, using ReactJS and Tailwind CSS.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>

      <div
        data-aos="fade-up"
        className="h-screen flex items-center justify-center p-6"
      >
        <div
          className="bg-black w-full justify-center
         p-8 rounded-2xl flex flex-col"
        >
          <div>
            <h3 className="text-white text-2xl my-6">Contact Me</h3>
          </div>
          <form
            onSubmit={handleSubmit}
            className=" w-full flex items-center justify-center flex-col"
          >
            <div className="flex flex-col gap-4 w-full">
              <div className="mb-4 ">
                <Input
                  label="Name"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  type="text"
                  isRequired
                />
              </div>

              <div className="mb-4 w-full ">
                <Input
                  label="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  type="email"
                  id="email"
                  name="email"
                  isRequired
                />
              </div>

              <div className="mb-4 w-full ">
                <Input
                  label="Country"
                  value={formData.country}
                  onChange={handleInputChange}
                  type="text"
                  id="country"
                  name="country"
                  isRequired
                />
              </div>

              <div className="mb-4 w-full ">
                <Input
                  label="Phone With Country Code"
                  value={formData.phone}
                  onChange={handleInputChange}
                  type="number"
                  id="phone"
                  name="phone"
                  isRequired
                />
              </div>
            </div>

            <div className="flex justify-center md:justify-start mt-4 md:mt-0 w-full">
              <button className="text-white font-semibold w-fit bg-gray-600 hover:bg-white hover:text-black transition-all duration-300 flex justify-center items-center px-6 py-3 rounded-xl">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      <div data-aos="fade-up">
        {/* Other components and content here */}
        <Footer /> {/* Use the Footer component */}
      </div>
    </div>
  );
};

export default Home;
