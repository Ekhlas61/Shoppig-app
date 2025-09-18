import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { img } from './img/data'
import classes from './Carousel.module.css'

const CarouselEffect = () => {
  return (
    <div>
      <Carousel
        autoPlay
        infiniteLoop
        showIndicators={false}
        showThumbs={false}
        showStatus={false}
        interval={3000}
      >
        {img.map((imageItemLink, index) => (
          <div key={index}>
            <img src={imageItemLink} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </Carousel>
      <div className={classes.hero__img}></div>
    </div>
  )
}

export default CarouselEffect