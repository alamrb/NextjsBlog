import connectToDB from "@/database";
import Blog from "@/models/blog";
import Joi from "joi";
import { NextResponse } from "next/server";

const EditBlog = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
})


export async function PUT(req) {

    try {

        await connectToDB();
        const { searchParams } = new URL(req.url);
        const getCurrentBlogID = searchParams.get("id");

        if (!getCurrentBlogID) {
            return NextResponse.json({
                success: false,
                message: "Invalid blog post ID."
            })
        }

        const { title, description } = await req.json();

        const { error } = EditBlog.validate({
            title, description
        });

        if (error) {
            return NextResponse.json({
                success: false,
                message: error.details[0].message
            })
        }

        const updateBlogByBlogID = await Blog.findOneAndUpdate({
            _id: getCurrentBlogID,
        }, { title, description }, { new: true });

        if (updateBlogByBlogID) {
            return NextResponse.json({
                success: true,
                message: "Blog post updated successfully."
            })
        } else {
            return NextResponse.json({
                success: false,
                message: "Blog post updated Failed."
            })
        }

    } catch (e) {
        console.log(e);
        return NextResponse.json({
            success: false,
            message: "An error occurred while updating the blog post."
        })
    }
}