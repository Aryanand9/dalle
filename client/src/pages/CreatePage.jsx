import React, { useState } from "react";
import { preview } from "../assets";
import { FormField, Loader } from "../components";
import { useNavigate } from "react-router-dom";
import { getRandomPrompt } from "../utils";

const CreatePage = () => {
  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImage(true);
        const response = await fetch("https://dalle-1zqo.onrender.com/api/v1/dalle", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({prompt:form.prompt }),
        });
        let data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (error) {
        alert(error);
      } finally {
        setGeneratingImage(false);
      }
    } else {
      alert("Please Enter the Prompt");
    }
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch("https://dalle-1zqo.onrender.com/api/v1/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body:JSON.stringify({...form})
        });
        await response.json()
        alert('Sucessfully Added')
        navigate('/')
      } catch (error) {
        console.log(error);
      }finally{
        setLoading(false)
      }
    }else{
      alert("PLEASE ENTER A PROMPT AND GENERATE IMAGE")
    }

  };
  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };
  const navigate = useNavigate();
  const [generatingImage, setGeneratingImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
        <p className="mt-3 text-[#666e75] max-w-[500px] text-[16px]">
          {" "}
          Create The Imaginative And Visually Stunning Images With Dalle
        </p>
      </div>
      <form onSubmit={handleSubmit} className="mt-16 max-w-3xl">
        <div className="flex flex-col gap-4">
          <FormField
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="John Dee"
            value={form.name}
            handleChange={handleChange}
          />
          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="A Space Shuttle flying above Cape Town, digital art"
            value={form.prompt}
            handleChange={handleChange}
            isSurprise
            handleSurpriseMe={handleSurpriseMe}
          />
          <div className="relative bg-gray-50 border-gray-100 text-gray-900 rounded-lg focus:ring-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                className="w-9/12 h-9/12 object-contain"
                opacity-40
                alt="preview"
                src={preview}
              />
            )}
            {generatingImage && (
              <div className="absolute inset-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] z-10 rounded-lg">
                <Loader />
              </div>
            )}
          </div>
          <div className="mt-5 flex gap-5 ">
            <button
              type="button"
              className="text-white bg-green-700 font-medium text-sm w-full sm:w-auto px-5 pt-2.5 rounded-md"
              onClick={generateImage}
            >
              {generatingImage ? "Generating Image..." : "Generated"}
            </button>
          </div>
          <div className="mt-10">
            <p className="mt-2 text-gray-600 text-14px">
              Once You have Created The Image You Can Shre It To Other in Your
              Community
            </p>
            <button
              type="submit"
              className="mt-4  text-white bg-violet-600 font-medium rounded-md text-sm w-full sm:w-auto px-auto py-2.5"
            >
              {loading ? "Sharing..." : "Share With The Community"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default CreatePage;
