const WatchPageSkeleton = () => {
	return (
		<div className='animate-pulse'> {/* Adds a pulse animation for skeleton loading effect */}
			{/* Skeleton for title (short bar) */}
			<div className='bg-gray-700 rounded-md w-40 h-6 mb-4 shimmer'></div>
			
			{/* Skeleton for video/image placeholder (large rectangle) */}
			<div className='bg-gray-700 rounded-md w-full h-96 mb-4 shimmer'></div>
			
			{/* Skeleton for subtitle (medium bar) */}
			<div className='bg-gray-700 rounded-md w-3/4 h-6 mb-2 shimmer'></div>
			
			{/* Skeleton for description (smaller bar) */}
			<div className='bg-gray-700 rounded-md w-1/2 h-6 mb-4 shimmer'></div>
			
			{/* Skeleton for bottom content (large block) */}
			<div className='bg-gray-700 rounded-md w-full h-24 shimmer'></div>
		</div>
	);
};
export default WatchPageSkeleton;
