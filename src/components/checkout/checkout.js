import styles from './style/checkout.module.css'
import { Button} from 'semantic-ui-react'
import {GlobalState} from '../../context/globalState'
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import router, { useRouter } from 'next/router'
import ShippingForm from './shipping'
import CardLayout from '../re-usables/cardLayout'
import { useState } from 'react';
import LoadingPage from '../re-usables/loader'
import { useEffect } from 'react';





export default function checkout ({children}) {


  const stages = ['Shipping details', 'Billing', 'Validate order']
  const router = useRouter()
  const {UI, cart, setAlert, checkoutAction, user} = GlobalState()
  const [form, setForm] = useState({name: '', email: '', address: {}, phone: '', cart: cart})
  const [loading, setLoading] = useState(false)
  const getForm = (e) => setForm({...form, [e.target.name]: e.target.value})
  const getAddress = (e) => setForm({...form, address: {...form.address, [e.target.name]: e.target.value}})
  const getOption = (e, {value}) => setForm({...form, address: {...form.address, state: value}})

  const [activeStep, setActiveStep] = useState(0);
  const steps = stages.length - 1;

  const handleBack = () => {
    if( activeStep > 0) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  }

  const handleSubmit = async (e) => {
      e.preventDefault()
      setLoading(true)
      try {
        const res = await checkoutAction.checkout({form})
        if (!res.success) throw new Error(res.message)
        setActiveStep(1)
        setTimeout(() => router.push(res.data), 2000)
      }
      catch(err) {
        setLoading(false)
        return setAlert({message: err.message, type: 'error'})
      }
  }

  useEffect(() => {
    if (router.asPath.split('/').includes('confirm')) {
      setActiveStep(2)
    }
  }, [router.asPath])

  return (
    <CardLayout redirect= { !cart || cart.length === 0 } width= '550px' header= 'Checkout'>
    <div className={styles.checkout} style= {{color: UI.color}}>
      <Stepper id= {styles.stepper} activeStep={activeStep} orientation="vertical" style= {{ backgroundColor: UI.bgColor, color: UI.color  }}>

        {
          stages.map((label, index) => (
            <Step key={label}>
              <StepLabel> <h1 style= {{ color: UI.color }}>{label}</h1> </StepLabel>
              <StepContent id= {styles.stepper_content}>
                  {
                      index === 0 ? 
                      <ShippingForm getAddress= {getAddress} form= {form} getForm= {getForm} getOption= {getOption} /> : 
                      index === 1 ? 
                      <LoadingPage content= 'Loading billing Page...' /> :
                      index === 2 ? children : ''
                  }
                  <div>
                    { activeStep > 0 && activeStep !== steps &&
                      <Button
                          disabled={activeStep === 0}
                          onClick={handleBack}
                          disabled= {index === 2}
                          size= 'small'
                          content= 'Back'
                      />
                    }
                    { activeStep !== steps &&
                      <Button
                        color="primary"
                        icon= {{ name: loading? 'spinner' : 'cart', loading }}
                        size= 'small'
                        disabled= {index === 2}
                        onClick= {handleSubmit}
                        content= {loading && index === 0 ? 'Processing...' :
                                  loading && index === 1 ? 'redirecting...' :
                                  loading && index === 2 ? 'validating...' :
                                  'Process order'
                                }
                      />
                    }
                    
                  </div>
              </StepContent>
            </Step>
          ))
        }
      </Stepper>
    </div>
    </CardLayout>
  );
}