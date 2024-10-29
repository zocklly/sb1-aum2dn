import React from 'react';
import { Search } from 'lucide-react';
import styles from '../styles/Home.module.css';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

function SearchBar({ value, onChange, placeholder = "Search..." }: SearchBarProps) {
  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchIcon}>
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        className={styles.searchInput}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;