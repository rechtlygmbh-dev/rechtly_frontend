import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './BenefitsSection.css';

const BenefitsSection = ({ benefits }) => {
  return (
    <section className="benefits-section">
      <div className="benefits-container">
        <div className="benefits-header">
          <h2>Ihre Vorteile mit Rechtly </h2>
          <p className="benefits-description">Entdecken Sie die Vorteile unserer Dienstleistungen.</p>
        </div>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={3}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            }
          }}
        >
          {benefits.map((benefit, index) => (
            <SwiperSlide key={index} className="benefit-card">
              <div className="benefit-image">
                <img src={benefit.image} alt={benefit.title} />
              </div>
              <div className="benefit-content">
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default BenefitsSection; 