import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import slugify from "slugify";

export default async function NewCompany() {
  const addCompany = async (formData: FormData) => {
    "use server";
    // get name from input
    const name = formData.get("name");
    if (!name) return;

    const description = formData.get("description");
    const logo = formData.get("logo");
    const website = formData.get("website");
    // const city = formData.get("city");
    // const staff_count = formData.get("staff_count");
    // const twitter = formData.get("twitter");
    // const instagram = formData.get("instagram");
    // const youtube = formData.get("youtube");

    // @ts-expect-error slugify types are wrong
    const slug = slugify(name, { lower: true, strict: true });

    const supabase = createServerActionClient({ cookies });
    const { data: user } = await supabase.auth.getUser();

    console.log("user", user);

    await supabase.from("company").insert({
      slug,
      name,
      description,
      logo,
      website,
      //   city,
      //   staff_count,
      //   twitter,
      //   instagram,
      //   youtube,
      //   user_id: user?.user?.id,
    });
    revalidatePath("/company/new");
  };

  const fieldsetClass = "flex flex-col gap-4 pt-8";
  const inputClassName =
    "border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";

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
        className="mt-8 bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2"
      >
        Create Company
      </button>
    </form>
  );
}
