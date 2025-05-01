import React from 'react';
import { Lightbulb, ArrowRight } from 'lucide-react';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center mb-8 shadow-lg">
        <Lightbulb size={40} className="text-white" />
      </div>
      
      <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
        App Idea Brainstorming
      </h1>
      
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-md">
        Answer questions to shape your app idea. Skip any you're not sure about!
      </p>
      
      <button 
        onClick={onStart}
        className="group flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-full shadow-md transition-all duration-300 hover:shadow-lg"
      >
        Start Brainstorming
        <ArrowRight className="inline-block transition-transform duration-300 group-hover:translate-x-1" size={20} />
      </button>
    </div>
  );
};

export default StartScreen;
