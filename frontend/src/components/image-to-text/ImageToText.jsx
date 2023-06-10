import React from 'react';
import Tesseract from 'tesseract.js';
import { Button } from '@mui/material';

const ImageToText = () => {
	const [isLoading, setIsLoading] = React.useState(false);
	const [image, setImage] = React.useState('');
	const [text, setText] = React.useState('');
	const [progress, setProgress] = React.useState(0);

	const handleSubmit = () => {
		setIsLoading(true);
		Tesseract.recognize(image, 'eng', {
			logger: (m) => {
				console.log(m);
				if (m.status === 'recognizing text') {
					setProgress(parseInt(m.progress * 100));
				}
			},
		})
			.catch((err) => {
				console.error(err);
			})
			.then((result) => {
				console.log(result.data);
				setText(result.data.text);
				setIsLoading(false);
			});
	};

	return (
		<div className="container">
			{!isLoading && (
				<h1 className="heading-medium">Image To Text</h1>
			)}
			{isLoading && (
				<>
					<progress className="form-control" value={progress} max="100">
						{progress}%{' '}
					</progress>{' '}
					<p className="text-center py-0 my-0">Converting:- {progress} %</p>
				</>
			)}
			{!isLoading &&  (
				<>

					<div className='image-input'>
						<input
							type="file"
							onChange={(e) =>
								setImage(URL.createObjectURL(e.target.files[0]))
							}
							id='react-button'
						/>
					</div>

					<br /><br />
					<Button onClick={handleSubmit} variant="contained" color="primary" id="react-button">
						Convert
					</Button>

					<br /><br />

				</>
			)}
			{!isLoading && text && (
				<>
					<textarea
						className='textarea'
						value={text}
						onChange={(e) => setText(e.target.value)}
					></textarea>
				</>
			)}
		</div>
	);
};

export default ImageToText;
