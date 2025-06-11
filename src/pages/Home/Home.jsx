import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import ScrollAnimation from '../../components/common/ScrollAnimation';
import ServiceSection from '../../components/sections/ServiceSection';
import FAQSection from '../../components/sections/FAQSection';
import ProcessSection from '../../components/sections/ProcessSection';
import CTASection from '../../components/sections/CTASection';
import ApproachSection from '../../components/sections/ApproachSection';
import FeatureSection from '../../components/sections/FeatureSection';
import ExpertiseSection from '../../components/sections/ExpertiseSection';
import PricingSection from '../../components/sections/PricingSection';
import TestimonialSection from '../../components/sections/TestimonialSection';
import HeroSection from '../../components/sections/HeroSection/HeroSection';
import './Home.css';

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="home-page">
      <HeroSection />
      <ProcessSection />
      <ServiceSection />
      <CTASection />
      <ApproachSection />
      <FeatureSection />
      <ExpertiseSection />
      <ScrollAnimation>
        <PricingSection />
      </ScrollAnimation>
      <TestimonialSection />
      <ScrollAnimation>
        <FAQSection />
      </ScrollAnimation>
    </div>
  );
};

export default Home;