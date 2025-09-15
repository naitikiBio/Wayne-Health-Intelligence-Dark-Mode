import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SearchIcon } from 'lucide-react';
import { businesses } from '../data/mockData';
export function SearchBar({
  onBusinessSelect
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const handleSearch = e => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term.length > 1) {
      setIsSearching(true);
      // Filter businesses based on search term
      const filtered = businesses.filter(business => business.name.toLowerCase().includes(term.toLowerCase()) || business.address.toLowerCase().includes(term.toLowerCase()));
      setResults(filtered);
    } else {
      setIsSearching(false);
      setResults([]);
    }
  };
  const handleSelectBusiness = business => {
    setSearchTerm(business.name);
    setResults([]);
    setIsSearching(false);
    onBusinessSelect(business);
  };
  return <div className="relative z-50">
      <div className="bg-gray-700 rounded-md">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-4 w-4 text-gray-400" />
          </div>
          <input type="text" value={searchTerm} onChange={handleSearch} className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md leading-5 bg-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out sm:text-sm" placeholder="Search business in Wayne County..." />
        </div>
      </div>
      {isSearching && results.length > 0 && <motion.div initial={{
      opacity: 0,
      y: -10
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.2
    }} className="absolute z-20 mt-1 w-full bg-gray-800 shadow-lg rounded-md py-1 text-base ring-1 ring-gray-700 overflow-auto max-h-60">
          {results.map(business => <div key={business.id} onClick={() => handleSelectBusiness(business)} className="cursor-pointer px-4 py-2 hover:bg-gray-700">
              <div className="font-medium text-white">{business.name}</div>
              <div className="text-sm text-gray-400">{business.address}</div>
            </div>)}
        </motion.div>}
      {isSearching && results.length === 0 && <div className="absolute z-20 mt-1 w-full bg-gray-800 shadow-lg rounded-md py-4 px-4 text-center">
          <p className="text-gray-400">
            No businesses found matching your search.
          </p>
        </div>}
    </div>;
}