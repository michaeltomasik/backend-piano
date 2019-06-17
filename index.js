require('./config')
const { Song } = require('./models');
const { ApolloServer, gql } = require('apollo-server');

const songs = [
    {
        id: 1,
        title: 'Some song title',
        keysPlayed: [
          {note: 'C4', time: 0},
          {note: 'D4', time: 1000},
          {note: 'E4', time: 1500},
          {note: 'F4', time: 3000}
        ],
    }
];

const typeDefs = gql`
    input NoteInput {
        note: String
        time: Int
    }
    type Note {
        note: String
        time: Int
    }

    type Song {
        title: String
        keysPlayed: [Note]
    }

    type Query {
        songs: [Song]
    }

    type Mutation {
        addSong(title: String, keysPlayed: [NoteInput]): Song
    }
`

const resolvers = {
    Query: {
        songs: async () => await Song.find({}).exec(),
    },
    Mutation: {
        addSong: async (_, { title, keysPlayed }) => {
            console.log(keysPlayed, 'keysPlayed')
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
