import Usermodel from "../Model/Usermodel.js"

export const getUserData = async (req, res) => {
  try {
    const {userId}=req.body

    const user = await Usermodel.findById(userId)

    if(!user){
        return res.json({success:false, message:"User not found"})
    }

    return res.json({success:true,
        user: {
            name:user.name,
            isAccountverified:user.isAccountVerified
        }
    })

   
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};