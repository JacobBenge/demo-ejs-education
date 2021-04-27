const User = require('../models/user');
const Student = require('../models/student');
const Sett = require('../models/sett');

// GET REGISTER
module.exports.renderRegister = async(req, res) => {
    const settings = await Sett.findOne();
    res.render('auth/register', { settings });
}

//POST REGISTER
module.exports.createUser = async (req, res, next) => {
    try {
        const { userRegistrationCode, email, username, password } = req.body; // DESTRUCTURES THE REQ.BODY, WHICH IS THE DATA PROVIDED IN THE POST REQUEST FROM THE REGISTER FORM
        function hasWhiteSpace(s) { // CHECKS TO SEE IF STRING HAS SPACES OR TABS. https://stackoverflow.com/questions/1731190/check-if-a-string-has-white-space
            return /\s/g.test(s);
        }
        if (hasWhiteSpace(username)) throw ("No white spaces are allowed in the username."); // DON'T LET THEM REGISTER IF IT HAS SPACES OR TABS IN USERNAME
        try {
            if (!(userRegistrationCode == process.env.ADMINCODE)) { // IF USER USES THE ADMIN CODE, THEN LET THEM REGISTER WITHOUT CHECKING TO SEE IF A STUDENT._ID MATCHES. ADMIN CODE SHOULD BE AN .ENV VARIABLE.
                const foundStudent = await Student.findById(userRegistrationCode); // USE THE GIVEN REGISTRATION CODE TO LOOK FOR AN EXISTING STUDENT IN THE DATABASE
                if (foundStudent._id == userRegistrationCode) { } else { throw e; } // IF THE REGISTRATION CODE MATCHES THEN FINISH THE REGISTRATION PROCESS. OTHERWISE, THROW AN ERROR AND INSTRUCT THE USER TO OBTAIN ONE FROM THE TEACHER.
            }
        } catch (e) {
            throw ("You must use the registration code given to you by your teacher."); // BREAKS THE WHOLE PROCESS. NOTHING IS SAVED IN DB. REDIRECTED TO REGISTER PAGE WITH A FLASH MESSAGE.
        }
        try {
            await User.findOne({ username: username }); // RETURNS NULL IF USERNAME ISN'T TAKEN. RETURNS USER OBJECT IF IT ALREADY EXISTS. MONGOOSE AUTOMATICALLY THROWS THE ERROR FOR US.
            const user = new User({ userRegistrationCode, email, username }); // VALIDATES WITH THE USER MODEL AND CREATES THE USER OBJECT
            if (userRegistrationCode === process.env.ADMINCODE) { user.isAdmin = true; } // SET isAdmin TO TRUE IF ADMIN CODE USED. THIS MUST BE DONE AFTER USER OBJECT IS CREATED.
            // IF YOU RUN INTO A [object Object] ERROR MESSAGE, THEN DROP THE DATABASE AND START FRESH TO REFRESH THE SCHEMAS
            const registeredUser = await User.register(user, password); // register() IS A BLACK-BOX PASSPORT FUNCTION. IT SALT AND HASHES THE USERNAME AND PASSWORD. IT TAKES TIME SO AWAIT IT
            req.login(registeredUser, err => { // LOGS THE USER IN SO THEY DONT HAVE TO GO TO SIGN IN PAGE AFTER REGISTERING.
                if (err) return next(err);
                req.flash('success', `Thank you for registering ${username}! You are now logged in!`); // FLASH A SUCCESS MESSAGE
                
                res.redirect('/'); // ALWAYS REDIRECT POST REQUESTS.
            })
        } catch (e) {
            throw ("That username is unavailable. Please ensure the username doesn't contain spaces and is between 6 and 30 characters long.");
        }
    } catch (e) {
        req.flash('error', e); // DISPLAYS ERROR MESSAGE IN A FLASH AFTER REDIRECT
        res.redirect('register'); // ALWAYS REDIRECT POST REQUESTS
    }
}

//GET LOGIN
module.exports.renderLogin = async(req, res) => {
    const settings = await Sett.findOne();
    res.render('auth/login', { settings });
}

//POST LOGIN
module.exports.passportAuthLocal = async(req, res) => {
    const { username } = req.body;
    req.flash('success', `Welcome back ${username}!`);
    const redirectUrl = req.session.returnTo || '/'; // EITHER SEND THE USER BACK TO THE PAGE THEY CAME FROM OR BACK TO THE HOME PAGE
    delete req.session.returnTo; // CLEARS THE RETURNTO INFO FROM THE SESSION.
    res.redirect(redirectUrl);
}

//GET LOGOUT
module.exports.renderLogout = async(req, res) => {
    req.logout(); // PASSPORT FUNCTION TO LOG OUT. CLEARS THE SESSIONID FROM COOKIES.
    req.flash('success', `You've successfully logged out!`)
    res.redirect('/');
}