import { useForm, Controller } from "react-hook-form";
import {
  FormContainer,
  FormGroup,
  Label,
  Input,
  Select,
  SubmitButton,
  ErrorText,
} from "./Step1Form.styled";

interface BookFormData {
  title: string;
  author: string;
  status: string;
  startDate: string;
  endDate: string;
  isbn?: string;
  genre?: string;
}

export default function Step1Form() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<BookFormData>({
    defaultValues: {
      title: "",
      author: "",
      status: "",
      startDate: "",
      endDate: "",
    },
  });

  const onSubmit = (data: BookFormData) => {
    console.log("폼 데이터:", data);
  };

  const watchedStatus = watch("status");

  return (
    <FormContainer>
      <h1>도서 기본 정보</h1>
      <p>책의 기본 정보를 입력해주세요.</p>

      <form onSubmit={handleSubmit(onSubmit)}>
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
          {errors.title && <ErrorText>{errors.title.message}</ErrorText>}
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
          {errors.author && <ErrorText>{errors.author.message}</ErrorText>}
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
          {errors.status && <ErrorText>{errors.status.message}</ErrorText>}
        </FormGroup>

        <>
          <FormGroup>
            <Label>시작일</Label>
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => <Input {...field} type="date" />}
            />
          </FormGroup>

          <FormGroup>
            <Label>종료일</Label>
            <Controller
              name="endDate"
              control={control}
              render={({ field }) => <Input {...field} type="date" />}
            />
          </FormGroup>
        </>

        <SubmitButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? "저장 중..." : "다음 단계"}
        </SubmitButton>
      </form>
    </FormContainer>
  );
}
