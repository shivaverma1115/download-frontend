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
                `http://localhost:5000/download`,
                { url: videoUrl }, // Pass the URL to the backend
                { responseType: "blob" } // Expect a file blob as the response
            );

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
            setVideoUrl("");
        }
    };


    return (
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
                        backgroundColor:'white'
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
    )
}

export default SocialDownload
