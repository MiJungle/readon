import { Book } from "@/pages/api/books";
import { useEffect, useState } from "react";
import { AutoCompleteList, AutoCompleteItem, Input } from "./AutoComplete.styled";

interface AutoCompleteProps {
  value: string;
  onChange: (value: string) => void;
}

export default function AutoComplete({
  value,
  onChange,
}: AutoCompleteProps) {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("/api/books");
        const data = await response.json();
        setBooks(data.books);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBooks();
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onChange(value);

    const options = books.filter((option) =>
      option.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredBooks(options);
  };

  const handleSelect = (option: Book) => {
    onChange(option.title);
    setFilteredBooks([]);
  };

  return (
    <div>
      <Input value={value} onChange={handleChange} />
      {filteredBooks.length > 0 && (
        <AutoCompleteList>
          {filteredBooks.map((option) => (
            <AutoCompleteItem
              key={option.id}
              onClick={() => handleSelect(option)}
            >
              {option.title}
            </AutoCompleteItem>
          ))}
        </AutoCompleteList>
      )}
    </div>
  );
}
