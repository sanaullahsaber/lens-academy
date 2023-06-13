import React, { useEffect, useRef } from "react";
import "swiper/swiper-bundle.min.css";
import { Swiper, SwiperSlide } from "swiper/react";

const CustomersReview = () => {
  const reviews = [
    {
      id: 9,
      title: "Great Photography School",
      content:
        "I had an amazing experience at the photography school. The instructors were highly knowledgeable and passionate about photography. They provided hands-on training and valuable insights into various photography techniques. The school also had state-of-the-art equipment and studio facilities, which greatly enhanced the learning experience. I improved my photography skills significantly and gained confidence in pursuing my passion. I highly recommend this photography school for enhancing skills and knowledge in photography.",
      rating: "★★★★★",
    },
    {
      id: 10,
      title: "Outstanding Photography Courses",
      content:
        "The photography courses offered by this school are outstanding. The curriculum covers both technical and artistic aspects. The instructors are experienced professionals who are enthusiastic about teaching and helping students improve. The school organizes regular photo walks and workshops, providing practical application opportunities. I am satisfied with the quality of education and progress I made during my time at this photography school.",
      rating: "★★★★",
    },
    {
      id: 11,
      title: "Excellent Learning Environment",
      content:
        "This photography school provides an excellent learning environment. The classrooms are equipped with the latest technology and software for editing. The instructors create a supportive and collaborative atmosphere, encouraging students to share their work and provide feedback. The school hosts exhibitions and showcases to display students' best photographs. I am grateful for the skills and friendships I formed during my time at this photography school.",
      rating: "★★★★★",
    },
    {
      id: 12,
      title: "Top-Notch Photography Instruction",
      content:
        "The photography instruction at this school is top-notch. The instructors have a deep understanding of the art and science of photography. They provide personalized attention and guidance, helping students develop their unique style and vision. The school offers advanced courses and masterclasses for further refinement. I am grateful for the education and mentorship I received at this photography school.",
      rating: "★★★★",
    },
    {
      id: 13,
      title: "Inspiring and Creative Atmosphere",
      content:
        "The photography school has an inspiring and creative atmosphere that fosters artistic growth. The campus is filled with beautiful photography displays and exhibitions, showcasing the work of students and renowned photographers. The instructors not only teach technical skills but also nurture creativity and encourage exploration. I feel fortunate to have been part of such a vibrant photography community.",
      rating: "★★★★★",
    },
    {
      id: 14,
      title: "Comprehensive Photography Program",
      content:
        "The photography program offered by this school is comprehensive and covers a wide range of topics. From the fundamentals of exposure and composition to advanced lighting techniques and post-processing, the curriculum provides a solid foundation. The school offers specialized courses in genres such as portrait, landscape, and documentary photography. The program allows students to progress at their own pace while challenging them to continuously improve.",
      rating: "★★★★",
    },
    {
      id: 15,
      title: "Supportive Learning Environment",
      content:
        "The photography school provides a supportive learning environment where students are encouraged to explore and grow. The instructors are approachable and dedicated to helping students succeed. They provide constructive feedback and guidance to help students overcome challenges and improve their skills. The school organizes guest lectures and workshops by industry professionals, providing valuable insights and networking opportunities. I am grateful for the mentorship and support I received throughout my journey at this photography school.",
      rating: "★★★★★",
    },
    {
      id: 16,
      title: "Highly Recommended Photography School",
      content:
        "I highly recommend this photography school to anyone passionate about photography. The instructors are knowledgeable and deeply invested in the success of their students. They ensure students receive a well-rounded education and gain practical experience. The school provides opportunities for growth, including internships and collaborations. The skills and connections I developed have been invaluable in launching my career as a photographer.",
      rating: "★★★★",
    },
  ];


  const swiperRef = useRef(null);

  useEffect(() => {
    const swiper = swiperRef.current.swiper;

    const autoplayInterval = setInterval(() => {
      if (swiper) {
        if (swiper.isEnd) {
          swiper.slideTo(0);
        } else {
          swiper.slideNext();
        }
      }
    }, 1000);

    return () => {
      clearInterval(autoplayInterval);
    };
  }, []);

  return (
    <>
      <h1 className="text-center mt-20 mb-10 text-4xl font-bold">
        Reviews by our Students
      </h1>
      <Swiper
        ref={swiperRef}
        spaceBetween={50}
        // slidesPerView={1}
        breakpoints={{
          // Responsive breakpoints
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
        loop={true}
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id}>
            <div className="h-[500px] lg:h-[660px] mb-20 max-w-md mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
              <div className="py-4 px-6">
                <h2 className="text-gray-800 text-2xl font-bold">
                  {review.title}
                </h2>
                <p className="mt-2 text-gray-600">{review.content}</p>
                <div className="mt-4">
                  <span className="text-gray-600">Rating: </span>
                  <span className="text-yellow-500">{review.rating}</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default CustomersReview;
