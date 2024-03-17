import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
    {
        videoFile:{
            type: String, // cloudinary url
            required: true,

        },
        thumbnail:{
            type: String,
            required: true
        },
        title:{
            type: String,
            required: true
        },
        description:{
            type: String,
            required: true
        },
        duration:{
            type: Number,
            required: true
        },
        views:{
            type: Number,
            dafault: 0,
        },
        isPublished:{
            type: Boolean,
            dafault: true
        },
        owner:{
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true
    }
)

videoSchema.plugin(mongooseAggregatePaginate) // to write aggrigate queries in mongoDB

export const Video = mongoose.Model("Video",videoSchema);