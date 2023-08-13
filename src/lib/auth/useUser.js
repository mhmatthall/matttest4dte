/**
 * @file Hook for fetching user data
 */
import axios from "axios";
import useSWR from "swr";

/**
 * Fetcher to get user data from the API
 * @param {string} url The API enpoint URL to fetch from
 * @returns {object} The user data object
 */
const fetcher = (url) => axios.get(url).then((res) => res.data);

/**
 * Hook for fetching user data
 * @returns {object} The user data object
 */
export const useUser = () => {
  const { data, isLoading, error } = useSWR("/api/users/me", fetcher);
  return { user: data, isLoading, isError: error };
};
