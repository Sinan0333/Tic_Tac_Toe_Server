const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwtToken = require('../utils/jwt')

//bcrypt password
const securePassword = async (password) => {
    try {
  
      const passwordHash = await bcrypt.hash(password, 10);
      return passwordHash;
  
    } catch (error) {
      console.log(error.message);
      res.render('500Error')
    }
};


const signIn = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });  
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            if(await bcrypt.compare(password, existingUser.password)){
                const token = jwtToken.generateToken(existingUser);
                return res.status(201).json({ message: "User login successfully",token,data:existingUser });
            }
            return res.status(400).json({ error: "Invalid credentials" });
        }
        const hashedPassword = await securePassword(password);
        const user = new User({ name, email, password: hashedPassword });
        const savedUser = await user.save();
        const token = jwtToken.generateToken(savedUser);
        res.status(201).json({ message: "User registered successfully",token,data:savedUser });
    } catch (error) {
        console.log(error.message);
    }
};

const googleAuth = async (req, res) => {
    try {
        const {name,email} = req.body
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const token = jwtToken.generateToken(existingUser);
            return res.status(201).json({ message: "User login successfully",token,data:existingUser });
        }

        const user = new User({ name, email, password:" "});
        const savedUser = await user.save();
        const token = jwtToken.generateToken(savedUser);
        res.status(201).json({ message: "User registered successfully",token,data:savedUser });

    } catch (error) {
        console.log(error.message);
    }
};


module.exports = {
    signIn,
    googleAuth
}