// Console Panel Component
export const ConsolePanel = ({ theme, consoleOutput }: {
  theme: string;
  consoleOutput: string;
}) => {
  return (
    <div className={`h-full p-3 rounded ${
      theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
    }`}>
      {consoleOutput ? (
        <pre className="text-xs font-mono whitespace-pre-wrap">
          {consoleOutput}
        </pre>
      ) : (
        <p className={`text-xs ${
          theme === "dark" ? "text-gray-400" : "text-gray-500"
        }`}>
          Output will appear here...
        </p>
      )}
    </div>
  );
};

// Test Cases Panel Component
export const TestCasesPanel = ({ theme, testCases, setTestCases }: {
  theme: string;
  testCases: Array<{ id: number; input: string }>;
  setTestCases: React.Dispatch<React.SetStateAction<Array<{ id: number; input: string }>>>;
}) => {
  const addTestCase = () => {
    const newId = Math.max(...testCases.map(tc => tc.id)) + 1;
    setTestCases([...testCases, { id: newId, input: "" }]);
  };

  const updateTestCase = (id: number, value: string) => {
    setTestCases(testCases.map(tc => 
      tc.id === id ? { ...tc, input: value } : tc
    ));
  };

  const removeTestCase = (id: number) => {
    if (testCases.length > 1) {
      setTestCases(testCases.filter(tc => tc.id !== id));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
          Test Cases
        </h3>
        <button
          onClick={addTestCase}
          className={`px-3 py-1 text-xs rounded border transition-colors ${
            theme === "dark"
              ? "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
              : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
          }`}
        >
          + Add Test Case
        </button>
      </div>
      
      {testCases.map((testCase, index) => (
        <div key={testCase.id} className={`p-3 rounded border ${
          theme === "dark"
            ? "bg-gray-700 border-gray-600"
            : "bg-white border-gray-300"
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs font-medium ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}>
              Case {index + 1}
            </span>
            {testCases.length > 1 && (
              <button
                onClick={() => removeTestCase(testCase.id)}
                className={`text-xs px-2 py-1 rounded transition-colors ${
                  theme === "dark"
                    ? "text-red-400 hover:bg-red-900/20"
                    : "text-red-600 hover:bg-red-50"
                }`}
              >
                Remove
              </button>
            )}
          </div>
          
          <div>
            <input
              type="text"
              value={testCase.input}
              onChange={(e) => updateTestCase(testCase.id, e.target.value)}
              placeholder="nums = [2,7,11,15], target = 9"
              className={`w-full px-2 py-1 text-xs font-mono rounded border focus:outline-none focus:ring-1 focus:ring-orange-500 ${
                theme === "dark"
                  ? "bg-gray-800 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            />
          </div>
        </div>
      ))}
    </div>
  );
};