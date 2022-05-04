import { ApolloServer, gql } from 'apollo-server-micro';

import * as path from 'node:path';
import * as fs from 'node:fs/promises';

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function getRandomImages() {
  const directoryPath = path.join('public', '/images');
  const filesList = await fs.readdir(directoryPath);

  let imagesQuantity = getRandomIntInclusive(1, 10);

  let sendData = [];

  for (let i = 0; i < imagesQuantity; i++) {
    sendData.push({image: filesList[getRandomIntInclusive(0, filesList.length-1)], id: Math.random()});
  }

  return sendData;
}

const typeDefs = gql`
  type Query {
    value: [Images]
  }

  type Images {
    image: String
    id: Float
  }
`

const resolvers = {
  Query: {
    value: () => {
      return getRandomImages();
    }
  }
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

const startServer = apolloServer.start();

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader(
    'Access-Control-Allow-Origin',
    'https://studio.apollographql.com'
  )
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )

  if (req.method === 'OPTIONS') {
    res.end()
    return false
  }

  await startServer;
  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res);
}

export const config = {
  api: {
    bodyParser: false
  },
};
