import styles from './slider.module.scss'
import {useState} from 'react';
import SwipeableViews from 'react-swipeable-views';


export default function slider ({images, dots= true, height, animateHeight= true}) {

  const [swipeableActions, setSwipeableActions] = useState();
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSlideChange = (step) => {
    setCurrentSlide(step);
  };

  return (
        <div className= {styles.slider_container} >
            <SwipeableViews
                enableMouseEvents
                action={actions => setSwipeableActions(actions)}
                resistance
                index= {currentSlide}
                onChangeIndex={handleSlideChange}
                animateHeight= {animateHeight}
                id= {styles.slides}
            >
              {
                images && images.length > 0 && 
                images.map((img, index) => <img src={img.url || ''} key= {index} style= {{ minHeight: height }} /> ) 
              }
            </SwipeableViews>

            {/* Counter --- */}
            {dots && images && (
              <div className= {styles.dots}>
                {images.map((img, index) => {
                  return (
                    <button
                      key={index}
                      onClick={() => handleSlideChange(index)}
                      className={currentSlide === index ? styles.dot_active : styles.dot }
                    />
                    )
                  })}
                </div>
              )}

              {/* Counter --- */}
              {
                images && images.length > 0 && 
                <div className= {styles.slider_counter}>
                    {`${currentSlide + 1} / ${images.length}`}
                </div>
              }
        </div>
  );
}