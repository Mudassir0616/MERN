import bcrypt from 'bcryptjs'
import  jwt  from "jsonwebtoken";
import User from '../models/userModel.js'

export const signIn = async(req, res)=>{
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne( { email } );

        if(!existingUser) return res.status(404).json({ message: "Pehle account to bana, SignUp kar..."})

        const IsPasswordCorrect = await bcrypt.compare(password, existingUser.password)

        if(!IsPasswordCorrect) return res.status(400).json({ message:"Galat password hai re, yaad rakhne ka na apna password..."} )

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id}, 'test', { expiresIn:'1h'});

        res.status(200).json({ result: existingUser, token})
    } catch (error) {
        res.status(500).json({message:"Something went wrong !!!"})
    }
}

export const signUp = async(req, res)=>{
    const { email, password, firstName, lastName, confirmPassword} = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if(existingUser) return res.status(400).json({ message:"User already exist... Please try again!!!" })

        if(password !== confirmPassword) return res.status(400).json({ message:"Same password likh... Hero mat ban !!!" })

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({ email, password: hashedPassword, name:`${firstName} ${lastName}`})

        const token = jwt.sign({ email: result.email, id: result._id}, 'test', {expiresIn:'1h'});

        res.status(200).json({ result, token})

    } catch (error) {
        res.status(500).json({ message:'Something went Wrong!!!' })
    }
}