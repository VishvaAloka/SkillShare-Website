import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Contact from "./Contact";
import EDUCommunity from "../Pages/EDUCommunity";

// Import your slide images
import Slide1 from "../assets/slide_1.jpg";
import Slide2 from "../assets/slide_2.jpg";
import Slide3 from "../assets/slide_3.jpg";

const Hero = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: true, // Enable navigation arrows for better UX
    appendDots: (dots) => (
      <div
        style={{
          bottom: "25px",
          position: "absolute",
          width: "100%",
          textAlign: "center",
          zIndex: 1,
        }}
      >
        <ul style={{ margin: "0px" }}>{dots}</ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        style={{
          width: "10px",
          height: "10px",
          background: "white",
          borderRadius: "50%",
          display: "inline-block",
          margin: "0 5px",
        }}
      />
    ),
  };

  const slides = [
    {
      image: Slide1,
      title: "Online Courses",
      heading: "Learn Anytime, Anywhere",
      subheading: "flexible / engaging / effective",
      buttonText: "Browse Courses",
    },
    {
      image: Slide2,
      title: "Expert Instructors",
      heading: "Learn from Industry Leaders",
      subheading: "experienced / knowledgeable / supportive",
      buttonText: "Meet Instructors",
    },
    {
      image: Slide3,
      title: "Certifications",
      heading: "Boost Your Career",
      subheading: "recognized / valuable / career-ready",
      buttonText: "Get Certified",
    },
  ];

  return (
    <div>
      {/* Hero Slider */}
      <div className="relative w-full h-[700px] md:h-[750px] lg:h-[800px] -mt-6">
        <Slider {...settings} className="w-full h-full">
          {slides.map((slide, index) => (
            <div key={index} className="relative h-full">
              <img
                src={slide.image}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-start px-10 lg:px-24">
                <div className="text-left max-w-3xl">
                  <h2 className="text-2xl md:text-3xl text-white font-semibold">
                    {slide.title}
                  </h2>
                  <p className="mt-3 text-white sm:mt-5 text-4xl md:text-6xl font-bold">
                    {slide.heading}
                  </p>
                  <p className="mt-3 text-white sm:mt-5 text-xl md:text-2xl">
                    {slide.subheading}
                  </p>
                  <button className="border rounded-md mt-6 border-white hover:bg-white hover:text-black transition-colors duration-300 text-white bg-transparent w-44 h-12 font-medium">
                    {slide.buttonText}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <EDUCommunity />
      <Contact />
    </div>
  );
};

export default Hero;
