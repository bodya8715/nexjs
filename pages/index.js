import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Gallery from "../components/Gallery";

export default function Home() {
	const client = new ApolloClient({
		uri: 'http://localhost:3000/api/graphql',
		cache: new InMemoryCache()
	});

	return (
		<ApolloProvider client={client}>
			<Gallery />
		</ApolloProvider>
	);
}
