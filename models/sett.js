const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// MUST MATCH schema.js
// MANAGES THE DATATYPES ALLOWED TO PASS THROUGH MONGOOSE AND INTO MONGODB. ANOTHER LEVEL ON TOP OF BROWSER FORM VALIDATION. THIS PREVENTS INVALID DATA FROM ENTERING DB WHEN USING POSTMAN. 
const settSchema = new Schema({
    QL1Label: {
        type: String,
        max: 20,
        trim: true
    },
    QL1URL: {
        type: String,
        max: 2000, 
        trim: true
    },
    QL2Label: {
        type: String,
        max: 20,
        trim: true
    },
    QL2URL: {
        type: String,
        max: 2000, 
        trim: true
    },
    QL3Label: {
        type: String,
        max: 20,
        trim: true
    },
    QL3URL: {
        type: String,
        max: 2000, 
        trim: true
    },
    QL4Label: {
        type: String,
        max: 20,
        trim: true
    },
    QL4URL: {
        type: String,
        max: 2000, 
        trim: true
    },
    TL1Label: {
        type: String,
        max: 20,
        trim: true
    },
    TL1URL: {
        type: String,
        max: 2000, 
        trim: true
    },
    TL2Label: {
        type: String,
        max: 20,
        trim: true
    },
    TL2URL: {
        type: String,
        max: 2000, 
        trim: true
    },
    TL3Label: {
        type: String,
        max: 20,
        trim: true
    },
    TL3URL: {
        type: String,
        max: 2000, 
        trim: true
    },
    TL4Label: {
        type: String,
        max: 20,
        trim: true
    },
    TL4URL: {
        type: String,
        max: 2000, 
        trim: true
    },
    email: {
        type: String,
        max: 254,
        trim: true,
    },
    hours: {
        type: String,
        max: 40,
        trim: true,
    },
    phoneLabel: {
        type: String,
        max: 20,
        trim: true,
    },
    phone: {
        type: String,
        max: 20,
        trim: true,
    },
    socialIcon: {
        type: String,
        max: 25,
        trim: true,
    },
    socialLabel: {
        type: String,
        max: 50,
        trim: true,
    },
    socialURL: {
        type: String,
        max: 2000,
        trim: true,
    },
    address: {
        type: String,
        max: 200,
        trim: true,
    },
    payLabel: {
        type: String,
        max: 50,
        trim: true,
    },
    payURL: {
        type: String,
        max: 2000,
        trim: true,
    },
    registerFormLabel: {
        type: String,
        max: 50,
        trim: true,
    },
    registerFormURL: {
        type: String,
        max: 2000,
        trim: true,
    },
    courseIcon1: {
        type: String,
        max: 50,
        trim: true,
    },
    courseLabel1: {
        type: String,
        max: 50,
        trim: true,
    },
    courseDesc1: {
        type: String,
        max: 2000,
        trim: true,
    },
    courseIcon2: {
        type: String,
        max: 50,
        trim: true,
    },
    courseLabel2: {
        type: String,
        max: 50,
        trim: true,
    },
    courseDesc2: {
        type: String,
        max: 2000,
        trim: true,
    },
    courseIcon3: {
        type: String,
        max: 50,
        trim: true,
    },
    courseLabel3: {
        type: String,
        max: 50,
        trim: true,
    },
    courseDesc3: {
        type: String,
        max: 2000,
        trim: true,
    },
    courseIcon4: {
        type: String,
        max: 50,
        trim: true,
    },
    courseLabel4: {
        type: String,
        max: 50,
        trim: true,
    },
    courseDesc4: {
        type: String,
        max: 2000,
        trim: true,
    },
    courseIcon5: {
        type: String,
        max: 50,
        trim: true,
    },
    courseLabel5: {
        type: String,
        max: 50,
        trim: true,
    },
    courseDesc5: {
        type: String,
        max: 2000,
        trim: true,
    },
    courseIcon6: {
        type: String,
        max: 50,
        trim: true,
    },
    courseLabel6: {
        type: String,
        max: 50,
        trim: true,
    },
    courseDesc6: {
        type: String,
        max: 2000,
        trim: true,
    },
    aboutLabel1: {
        type: String,
        max: 50,
        trim: true,
    },
    aboutDesc1: {
        type: String,
        max: 2000,
        trim: true,
    },
    aboutLabel2: {
        type: String,
        max: 50,
        trim: true,
    },
    aboutDesc2: {
        type: String,
        max: 2000,
        trim: true,
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
    }
})

// EXPORTS THE SETT MODEL
module.exports = mongoose.model('Sett', settSchema);