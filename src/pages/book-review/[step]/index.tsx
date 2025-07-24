import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import StepIndicator from "@/components/StepIndicator";
import Step1Form from "@/components/Step1Form";
import Step2Form from "@/components/Step2Form";
import Step3Form from "@/components/Step3Form";
import Step4Form from "@/components/Step4Form";
import Step5Form from "@/components/Step5Form";
import NavigationButton from "@/components/NavigationButton";
import { useAtom } from "jotai";
import { useResetAtom } from "jotai/utils";
import { bookFormDataAtom, BookFormData } from "@/atoms/bookFormData";
import { useForm, FormProvider } from "react-hook-form";
import Preview from "@/components/Preview";
import {
  ContentsContainer,
  FormWrapper,
  PreviewWrapper,
} from "@/components/Form/Form.styled";

export default function BookReviewStep1({
  showPreview,
}: {
  showPreview: boolean;
}) {
  const router = useRouter();
  const { step } = router.query;
  const initialStep = 1;
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [, setBookFormData] = useAtom(bookFormDataAtom);
  const resetBookFormDataAtom = useResetAtom(bookFormDataAtom);

  const methods = useForm<BookFormData>({
    defaultValues: {
      title: "",
      author: "",
      status: "",
      startDate: "",
      endDate: "",
      publishDate: "",
      recommend: "",
      rating: "",
      review: "",
      quotes: [],
      totalPages: "",
      share: "",
    },
  });

  useEffect(() => {
    if (step && typeof step === "string") {
      const stepNumber = Number(step.split("-")[1]);
      setCurrentStep(stepNumber);
    }
  }, [step]);

  const renderStep = () => {
    switch (step) {
      case "step-1":
        return <Step1Form />;
      case "step-2":
        return <Step2Form />;
      case "step-3":
        return <Step3Form />;
      case "step-4":
        return <Step4Form />;
      case "step-5":
        return <Step5Form />;
      default:
        return <Step1Form />;
    }
  };

  const stepFields: Record<number, (keyof BookFormData)[]> = {
    1: ["title", "author", "status", "startDate", "endDate", "publishDate"],
    2: ["recommend", "rating"],
    3: ["review"],
    4: ["quotes", "totalPages"],
    5: ["share"],
  };

  async function handleNextClick() {
    const fieldsToCheck = stepFields[currentStep as keyof typeof stepFields];
    const isStepValid = await methods.trigger(fieldsToCheck);

    if (!isStepValid) return;

    if (currentStep === 5) {
      resetBookFormDataAtom();
      router.push("/book-review/result");
      return;
    }

    setCurrentStep(currentStep + 1);
    router.push(`/book-review/step-${currentStep + 1}`);
  }

  async function handlePrevClick() {
    setCurrentStep(currentStep - 1);
    router.push(`/book-review/step-${currentStep - 1}`);
  }

  const onSubmit = (data: BookFormData) => {
    setBookFormData((prev) => ({
      ...prev,
      ...data,
    }));
    console.log("폼 데이터:", data);
  };

  return (
    <div>
      <StepIndicator
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />

      <ContentsContainer>
        <FormWrapper>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              {renderStep()}
              <NavigationButton
                showNextButton={[1, 2, 3, 4, 5].includes(currentStep)}
                showPrevButton={[2, 3, 4, 5].includes(currentStep)}
                onNextClick={handleNextClick}
                onPrevClick={handlePrevClick}
              />
            </form>
          </FormProvider>
        </FormWrapper>
        <PreviewWrapper>{showPreview && <Preview />}</PreviewWrapper>
      </ContentsContainer>
    </div>
  );
}
