import { useState, useEffect } from "react";
import axios from "axios";
import type { UserData } from "../types/types";

interface UseUserResult {
  user: UserData | null;
  loading: boolean;
  error: string | null;
}

export const useUser = (userId: number): UseUserResult => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get<UserData>(
          `https://jsonplaceholder.typicode.com/users/${userId}`
        );
        setUser(response.data);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred");
        }
        setUser(null); // Clear user data on error
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      // Only fetch if userId is provided
      fetchUser();
    } else {
      setLoading(false); // If no userId, stop loading immediately
    }
  }, [userId]); // Re-run effect if userId changes

  return { user, loading, error };
};
