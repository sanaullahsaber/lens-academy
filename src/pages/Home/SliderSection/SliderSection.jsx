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
          <img className="w-full" src={img1} alt="" />
        </div>
        <div className="keen-slider__slide number-slide2">
          <img className="w-full" src={img2} alt="" />
        </div>
        <div className="keen-slider__slide number-slide3">
          <img src={img3} alt="" />
        </div>
        <div className="keen-slider__slide number-slide4">
          <img className="" src={img4} alt="" />
        </div>
        <div className="keen-slider__slide number-slide4">
          <img className="w-full" src={img5} alt="" />
        </div>
      </div>
    </>
  );
};

export default SliderSection;
