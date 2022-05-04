import { useState, useEffect } from 'react';
import { Box, ImageListItem, Typography } from "@mui/material";
import CustomImageList from '../components/CustomImageList';
import CustomImage from '../components/CustomImage';
import axios from 'axios';

export default function Home() {
	const [images, setImages] = useState(null);

	async function getImages() {
		let response = await axios({
			url: 'http://localhost:3000/api/graphql',
			method: 'post',
			data: {
				query: `
					query ExampleQuery {
						value {
							image
							id
							title
							signature
						}
					}
				`
			}
		});
		setImages(response.data.data.value);
	}

	useEffect( () => {
		getImages();
	}, []);

	return (
		<>
			{
				!images ? <Box>Loading</Box> :
				<CustomImageList cols={3} rowHeight={200}>
					{images.map((item) => (
						<ImageListItem sx={{margin: '20px'}} key={item.id}>
							<Box>
								<CustomImage
									src={`/images/${item.image}`}
									loading="lazy"
								/>
								<Typography align='center'>Title: {item.title}</Typography>
								<Typography align='center'>Signature: {item.signature}</Typography>
							</Box>
						</ImageListItem>
					))}
				</CustomImageList>
			}
		</>
	);
}
