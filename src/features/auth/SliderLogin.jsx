import React, { useState, useEffect } from 'react';
import './login.css';

const SliderLogin = () => {
  const [currentSlide, setCurrentSlide] = useState(1);

  const moveSlider = (index) => {
    const images = document.querySelectorAll('.image');
    images.forEach((img) => img.classList.remove('show'));

    const currentImage = document.querySelector(`.img-${index}`);
    currentImage.classList.add('show');

    const textSlider = document.querySelector('.text-group');
    textSlider.style.transform = `translateY(${-(index - 1) * 2.2}rem)`;

    setCurrentSlide(index);
  };

  const bullets = [1, 2, 3];

  useEffect(() => {
    const interval = setInterval(() => {
      let nextSlide = currentSlide + 1;
      if (nextSlide > bullets.length) {
        nextSlide = 1;
      }
      moveSlider(nextSlide);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <div className="carousel">
      <div className="images-wrapper">
        <img src="login_img/image1.jpg" className={`image img-1 ${currentSlide === 1 ? 'show' : ''}`} alt="" />
        <img src="login_img/image2.jpg" className={`image img-2 ${currentSlide === 2 ? 'show' : ''}`} alt="" />
        <img src="login_img/image3.jpg" className={`image img-3 ${currentSlide === 3 ? 'show' : ''}`} alt="" />
      </div>

      <div className="text-slider">
        <div className="text-wrap">
          <div className="text-group">
            <h2 className="h2-login-imgs">Voyages virtuels pour l'apprentissage</h2>
            <h2 className="h2-login-imgs">Des événements importants</h2>
            <h2 className="h2-login-imgs">Des opportunités éducatives</h2>
          </div>
        </div>

        <div className="bullets">
          {bullets.map((bullet) => (
            <span
              key={bullet}
              className={bullet === currentSlide ? 'active' : ''}
              data-value={bullet}
              onClick={() => moveSlider(bullet)}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SliderLogin;
