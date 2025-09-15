import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { calculateAbsenteeismCosts, getLocalDiseases, getCommutingData } from '../data/costCalculations';
export function CostAnalysis({
  business
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [costData, setCostData] = useState(null);
  const [commutingData, setCommutingData] = useState([]);
  useEffect(() => {
    // Simulate API call to calculate costs
    const timer = setTimeout(() => {
      const localDiseases = getLocalDiseases(business.lat, business.lng);
      const costs = calculateAbsenteeismCosts(business, localDiseases);
      const commuting = getCommutingData(business.lat, business.lng);
      setCostData(costs);
      setCommutingData(commuting);
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [business]);
  if (isLoading) {
    return <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} className="bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-400">
            Calculating health impact and absenteeism costs...
          </p>
        </div>
      </motion.div>;
  }
  return <motion.div initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} transition={{
    duration: 0.5
  }} className="bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-2">
        Health Impact Analysis
      </h2>
      <h3 className="text-lg font-medium text-blue-400 mb-4">
        {business.name}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-400 mb-1">
            Estimated Annual Cost
          </h4>
          <p className="text-3xl font-bold text-blue-300">
            ${costData.totalAnnualCost.toLocaleString()}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Due to health-related absenteeism
          </p>
        </div>
        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-400 mb-1">
            Cost Per Employee
          </h4>
          <p className="text-3xl font-bold text-blue-300">
            ${costData.costPerEmployee.toLocaleString()}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Average annual health-related cost
          </p>
        </div>
        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-400 mb-1">
            Potential Savings
          </h4>
          <p className="text-3xl font-bold text-green-400">
            ${costData.potentialSavings.toLocaleString()}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            With preventative health screenings
          </p>
        </div>
      </div>
      <div className="mb-8">
        <h3 className="text-lg font-medium text-white mb-3">
          Disease Impact Breakdown
        </h3>
        <div className="h-64 bg-gray-900 p-4 rounded-lg">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={costData.diseaseImpact}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
              <XAxis dataKey="name" tick={{
              fill: '#9ca3af'
            }} />
              <YAxis tick={{
              fill: '#9ca3af'
            }} />
              <Tooltip formatter={value => [`$${value.toLocaleString()}`, 'Cost']} labelFormatter={label => `Disease: ${label}`} contentStyle={{
              backgroundColor: '#1f2937',
              border: '1px solid #374151',
              color: '#e5e7eb'
            }} />
              <Legend wrapperStyle={{
              color: '#d1d5db'
            }} />
              <Bar dataKey="cost" fill="#3b82f6" name="Annual Cost" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="mb-8">
        <h3 className="text-lg font-medium text-white mb-3">
          Employee Commuting Analysis
        </h3>
        <p className="text-sm text-gray-400 mb-4">
          Health trends in areas where employees commute from may affect your
          business. Our analysis includes:
        </p>
        <div className="overflow-x-auto bg-gray-900 rounded-lg">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Area
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  % of Employees
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Top Health Concerns
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Risk Level
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-900 divide-y divide-gray-700">
              {commutingData.map((area, idx) => <tr key={idx}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-200">
                    {area.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {area.percentage}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {area.topConcerns.join(', ')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${area.riskLevel === 'High' ? 'bg-red-900 text-red-200' : area.riskLevel === 'Medium' ? 'bg-yellow-900 text-yellow-200' : 'bg-green-900 text-green-200'}`}>
                      {area.riskLevel}
                    </span>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-medium text-white mb-3">
          Research Sources
        </h3>
        <div className="text-sm text-gray-400 space-y-2">
          <p>
            • Journal of Occupational Health: "The Economic Impact of
            Health-Related Absenteeism" (2022)
          </p>
          <p>
            • CDC Workplace Health Resource Center: "Absenteeism Cost Calculator
            Methodology" (2023)
          </p>
          <p>
            • Michigan Department of Health: "Wayne County Health Statistics
            Report" (2023)
          </p>
          <p>
            • US Census Bureau: "Commuting Flows Data for Wayne County,
            Michigan" (2022)
          </p>
          <p>
            • American Journal of Preventive Medicine: "ROI of Workplace Health
            Screenings" (2021)
          </p>
        </div>
      </div>
    </motion.div>;
}