import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { socialMediaData } from '../data/mockData';
import { TwitterIcon, FacebookIcon, InstagramIcon, TrendingUpIcon } from 'lucide-react';
export function SocialMediaFeed() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Simulate API call to get social media data
    const timer = setTimeout(() => {
      setPosts(socialMediaData);
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  const getIcon = platform => {
    switch (platform) {
      case 'Twitter':
        return <TwitterIcon className="w-5 h-5 text-blue-400" />;
      case 'Facebook':
        return <FacebookIcon className="w-5 h-5 text-blue-500" />;
      case 'Instagram':
        return <InstagramIcon className="w-5 h-5 text-pink-500" />;
      default:
        return <TrendingUpIcon className="w-5 h-5 text-gray-400" />;
    }
  };
  const getSentimentColor = sentiment => {
    switch (sentiment) {
      case 'positive':
        return 'text-green-400';
      case 'negative':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.5,
    delay: 0.3
  }} className="bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white">
          Social Media Health Trends
        </h2>
        <div className="flex items-center bg-blue-900 text-blue-300 text-xs px-2 py-1 rounded-full">
          <TrendingUpIcon className="w-3 h-3 mr-1" />
          <span>Live Data</span>
        </div>
      </div>
      {isLoading ? <div className="flex justify-center items-center h-64">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post, idx) => <motion.div key={idx} initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        delay: idx * 0.1
      }} className="border border-gray-700 bg-gray-900 rounded-lg p-3 hover:bg-gray-800 transition-colors">
              <div className="flex items-center mb-2">
                <div className="mr-2">{getIcon(post.platform)}</div>
                <div className="text-sm font-medium text-gray-200">
                  {post.platform}
                </div>
                <div className="ml-auto text-xs text-gray-400">{post.date}</div>
              </div>
              <p className="text-sm text-gray-300 mb-2">{post.content}</p>
              <div className="flex items-center justify-between text-xs">
                <div className={`font-medium ${getSentimentColor(post.sentiment)}`}>
                  {post.sentiment.charAt(0).toUpperCase() + post.sentiment.slice(1)}{' '}
                  sentiment
                </div>
                <div className="flex items-center">
                  <span className="text-gray-400">Topics:</span>
                  <div className="ml-1 flex flex-wrap gap-1">
                    {post.topics.map((topic, i) => <span key={i} className="bg-gray-700 px-1.5 rounded-full text-gray-300">
                        {topic}
                      </span>)}
                  </div>
                </div>
              </div>
            </motion.div>)}
        </div>}
    </motion.div>;
}