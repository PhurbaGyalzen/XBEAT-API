import mongoose from 'mongoose';

const artistSchema = mongoose.Schema(
    {
        username: {type: String},
        name: {type: String},
        password: {type: String},
        gener: {type: String},
    }
)

const ArtistModel = mongoose.model("artist", artistSchema);

export default ArtistModel;