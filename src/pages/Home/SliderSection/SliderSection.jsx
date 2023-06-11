import React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import img1 from "../../../assets/HomePageSlider/1188-1560964849.jpg";
import img2 from "../../../assets/HomePageSlider/1582-1572429947.jpg";
import img3 from "../../../assets/HomePageSlider/1653575374.jpg";
import img4 from "../../../assets/HomePageSlider/1660226247.jpg";
import img5 from "../../../assets/HomePageSlider/963-1582629227.png";

import "./SliderSection.css";

const SliderSection = () => {
  const [sliderRef] = useKeenSlider(
    {
      loop: true,
    },
    [
      (slider) => {
        let timeout;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 2000);
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );

  return (
    <>
      <div ref={sliderRef} className="keen-slider mt-2">
        <div className="keen-slider__slide number-slide1">
          <img className="w-full relative opacity-80" src={img1} alt="" />
          <div className="text-lg px-40 text-blue-900 absolute flex justify-center items-center">
            <p>
              Join our photography school and unlock your creative potential.
              Learn the art of capturing breathtaking moments and telling
              captivating stories through images.
            </p>
          </div>
        </div>
        <div className="keen-slider__slide number-slide2">
          <img className="w-full relative opacity-80" src={img2} alt="" />
          <div className="text-lg px-40 text-blue-900 absolute flex justify-center items-center">
            <p>
              Gain hands-on experience with professional-grade equipment and
              learn the technical aspects of photography, including exposure,
              composition, lighting, and post-processing techniques.
            </p>
          </div>
        </div>
        <div className="keen-slider__slide number-slide3">
          <img className="relative opacity-80" src={img3} alt="" />
          <div className="text-lg px-40 text-blue-900 absolute flex justify-center items-center">
            <p>
              Discover your own style and perspective as a photographer. Our
              experienced instructors will guide you in developing a creative
              voice and expressing your unique vision through your photographs.
            </p>
          </div>
        </div>
        <div className="keen-slider__slide number-slide4">
          <img className="relative opacity-80" src={img4} alt="" />
          <div className="text-lg px-40 text-blue-900 absolute flex justify-center items-center">
            <p>
              Benefit from the expertise and knowledge of our seasoned
              photographers who have worked in various fields of photography,
              including fashion, wildlife, landscape, and documentary
              photography.
            </p>
          </div>
        </div>
        <div className="keen-slider__slide number-slide4">
          <img className="w-full relative opacity-80" src={img5} alt="" />
          <div className="text-lg px-40 text-blue-950 absolute flex justify-center items-center">
            <p>
              Connect with fellow photography enthusiasts, participate in group
              activities, and showcase your work in exhibitions. Immerse
              yourself in a supportive and inspiring community of photographers.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SliderSection;
