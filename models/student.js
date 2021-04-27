const mongoose = require('mongoose');
const Note = require('./note');
const Schema = mongoose.Schema;
const stateList = require('../public/scripts/stateList.js')
const relationshipTypes = require('../public/scripts/relationshipTypes.js')

// MUST MATCH schema.js
// MANAGES THE DATATYPES ALLOWED TO PASS THROUGH MONGOOSE AND INTO MONGODB. ANOTHER LEVEL ON TOP OF BROWSER FORM VALIDATION. THIS PREVENTS INVALID DATA FROM ENTERING DB WHEN USING POSTMAN. 
const studentSchema = new Schema({
    firstName: {
        type: String,
        max: 50, // https://stackoverflow.com/questions/20958/list-of-standard-lengths-for-database-fields
        trim: true,
        required: true
    },
    lastName: {
        type: String,
        max: 50,
        trim: true,
        required: true
    },
    prefName: {
        type: String,
        max: 50,
        trim: true,
        required: false
    },
    dateOfBirth: {
        type: Date,
        default: Date.now,
        trim: true,
        required: true
    },
    schoolYear: {
        type: Number,
        min: 0,
        max: 99999,
        trim: true,
        required: false
    },
    addressLine1: {
        type: String,
        max: 100,
        trim: true,
        required: true
    },
    addressLine2: {
        type: String,
        max: 100,
        trim: true,
        required: false
    },
    city: {
        type: String,
        max: 40,
        trim: true,
        required: true
    },
    stateCode: {
        type: String,
        trim: true,
        min: 2,
        max: 2,
        enum: stateList,
        required: true
    },
    zipCodeBase: {
        type: Number,
        min: 0,
        max: 99999,
        trim: true,
        required: true
    },
    zipCodeExtension: {
        type: Number,
        min: 0,
        max: 9999,
        trim: true,
        required: false
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Unknown'],
        required: true
    },
    notes: {
        type: String,
        max: 1000,
        trim: true,
        required: false
    },
    coinsBalance: {
        type: Number,
        trim: true,
        min: [0, 'Cannot have negative points'],
        max: 99999,
        required: false
    },
    url1Label: {
        type: String,
        max: 100,
        trim: true,
        required: false
    },
    url2Label: {
        type: String,
        max: 100,
        trim: true,
        required: false
    },
    url3Label: {
        type: String,
        max: 100,
        trim: true,
        required: false
    },
    url4Label: {
        type: String,
        max: 100,
        trim: true,
        required: false
    },
    url1: {
        type: String,
        max: 2000, //https://en.ryte.com/wiki/URL_Length#:~:text=A%20URL%20should%20not%20exceed,a%20maximum%20of%2074%20characters.
        trim: true,
        required: false
    },
    url2: {
        type: String,
        max: 2000,
        trim: true,
        required: false
    },
    url3: {
        type: String,
        max: 2000,
        trim: true,
        required: false
    },
    url4: {
        type: String,
        max: 2000,
        trim: true,
        required: false
    },
    primaryContactFirst: {
        type: String,
        max: 50,
        trim: true,
        required: true
    },
    primaryContactLast: {
        type: String,
        max: 50,
        trim: true,
        required: true
    },
    primaryContactRelationship: {
        type: String,
        trim: true,
        enum: relationshipTypes,
        required: true
    },
    primaryContactPhone: {
        type: String,
        max: 50,
        trim: true,
        required: true
    },
    primaryContactEmail: {
        type: String,
        max: 254, // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
        trim: true,
        required: true
    },
    emergPrimFirst: {
        type: String,
        max: 50,
        trim: true,
        required: true
    },
    emergPrimLast: {
        type: String,
        max: 50,
        trim: true,
        required: true
    },
    emergPrimRelationship: {
        type: String,
        trim: true,
        enum: relationshipTypes,
        required: true
    },
    emergPrimPhone: {
        type: String,
        max: 50,
        trim: true,
        required: true
    },
    emergPrimEmail: {
        type: String,
        max: 254,
        trim: true,
        required: true
    },
    emergSecFirst: {
        type: String,
        max: 50,
        trim: true,
        required: false
    },
    emergSecLast: {
        type: String,
        max: 50,
        trim: true,
        required: false
    },
    emergSecRelationship: {
        type: String,
        trim: true,
        enum: relationshipTypes,
        required: false
    },
    emergSecPhone: {
        type: String,
        max: 50,
        trim: true,
        required: false
    },
    emergSecEmail: {
        type: String,
        max: 254,
        trim: true,
        required: false
    },
    createdBy: {
        type: String,
        max: 30, // SHOULD BE 30 ALREADY BECAUSE USERNAMES ARE RESTRICTED BETWEEN 6-30
        trim: true,
        required: false
    },
    createDate:{
        type: Date,
        default: Date.now,
        required: false
    },
    lastModifiedBy: {
        type: String,
        max: 30,
        trim: true,
        required: false
    },
    lastModifiedDate:{
        type: Date,
        default: Date.now,
        required: false
    },
    note: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Note'
        }
    ]
})

// CASCADE DELETES THE NOTES WHEN A STUDENT IS DELETED. THIS IS QUERY MIDDLEWARE, NOT DOCUMENT MIDDLEWARE
studentSchema.post('findOneAndDelete', async function (doc) {
    if(doc) {
        await Note.deleteMany({
            _id: {
                $in: doc.note
            }
        })
    }
})

// EXPORTS THE STUDENT MODEL
module.exports = mongoose.model('Student', studentSchema);