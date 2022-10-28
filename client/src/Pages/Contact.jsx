import React, { useState } from "react";

import Metatag from "../Components/Metatag";
import ContactInfo from "../Components/MultiStepForm/ContactInfo";
import FormContainer from "../Components/MultiStepForm/FormContainer";
import ContactClient from "../Components/MultiStepForm/ContactClient";
import ContactAccept from "../Components/MultiStepForm/ContactAccept";

function Contact() {
    const [step, setStep] = useState(0);

    const previousStep = () => setStep(step - 1);
    const nextStep = () => setStep(step + 1);
    const resetStep = () => setStep(0);

    return (
        <>
            <Metatag title="위브먼트 | 문의" />
            <div className="default-container">
                <FormContainer currentStep={step}>
                    {step === 0 && <ContactInfo nextStep={nextStep} />}
                    {step === 1 && (
                        <ContactClient nextStep={nextStep} previousStep={previousStep} />
                    )}
                    {step === 2 && (
                        <ContactAccept
                            nextStep={nextStep}
                            previousStep={previousStep}
                            resetStep={resetStep}
                        />
                    )}
                </FormContainer>
            </div>
        </>
    );
}

export default Contact;
