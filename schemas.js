// IN HIND SIGHT, EXPRESS VALIDATOR MAY HAVE BEEN THE BETTER OPTION FOR VALIDATION AND HTML SANTIZATION
const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');

//https://github.com/sideway/joi/issues/2453 WITH THIS EXTENSION, WE CAN ADD escapeHTML() TO EACH OF OUR VALIDATION TO ENSURE NO HTML GETS SAVED. EXAMPLE IS TO INPUT <script>alert("hello there")</script> IN ANY FIELD, SUCH AS FIRSTNAME
const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if(clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
});

// ADDS OUR HTML SANITIZER EXTENSION TO BASE JOI
const Joi = BaseJoi.extend(extension);

// MUST MATCH models/student.js
// MANAGES THE DATATYPES ALLOWED TO PASS THROUGH MONGOOSE AND INTO MONGODB. ANOTHER LEVEL ON TOP OF BROWSER FORM VALIDATION. THIS PREVENTS INVALID DATA FROM ENTERING DB WHEN USING POSTMAN.
module.exports.studentSchema = Joi.object({
    student: Joi.object({
        firstName: Joi.string().trim().max(50).required().escapeHTML(),
        lastName: Joi.string().trim().max(50).required().escapeHTML(),
        prefName: Joi.string().trim().max(50).allow('').optional().escapeHTML(),
        dateOfBirth: Joi.date().required(),
        schoolYear: Joi.number().min(0).max(99999).allow('').optional(),
        addressLine1: Joi.string().trim().max(100).required().escapeHTML(),
        addressLine2: Joi.string().trim().max(100).allow('').optional().escapeHTML(),
        city: Joi.string().trim().max(40).required().escapeHTML(),
        stateCode: Joi.string().trim().valid('AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY').length(2).required().escapeHTML(),
        zipCodeBase: Joi.number().min(0).max(99999).required(),
        zipCodeExtension: Joi.number().min(0).max(9999).allow('').optional(),
        gender: Joi.string().trim().valid('Male','Female','Unknown').required().escapeHTML(),
        notes: Joi.string().trim().max(1000).allow('').optional().escapeHTML(),
        coinsBalance: Joi.number().min(0).max(99999),
        url1Label: Joi.string().trim().max(100).allow('').optional().escapeHTML(),
        url2Label: Joi.string().trim().max(100).allow('').optional().escapeHTML(),
        url3Label: Joi.string().trim().max(100).allow('').optional().escapeHTML(),
        url4Label: Joi.string().trim().max(100).allow('').optional().escapeHTML(),
        url1: Joi.string().trim().max(2000).allow('').optional().escapeHTML(),
        url2: Joi.string().trim().max(2000).allow('').optional().escapeHTML(),
        url3: Joi.string().trim().max(2000).allow('').optional().escapeHTML(),
        url4: Joi.string().trim().max(2000).allow('').optional().escapeHTML(),
        primaryContactFirst: Joi.string().trim().max(50).required().escapeHTML(),
        primaryContactLast: Joi.string().trim().max(50).required().escapeHTML(),
        primaryContactRelationship: Joi.string().trim().valid('Self','Spouse','Mother','Father','Mother-in-law','Father-in-law','Grandmother','Grandfather','Guardian','Sister','Brother', 'Other-Relative', 'Other-Nonrelative', 'Unknown').required().escapeHTML(),
        primaryContactPhone: Joi.string().trim().max(50).required().escapeHTML(),
        primaryContactEmail: Joi.string().trim().max(254).required().escapeHTML(),
        emergPrimFirst: Joi.string().trim().max(50).required().escapeHTML(),
        emergPrimLast: Joi.string().trim().max(50).required().escapeHTML(),
        emergPrimRelationship: Joi.string().trim().valid('Self','Spouse','Mother','Father','Mother-in-law','Father-in-law','Grandmother','Grandfather','Guardian','Sister','Brother', 'Other-Relative', 'Other-Nonrelative', 'Unknown').required().escapeHTML(),
        emergPrimPhone: Joi.string().trim().max(50).required().escapeHTML(),
        emergPrimEmail: Joi.string().trim().max(254).required().escapeHTML(),
        emergSecFirst: Joi.string().trim().max(50).allow('').optional().escapeHTML(),
        emergSecLast: Joi.string().trim().max(50).allow('').optional().escapeHTML(),
        emergSecRelationship: Joi.string().trim().valid('Self','Spouse','Mother','Father','Mother-in-law','Father-in-law','Grandmother','Grandfather','Guardian','Sister','Brother', 'Other-Relative', 'Other-Nonrelative', 'Unknown').allow('').optional().escapeHTML(),
        emergSecPhone: Joi.string().trim().max(50).allow('').optional().escapeHTML(),
        emergSecEmail: Joi.string().trim().max(254).allow('').optional().escapeHTML(),
        createdBy: Joi.string().trim().max(30).allow('').optional().escapeHTML(),
        createDate: Joi.date(),
        lastModifiedBy: Joi.string().trim().max(30).allow('').optional().escapeHTML(),
        lastModifiedDate: Joi.date()
    }).required()
})

// MUST MATCH models/note.js
module.exports.noteSchema = Joi.object({
    note: Joi.object({
        noteDate: Joi.date().required(),
        noteCategory: Joi.string().trim().max(50).required().escapeHTML(),
        noteTitle: Joi.string().trim().max(50).required().escapeHTML(),
        noteComment: Joi.string().trim().max(5000).allow('').optional().escapeHTML(),
        noteHide: Joi.string().trim().valid('true','false').optional().escapeHTML(),
        createdBy: Joi.string().trim().max(30).allow('').optional().escapeHTML(),
        createDate: Joi.date()
    }).required()
})

// MUST MATCH models/homework.js
module.exports.homeworkSchema = Joi.object({
    homework: Joi.object({
        subjectLine: Joi.string().trim().max(100).required().escapeHTML(),
        url: Joi.string().trim().max(2000).allow('').optional().escapeHTML(),
        urlLabel: Joi.string().trim().max(100).allow('').optional().escapeHTML(),
        stuId: Joi.string().trim().required().escapeHTML(),
        assignedStudent: Joi.string().trim().allow('').optional().escapeHTML(),
        category: Joi.string().trim().max(50).required().escapeHTML(),
        dueDate: Joi.date().required(),
        pointsPossible: Joi.number().min(0).max(1000000),
        description: Joi.string().trim().max(5000).required().escapeHTML(),
        createdBy: Joi.string().trim().max(30).allow('').optional().escapeHTML(),
        createDate: Joi.date(),
        lastModifiedBy: Joi.string().trim().max(30).allow('').optional().escapeHTML(),
        lastModifiedDate: Joi.date()
    }).required()
})

// MUST MATCH models/user.js
module.exports.userSchema = Joi.object({
    user: Joi.object({
        userRegistrationCode: Joi.string().trim().min(24).max(24).required().escapeHTML(), 
        email: Joi.string().trim().max(254).required().escapeHTML(),
        username: Joi.string().trim().min(6).max(30).required().escapeHTML()
    }).required()
})

// MUST MATCH models/sett.js
module.exports.settSchema = Joi.object({
    sett: Joi.object({
        QL1Label: Joi.string().trim().max(20).allow('').optional().escapeHTML(),
        QL1URL: Joi.string().trim().max(2000).allow('').optional().escapeHTML(),
        QL2Label: Joi.string().trim().max(20).allow('').optional().escapeHTML(),
        QL2URL: Joi.string().trim().max(2000).allow('').optional().escapeHTML(),
        QL3Label: Joi.string().trim().max(20).allow('').optional().escapeHTML(),
        QL3URL: Joi.string().trim().max(2000).allow('').optional().escapeHTML(),
        QL4Label: Joi.string().trim().max(20).allow('').optional().escapeHTML(),
        QL4URL: Joi.string().trim().max(2000).allow('').optional().escapeHTML(),
        TL1Label: Joi.string().trim().max(20).allow('').optional().escapeHTML(),
        TL1URL: Joi.string().trim().max(2000).allow('').optional().escapeHTML(),
        TL2Label: Joi.string().trim().max(20).allow('').optional().escapeHTML(),
        TL2URL: Joi.string().trim().max(2000).allow('').optional().escapeHTML(),
        TL3Label: Joi.string().trim().max(20).allow('').optional().escapeHTML(),
        TL3URL: Joi.string().trim().max(2000).allow('').optional().escapeHTML(),
        TL4Label: Joi.string().trim().max(20).allow('').optional().escapeHTML(),
        TL4URL: Joi.string().trim().max(2000).allow('').optional().escapeHTML(),
        email: Joi.string().trim().max(254).allow('').optional().escapeHTML(),
        hours: Joi.string().trim().max(40).allow('').optional().escapeHTML(),
        phoneLabel: Joi.string().trim().max(20).allow('').optional().escapeHTML(),
        phone: Joi.string().trim().max(20).allow('').optional().escapeHTML(),
        socialIcon: Joi.string().trim().max(25).allow('').optional().escapeHTML(),
        socialLabel: Joi.string().trim().max(50).allow('').optional().escapeHTML(),
        socialURL: Joi.string().trim().max(2000).allow('').optional().escapeHTML(),
        address: Joi.string().trim().max(200).allow('').optional().escapeHTML(),
        payLabel: Joi.string().trim().max(50).allow('').optional().escapeHTML(),
        payURL: Joi.string().trim().max(2000).allow('').optional().escapeHTML(),
        registerFormLabel: Joi.string().trim().max(50).allow('').optional().escapeHTML(),
        registerFormURL: Joi.string().trim().max(2000).allow('').optional().escapeHTML(),
        courseIcon1: Joi.string().trim().max(50).allow('').optional().escapeHTML(),
        courseLabel1: Joi.string().trim().max(50).allow('').optional().escapeHTML(),
        courseDesc1: Joi.string().trim().max(2000).allow('').optional().escapeHTML(),
        courseIcon2: Joi.string().trim().max(50).allow('').optional().escapeHTML(),
        courseLabel2: Joi.string().trim().max(50).allow('').optional().escapeHTML(),
        courseDesc2: Joi.string().trim().max(2000).allow('').optional().escapeHTML(),
        courseIcon3: Joi.string().trim().max(50).allow('').optional().escapeHTML(),
        courseLabel3: Joi.string().trim().max(50).allow('').optional().escapeHTML(),
        courseDesc3: Joi.string().trim().max(2000).allow('').optional().escapeHTML(),
        courseIcon4: Joi.string().trim().max(50).allow('').optional().escapeHTML(),
        courseLabel4: Joi.string().trim().max(50).allow('').optional().escapeHTML(),
        courseDesc4: Joi.string().trim().max(2000).allow('').optional().escapeHTML(),
        courseIcon5: Joi.string().trim().max(50).allow('').optional().escapeHTML(),
        courseLabel5: Joi.string().trim().max(50).allow('').optional().escapeHTML(),
        courseDesc5: Joi.string().trim().max(2000).allow('').optional().escapeHTML(),
        courseIcon6: Joi.string().trim().max(50).allow('').optional().escapeHTML(),
        courseLabel6: Joi.string().trim().max(50).allow('').optional().escapeHTML(),
        courseDesc6: Joi.string().trim().max(2000).allow('').optional().escapeHTML(),
        aboutLabel1: Joi.string().trim().max(50).allow('').optional().escapeHTML(),
        aboutDesc1: Joi.string().trim().max(2000).allow('').optional().escapeHTML(),
        aboutLabel2: Joi.string().trim().max(50).allow('').optional().escapeHTML(),
        aboutDesc2: Joi.string().trim().max(2000).allow('').optional().escapeHTML(),
        createdBy: Joi.string().trim().max(30).allow('').optional().escapeHTML(),
        createDate: Joi.date(),
        lastModifiedBy: Joi.string().trim().max(30).allow('').optional().escapeHTML(),
        lastModifiedDate: Joi.date()
    }).required()
})