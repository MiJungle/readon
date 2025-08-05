import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useAtom } from "jotai";
import { bookFormDataAtom } from "@/atoms/bookFormData";
import {
  FormContainer,
  FormGroup,
  Label,
  Input,
  Select,
  ErrorText,
} from "../Form/Form.styled";

export default function Step1Form() {
  const [bookFormData] = useAtom(bookFormDataAtom);
  const {
    control,
    formState: { errors },
    watch,
    reset,
  } = useFormContext();

  useEffect(() => {
    reset({
      title: bookFormData.title ?? "",
      author: bookFormData.author ?? "",
      status: bookFormData.status ?? "",
      startDate: bookFormData.startDate ?? "",
      endDate: bookFormData.endDate ?? "",
      publishDate: bookFormData.publishDate ?? "",
    });
  }, [bookFormData, reset]);

  const watchedStatus = watch("status");
  const watchedPublishDate = watch("publishDate");
  const watchedStartDate = watch("startDate");

  return (
    <FormContainer>
      <h1>도서 기본 정보</h1>
      <p>책의 기본 정보를 입력해주세요.</p>

        <FormGroup>
          <Label>도서 제목 *</Label>
          <Controller
            name="title"
            control={control}
            rules={{ required: "도서 제목을 입력해주세요" }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="도서 제목을 입력하세요"
                className={errors.title ? "error" : ""}
              />
            )}
          />
            {errors.title && <ErrorText>{errors.title.message as string}</ErrorText>}
        </FormGroup>

        <FormGroup>
          <Label>저자 *</Label>
          <Controller
            name="author"
            control={control}
            rules={{ required: "저자를 입력해주세요" }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="저자명을 입력하세요"
                className={errors.author ? "error" : ""}
              />
            )}
          />
          {errors.author && <ErrorText>{errors.author.message as string}</ErrorText>}
        </FormGroup>

        <FormGroup>
          <Label>출판일 *</Label>
          <Controller
            name="publishDate"
            control={control}
            rules={{
              required: "출판일을 입력해주세요",
            }}
            render={({ field }) => (
              <Input
                {...field}
                type="date"
                className={errors.publishDate ? "error" : ""}
              />
            )}
          />
          {errors.publishDate && (
            <ErrorText>{errors.publishDate.message as string}</ErrorText>
          )}
        </FormGroup>

        <FormGroup>
          <Label>독서 상태 *</Label>
          <Controller
            name="status"
            control={control}
            rules={{ required: "독서 상태를 선택해주세요" }}
            render={({ field }) => (
              <Select {...field} className={errors.status ? "error" : ""}>
                <option value="">상태를 선택하세요</option>
                <option value="want-to-read">읽고 싶은 책</option>
                <option value="reading">읽는 중</option>
                <option value="completed">완독</option>
                <option value="paused">보류 중</option>
              </Select>
            )}
          />
          {errors.status && <ErrorText>{errors.status.message as string}</ErrorText>}
        </FormGroup>

        {["reading", "paused", "completed"].includes(watchedStatus) && (
          <>
            <FormGroup>
              <Label>시작일</Label>
              <Controller
                name="startDate"
                control={control}
                rules={{
                  required: "시작일을 입력해주세요",
                  validate: (start: string) => {
                    if (!watchedPublishDate || !start) return true;
                    const publishDate = new Date(watchedPublishDate);
                    const startDate = new Date(start);
                    return (
                      startDate >= publishDate ||
                      "시작일은 출판일 보다 이전일 수 없습니다."
                    );
                  },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="date"
                    className={errors.startDate ? "error" : ""}
                  />
                )}
              />
              {errors.startDate && (
                <ErrorText>{errors.startDate.message as string}</ErrorText>
              )}
            </FormGroup>

            {watchedStatus === "completed" && (
              <FormGroup>
                <Label>종료일</Label>
                <Controller
                  name="endDate"
                  control={control}
                  rules={{
                    required: "종료일을 입력해주세요",
                    validate: (end: string) => {
                      if (!watchedStartDate || !end) return true;
                      const startDate = new Date(watchedStartDate);
                      const endDate = new Date(end);
                      return (
                        startDate <= endDate ||
                        "종료일은 시작일보다 이전일 수 없습니다."
                      );
                    },
                  }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="date"
                      className={errors.endDate ? "error" : ""}
                    />
                  )}
                />
                {errors.endDate && (
                  <ErrorText>{errors.endDate.message as string}</ErrorText>
                )}
              </FormGroup>
            )}
          </>
        )}


    </FormContainer>
  );
}
