import { useState, useEffect } from 'react';
import { Box, ImageListItem } from "@mui/material";
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
				<CustomImageList cols={3} rowHeight={164}>
					{images.map((item) => (
						<ImageListItem sx={{margin: '20px'}} key={item.id}>
							<CustomImage
								src={`/images/${item.image}`}
								loading="lazy"
							/>
						</ImageListItem>
					))}
				</CustomImageList>
			}
		</>
	);
}
