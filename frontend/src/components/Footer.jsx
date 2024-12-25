const Footer = () => {
	return (
		<footer className='py-6 md:px-8 md:py-0 bg-black text-white border-t border-gray-800'> 
			{/* Main footer section with background color, padding, and border */}
			<div className='flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row'>
				{/* Flex container for layout with responsive design */}
				<p className='text-balance text-center text-sm leading-loose text-muted-foreground md:text-left'>
					{/* Paragraph with text alignment and responsive font size */}
					Built by{" "}
					<a
						href='https://github.com/burakorkmez'
						target='_blank'
						className='font-medium underline underline-offset-4'
					>
						{/* Link to GitHub with custom styling */}
						you
					</a>
					. The source code is available on{" "}
					<a
						href='https://github.com/burakorkmez'
						target='_blank'
						rel='noreferrer'
						className='font-medium underline underline-offset-4'
					>
						{/* Link to GitHub with custom styling */}
						GitHub
					</a>
					.
				</p>
			</div>
		</footer>
	);
};
export default Footer;
