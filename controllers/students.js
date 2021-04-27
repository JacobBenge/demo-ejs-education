const Student = require('../models/student');
const Sett = require('../models/sett');

// GET
module.exports.index = async (req, res) => { 
    const settings = await Sett.findOne();
    const students = await Student.find({});
    res.render('students/index', { students, settings });
}

// GET
module.exports.renderStudentNew = async (req, res) => { 
    const settings = await Sett.findOne();
    res.render('students/new', { settings });
}

// POST
module.exports.createStudent = async (req, res) => {
    const settings = await Sett.findOne();
    req.session.settings = settings
    const student = new Student(req.body.student);
    student.createdBy = req.user.username // ADD THE NAME OF THE PERSON THAT CREATED THE STUDENT
    student.createDate = new Date(Date.now()); // ADD THE DATE THE STUDENT WAS ORIGINALLY CREATED
    await student.save();
    req.flash('success', `Successfully created a profile for ${student.firstName}`); // FLASH IS USED TO PASS A ONE-TIME MESSAGE TO THE NEXT PAGE LOAD FOR A FLASH MESSAGE
    res.redirect(`/students/${student._id}`)
}

// GET
module.exports.renderStudentShow = async (req, res) => {
    const settings = await Sett.findOne();
    req.session.settings = settings
    const student = await Student.findById(req.params.id).populate({path:'note'}); // LOADS ALL INFORMATION ABOUT THE STUDENT FROM MONGODB USING THE ID GIVEN IN THE URL. THEN POPULATES THE NOTE BY USING THE OBJECTIDS IN THE NOTE ARRAY.
    if(!student) { // SAY YOU BOOKMARKED A STUDENT URL AND SOMEONE DELETES THAT STUDENT AND YOU TRY TO RETURN TO THAT PAGE.
        req.flash('error', `Sorry, I couldn't find that student. Was that profile deleted?`); // FLASH A MESSAGE
        return res.redirect('/students'); // SEND TO /students RATHER THAN students/show. OTHERWISE IT WOULD SHOW A NASTY DEFAULT ERROR MESSAGE.
    }
    res.render('students/show', { student, settings }); 
}

//GET
module.exports.renderStudentEdit = async (req, res) => {
    const settings = await Sett.findOne();
    req.session.settings = settings
    const { id } = req.params;
    const student = await Student.findById(id);
    if(!student) { // SAY YOU BOOKMARKED A STUDENT URL AND SOMEONE DELETES THAT STUDENT AND YOU TRY TO RETURN TO THAT PAGE.
        req.flash('error', `Sorry, I couldn't find that student. Was that profile deleted?`); // FLASH A MESSAGE
        return res.redirect('/students'); // SEND TO /students RATHER THAN students/edit. OTHERWISE IT WOULD SHOW A NASTY DEFAULT ERROR MESSAGE.
    }
    res.render('students/edit', { student, settings });
}

//PUT
module.exports.updateStudent = async (req, res) => {
    const settings = await Sett.findOne();
    req.session.settings = settings
    const { id } = req.params; // PULLS THE STUDENT ID FROM THE REQUEST PARAMETERS (URL)
    const student = req.body.student;
    student.lastModifiedBy = req.user.username // ADD THE NAME OF THE PERSON THAT UPDATED THE STUDENT
    student.lastModifiedDate = new Date(Date.now()); // ADD THE DATE THE STUDENT WAS UPDATED
    const studentFull = await Student.findByIdAndUpdate(id, {...student}, { new: true })
    req.flash('success', `Successfully updated ${studentFull.firstName}'s profile`);
    res.redirect(`/students/${studentFull._id}`);
}

//DELETE
module.exports.deleteStudent = async (req,res) => {
    const settings = await Sett.findOne();
    req.session.settings = settings
    const { id } = req.params; // PULLS THE STUDENT ID FROM THE REQUEST PARAMETERS (URL)
    const student = await Student.findById(id);
    await Student.findByIdAndDelete(id); // ALSO TRIGGERS CASCADE DELETE OF RELATED NOTE. SEE student.js line 20
    req.flash('success', `Successfully deleted ${student.firstName}'s profile`);
    res.redirect('/students');
}