import styles from './coverSlider.module.scss'
import {useState} from 'react';
import SwipeableViews from 'react-swipeable-views';
import {Image, Placeholder } from 'semantic-ui-react'
import {GlobalState} from '../../context/globalState'



export default function slider ({images, dots= true}) {

  const [swipeableActions, setSwipeableActions] = useState();
  const {UI} = GlobalState()
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSlideChange = (step) => {
    setCurrentSlide(step);
  };

  return (
        <div className= {styles.slider_container} >
            <SwipeableViews
                className= {styles.slider}
                enableMouseEvents
                action={actions => setSwipeableActions(actions)}
                resistance
                index= {currentSlide}
                onChangeIndex={handleSlideChange}
            >
            {
                images && images.length > 0 ?
                images.map((img, index) => (

                  <div className= {styles.slides} key= {index} >
                    <Image src={img.url || ''} />
                  </div>

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