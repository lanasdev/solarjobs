import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import slugify from "slugify";
import FileuploadInput from "./Fileupload";
import { addCompany } from "@/app/actions";

export default async function NewCompany() {
  

  const fieldsetClass = "flex flex-col gap-4 pt-8";
  const inputClassName =
    "border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";

  // TODO: Move file upload form into this component and make it server side
  return (
    <form action={addCompany} className="pt-8">
      <div className="grid grid-cols-2 gap-4">
        <fieldset className={fieldsetClass}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            className={inputClassName}
            required
          />
        </fieldset>
        <fieldset className={fieldsetClass}>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            id="description"
            placeholder="Description"
            className={inputClassName}
            required
          />
        </fieldset>
        <fieldset className={fieldsetClass}>
          <label htmlFor="logo">Logo</label>
          <input
            type="text"
            name="logo"
            id="logo"
            placeholder="Logo"
            className={inputClassName}
          />
        </fieldset>
        {/* <fieldset className={fieldsetClass}>
          <label htmlFor="file">File</label>
          <FileuploadInput />
        </fieldset> */}
        <fieldset className={fieldsetClass}>
          <label htmlFor="website">Website</label>
          <input
            type="text"
            name="website"
            id="website"
            placeholder="Website"
            className={inputClassName}
          />
        </fieldset>
        {/* City Name, Staff Count, Twitter, Instagram, Youtube */}
        <fieldset className={fieldsetClass}>
          <label htmlFor="city">City</label>
          <input
            type="text"
            name="city"
            id="city"
            placeholder="City"
            className={inputClassName}
          />
        </fieldset>
        <fieldset className={fieldsetClass}>
          <label htmlFor="staff_count">Staff Count</label>
          <input
            type="text"
            name="staff_count"
            id="staff_count"
            placeholder="Staff Count"
            className={inputClassName}
          />
        </fieldset>
        <fieldset className={fieldsetClass}>
          <label htmlFor="twitter">Twitter</label>
          <input
            type="text"
            name="twitter"
            id="twitter"
            placeholder="Twitter"
            className={inputClassName}
          />
        </fieldset>
        <fieldset className={fieldsetClass}>
          <label htmlFor="instagram">Instagram</label>
          <input
            type="text"
            name="instagram"
            id="instagram"
            placeholder="Instagram"
            className={inputClassName}
          />
        </fieldset>
        <fieldset className={fieldsetClass}>
          <label htmlFor="youtube">Youtube</label>
          <input
            type="text"
            name="youtube"
            id="youtube"
            placeholder="Youtube"
            className={inputClassName}
          />
        </fieldset>
      </div>
      <button
        type="submit"
        className="mt-8 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Create Company
      </button>
    </form>
  );
}

// const handleFormSubmit = async (e: any) => {
//   "use client";
//   e.preventDefault();
//   const avatarFile = e.target.files[0];

//   const { data, error } = await supabase.storage
//     .from("test")
//     .upload("/public/meme1.jpg", avatarFile);
//   if (error) {
//     // Handle error
//     console.log(error);
//   } else {
//     // Handle success
//     console.log(data);
//     console.log("File uploaded successfully.");
//   }
// };
