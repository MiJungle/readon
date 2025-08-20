import type { NextApiRequest, NextApiResponse } from "next";

export interface Book {
  id: string;
  title: string;
  author: string;
}

type Data = {
  books: Book[];
  total: number;
};

const books: Book[] = [
  {
    id: "1",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
  },
  {
    id: "2",
    title: "1984",
    author: "George Orwell",
  },
  {
    id: "3",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
  },
  {
    id: "4",
    title: "Pride and Prejudice",
    author: "Jane Austen",
  },
  {
    id: "5",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
  },
  {
    id: "6",
    title: "Lord of the Flies",
    author: "William Golding",
  },
  {
    id: "7",
    title: "Animal Farm",
    author: "George Orwell",
  },
  {
    id: "8",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
  },
  {
    id: "9",
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
  },
  {
    id: "10",
    title: "Brave New World",
    author: "Aldous Huxley",
  },
  {
    id: "11",
    title: "The Alchemist",
    author: "Paulo Coelho",
  },
  {
    id: "12",
    title: "The Little Prince",
    author: "Antoine de Saint-Exupéry",
  },
  {
    id: "13",
    title: "The Kite Runner",
    author: "Khaled Hosseini",
  },
  {
    id: "14",
    title: "The Book Thief",
    author: "Markus Zusak",
  },
  {
    id: "15",
    title: "The Fault in Our Stars",
    author: "John Green",
  },
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "GET") {
    return res.status(405).json({ books: [], total: 0 });
  }

  res.status(200).json({
    books: books,
    total: books.length,
  });
}
