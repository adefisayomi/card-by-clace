import {useState} from "react"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import styles from "./slider.module.css"
import { Image, Placeholder } from "semantic-ui-react"
import { GlobalState } from "../../context/globalState"

export default function slider ({images, dots= true}) {

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
                <Image src= {img.url || ''} id= {img.id} fluid />
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




// import React from 'react';
// import { makeStyles, useTheme } from '@material-ui/core/styles';
// import MobileStepper from '@material-ui/core/MobileStepper';
// import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
// import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
// import SwipeableViews from 'react-swipeable-views';
// import { autoPlay } from 'react-swipeable-views-utils';

// const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

// const tutorialSteps = [
//   {
//     label: 'San Francisco – Oakland Bay Bridge, United States',
//     imgPath:
//       'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
//   },
//   {
//     label: 'Bird',
//     imgPath:
//       'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
//   },
//   {
//     label: 'Bali, Indonesia',
//     imgPath:
//       'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80',
//   },
//   {
//     label: 'NeONBRAND Digital Marketing, Las Vegas, United States',
//     imgPath:
//       'https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&w=400&h=250&q=60',
//   },
//   {
//     label: 'Goč, Serbia',
//     imgPath:
//       'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
//   },
// ];



// export default function slider ({images, dots= true}) {

//   const theme = useTheme();
//   const [activeStep, setActiveStep] = React.useState(0);
//   const maxSteps = tutorialSteps.length;

//   const handleNext = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   const handleStepChange = (step= number) => {
//     setActiveStep(step);
//   };

//   return (
//     <div id= {styles.slider}>
//       {
//         images && images.length > 0 ? 
//           <AutoPlaySwipeableViews
//             // axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
//             axis= 'x'
//             index={activeStep}
//             // onChangeIndex={handleStepChange}
//             enableMouseEvents
//           >
//             {images.map((img, index) => (
//               <div key={index}>
//                 {/* {Math.abs(activeStep - index) <= 2 ? ( */}
//                   <img id={styles.slider_img} src={img.url || ''} />
//                 {/* ) : null} */}
//               </div>
//             ))}
//           </AutoPlaySwipeableViews> : 

          // <Placeholder fluid className= {styles.slider_placeholder} inverted= {UI.dark ? true : false}>
          //   <Placeholder.Image />
          // </Placeholder>
//       }

//       {/* {
//         dots && slider && 
//         <div className= {styles.dots}>
//            {[...Array(slider.details().size).keys()].map((idx) => {
//               return (
//                 <button
//                   key={idx}
//                   onClick={() => {
//                     slider.moveToSlideRelative(idx)
//                   }}
//                   className={currentSlide === idx ? styles.dot_active : styles.dot }
//                 />
//               )
//           })}
//         </div>
//       } */}
         

//       {/* <MobileStepper
//         steps={maxSteps}
//         position="static"
//         variant="text"
//         activeStep={activeStep}
//         nextButton={
//           <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
//             Next
//             {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
//           </Button>
//         }
//         backButton={
//           <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
//             {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
//             Back
//           </Button>
//         }
//       /> */}
//     </div>
//   );
// }