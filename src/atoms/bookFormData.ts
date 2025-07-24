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
  review: string;
  quotes: { text: string; page: number }[];
  totalPages: number;
  share: "public" | "follower" | "private" | "";
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
  review: "",
  quotes: [],
  totalPages: 0,
  share: "",
});