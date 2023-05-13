const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");


//REGISTER
router.post("/signup", async (req, res) => {
    try {
        let useremail = await User.findOne({ email: req.body.email });
        if (useremail) return res.status(409).send({message: "User with given email already Exist!"});

     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(req.body.password, salt);

     const newUser = new User({
       username: req.body.username,
       email: req.body.email,
       password: hashedPassword,
     });

     const user = await newUser.save();
     res.status(200).send({message: "User has login"
    });
    } catch (err) {
         res.status(500).send(err.message);
    }
    
})


router.post("/signin", async (req, res)=> {
    try{
      const user = await User.findOne({ email: req.body.email });
      !user && res.status(404).send({ message: "User not found" });

      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      !validPassword && res.status(400).send({ message: "Wrong password" });

     
      res.status(200).send(user);
    }catch(err){
    res.status(500).json(err)
  }
})



module.exports = router;