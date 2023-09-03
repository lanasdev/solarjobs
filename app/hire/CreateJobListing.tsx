"use client";

import React, { useEffect, useState } from "react";
import { formatAmountForDisplay } from "@/lib/stripe-helpers";
import { cn } from "@/lib/utils";
import { createJob } from "@/app/actions";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { Company } from "@/lib/types";
import clsx from "clsx";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function CreateJobListing({ company }: { company: Company[] }) {
  const loading = false;
  const initialPrice = 250;

  const [totalPrice, setTotalPrice] = useState<number>(initialPrice);

  const [addCompany, setAddCompany] = useState<boolean>(true);

  const { pending } = useFormStatus();

  const fieldsetClass = "flex flex-col gap-4 md:pt-8";
  const inputClassName =
    "border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";

  return (
    <form action={createJob} className="flex flex-col gap-8 pt-8">
        <fieldset className={fieldsetClass}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            className={inputClassName}
            minLength={3}
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
      <fieldset className={fieldsetClass}>
        <label htmlFor="company_slug">Company {`(Add one if you haven't already)`}</label>
        <select
          name="company_slug"
          id="company_slug"
          className={inputClassName}
          defaultValue={"addnew"}
          onChange={(e) =>
            setAddCompany(
              e.currentTarget.value.toString() == "addnew" ? true : false,
            )
          }
        >
          <option value="addnew">Add new Company</option>
          {company?.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
      </fieldset>

      {addCompany && (
        <div className="flex flex-col ">
          <h3 className="text-xl font-semibold">Add your company</h3>
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
        </div>
      )}

      {/* Upsell */}
      <div className="gap-4">
        <input
          id="premiumSupport"
          name="premiumSupport"
          type="checkbox"
          defaultChecked
          // onChange={(e) => setPremiumSupport(!premiumSupport)}
          // onChange={(e) => setPremiumSupport(e.target.value ? false : true)}
        />
        <label htmlFor="premiumSupport">{`Premium Support (89€)`}</label>
      </div>
      <div className="gap-4">
        <input
          id="highlighted"
          name="highlighted"
          type="checkbox"
          defaultChecked
          // onChange={(e) => setHighlighted(e.target.value ? false : true)}
        />

        <label htmlFor="highlighted">{`Highlighted (49€)`}</label>
      </div>
      <button
        className={cn(
          "rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700",
          pending && "cursor-not-allowed bg-gray-500",
        )}
        type="submit"
        disabled={pending}
      >
        {pending
          ? "Loading…"
          : `Buy for ${formatAmountForDisplay(totalPrice, "eur")}`}
      </button>
    </form>
  );
}
