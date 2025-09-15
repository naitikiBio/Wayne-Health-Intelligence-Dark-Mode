import React from 'react';
import { motion } from 'framer-motion';
import { SearchBar } from './SearchBar';
export function Header({
  onBusinessSelect
}) {
  return <header className="bg-gradient-to-r from-gray-800 to-gray-900 text-white border-b border-gray-700">
      <div className="max-w-7xl mx-auto py-4 px-4 md:px-6 flex items-center justify-between">
        <motion.div initial={{
        opacity: 0,
        x: -20
      }} animate={{
        opacity: 1,
        x: 0
      }} transition={{
        duration: 0.5
      }} className="flex items-center">
          <div className="mr-2">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8.5 12H15.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 8.5V15.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold">Mobile Health Unit</h1>
            <p className="text-xs text-gray-400">Health Screening Analytics</p>
          </div>
        </motion.div>
        <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        duration: 0.5
      }} className="w-96 hidden md:block">
          <SearchBar onBusinessSelect={onBusinessSelect} />
        </motion.div>
        <motion.div initial={{
        opacity: 0,
        x: 20
      }} animate={{
        opacity: 1,
        x: 0
      }} transition={{
        duration: 0.5
      }} className="hidden lg:flex space-x-6">
          <a href="#" className="text-gray-300 hover:text-white transition-colors">
            About
          </a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors">
            Services
          </a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors">
            Contact
          </a>
        </motion.div>
      </div>
      <div className="md:hidden p-2 bg-gray-800 border-t border-gray-700">
        <SearchBar onBusinessSelect={onBusinessSelect} />
      </div>
    </header>;
}