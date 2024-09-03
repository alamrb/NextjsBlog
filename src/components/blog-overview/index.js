"use client"
import {
    Card,
    CardContent,
    CardDescription,
    CardTitle
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AddNewBlog from "../add-new-blog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

const initialBlogFormData = {
    title: "",
    description: "",
}
const BlogOverView = ({ blogList }) => {


    const [openBlogDialog, setOpenBlogDialog] = useState(false)
    const [loading, setLoading] = useState(false);
    const [blogFormData, setBlogFormData] = useState(initialBlogFormData)
    const [currentEditedBlogID, setCurrentEditedBlogID] = useState(null)

    const router = useRouter();

    useEffect(() => {
        router.refresh()
    }, [])

    async function handleSaveBlogData() {
        try {
            setLoading(true)
            const apiResponse = currentEditedBlogID !== null ?
                await fetch(`/api/update-blog?id=${currentEditedBlogID}`, {
                    method: "PUT",
                    body: JSON.stringify(blogFormData)
                })
                : await fetch("/api/add-blog", {
                    method: "POST",
                    body: JSON.stringify(blogFormData)
                });

            const result = await apiResponse.json();

            if (result.success) {
                setBlogFormData(initialBlogFormData)
                setOpenBlogDialog(false)
                setLoading(false);
                setCurrentEditedBlogID(null)
                router.refresh();
            }
            console.log(result)

        } catch (error) {
            console.error("Error saving blog data");
            setLoading(false);
            setBlogFormData(initialBlogFormData)
        }
    }

    async function handleDeleteBlogByID(getCurrentID) {
        try {

            const apiResponse = await fetch(`/api/delete-blog?id=${getCurrentID}`, {
                method: "DELETE"
            });

            console.log(apiResponse)
            const result = await apiResponse.json();
            console.log(result)
            if (result?.success) router.refresh();

        } catch (e) {
            console.log(e)
        }

    }


    function handleEdit(getCurrentBlog) {
        setCurrentEditedBlogID(getCurrentBlog?._id);
        setBlogFormData({
            title: getCurrentBlog?.title,
            description: getCurrentBlog?.description,
        })
        setOpenBlogDialog(true);
    }

    console.log(setCurrentEditedBlogID)

    return (
        <div className="min-h-screen flex flex-col gap-10 bg-gradient-to-r from-purple-500 to-blue-600 p-6">
            <AddNewBlog openBlogDialog={openBlogDialog} setOpenBlogDialog={setOpenBlogDialog} loading={loading} setLoading={setLoading} blogFormData={blogFormData} setBlogFormData={setBlogFormData} handleSaveBlogData={handleSaveBlogData} currentEditedBlogID={currentEditedBlogID} setCurrentEditedBlogID={setCurrentEditedBlogID} />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
                {
                    blogList && blogList.length > 0 ?
                        blogList.map(blogItem => <Card key="" className="p-5">
                            <CardContent>
                                <CardTitle className="mb-5">{blogItem.title}</CardTitle>
                                <CardDescription>{blogItem.description}</CardDescription>
                                <div className="mt-5 flex gap-5 justify-between ">
                                    <Button onClick={() => handleEdit(blogItem)}>Edit</Button>
                                    <Button onClick={() => handleDeleteBlogByID(blogItem._id)}>Delete</Button>
                                    {console.log(blogItem._id)}
                                </div>
                            </CardContent>

                        </Card>)
                        : <Label className="text-3xl font-extrabold">No BLog Found! Please add one</Label>

                    // : null

                }
            </div>

        </div>
    )
}

export default BlogOverView