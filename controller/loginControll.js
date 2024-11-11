
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import  {UserSchema}  from '../model/userModel.js';
const signup=async(req,res)=>{
    const {name,email,password}=req.body;
    const photo = req.file ? req.file.filename : null;
    console.log(req.file);
    
    console.log(req.body);
        if(!name ||!email ||!password){
        return res.status(400).json({error: 'Please fill all the fields'});
    }
    const passwordHash=bcrypt.hashSync(password,10);
    const newUser=new UserSchema({name,email,password:passwordHash,photo});
    try {
        res.status(201).json({message: 'User created successfully'});
        await newUser.save()
        console.log(newUser);
        
    } catch (error) {
        res.status(409).json({error: 'User already exists'});
        console.log(error);
        
    }
     
  


   

}

const login=async(req,res)=>{
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Please fill all the fields' });
    }

    try {
        const user = await UserSchema.findOne({ email });
        console.log(user);
        

        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

      
        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch);
        

        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid password' });
        }

       
        const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log(token);
        

        res.status(200).json({
            message: 'User logged in successfully',
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
 }


export {signup,login};