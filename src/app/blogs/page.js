import BlogOverView from "@/components/blog-overview";



async function fetchListOfBlogs(params) {
    try {
        const apiResponse = await fetch('http://localhost:3000/api/get-blogs', {
            method: 'GET',
            cache: 'no-store'
        })

        const result = await apiResponse.json();
        return result.data;
    } catch (error) {
        throw new Error(error)
    }
}

async function Blogs() {

    const blogList = await fetchListOfBlogs();
    return (
        <BlogOverView blogList={blogList} />
    )
}

export default Blogs