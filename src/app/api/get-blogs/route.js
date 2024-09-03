import connectToDB from "@/database";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";




export async function GET() {
    try {

        await connectToDB();
        const extrctAllBlogsFromDatabase = await Blog.find({});
        if (extrctAllBlogsFromDatabase) {
            return NextResponse.json({
                success: true,
                data: extrctAllBlogsFromDatabase,
            });
        } else {
            return NextResponse.json({
                success: false,
                message: "No blog posts found",
            });
        }

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong! please try again later",
        })
    }
}