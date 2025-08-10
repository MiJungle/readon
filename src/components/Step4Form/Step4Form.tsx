import { ErrorText, Label } from "../Form/Form.styled";
import {
  Control,
  Controller,
  FieldErrors,
  useFieldArray,
  useFormContext,
} from "react-hook-form";
import { BookFormData } from "@/atoms/bookFormData";
import {
  QuoteWrapper,
  QuoteInput,
  RemoveButton,
  AddButton,
  TotalPageInput,
  FlexRow,
  Box,
} from "./Step4Form.styled";
import RHFCommaSeparatedInput from "../RHFCommaSeparatedInput/RHFCommaSeparatedInput";

interface QuoteFieldsProps {
  control: Control<BookFormData>;
  errors: FieldErrors<BookFormData>;
}

export default function Step4Form() {
  const {
    control,
    formState: { errors },
  } = useFormContext<BookFormData>();
  console.log("root control", control)

  return (
    <div>
      <FlexRow>
        <h1>인용구</h1>
        <TotalPageInput>
          <Label>이 책의 전체 페이지 수</Label>
          <RHFCommaSeparatedInput
            name="totalPages"
            min={1}
            placeholder="전체 페이지 수"
            rules={{
              required: "전체 페이지 수를 입력해주세요",
              min: { value: 1, message: "1페이지 이상이어야 합니다" },
              pattern: {
                value: /^[0-9]+$/,
                message: "숫자만 입력해주세요",
              },
            }}
          />
        </TotalPageInput>
      </FlexRow>
      <Box>
        <h3>인용구 입력</h3>
        <QuoteFields
          control={control as Control<BookFormData>}
          errors={errors}
        />
      </Box>
    </div>
  );
}

function QuoteFields({ control, errors }: QuoteFieldsProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "quotes",
  });

  const { watch } = useFormContext();
  const totalPages = watch("totalPages");

  return (
    <>
      {fields.map((field, idx) => (
        <QuoteWrapper key={field.id}>
          <Controller
            name={`quotes.${idx}.text`}
            control={control}
            rules={{
              required: "인용구를 입력해주세요",
              minLength: { value: 5, message: "5자 이상 입력해주세요" },
            }}
            render={({ field }) => (
              <QuoteInput {...field} placeholder={`인용구 #${idx + 1}`} />
            )}
          />
          {errors.quotes?.[idx]?.text && (
            <ErrorText>{errors.quotes[idx].text.message as string}</ErrorText>
          )}

          {(fields.length > 1 || idx > 0) && (
            <RHFCommaSeparatedInput
              name={`quotes.${idx}`}
              min={1}
              placeholder="페이지 번호"
              rules={{
                required: {
                  value: true,
                  message: "페이지 번호를 입력해주세요",
                },
                min: { value: 1, message: "1페이지 이상이어야 합니다" },
                max: {
                  value: totalPages,
                  message: "최대 페이지 번호를 초과했습니다",
                },
                pattern: {
                  value: /^[0-9]+$/,
                  message: "숫자만 입력해주세요",
                },
              }}
            />
          )}
          {/* <ErrorText>
            {errors.quotes?.[idx]?.page && errors.quotes[idx].page.message}
          </ErrorText> */}
          <RemoveButton type="button" onClick={() => remove(idx)}>
            삭제
          </RemoveButton>
        </QuoteWrapper>
      ))}
      <AddButton type="button" onClick={() => append({ text: "", page: 0 })}>
        + 인용구 추가
      </AddButton>
    </>
  );
}
