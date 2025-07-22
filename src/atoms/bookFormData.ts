import { atomWithStorage } from "jotai/utils";

export interface BookFormData {
  title: string;
  author: string;
  status: string;
  startDate: string;
  endDate: string;
  publishDate: string;
  recommend: string;
  rating: string;
}

export const bookFormDataAtom = atomWithStorage<BookFormData>("bookFormData", {
  title: "",
  author: "",
  status: "",
  startDate: "",
  endDate: "",
  publishDate: "",
  recommend: "",
  rating: "",
});
