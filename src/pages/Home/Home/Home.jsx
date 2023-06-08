import React from 'react';
import SliderSection from '../SliderSection/SliderSection';
import PopularClassesSection from '../PopularClassesSection/PopularClassesSection';
import PopularInstructors from '../PopularInstructors/PopularInstructors';
import CustomersReview from '../CustomersReview/CustomersReview';

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <SliderSection></SliderSection>
      <PopularClassesSection></PopularClassesSection>
      <PopularInstructors></PopularInstructors>
      <CustomersReview></CustomersReview>
    </div>
  );
};

export default Home;