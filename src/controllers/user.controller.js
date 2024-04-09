import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import {User} from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req,res)=>{

    //get data from user
    // validate the data like username,password etc.
    // see if user already exist or not.
    // see for file are there or not ,specially avatar which is mandatory
    // upload the image in cloudnary 
    // create use object in db
    // remove password and refresh token from response
    // check for user creation 
    // return res

    const {fullName,email,username,password} = req.body;

    console.log("email:",email)

    // if(fullName===""){
        // throw new ApiError(400,"fullname is required")
    // }

    if([fullName,email,username,password].some((field)=> field?.trim()==="")){
        throw new ApiError(400,"All Fields are compulsory ")
    }
        
    // console.log(req.body)
    // console.log(req.files)

    const existedUser = await User.findOne({
        $or:[{username},{email}]
    })

    if(existedUser){
        throw new ApiError(409,"User with entered Username or Email already exists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    // const coverImageLocalPath = req.files?.coverImage[0]?.path;

    let coverImageLocalPath
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
        coverImageLocalPath = req.files.coverImage[0].path
    }

    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    //  console.log(avatar);

    if(!avatar){
        throw new ApiError(400,"Avatar file is required")
    }

    const user  = await User.create(
        {
            fullName,
            avatar: avatar.url,
            coverImage: coverImage?.url || "",
            email,
            password,
            username: username.toLowerCase()
        }
    )

       const createdUser  =  await User.findById(user._id).select(
            "-password -refreshToken"
        )

    if(!createdUser){
        throw new ApiError(500,"Something went Wrong while registring the User")
    }

    return res.status(201).json(
        new ApiResponse(201,createdUser,"User registered succesfully")
    )
})

export {registerUser}