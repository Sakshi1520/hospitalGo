const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 

//add geo in location new schema
const geoSchema = new Schema({
    type: {
        type: String,
        default: "Point"
    },
    coordinates: {
        type: [Number],
        index: "2dsphere"
    }
});

//create schema and model
const HospSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name field is required"]
    },
    type: {
        type: String,
        // required: [true, "Name field is required"]
    },
    beds: {
        type: Number,
        required: [true, "Name field is required"]
    },
    geometry: geoSchema
});


const Hospital = mongoose.model('hospital',HospSchema);
module.exports = Hospital;