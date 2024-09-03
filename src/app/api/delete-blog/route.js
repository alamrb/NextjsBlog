import connectToDB from "@/database";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";




export async function DELETE(req) {
    try {
        await connectToDB();
        const { searchParams } = new URL(req.url);
        const getCurrentBlogID = searchParams.get('id');
        // console.log(getCurrentBlogID)
        if (!getCurrentBlogID) {
            return NextResponse.json({
                success: false,
                message: 'No blog ID provided!'
            })
        }

        const deleteCurrentBLogByID = await Blog.findByIdAndDelete(getCurrentBlogID);
        if (deleteCurrentBLogByID) {
            return NextResponse.json({
                success: true,
                message: 'Blog deleted successfully!'
            })
        }
        return NextResponse.json({
            succeess: false,
            message: 'Something went wrong!  Please try again later'
        })

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            succeess: false,
            message: 'Something went wrong!  Please try again later'
        })
    }
}