interface SearchResultsProps {
    results: string[];
  }
  
  const TreatmentSearchResults: React.FC<SearchResultsProps> = ({ results }) => {
    return (
      <div className="mt-4">
        {results.length === 0 ? (
          <p>No results found.</p>
        ) : (
          <ul className="space-y-2">
            {results.map((result, index) => (
              <li key={index} className="px-4 py-2 border rounded-md">
                {result}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  
  export default TreatmentSearchResults;
  