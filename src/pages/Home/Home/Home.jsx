import React from 'react';
import SliderSection from '../SliderSection/SliderSection';
import PopularClassesSection from '../PopularClassesSection/PopularClassesSection';

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <SliderSection></SliderSection>
      <PopularClassesSection></PopularClassesSection>
    </div>
  );
};

export default Home;