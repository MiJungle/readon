import { useEffect } from "react";
import { ErrorText, Label } from "../Form/Form.styled";
import {
  Control,
  Controller,
  FieldErrors,
  useFieldArray,
  useFormContext,
} from "react-hook-form";
import { useAtom } from "jotai";
import { bookFormDataAtom, BookFormData } from "@/atoms/bookFormData";
import {
  QuoteWrapper,
  QuoteInput,
  RemoveButton,
  AddButton,
  PageInput,
  TotalPageInput,
  FlexRow,
  Box,
} from "./Step4Form.styled";

interface QuoteFieldsProps {
  control: Control<BookFormData>;
  errors: FieldErrors<BookFormData>;
}

export default function Step4Form() {
  const {
    control,
    formState: { errors },
    reset,
  } = useFormContext<BookFormData>();
  const [bookFormData] = useAtom(bookFormDataAtom);

  useEffect(() => {
    reset({
      totalPages: bookFormData.totalPages ?? "",
      quotes: bookFormData.quotes ?? [],
    });
  }, [bookFormData, reset]);

  return (
    <div>
      <FlexRow>
        <h1>인용구</h1>
        <TotalPageInput>
          <Label>이 책의 전체 페이지 수</Label>
          <Controller
            name="totalPages"
            control={control}
            }}
            render={({ field }) => (
              <PageInput
                type="number"
                min={1}
                placeholder="전체 페이지 수"
                {...field}
              />
            )}
          />
          {errors.totalPages && (
            <div style={{ color: "red", marginBottom: 12 }}>
              {errors.totalPages.message as string}
            </div>
          )}
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
            <Controller
              name={`quotes.${idx}.page`}
              control={control}
              render={({ field }) => (
                <PageInput
                  type="number"
                  min={1}
                  placeholder="페이지 번호"
                  {...field}
                />
              )}
            />
          )}
          <ErrorText>
            {errors.quotes?.[idx]?.page && errors.quotes[idx].page.message}
          </ErrorText>
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
