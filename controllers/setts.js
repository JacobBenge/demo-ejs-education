const Sett = require('../models/sett');

// GET
module.exports.index = async (req, res) => { 
    const settings = await Sett.findOne();
    const setts = await Sett.find({});
    res.render('setts/index', { setts, settings });
}

// GET
module.exports.renderSettNew = async(req, res) => { 
    const settings = await Sett.findOne();
    res.render('setts/new', { settings });
}

// POST
module.exports.createSett = async (req, res) => {
    const settings = await Sett.findOne();
    req.session.settings = settings
    const sett = new Sett(req.body.sett);
    sett.createdBy = req.user.username // ADD THE NAME OF THE PERSON THAT CREATED THE SETTING
    sett.createDate = new Date(Date.now()); // ADD THE DATE THE SETTING WAS ORIGINALLY CREATED
    await sett.save();
    req.flash('success', `Successfully setup the Site Settings!`); // FLASH IS USED TO PASS A ONE-TIME MESSAGE TO THE NEXT PAGE LOAD FOR A FLASH MESSAGE
    res.redirect(`/setts/${sett._id}`)
}

// GET
module.exports.renderSettShow = async (req, res) => {
    const settings = await Sett.findOne();
    req.session.settings = settings
    const sett = await Sett.findById(req.params.id); // LOADS ALL INFORMATION ABOUT THE SETTING FROM MONGODB USING THE ID GIVEN IN THE URL. THEN POPULATES THE NOTE BY USING THE OBJECTIDS IN THE NOTE ARRAY.
    if(!sett) { // SAY YOU BOOKMARKED A SETTING URL AND SOMEONE DELETES THAT SETTING AND YOU TRY TO RETURN TO THAT PAGE.
        req.flash('error', `Sorry, I couldn't find that setting. Was it deleted?`); // FLASH A MESSAGE
        return res.redirect('/setts'); // SEND TO /setts RATHER THAN setts/show. OTHERWISE IT WOULD SHOW A NASTY DEFAULT ERROR MESSAGE.
    }
    res.render('setts/show', { sett, settings }); 
}

//GET
module.exports.renderSettEdit = async (req, res) => {
    const settings = await Sett.findOne();
    req.session.settings = settings
    const { id } = req.params;
    const sett = await Sett.findById(id);
    if(!sett) { // SAY YOU BOOKMARKED A SETTING URL AND SOMEONE DELETES THAT SETTING AND YOU TRY TO RETURN TO THAT PAGE.
        req.flash('error', `Sorry, I couldn't find that setting. Was it deleted?`); // FLASH A MESSAGE
        return res.redirect('/setts'); // SEND TO /setts RATHER THAN setts/edit. OTHERWISE IT WOULD SHOW A NASTY DEFAULT ERROR MESSAGE.
    }
    res.render('setts/edit', { sett, settings });
}

//PUT
module.exports.updateSett = async (req, res) => {
    const settings = await Sett.findOne();
    req.session.settings = settings
    const { id } = req.params; // PULLS THE SETTING ID FROM THE REQUEST PARAMETERS (URL)
    const sett = req.body.sett;
    sett.lastModifiedBy = req.user.username // ADD THE NAME OF THE PERSON THAT UPDATED THE SETTING
    sett.lastModifiedDate = new Date(Date.now()); // ADD THE DATE THE SETTING WAS UPDATED
    const settFull = await Sett.findByIdAndUpdate(id, {...sett}, { new: true })
    req.flash('success', `Successfully updated the site settings!`);
    res.redirect(`/setts/${settFull._id}`);
}