import { Company } from "@/lib/types";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import clsx from "clsx";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import slugify from "slugify";

export default async function NewJobForm({ company }: { company: Company[] }) {
  const addJob = async (formData: FormData) => {
    "use server";
    // get name from input
    const name = formData.get("name");
    if (!name) return;

    const description = formData.get("description");
    const content = formData.get("content");
    const hire_url = formData.get("hire_url");
    const company_slug = formData.get("company_slug");

    // @ts-expect-error slugify types are wrong
    const slug = slugify(name, { lower: true, strict: true });

    const supabase = createServerActionClient({ cookies });
    const { data: user } = await supabase.auth.getUser();

    // console.log("user", user);

    const { data, error } = await supabase.from("jobs").upsert({
      slug,
      name,
      description,
      content,
      hire_url,
      company_slug,
    });
    console.log(data, error);
    revalidatePath("/job/new");
  };

  const fieldsetClass = "flex flex-col gap-4 pt-8";
  const inputClassName =
    "border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";

  return (
    <form action={addJob} className="pt-8">
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
          <label htmlFor="hire_url">Hire URL</label>
          <input
            type="text"
            name="hire_url"
            id="hire_url"
            placeholder="Hire URL"
            className={inputClassName}
            required
          />
        </fieldset>
        <fieldset className={clsx(fieldsetClass)}>
          <label htmlFor="content">Content</label>
          <textarea
            name="content"
            id="content"
            placeholder="job description"
            className={clsx("form-textarea w-full", inputClassName)}
          />
        </fieldset>
        <select
          name="company_slug"
          id="company_slug"
          className={inputClassName}
        >
          {company?.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* <code>{JSON.stringify(company, null, 2)}</code> */}

      <button
        type="submit"
        className="mt-8 bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2"
      >
        Post your job listing
      </button>
    </form>
  );
}
