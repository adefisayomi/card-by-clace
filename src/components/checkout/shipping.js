import styles from './style/shipping.module.css'
import { Button, Form, Dropdown, Divider } from 'semantic-ui-react'
import {GlobalState} from '../../context/globalState'
import {state} from '../../utils/static_files/menu'
import {useState} from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';



function getSteps() {
  return ['Shipping details', 'Billing information', 'Confirm order'];
}


export default function shipping ({form, loading, getForm, handleSubmit, getOption}) {

  const {UI} = GlobalState()
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={styles.shipping}>
      <Stepper id= {styles.stepper} activeStep={activeStep} orientation="vertical" style= {{ backgroundColor: UI.bgColor, color: UI.color  }}>

        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel> <h1 style= {{ color: UI.color }}>{label}</h1> </StepLabel>
            <StepContent id= {styles.stepper_content}>
                {
                    index === 0 ? 
                    <ShippingForm form= {form} getForm= {getForm} handleSubmit= {handleSubmit} getOption= {getOption} /> : 
                    ''
                }
               
                <div>
                  { activeStep > 0 &&
                    <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        size= 'small'
                        content= 'Back'
                    />
                  }
                  <Button
                    color="primary"
                    // onClick={handleNext}
                    icon= {{ name: loading? 'spinner' : 'cart', loading }}
                    size= 'small'
                    onClick= {handleSubmit}
                    content= {activeStep === steps.length - 1 ? 'Finish' : 'Process order'}
                  />
                </div>

            </StepContent>
          </Step>
        ))}

      </Stepper>

      {activeStep === steps.length && (
        <Paper square elevation={0}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button 
            onClick={handleReset}
            size= 'small'
            content= 'Reset'
          />
        </Paper>
      )}
    </div>
  );
}



const ShippingForm = ({form, getForm, handleSubmit, getOption}) => {

    const {UI} = GlobalState()

    return (
        <Form onSubmit= {handleSubmit} id= {styles.shipping_form}>

                <Form.Field>
                    <label htmlFor="client_id" style= {{ textTransform: 'uppercase' }}>client ID 
                        <em style= {{ textTransform: 'lowercase' }}>( skip the rest if you have your client ID )</em>
                    </label>
                    <input
                        placeholder= 'client ID'
                        name= 'client_id'
                        type= 'text'
                        value= {form.client_id || ''}
                        style= {{border: UI.border}}
                        onChange= {getForm}
                    />
                </Form.Field>

                <Divider content= 'OR' horizontal inverted= {UI.dark} />

            <Form.Group widths= '16'>
                <Form.Field width= '10'>
                    <label htmlFor="name">Name</label>
                    <input
                        placeholder= 'name...'
                        name= 'name'
                        type= 'text'
                        value= {form.name || ''}
                        style= {{border: UI.border}}
                        onChange= {getForm}
                    />
                </Form.Field>
                <Form.Field width= '8'>
                    <label htmlFor="phone">Phone</label>
                    <input
                        placeholder= 'phone number'
                        name= 'phone'
                        type= 'text'
                        value= {form.phone || ''}
                        style= {{border: UI.border}}
                        onChange= {getForm}
                    />
                </Form.Field>
            </Form.Group>

            <Form.Field>
                <label htmlFor="email">Email</label>
                <input
                    placeholder= 'email'
                    name= 'email'
                    type= 'email'
                    value= {form.email || ''}
                    style= {{border: UI.border}}
                    onChange= {getForm}
                />
            </Form.Field>

            <Form.Field>
                <label htmlFor="address">Street address</label>
                <input
                    placeholder= 'address'
                    name= 'address'
                    type= 'text'
                    value= {form.address || ''}
                    style= {{border: UI.border}}
                    onChange= {getForm}
                />
            </Form.Field>

            <Form.Field>
                <label htmlFor="state">state</label>
                <Dropdown
                    placeholder= 'state...'
                    name= 'state'
                    type= 'text'
                    selection
                    clearable
                    options= {state}
                    id= {styles.shipping_form_state}
                    value= {form.state || ''}
                    style= {{border: UI.border}}
                    onChange= {getOption}
                />
            </Form.Field>

            <Form.Field>
                <label htmlFor="note">Add a note <em>(optional)</em></label>
                <textarea
                    name= 'note'
                    type= 'text'
                    value= {form.note || ''}
                    style= {{border: UI.border}}
                    onChange= {getForm}
                    placeholder= 'add a note...'
                />
            </Form.Field>
    </Form>
    )
}