import { FaSearch } from 'react-icons/fa';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSearch: () => void;
}

export const SearchBar = ({ searchQuery, onSearchChange, onSearch }: SearchBarProps) => {
  return (
    <div className="flex-1 relative">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search Trademark Here eg. Mickey Mouse"
        className="w-full px-4 py-2.5 border rounded-lg text-gray-800 text-base"
      />
      <FaSearch className="absolute right-24 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
      <button 
        onClick={onSearch}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-blue-500 text-white px-8 py-2.5 rounded-lg hover:bg-blue-600 font-medium text-base"
      >
        Search
      </button>
    </div>
  );
}; 