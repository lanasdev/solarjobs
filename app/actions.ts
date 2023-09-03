"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import slugify from "slugify";


import type { Stripe } from "stripe";

import { redirect } from "next/navigation";
import { headers } from "next/headers";

import { formatAmountForStripe } from "@/lib/stripe-helpers";
import stripe from "@/lib/stripe";

const CURRENCY = "eur";

export async function createJob(formData: FormData) {
  //   console.log('createJob')

  const supabase = createServerActionClient({ cookies });

  // get name from input
  const name = formData.get("name");
  console.log("name:", name?.toString().trim());

  if (!name) return alert("Please add a title");
  

  const slug = slugify(name.toString(), { lower: true, strict: true });

  const description = formData.get("description");
    const content = formData.get("content");
    const hire_url = formData.get("hire_url");

 // company slug
  const company_slug = formData.get("company_slug");
  const isNewCompany = company_slug?.toString() === "addnew";

  if (!company_slug) return alert("Please add a company");



  const { data, error } = await supabase.from("jobs").upsert({
    slug,
    name,
    description,
    content,
    hire_url,
    company_slug,
  }).eq("slug", slug).select("uuid").single();

  if (error != null) {
    console.log(error);
    return alert("An error occurred while creating the job");
    }

  console.log("upsert: ", data);


  const { data: jobData, error: jobError } = await supabase.from("jobs").select("uuid").eq("slug", slug).single();
  if (jobError == null) {
    console.log(jobData);
  }
  const job_uuid = jobData?.uuid;

//   const formDataObj = Object.fromEntries(formData.entries());
//   console.log("formDataObj: ", formDataObj);

  // Upsells
  const premiumSupport = formData.get("premiumSupport")  === "on";
  console.log("premiumSupport: ", premiumSupport);

  const highlighted = formData.get("highlighted") === "on";
  console.log("highlighted: ", highlighted );



  const line_items = [
    {
      price: "price_1Nh8f8HAtYClIl6Eo72rfSjG",
      quantity: 1,
    },
    premiumSupport && {
      price: "price_1Nh8epHAtYClIl6EhgcH4jgz",
      quantity: 1,
    },
    highlighted && {
      price: "price_1Nh8iVHAtYClIl6ER5YEManq",
      quantity: 1,
    },
  ];

  const line = line_items.filter(Boolean);

  const checkoutSession: Stripe.Checkout.Session =
    await stripe.checkout.sessions.create({
      mode: "payment",
      submit_type: "pay",
      // @ts-ignore
      line_items: line,
      // line_items: [
      //   {
      //     // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
      //     price: "price_1Nh8f8HAtYClIl6Eo72rfSjG",
      //     quantity: 1,
      //   },
      //   {
      //     price: "price_1Nh8epHAtYClIl6EhgcH4jgz",
      //     quantity: 1,
      //   },
      //   {
      //     price: "price_1Nh8iVHAtYClIl6ER5YEManq",
      //     quantity: 1,
      //   },
      // ],
      metadata: {
        job_id: data?.uuid,
        job_slug: slug,
        company_slug: company_slug?.toString(),
      },

      success_url: `${headers().get(
        "origin",
      )}/job/${slug}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${headers().get(
        "origin",
      )}/hire?session_id={CHECKOUT_SESSION_ID}`,
    });

  redirect(checkoutSession.url as string);

  console.log('createJob End')
}



// add Company
const addCompany = async (formData: FormData) => {
    // get name from input
    const name = formData.get("name");
    if (!name) return;

    const description = formData.get("description");
    const logo = formData.get("logo");
    const website = formData.get("website")
    const city = formData.get("city");
    const staff_count = formData.get("staff_count");
    const twitter = formData.get("twitter");
    const instagram = formData.get("instagram");
    const youtube = formData.get("youtube");

    // @ts-expect-error slugify types are wrong
    const slug = slugify(name, { lower: true, strict: true });

    const supabase = createServerActionClient({ cookies });
    const { data: user } = await supabase.auth.getUser();

    // console.log("user", user);

    const { data: companyData, error: companyError } = await supabase.from("company").insert({
      slug,
      name,
      description,
      logo,
      website,
        city_name: city,
        staff_count,
        twitter,
        instagram,
        youtube,
        user_id: user?.user?.id,
    });
    console.log("companyData", companyData);
    console.log("companyError", companyError);

    revalidatePath("/company/" + slug);
    redirect("/company/" + slug)
  };

  export { addCompany };