"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const FileuploadInput = () => {
  // Create a Supabase client configured to use cookies
  const supabase = createClientComponentClient();

  const handleFormSubmit = async (e) => {
    "use client";
    e.preventDefault();
    const avatarFile = e.target.files[0];

    const { data, error } = await supabase.storage
      .from("test")
      .upload("/public/meme1.jpg", avatarFile, {
        upsert: true,
      });

    if (error) {
      // Handle error
      console.log(error);
    } else {
      // Handle success
      console.log(data);
      console.log("File uploaded successfully.");
    }
  };

  return <input onChange={handleFormSubmit} type="file" name="file" />;
};

export default FileuploadInput;
