import React, { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function UrlShortenerUI() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!url) {
      toast.error("Please fill the URL field");
      setLoading(false);
      return;
    }

    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const token = userInfo?.token;

      if (!token) {
        toast.error("User not logged in");
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
      };

      const { data } = await API.post(
        "/api/shorturl",
        {
          url,
        },
        config
      );
      setShortUrl(data.shortUrl);
      console.log(shortUrl);
      toast.success("URL created", {
        //Updated toast call
        description: "Short URL has been created Successfully",
        duration: 5000,
      });
    } catch (error) {
      toast.error("Failed to create URL", {
        //
        description: error.response?.data?.message || "Something went wrong!",
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-900 relative">
      {/* Logout button */}
      <button
        type="button"
        onClick={handleLogout}
        className="absolute top-4 right-6 rounded-lg px-4 py-2 bg-red-600 text-white font-semibold hover:bg-red-700 transition duration-200 cursor-pointer"
      >
        Logout
      </button>

      <div className="w-full max-w-3xl rounded-2xl shadow-xl p-6 bg-gray-800 text-gray-100">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          URL Shortener
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-300">
              Long URL
            </label>
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com or example.com"
              className="w-full rounded-xl border border-gray-600 bg-gray-700 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 placeholder-gray-400"
            />
          </div>

          <div className="md:col-span-3 flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-xl py-2 px-4 font-semibold bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60 transition duration-200 cursor-pointer"
            >
              {loading ? "Shortening..." : "Shorten URL"}
            </button>
            <button
              type="button"
              onClick={() => {
                setUrl("");
                setError("");
                setShortUrl("");
              }}
              className="rounded-xl py-2 px-4 font-semibold border border-gray-600 hover:bg-gray-700 transition duration-200 cursor-pointer"
            >
              Clear
            </button>
          </div>

          {/* Output box for generated short URL */}
          {shortUrl && (
            <div className="mt-6 p-4 border-l-4 border-blue-500 rounded-xl bg-gray-700 flex justify-between items-center shadow-md">
              <a
                href={shortUrl}
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 underline break-words font-medium"
              >
                {shortUrl}
              </a>
              <button
                onClick={() => navigator.clipboard.writeText(shortUrl)}
                className="ml-3 px-3 py-1 rounded-lg bg-gray-600 text-gray-200 hover:bg-gray-500 transition duration-200 cursor-pointer"
              >
                Copy
              </button>
            </div>
          )}

          {error && (
            <p className="mt-4 text-sm text-red-500 font-medium">{error}</p>
          )}
        </form>
      </div>
    </div>
  );
}
