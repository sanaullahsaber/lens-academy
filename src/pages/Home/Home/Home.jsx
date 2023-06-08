import React from 'react';
import SliderSection from '../SliderSection/SliderSection';
import PopularClassesSection from '../PopularClassesSection/PopularClassesSection';
import PopularInstructors from '../PopularInstructors/PopularInstructors';

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <SliderSection></SliderSection>
      <PopularClassesSection></PopularClassesSection>
      <PopularInstructors></PopularInstructors>
    </div>
  );
};

export default Home;