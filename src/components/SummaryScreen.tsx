import React, { useState, useEffect } from 'react';
import { Download, Share2, Sparkles, RefreshCw, Lightbulb } from 'lucide-react';
import { AppIdea } from '../types';

interface SummaryScreenProps {
  appIdea: AppIdea;
  onRestart: () => void;
}

const SummaryScreen: React.FC<SummaryScreenProps> = ({ appIdea, onRestart }) => {
  const [copied, setCopied] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);

  // Generate summary from app idea
  const generateSummary = () => {
    const problem = appIdea.problem || 'Not specified';
    const audience = appIdea.audience || 'Not specified';
    const benefit = appIdea.benefit || 'Not specified';
    const features = appIdea.features || 'Not specified';
    
    return `Your app aims to solve the problem of ${problem.toLowerCase()} for ${audience.toLowerCase()}. 
    The main benefit is that it ${benefit.toLowerCase()}. 
    Key features include ${features.toLowerCase()}.`;
  };

  // Generate prompt for ChatAndBuild
  const generatePrompt = () => {
    const problem = appIdea.problem ? `that solves ${appIdea.problem}` : '';
    const audience = appIdea.audience ? `for ${appIdea.audience}` : '';
    const features = appIdea.features ? `with features like ${appIdea.features}` : '';
    
    return `Create an app ${problem} ${audience} ${features}`.trim();
  };

  // Generate AI suggestions based on the app idea
  useEffect(() => {
    const generateAiSuggestions = () => {
      setIsLoadingSuggestions(true);
      
      // Simulate AI processing with timeout
      setTimeout(() => {
        // This would be replaced with actual AI API call in production
        const suggestions = [
          `Have you considered adding a social component where ${appIdea.audience || 'users'} can share their experiences?`,
          `You might want to explore integrating with existing services that address ${appIdea.problem || 'similar problems'}.`,
          `Consider adding analytics to track how ${appIdea.audience || 'users'} interact with your ${appIdea.features || 'features'}.`,
          `A subscription model might work well for monetizing the ${appIdea.benefit || 'benefits'} you're providing.`,
          `To address the challenge of ${appIdea.challenges || 'scaling'}, you could implement a phased rollout strategy.`
        ];
        
        setAiSuggestions(suggestions);
        setIsLoadingSuggestions(false);
      }, 1500);
    };

    if (Object.keys(appIdea).length > 0) {
      generateAiSuggestions();
    }
  }, [appIdea]);

  const summary = generateSummary();
  const prompt = generatePrompt();

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveAsPDF = () => {
    alert('PDF download functionality would be implemented here');
    // In a real implementation, we would use a library like jspdf to generate a PDF
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My App Idea',
        text: summary + '\n\nPrompt for ChatAndBuild: ' + prompt,
      }).catch(err => {
        console.error('Error sharing:', err);
      });
    } else {
      alert('Web Share API not supported in your browser');
    }
  };

  return (
    <div className="flex flex-col min-h-screen p-6 max-w-2xl mx-auto">
      <div className="mb-8 text-center">
        <div className="inline-block p-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full mb-4">
          <Sparkles size={32} className="text-white" />
        </div>
        <h1 className="text-3xl font-bold mb-2 text-gray-800 dark:text-white">Your App Idea Summary</h1>
        <p className="text-gray-600 dark:text-gray-300">Here's a summary of your app idea based on your answers</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">App Description</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6 whitespace-pre-line">
          {summary}
        </p>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-2">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">ChatAndBuild Prompt</h2>
          <div className="relative">
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-gray-800 dark:text-gray-200 mb-2">
              {prompt}
            </div>
            <button 
              onClick={handleCopyPrompt}
              className="absolute top-2 right-2 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 p-2 rounded-md transition-colors"
              aria-label="Copy prompt"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      </div>

      {/* AI Suggestions Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
        <div className="flex items-center mb-4">
          <Lightbulb className="text-yellow-500 mr-2" size={24} />
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">AI Brainstorming Suggestions</h2>
        </div>
        
        {isLoadingSuggestions ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
            <span className="ml-2 text-gray-600 dark:text-gray-300">Generating suggestions...</span>
          </div>
        ) : (
          <ul className="space-y-3">
            {aiSuggestions.map((suggestion, index) => (
              <li key={index} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg text-gray-700 dark:text-gray-200 border-l-4 border-indigo-500">
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {Object.entries(appIdea).map(([key, value]) => (
          value && (
            <div key={key} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-1 capitalize">{key}</h3>
              <p className="text-gray-800 dark:text-white">{value}</p>
            </div>
          )
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-4 mt-auto">
        <button
          onClick={handleSaveAsPDF}
          className="flex items-center gap-2 bg-gray-800 dark:bg-gray-700 hover:bg-gray-900 dark:hover:bg-gray-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
        >
          <Download size={18} />
          Save as PDF
        </button>
        
        <button
          onClick={handleShare}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
        >
          <Share2 size={18} />
          Share
        </button>
        
        <button
          onClick={onRestart}
          className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium py-2 px-6 rounded-lg transition-colors"
        >
          <RefreshCw size={18} />
          Start Over
        </button>
      </div>
    </div>
  );
};

export default SummaryScreen;
