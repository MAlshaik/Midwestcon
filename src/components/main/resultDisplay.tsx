import React from 'react';
import { cleanResponse } from '../ui/imageClassifier';

interface ResultDisplayProps {
  result: string;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  result = cleanResponse(result);

  return (
    <div className="mt-8 p-4 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4">Comparison Result:</h3>
      <pre className="whitespace-pre-wrap">{result}</pre>
    </div>
  );
};
