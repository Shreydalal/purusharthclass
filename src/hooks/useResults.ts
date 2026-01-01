import { useState, useEffect } from "react";

export interface Result {
  id: string;
  title: string;
  imageUrl: string;
  isPinned: boolean;
  createdAt: string;
}

interface UseResultsOptions {
  pinnedOnly?: boolean;
}

export const useResults = (options: UseResultsOptions = {}) => {
  const [results, setResults] = useState<Result[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        // TODO: Replace with your backend API endpoint
        const endpoint = options.pinnedOnly 
          ? "/api/results/pinned" 
          : "/api/results";
        
        const response = await fetch(endpoint);
        
        if (!response.ok) {
          throw new Error("Failed to fetch results");
        }

        const data = await response.json();
        setResults(data.results || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load results");
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [options.pinnedOnly]);

  return { results, isLoading, error };
};
