"use Client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
const AddNewBlog = ({ openBlogDialog, setOpenBlogDialog, loading, blogFormData, setBlogFormData, handleSaveBlogData, currentEditedBlogID, setCurrentEditedBlogID }) => {
    return (
        <>
            <div>
                <Button onClick={() => setOpenBlogDialog(true)}>Add New Blog</Button>
            </div>


            <Dialog open={openBlogDialog} onOpenChange={() => {
                setOpenBlogDialog(false);
                setBlogFormData({
                    title: "",
                    description: "",
                });
                setCurrentEditedBlogID(null)
            }}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle> {currentEditedBlogID ? 'Edit Blog' : 'Add New Blog'}</DialogTitle>
                        <DialogDescription>
                            Add New Blog for your Content
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Title
                            </Label>
                            <Input name="title" placeholder="Enter your Blog Title" value={blogFormData.title} onChange={(event) => setBlogFormData({
                                ...blogFormData, title: event.target.value
                            })} id="title" className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                Description
                            </Label>
                            <Input name="description" placeholder="Enter your Blog description" value={blogFormData.description} onChange={(event) => setBlogFormData({
                                ...blogFormData, description: event.target.value
                            })}
                                id="description"
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleSaveBlogData} type="button">
                            {
                                loading ? "Adding..." : "Save"
                            }</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </>
    )
}

export default AddNewBlog