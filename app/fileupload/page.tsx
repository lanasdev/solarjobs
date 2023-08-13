"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { createClient } from "@supabase/supabase-js";

// Test page
const FileuploadPage = () => {
  // Create a Supabase client configured to use cookies
  const supabase = createClientComponentClient();

  // Upload file using standard upload
  //   async function uploadFile(file) {

  //     const avatarFile = e.target.files[0];

  //     const { data, error } = await supabase.storage
  //       .from("avatars")
  //       .upload("/public/meme1.jpg", avatarFile);    if (error) {
  //       // Handle error
  //       console.log(error);
  //     } else {
  //       // Handle success
  //       console.log(data);
  //       console.log("File uploaded successfully.");
  //     }
  //   }

  const handleFormSubmit = async (e: any) => {
    "use client";
    e.preventDefault();
    const avatarFile = e.target.files[0];

    const { data, error } = await supabase.storage
      .from("test")
      .upload("/public/meme1.jpg", avatarFile);
    if (error) {
      // Handle error
      console.log(error);
    } else {
      // Handle success
      console.log(data);
      console.log("File uploaded successfully.");
    }
  };

  return (
    <div className="pt-16">
      <h1 className="text-2xl font-bold ">Fileupload Page</h1>
      <input onChange={handleFormSubmit} type="file" name="file" />
    </div>
  );
};

export default FileuploadPage;
