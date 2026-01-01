import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy, where } from "firebase/firestore";

export interface Result {
  id: string;
  title: string;
  imageUrl: string;
  isPinned: boolean;
  createdAt: Date;
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
        let resultsQuery;
        
        if (options.pinnedOnly) {
          resultsQuery = query(
            collection(db, "results"),
            where("isPinned", "==", true),
            orderBy("createdAt", "desc")
          );
        } else {
          resultsQuery = query(
            collection(db, "results"),
            orderBy("createdAt", "desc")
          );
        }
        
        const snapshot = await getDocs(resultsQuery);
        const resultsData: Result[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
          imageUrl: doc.data().imageUrl,
          isPinned: doc.data().isPinned || false,
          createdAt: doc.data().createdAt?.toDate() || new Date(),
        }));
        
        setResults(resultsData);
      } catch (err) {
        console.error("Error fetching results:", err);
        setError(err instanceof Error ? err.message : "Failed to load results");
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [options.pinnedOnly]);

  return { results, isLoading, error };
};
