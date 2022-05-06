import { Box, ImageListItem, Typography } from "@mui/material";
import CustomImageList from './CustomImageList';
import CustomImage from './CustomImage';
import { useQuery, gql } from "@apollo/client";

export default function Gallery() {
    const query = gql`
		query ExampleQuery {
			value {
				image
				id
				title
				signature
			}
		}
  	`

    const { loading, error, data } = useQuery(query);
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <CustomImageList cols={3} rowHeight={200}>
			{data.value.map((item) => (
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
    )
}