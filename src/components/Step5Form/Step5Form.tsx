import { useEffect } from "react";
import { FormContainer } from "../Form/Form.styled";
import { Controller, useFormContext } from "react-hook-form";
import {
  FormGroup,
  ErrorText,
  RadioGroup,
  RadioLabel,
  RadioInput,
} from "../Form/Form.styled";
import { useAtom } from "jotai";
import { bookFormDataAtom } from "@/atoms/bookFormData";

export default function Step5Form() {
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
      <h1>공개 여부</h1>
      <p>리뷰를 누구와 공유하시겠어요?</p>

      <FormGroup>
        <Controller
          name="share"
          control={control}
          rules={{
            required: "공개 여부를 선택해주세요.",
          }}
          render={({ field }) => (
            <RadioInputGroup
              {...field}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        {errors.share && (
          <ErrorText>{errors.share.message as string}</ErrorText>
        )}
      </FormGroup>
    </FormContainer>
  );
}

function RadioInputGroup({ ...field }) {
  return (
    <RadioGroup>
      <RadioLabel>
        <RadioInput
          type="radio"
          name="review"
          value="public"
          checked={field.value === "public"}
          onChange={field.onChange}
        />
        <RadioLabel>🔓 모두에게 공개 :</RadioLabel>
        <p>리뷰가 피드와 검색에 노출됩니다.</p>
      </RadioLabel>
      <RadioLabel>
        <RadioInput
          type="radio"
          name="review"
          value="follower"
          checked={field.value === "follower"}
          onChange={field.onChange}
        />
        <RadioLabel>👥 팔로워에게만 공개 :</RadioLabel>
        <p>나를 팔로우한 사용자만 볼 수 있어요.</p>
      </RadioLabel>
      <RadioLabel>
        <RadioInput
          type="radio"
          name="review"
          value="private"
          checked={field.value === "private"}
          onChange={field.onChange}
        />
        <RadioLabel>🔒 비공개 :</RadioLabel>
        <p>나만 볼 수 있어요.</p>
      </RadioLabel>
    </RadioGroup>
  );
}
