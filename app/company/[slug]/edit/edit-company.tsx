import { Company } from "@/lib/types";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import slugify from "slugify";
import clsx from "clsx";

export default async function EditCompany({ company }: { company: Company }) {
  const c = company;

  const editCompany = async (formData: FormData) => {
    "use server";
    // get name from input
    const name = formData.get("name");
    if (!name) {
      console.error("Name is required");
      return;
    }

    // check if data from form has changed and only update the fields that have changed

    const description = formData.get("description") || c.description;
    const logo = formData.get("logo") || c.logo;
    const website = formData.get("website") || c.website;
    const city = formData.get("city") || c.city_name;
    const staff_count = formData.get("staff_count") || c.staff_count;
    const twitter = formData.get("twitter") || c.twitter;
    const instagram = formData.get("instagram") || c.instagram;
    const youtube = formData.get("youtube") || c.youtube;
    const content = formData.get("content") || c.content;

    // @ts-expect-error slugify types are wrong
    const slug = slugify(name, {
      replacement: "-",
      remove: /[*+~.()'"!:@]/g,
      lower: true,
      strict: true,
      trim: true,
    });

    const supabase = createServerActionClient({ cookies });

    const { data, error } = await supabase
      .from("company")
      .update({
        // slug,
        name,
        description,
        logo,
        website,
        city_name: city,
        staff_count,
        twitter,
        instagram,
        youtube,
        content,
      })
      .eq("slug", company.slug)
      .select("*");
    error && console.log(error);

    revalidatePath(`/company/[slug]/edit`);
    revalidatePath(`/company/[slug]`);
    // redirect(`/company/${slug}`);
  };

  const fieldsetClass = "flex flex-col gap-4 pt-8";
  const inputClassName =
    "border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";

  return (
    <form action={editCompany} className="pt-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <fieldset className={fieldsetClass}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            defaultValue={company.name || ""}
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
            defaultValue={c.description || ""}
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
            defaultValue={c.logo || ""}
            className={inputClassName}
          />
        </fieldset>
        <fieldset className={fieldsetClass}>
          <label htmlFor="website">Website</label>
          <input
            type="text"
            name="website"
            id="website"
            placeholder="Website Url"
            defaultValue={c.website || ""}
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
            defaultValue={c.city_name || ""}
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
            defaultValue={c.staff_count || ""}
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
            defaultValue={c.twitter || ""}
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
            defaultValue={c.instagram || ""}
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
            defaultValue={c.youtube || ""}
            className={inputClassName}
          />
        </fieldset>
        <fieldset className={clsx(fieldsetClass)}>
          <label htmlFor="content">Content</label>
          <textarea
            name="content"
            id="content"
            defaultValue={c.content || ""}
            cols={30}
            rows={10}
            className={clsx("form-textarea ", inputClassName)}
          />
        </fieldset>
      </div>

      <button
        type="submit"
        className="mt-8 rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
      >
        Save
      </button>
      <Link
        href={`/company/${company.slug}`}
        className="ml-4 rounded-lg bg-slate-400 px-4 py-2 transition-colors hover:bg-red-500 hover:text-white"
      >
        Go Back
      </Link>
    </form>
  );
}
