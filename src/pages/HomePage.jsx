import React from 'react';
import SEO from '../components/common/SEO';
import HeroSection from '../components/home/HeroSection';
import AboutSamitiSection from '../components/home/AboutSamitiSection';
import FeaturedEventSection from '../components/home/FeaturedEventSection';
import ChiefGuestsSection from '../components/home/ChiefGuestsSection';
import LeadershipSection from '../components/home/LeadershipSection';
import DonationPreviewSection from '../components/home/DonationPreviewSection';
import LocationSection from '../components/home/LocationSection';

const HomePage = () => {
  return (
    <>
      <SEO />
      <div className="space-y-0">
        <HeroSection />
        <AboutSamitiSection />
        <FeaturedEventSection />
        <ChiefGuestsSection />
        <LeadershipSection />
        <DonationPreviewSection />
        <LocationSection />
      </div>
    </>
  );
};

export default HomePage;
