import { useEffect, useRef, useState } from "react";
import { useContentStore } from "../store/content";
import axios from "axios";
import { Link } from "react-router-dom";
import { SMALL_IMG_BASE_URL } from "../utils/constants";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MovieSlider = ({ category }) => {
	const { contentType } = useContentStore(); // Using content store to get the type of content (movies or TV shows)
	const [content, setContent] = useState([]); // State to store fetched content
	const [showArrows, setShowArrows] = useState(false); // State to control the visibility of arrows

	const sliderRef = useRef(null); // Ref to the slider for scrolling functionality

	// Format the category name and content type for display
	const formattedCategoryName =
		category.replaceAll("_", " ")[0].toUpperCase() + category.replaceAll("_", " ").slice(1);
	const formattedContentType = contentType === "movie" ? "Movies" : "TV Shows";

	// Fetch content from the API when the contentType or category changes
	useEffect(() => {
		const getContent = async () => {
			const res = await axios.get(`/api/v1/${contentType}/${category}`);
			setContent(res.data.content); // Update the content state with the fetched data
		};

		getContent();
	}, [contentType, category]); // Dependencies: contentType and category

	// Scroll the slider left
	const scrollLeft = () => {
		if (sliderRef.current) {
			sliderRef.current.scrollBy({ left: -sliderRef.current.offsetWidth, behavior: "smooth" });
		}
	};
	// Scroll the slider right
	const scrollRight = () => {
		sliderRef.current.scrollBy({ left: sliderRef.current.offsetWidth, behavior: "smooth" });
	};

	return (
		<div
			className='bg-black text-white relative px-5 md:px-20'
			onMouseEnter={() => setShowArrows(true)} // Show arrows when mouse enters the container
			onMouseLeave={() => setShowArrows(false)} // Hide arrows when mouse leaves the container
		>
			<h2 className='mb-4 text-2xl font-bold'>
				{formattedCategoryName} {formattedContentType}
			</h2>

			<div className='flex space-x-4 overflow-x-scroll scrollbar-hide' ref={sliderRef}>
				{content.map((item) => (
					<Link to={`/watch/${item.id}`} className='min-w-[250px] relative group' key={item.id}>
						{/* Link to the watch page with the content ID */}
						<div className='rounded-lg overflow-hidden'>
							<img
								src={SMALL_IMG_BASE_URL + item.backdrop_path}
								alt='Movie image'
								className='transition-transform duration-300 ease-in-out group-hover:scale-125'
							/>
						</div>
						<p className='mt-2 text-center'>{item.title || item.name}</p>
					</Link>
				))}
			</div>

			{/* Show left and right arrows if the mouse is hovering */}
			{showArrows && (
				<>
					<button
						className='absolute top-1/2 -translate-y-1/2 left-5 md:left-24 flex items-center justify-center
            size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10'
						onClick={scrollLeft} // Scroll left on click
					>
						<ChevronLeft size={24} />
					</button>

					<button
						className='absolute top-1/2 -translate-y-1/2 right-5 md:right-24 flex items-center justify-center
            size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10'
						onClick={scrollRight} // Scroll right on click
					>
						<ChevronRight size={24} />
					</button>
				</>
			)}
		</div>
	);
};

export default MovieSlider;
