import { useEffect } from "react";
import { FormContainer } from "../Form/Form.styled";
import { Controller, useFormContext } from "react-hook-form";
import { FormGroup, ErrorText, Input, TextArea } from "../Form/Form.styled";
import { useAtom } from "jotai";
import { bookFormDataAtom } from "@/atoms/bookFormData";

export default function Step3Form() {
  const {
    control,
    formState: { errors },
    reset,
  } = useFormContext();
  const [bookFormData] = useAtom(bookFormDataAtom);

  useEffect(() => {
    reset({
      review: bookFormData.review ?? "",
    });
  }, [bookFormData, reset]);

  return (
    <FormContainer>
      <h1>독후감</h1>
      <FormGroup>
        <Controller
          name="review"
          control={control}
          rules={{
            required: {
              value:
                parseInt(bookFormData.rating) <= 1 ||
                parseInt(bookFormData.rating) >= 5
                  ? true
                  : false,
              message: "독후감을 작성해주시기 발바니다.",
            },
            minLength: {
              value: 100,
              message: "최소 100자 이상을 작성해주시기 바랍니다",
            },
          }}
          render={({ field }) => (
            <TextArea {...field} className={errors.review ? "error" : ""} />
          )}
        />
        {errors.review && (
          <ErrorText>{errors.review.message as string}</ErrorText>
        )}
      </FormGroup>
    </FormContainer>
  );
}
