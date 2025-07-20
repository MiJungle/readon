import StepIndicator from "@/pages/components/StepIndicator";
import Step1Form from "@/pages/components/Step1Form";

export default function BookReviewStep1() {
    return (
        <div>
            <StepIndicator currentStep={1} setCurrentStep={() => {}} />
            <Step1Form></Step1Form>
        </div>
    );
}