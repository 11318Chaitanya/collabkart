import React from "react";
import { useState } from "react";

export default function Signup() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // const [image, setImage] = useState([]);

  const handleChange = (e) => {
    if (e.target.id === "screenshotsOfInstagramLink") {
      const files = e.target.files;
      const imgArr = [];
      files.forEach((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => imgArr.push(reader.result);
      });
      setImage((prev) => [...prev, ...imgArr]);
      setFormData({
        ...formData,
        [e.target.id]: imgArr,
      });
    } else {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
      console.log(formData);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_API_URL} + /api/user/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();

      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }
      setError(false);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };
  return (
    <div className="max-w-lg mx-auto  gap-4  p-3 ">
      <img
        src=".././public/logo.png"
        alt="logo of collabkart"
        className="max-w-80%"
      ></img>
      <h1 className="font-bold mt-10 text-5xl text-center ">Sign Up</h1>
      <form className="flex flex-col gap-4 mt-14" onSubmit={handleSubmit}>
        <input
          type="text"
          id="username"
          placeholder="username"
          className="p-3 rounded-lg bg-slate-100"
          onChange={handleChange}
        ></input>
        <input
          type="text"
          id="display_Name"
          placeholder="Display name"
          className="p-3 rounded-lg bg-slate-100"
          onChange={handleChange}
        ></input>
        <input
          type="email"
          id="email"
          placeholder="email"
          className="p-3 rounded-lg bg-slate-100"
          onChange={handleChange}
        ></input>
        <input
          type="text"
          id="instagramLink"
          placeholder="instagram link"
          className="p-3 rounded-lg bg-slate-100"
          onChange={handleChange}
        ></input>
        <input
          type="file"
          id="images"
          placeholder="instagram link"
          className="p-3 rounded-xl ml-0"
          multiple
          accept="image/*"
          onchange={handleChange}
        ></input>

        <button
          className="bg-slate-500 rounded-lg text-center p-3 uppercase text-white"
          disabled={loading}
        >
          {loading ? "...loading" : "Sign Up"}
        </button>
        <p>{error && error.message}</p>
      </form>

      {/* <p className="mt-3">
        Have an account?
        <span className="text-blue-400 ml-1"> Sign in</span>
      </p>
      <p className="text-red-500 mt-5"></p> */}
    </div>
  );
}
