require('./config')
const { Song } = require('./models');
const { ApolloServer, gql } = require('apollo-server');

const songs = [
    {
        id: 1,
        title: 'Some song title',
        keysPlayed: [ 'C4', 'D4', 'E4'],
    }
];

const typeDefs = gql`
    type Song {
        title: String
        keysPlayed: [String]
    }

    type Query {
        songs: [Song]
    }

    type Mutation {
        addSong(title: String, keysPlayed: [String]): Song
    }
`

const resolvers = {
    Query: {
        songs: async () => await Song.find({}).exec(),
    },
    Mutation: {
        addSong: async (_, { title, keysPlayed }) => {
            try {
                const newSong = { 
                    title,
                    keysPlayed,
                };

                let response = await Song.create(newSong);
                return response;
            } catch(e) {
                return e.message;
            }
        }
    }
}

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
    console.log(`Apollo server running: ${url}`);
});
