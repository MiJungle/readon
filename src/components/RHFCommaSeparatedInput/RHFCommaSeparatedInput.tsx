import { useState, useEffect } from "react";
import { Input } from "../Form/Form.styled";
import { addCommas } from "@/utils/parser";
import { Controller, useFormContext } from "react-hook-form";
import { useAtom } from "jotai";
import { BookFormData, bookFormDataAtom } from "@/atoms/bookFormData";

interface RHFCommaSeparatedInputProps {
  min: number;
  placeholder: string;
  name:
    | keyof BookFormData
    | `quotes.${number}`
    | `quotes.${number}.text`
    | `quotes.${number}.page`;
  rules?: {
    required?: boolean | string | { value: boolean; message: string };
    min?: number | { value: number; message: string };
    max?: number | { value: number; message: string };
    pattern?: RegExp | { value: RegExp; message: string };
  };
}

export default function RHFCommaSeparatedInput({
  min,
  placeholder,
  name,
  rules,
}: RHFCommaSeparatedInputProps) {
  const [bookFormData] = useAtom(bookFormDataAtom);
  const [displayValue, setDisplayValue] = useState<string>(
    addCommas(bookFormData[name as keyof BookFormData]?.toString() ?? "")
  );

  const {
    control,
    formState: { errors },
    reset,
    setValue,
  } = useFormContext<BookFormData>();

  useEffect(() => {
    console.log("child control", control);
    setValue(name, bookFormData[name as keyof BookFormData] ?? "");
    // reset({
    //   [name]: bookFormData[name as keyof BookFormData] ?? "",
    // });
  }, [bookFormData, reset, name]);

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    RHFOnChange: (value: string) => void
  ) => {
    const inputValue = e.target.value;
    const valueWithComma = addCommas(inputValue);

    setDisplayValue(valueWithComma);

    const numbersOnly = inputValue.replace(/,/g, "");

    RHFOnChange(numbersOnly);
  };

  return (
    <>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field }) => (
          <Input
            {...field}
            onChange={(e) => handleOnChange(e, field.onChange)}
            value={displayValue}
            min={min}
            placeholder={placeholder}
            type="text"
            inputMode="numeric"
          />
        )}
      />
      {errors[name as keyof BookFormData] && (
        <div style={{ color: "red", marginBottom: 12 }}>
          {errors[name as keyof BookFormData]?.message as string}
        </div>
      )}
    </>
  );
}
