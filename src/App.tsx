import React, { useState } from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { HealthMap } from './components/HealthMap';
import { CostAnalysis } from './components/CostAnalysis';
import { SocialMediaFeed } from './components/SocialMediaFeed';
import { motion } from 'framer-motion';
export function App() {
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [showCostAnalysis, setShowCostAnalysis] = useState(false);
  const handleBusinessSelect = business => {
    setSelectedBusiness(business);
    setShowCostAnalysis(true);
  };
  return <div className="flex flex-col w-full min-h-screen bg-gray-900 text-gray-200">
      <Header onBusinessSelect={handleBusinessSelect} />
      <main className="flex-1 p-4 md:p-6">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5
      }} className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Health Insights
            </h1>
            <p className="text-lg text-gray-400">
              Discover local health trends and calculate the potential impact on
              your business
            </p>
          </div>
          {/* Full width map */}
          <div className="mb-8">
            <HealthMap selectedBusiness={selectedBusiness} />
          </div>
          {/* Cost analysis when a business is selected */}
          {showCostAnalysis && selectedBusiness && <motion.div initial={{
          opacity: 0,
          height: 0
        }} animate={{
          opacity: 1,
          height: 'auto'
        }} transition={{
          duration: 0.5
        }} className="mb-8">
              <CostAnalysis business={selectedBusiness} />
            </motion.div>}
          {/* Social media trends now below */}
          <div className="mb-8">
            <SocialMediaFeed />
          </div>
        </motion.div>
      </main>
    </div>;
}
