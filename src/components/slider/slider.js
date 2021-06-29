import styles from './slider.module.scss'
import {useState} from 'react';
import SwipeableViews from 'react-swipeable-views';
import { GlobalState } from '../../context/globalState';


export default function slider ({images, dots= true, height, animateHeight= true, borderRadius}) {

  const [swipeableActions, setSwipeableActions] = useState();
  const [currentSlide, setCurrentSlide] = useState(0);
  const {UI} = GlobalState()

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
                style= {{ backgroundColor: UI.bgColor }}
            >
              {
                images && images.length > 0 && 
                images.map((img, index) => <img src={img.url || ''} key= {index} style= {{ minHeight: height, borderRadius: borderRadius }} /> ) 
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