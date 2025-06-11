import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './TestimonialsGutachter.css';

const testimonials = [
  {
    id: 1,
    text: "Rechtly hat mir geholfen, meinen Kundenstamm zu verdoppeln – ohne Akquise-Aufwand!",
    author: "Hüseyin K. | Berlin",
    rating: "⭐️⭐️⭐️⭐️⭐️",
    image: "/assets/images/Mann1 testimonials.png"
  },
  {
    id: 2,
    text: "Die digitale Abwicklung ist genial – keine Zettelwirtschaft mehr!",
    author: "Michaela S. | Hamburg",
    rating: "⭐️⭐️⭐️⭐️⭐️",
    image: "/assets/images/Frau 1 testimonials.png"
  },
  {
    id: 3,
    text: "Schnelle Aufträge & faire Bezahlung – genau das, was ich gesucht habe!",
    author: "Markus B. | München",
    rating: "⭐️⭐️⭐️⭐️⭐️",
    image: "/assets/images/Mann2 testimonials.png"
  }
];

const TestimonialsGutachter = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="testimonial">
      <div className="testimonial__container">
        <div className="testimonial__content">
          <motion.div 
            className="testimonial__left"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="testimonial__label">Kundenstimmen</span>
            <h2>Was unsere KFZ-Gutachter<span className="testimonial__highlight">über Rechtly sagen</span></h2>
          </motion.div>

          <motion.div 
            className="testimonial__right"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="testimonial__circle">
              <div className="testimonial__slider">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={currentIndex}
                    className="testimonial__item"
                    initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="testimonial__image">
                      <img src={testimonials[currentIndex].image} alt={testimonials[currentIndex].author} />
                    </div>
                    <div className="testimonial__text">
                      <p>"{testimonials[currentIndex].text}"</p>
                      <span className="testimonial__author">{testimonials[currentIndex].author}</span>
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="testimonial__navigation">
                  <div className="testimonial__dots">
                    {testimonials.map((_, idx) => (
                      <button
                        key={idx}
                        className={`dot ${currentIndex === idx ? 'active' : ''}`}
                        onClick={() => {
                          setDirection(idx > currentIndex ? 1 : -1);
                          setCurrentIndex(idx);
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsGutachter; 