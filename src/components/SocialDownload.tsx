
import axios from "axios";
import { useState } from "react";

const SocialDownload = () => {
    const [videoUrl, setVideoUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleDownload = async () => {
        if (!videoUrl.trim()) {
            setErrorMessage("Please enter a valid URL!");
            return;
        }

        setLoading(true);
        setErrorMessage("");
        setSuccessMessage("");

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}download`,
                { url: videoUrl }, // Pass the URL to the backend
                { responseType: "blob" } // Expect a file blob as the response
            );
            console.log(response)

            // Get the filename from the Content-Disposition header, if available
            const contentDisposition = response.headers["content-disposition"];
            let filename = `shiva-verma-developed${Date.now()}.mp4`; // Default filename
            if (contentDisposition) {
                const match = contentDisposition.match(/filename="(.+)"/);
                if (match && match[1]) {
                    filename = match[1]; // Use the filename from the header
                }
            }

            // Create a downloadable link
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", filename); // Use the dynamic filename
            document.body.appendChild(link);
            link.click();
            link.remove();

            setSuccessMessage("Video downloaded successfully!");
        } catch (error) {
            console.error("Error fetching video:", error);
            setErrorMessage("Failed to download the video. Please try again.");
        } finally {
            setLoading(false);
            // setVideoUrl("");
        }
    };

    // const handleTest = () => {
    //     // axios.get(
    //     //     `${process.env.NEXT_PUBLIC_BACKEND_URL}download/test`
    //     // )
    //     //     .then((res) => console.log(res))
    //     //     .catch((err) => console.log(err))

    //     const blobUrl = "blob:https://www.instagram.com/6d2ec890-c072-4bd8-a14d-a4dd30b322f5";

    //     fetch(blobUrl)
    //         .then((response) => response.blob())
    //         .then((blob) => {
    //             const a = document.createElement('a');
    //             const url = window.URL.createObjectURL(blob);
    //             a.href = url;
    //             a.download = 'instagram-video.mp4'; // Specify the filename
    //             document.body.appendChild(a);
    //             a.click();
    //             a.remove();
    //             window.URL.revokeObjectURL(url);
    //         })
    //         .catch((err) => console.error('Error downloading blob:', err));

    // }
    return (
        <>
            {/* <Button onClick={() => handleTest()} >
                Test Me
            </Button> */}
            {/* <Image alt="" src={'https://instagram.fdel8-1.fna.fbcdn.net/v/t51.2885-15/474556241_17994709100753426_2098602899948071181_n.jpg?stp=dst-jpg_e15_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi42MzJ4MTEyNC5zZHIuZjc1NzYxLmRlZmF1bHRfY292ZXJfZnJhbWUifQ&_nc_ht=instagram.fdel8-1.fna.fbcdn.net&_nc_cat=102&_nc_ohc=ijQr4QC2uOYQ7kNvgFq7ngR&_nc_gid=20458abb3e6e4b0c8ae526acab4f38be&edm=APs17CUBAAAA&ccb=7-5&ig_cache_key=MzU1MjUyNjQ1MDkyODcyNzA5Nw%3D%3D.3-ccb7-5&oh=00_AYAoGWCOgZegFTWbOXdNJwNybOA45Qtd5z7IsM2kM29WVA&oe=679C224D&_nc_sid=10d13b'} width='100' height={'100'} /> */}

            {/* <video
                className="x1lliihq x5yr21d xh8yej3"
                playsInline
                preload="none"
                src="https://instagram.fdel8-2.fna.fbcdn.net/o1/v/t16/f2/m69/AQOUnopew-D55mJG3aY8BlC4B6XPvyg656dOQMjXWUIBjNnXeKNCiPiiSNRGRih4BG3DrT3JNwnq7nzkKddvGoYV.mp4?efg=eyJ4cHZfYXNzZXRfaWQiOjIwMzU1MTQ2NTAyNDQ4MjIsInZlbmNvZGVfdGFnIjoieHB2X3Byb2dyZXNzaXZlLklOU1RBR1JBTS5DTElQUy5DMy4zNjAuZGFzaF9oMjY0LWJhc2ljLWdlbjJfMzYwcCJ9&_nc_ht=instagram.fdel8-2.fna.fbcdn.net&_nc_cat=105&strext=1&vs=c2f56b303faea277&_nc_vs=HBksFQIYOnBhc3N0aHJvdWdoX2V2ZXJzdG9yZS9HRDByVGh6ekhWeDZqNm9FQUxCaFVxYkZwQmdHYm1kakFBQUYVAALIAQAVAhg6cGFzc3Rocm91Z2hfZXZlcnN0b3JlL0dKU2xUaHlnWkx5WXZlb0dBSzBjalFFYTVFZ25idjRHQUFBRhUCAsgBACgAGAAbAogHdXNlX29pbAExEnByb2dyZXNzaXZlX3JlY2lwZQExFQAAJqzbzfrF0p0HFQIoAkMzLBdAQuqfvnbItBgZZGFzaF9oMjY0LWJhc2ljLWdlbjJfMzYwcBEAdf4HAA&ccb=9-4&oh=00_AYBkH7v2qiO6VShCDjEaRdfv9iA16iteyXNlU7FQ1fxGOA&oe=67982EFE&_nc_sid=1d576d"
                style={{ display: 'block' }}
                controls // Add controls if you want to enable play/pause functionality
            /> */}
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-400 to-blue-600">
                <div className="bg-white p-8 rounded-md shadow-lg w-11/12 max-w-md text-center">
                    <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-600">
                        Paste Your URL
                    </h1>
                    <input
                        type="text"
                        placeholder="Enter Instagram Reel URL"
                        className="mt-6 w-full px-4 py-2 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-teal-400 "
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                        style={{
                            backgroundColor: 'white'
                        }}
                    />
                    {errorMessage && (
                        <p className="mt-2 text-sm text-red-500">{errorMessage}</p>
                    )}
                    {successMessage && (
                        <p className="mt-2 text-sm text-green-500">{successMessage}</p>
                    )}
                    <button
                        onClick={handleDownload}
                        disabled={loading === true}
                        className={`mt-6 w-full py-2 text-lg font-semibold text-white rounded-md bg-gradient-to-r from-teal-400 to-blue-600 hover:bg-gradient-to-r hover:from-blue-600 hover:to-teal-400 ${loading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                    >
                        {loading ? (
                            <svg
                                className="animate-spin h-5 w-5 mx-auto text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v8H4z"
                                ></path>
                            </svg>
                        ) : (
                            "Submit"
                        )}
                    </button>
                </div>
            </div>
        </>
    )
}

export default SocialDownload
