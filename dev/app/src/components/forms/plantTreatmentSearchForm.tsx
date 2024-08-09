'use client'
import { useState } from 'react';

interface SearchFormProps {
  onSearch: (query: string) => void;
}

const TreatmentSearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-3">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        className="px-4 py-2 border rounded-md"
        placeholder="Search disease..."
      />
      <button
        type="submit"
        className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
      >
        Search
      </button>
    </form>
  );
};

export default TreatmentSearchForm;
