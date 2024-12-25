import { useEffect, useState } from "react";
import { useContentStore } from "../store/content";
import axios from "axios";

const useGetTrendingContent = () => {
	const [trendingContent, setTrendingContent] = useState(null); // State to store trending content
	const { contentType } = useContentStore(); // Fetch content type from content store

	useEffect(() => {
		// Function to fetch trending content based on content type (movie or TV show)
		const getTrendingContent = async () => {
			const res = await axios.get(`/api/v1/${contentType}/trending`); // Make an API request to fetch trending content
			setTrendingContent(res.data.content); // Update the state with fetched content
		};

		getTrendingContent(); // Call the function to fetch trending content when component mounts or contentType changes
	}, [contentType]); // Dependency array ensures the effect runs whenever contentType changes

	return { trendingContent }; // Return trending content for use in components
};

export default useGetTrendingContent;
