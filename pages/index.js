import { ImageListItem } from "@mui/material";
import CustomImageList from '../components/CustomImageList';
import CustomImage from '../components/CustomImage';

export default function Home({images}) {
	return (
		<CustomImageList cols={3} rowHeight={164}>
      		{images.value.map((item) => (
        		<ImageListItem sx={{margin: '20px'}} key={item.id}>
          			<CustomImage
            			src={`/images/${item.image}`}
            			loading="lazy"
          			/>
        		</ImageListItem>
      		))}
    	</CustomImageList>
	);
}

Home.getInitialProps = async() => {
	const response = await fetch('http://localhost:3000/api/hello');
  	const images = await response.json();
	return {
	  images
	};
};
