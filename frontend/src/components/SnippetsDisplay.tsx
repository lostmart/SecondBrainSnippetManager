import React from 'react';

interface Snippet {
  id: string;
  title: string;
  code_content: string;
  description?: string;
  language: string;
}

interface SnippetsDisplayProps {
  snippets: Snippet[];
}

const SnippetsDisplay: React.FC<SnippetsDisplayProps> = ({ snippets }) => {
  if (!snippets || snippets.length === 0) {
    return (
      <div className="text-center text-gray-900 text-lg mt-8 bg-white p-8 rounded-lg font-medium">
        No snippets found. Start adding some cool code!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {snippets.map((snippet) => (
        <div key={snippet.id} className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{snippet.title}</h3>
          <p className="text-sm text-gray-800 font-medium mb-4">Language: {snippet.language}</p>
          {snippet.description && (
            <p className="text-gray-900 mb-4 text-sm">{snippet.description}</p>
          )}
          <pre className="bg-gray-900 p-3 rounded-md overflow-x-auto text-sm text-gray-100 border border-gray-800">
            <code>{snippet.code_content}</code>
          </pre>
        </div>
      ))}
    </div>
  );
};

export default SnippetsDisplay;
