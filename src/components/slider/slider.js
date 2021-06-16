import {useState} from "react"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import styles from "./slider.module.css"
import { Image, Placeholder } from "semantic-ui-react"
import { GlobalState } from "../../context/globalState"

export default ({images, dots= true}) => {

  const {UI} = GlobalState()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [sliderRef, slider] = useKeenSlider({
    initial: 0,
    slideChanged(s) {
      setCurrentSlide(s.details().relativeSlide)
    },
  })

  return (
      <div className= {styles.slider_container}>
        <div ref={sliderRef} className= {`keen-slider ${styles.slider}`} >
          {
            images && images.length > 0 ? 
            images.map((img, index) => (
              <div key= {index} className= {`keen-slider__slide ${styles.slides}`}>
                <Image src= {img.url || ''} id= {img.id} />
              </div>
            )) : 
            <Placeholder fluid className= {styles.slider_placeholder} inverted= {UI.dark ? true : false}>
              <Placeholder.Image />
            </Placeholder>
          }
        </div>
      
        {dots && slider && (
        <div className= {styles.dots}>
          {[...Array(slider.details().size).keys()].map((idx) => {
            return (
              <button
                key={idx}
                onClick={() => {
                  slider.moveToSlideRelative(idx)
                }}
                className={currentSlide === idx ? styles.dot_active : styles.dot }
              />
            )
          })}
        </div>
      )}
    </div>
  )
}