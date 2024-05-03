
import UserSchema from "../Modal/User.Schema.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


export const SignUp = async (req, res) => {
    try {
        // const { firstname, lastname, email, password, confirmPassword, image } = req.body;
          const { firstname, lastname, email, password, confirmPassword } = req.body.data;

        // console.log(req.body);

        if (!firstname || !lastname || !email || !password || !confirmPassword) {
            return res.status(400).send("All fields are required");
        }
        

        const emailIsExist = await UserSchema.find({ email: email });

        if (emailIsExist.length > 0) {
            return res.status(400).send("Email is already registered");
        }

        if (password !== confirmPassword) {
            return res.status(400).send("Password and Confirm Password do not match");
        }

        const hashPassword=await bcrypt.hashSync(password,10)
        // console.log(hashPassword);
        const user = new UserSchema({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: hashPassword
        });

        // console.log(user);

        await user.save();
        return res.status(200).json({ success: true, message: "SignUp successful" });
    } catch (error) {
        return res.status(500).json({ error });
    }
};





export const Login = async (req, res) => {
    // return res.send("login page")
    try {
        // const{email,password}=req.body
        // console.log(req.body);
        const { email, password } = req.body.loginData;

        if (!email || !password) {
            return res.status(401).json({ success: false, message: "Email and password are required" });
        }
        
        const user = await UserSchema.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ success: false, message: "Email does not exist" });
        }

        const isCorrectPassword=await bcrypt.compare(password,user.password)

        if(!isCorrectPassword){
            return res.status(404).json({success:false, message:"Password is incorrect"})
        }
        
        const token=await jwt.sign({userId:user._id},process.env.JWT_SECRET)
        // console.log(token,"token");
        

         res.status(200).json({ success: true, message: "Login successful",   token:token, user:{userId:user._id, firstname:user.firstname, email:user.email} });
       
    } catch (error) {
        return res.status(500).json({ success:false, error:error});
    }

}

export const getCurrentUser=async(req,res)=>{
    try{
        const {token}=req.body
		    if(!token){
            return res.status(404).json({success:false, messsage:"token is reuired"})
        }

        const decodedData=await jwt.verify(token,process.env.JWT_SECRET)
        // console.log("ytdeytdyhykj",decodedData.userId,"decodedData");

        const user=await UserSchema.findById(decodedData.userId)
        // console.log(user,"user");
		
		if (!user) {
            return res.status(404).json({ success: false })
        }
        return res.status(200).json({success:true, user: { firstname: user.firstname, email: user.email, userId: user._id }})
    }catch(error){
        return res.status(500).json({success:false, error:error})
    }
}





