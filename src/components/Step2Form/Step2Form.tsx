import { useEffect } from "react";
import { FormContainer, Select } from "../Form/Form.styled";
import { Controller, useFormContext } from "react-hook-form";
import { FormGroup, ErrorText } from "../Form/Form.styled";
import { useAtom } from "jotai";
import { bookFormDataAtom } from "@/atoms/bookFormData";
import StarRating from "../StarRating/StarRating";

export default function Step2Form() {
  const {
    control,
    formState: { errors },
    reset,
    watch,
  } = useFormContext();
  const [bookFormData] = useAtom(bookFormDataAtom);

  useEffect(() => {
    reset({
      recommend: bookFormData.recommend ?? "",
      rating: bookFormData.rating ?? "",
    });
  }, [bookFormData, reset]);

  return (
    <FormContainer>
      <h1>도서 추천 여부, 별점</h1>
      <FormGroup>
        <Controller
          name="recommend"
          control={control}
          rules={{ required: "추천 여부를 선택해주세요" }}
          render={({ field }) => (
            <Select {...field} className={errors.recommend ? "error" : ""}>
              <option value="">추천 여부를 선택하세요</option>
              <option value="yes">추천</option>
              <option value="no">비추천</option>
            </Select>
          )}
        />
        {errors.recommend && (
          <ErrorText>{errors.recommend.message as string}</ErrorText>
        )}
      </FormGroup>
      <FormGroup>
        <Controller
          name="rating"
          control={control}
          rules={{ required: "별점을 선택해주세요" }}
          render={({ field }) => (
            <StarRating value={field.value} onChange={field.onChange} />
          )}
        />
        {errors.rating && (
          <ErrorText>{errors.rating.message as string}</ErrorText>
        )}
      </FormGroup>
    </FormContainer>
  );
}
