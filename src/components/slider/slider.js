import styles from './slider.module.scss'
import {useState} from 'react';
import SwipeableViews from 'react-swipeable-views';
import {Image } from 'semantic-ui-react'



export default function slider ({images, dots= true, height}) {

  const [swipeableActions, setSwipeableActions] = useState();
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSlideChange = (step) => {
    setCurrentSlide(step);
  };

  return (
        <div className= {styles.slider} >
            <SwipeableViews
                enableMouseEvents
                action={actions => setSwipeableActions(actions)}
                resistance
                index= {currentSlide}
                onChangeIndex={handleSlideChange}
                // animateHeight
            >
            {
                images && images.length > 0 ?
                images.map((img, index) => (
                    // <div className= {styles.slider_slides} key= {index}>
                        <img src={img.url || ''} key= {index}  />
                    // </div>
                )) :
                <Placeholder fluid className= {styles.slider_placeholder} inverted= {UI.dark ? true : false}>
                  <Placeholder.Image />
                </Placeholder>
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