import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()

export function createUser(req,res){

    const newUserData = req.body

    if(newUserData.type == "admin"){
        if(req.user==null){
            res.json({
                message: "Please login as administrator to create admin accounts"
            })
            return
        }
    }

    if(req.user.type!="admin"){
        if(req.user==null){
            res.json({
                message: "Please login as administrator to create admin accounts"
            })
            return
        }
    }

    newUserData.password = bcrypt.hashSync(newUserData.password,10)


    const user  = new User(newUserData)

    user.save().then(()=>{
        res.json({
            message: "User Created"
        })
    }).catch(()=>{
        res.json({
            message: "user not created"
        })
    })
}

export function loggingUser(req,res){

    User.find({email : req.body.email}).then(
        (users)=>{
            if(users.length == 0){
                res.json({
                    message: "User not found"
                })
            }else{
                const user = users[0]

                const isPasswordCorrect = bcrypt.compareSync
                (req.body.password,user.password)

                if(isPasswordCorrect){
                    const token = jwt.sign({
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        isBlocked: user.isBlocked,
                        type: user.type,
                        profilePicture: user.profilePicture
                    },process.env.SECRET)

                    res.json({
                        message: "User logged in",
                        token: token,
                        user : {
                            firstName : firstName,
                            lastName : lastName,
                            type : type,
                            profilePicture : profilePicture,
                            email : email
                        }
                    })
                    
                }else{
                    res.json({
                        message: "User not logged in. (wrong password)"
                    })                          
                }                                                
            }
        }
    )


}

export function deleteUser(req,res){
    User.deleteOne({email: req.body.email}).then(()=>{
        res.json({
            message: "User Deleted"
        })
    })
}

export function isAdmin(req){
    if(req.user==null){
        return false
    }
// methana prashne thibe oya user obj ekam admin kiyan type ekada check krna nisa fail wena eka
    if(req.user.type!="admin"){
        return false
    }

    return true
}

export function isCustomer(req){
    if(req.user==null){
        return false
    }

    if(req.user.type!="customer"){
        return false
    }

    return true
}

// Admin --> sumudu98@example.com - pass1234
//           malee@example.com - pass3333

//customer --> test98@example.com - pass5555

//DB password --> admin:123