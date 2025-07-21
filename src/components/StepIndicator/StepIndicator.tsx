import { StepIndicatorWrapper, Step, StepNumber } from "./StepIndicator.styled";

interface StepIndicatorProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

export default function StepIndicator({
  currentStep,
  setCurrentStep,
}: StepIndicatorProps) {
  return (
    <StepIndicatorWrapper>
      {[1, 2, 3, 4, 5].map((step) => (
        <Step
          key={step}
          onClick={() => setCurrentStep(step)}
        >
          <StepNumber
            isActive={currentStep >= step}
            isCurrent={currentStep === step}
          >
            {step}
          </StepNumber>
        </Step>
      ))}
    </StepIndicatorWrapper>
  );
}
