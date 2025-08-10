import { useState, useEffect } from "react";
import { Input } from "../Form/Form.styled";
import { addCommas } from "@/utils/parser";
import { Controller, useFormContext } from "react-hook-form";
import { useAtom } from "jotai";
import { BookFormData, bookFormDataAtom } from "@/atoms/bookFormData";

interface RHFCommaSeparatedInputProps {
  min: number;
  placeholder: string;
  name: keyof BookFormData | `quotes.${number}`;
  rules?: {
    required?: boolean | string | { value: boolean; message: string };
    min?: number | { value: number; message: string };
    max?: number | { value: number; message: string };
    pattern?: RegExp | { value: RegExp; message: string };
  };
}

function getPageValue(
  name: keyof BookFormData | `quotes.${number}`,
  data: BookFormData
) {
  if (typeof name === "string" && name.startsWith("quotes.")) {
    const [, indexStr] = name.split(".");
    const index = Number(indexStr);
    return data.quotes?.[index]?.page;
  }
  return data[name as keyof BookFormData];
}

export default function RHFCommaSeparatedInput({
  min,
  placeholder,
  name,
  rules,
}: RHFCommaSeparatedInputProps) {
  const [bookFormData] = useAtom(bookFormDataAtom);
  const [displayValue, setDisplayValue] = useState<string>("");

  const {
    control,
    formState: { errors },
    reset,
    setValue,
  } = useFormContext<BookFormData>();
  // const value = getPageValue(name, bookFormData);

  const indexMatch = name.match(/^quotes\.(\d+)$/);
  const errorMessage = indexMatch
    ? errors.quotes?.[Number(indexMatch[1])]?.page?.message
    : errors[name as keyof BookFormData]?.message;
  console.log("errorMessage", errorMessage);

  function initValueAndErrors(name: keyof BookFormData | `quotes.${number}`) {
    let fieldValue;
    let errorMessage;
    let quotesIndex = null;
    switch (name) {
      case "totalPages":
        fieldValue = addCommas(bookFormData["totalPages"] ?? "");
        errorMessage = errors[name]?.message;
        quotesIndex = null;
        break;
      case name as `quotes.${number}`:
        const index = Number(name.split(".")[1]);
        fieldValue = addCommas(bookFormData.quotes?.[index]?.page);
        errorMessage = errors.quotes?.[index]?.page?.message;
        quotesIndex = index;
        break;
      default:
        fieldValue = null;
        errorMessage = null;
        quotesIndex = null;
    }
    return { quotesIndex, fieldValue, errorMessage };
  }

  useEffect(() => {
    const { quotesIndex, fieldValue, errorMessage } = initValueAndErrors(name);
    if (quotesIndex !== null) {
      setValue(`quotes.${quotesIndex}.page`, fieldValue ?? "");
      setDisplayValue(fieldValue ?? "");
    } else {
      setValue(name, fieldValue ?? "");
      setDisplayValue(fieldValue ?? "");
    }
    console.log("fieldValue", fieldValue, "errorMessage", errorMessage);
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
      {errorMessage && (
        <div style={{ color: "red", marginBottom: 12 }}>
          {errorMessage as string}
        </div>
      )}
    </>
  );
}
