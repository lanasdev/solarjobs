import Link from "next/link";
import Image from "next/image";

import Balancer from "react-wrap-balancer";

import HeroImg from "@/public/images/heroimg.png";
import HeroImg2 from "@/public//images/lanasdev_a_guy_putting_a_solar_panel_on_top_of_a_german_roof.png";
import SearchBar from "@/components/SearchBar";

export default function Hero() {
  return (
    <>
      <section className="relative isolate">
        <Image
          src={HeroImg2}
          alt="Solar Jobs Hero"
          className="h-80 w-full object-cover lg:h-96"
        />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-4 text-slate-100 sm:px-0">
          <h1 className="mx-auto max-w-xl text-center text-3xl font-semibold !leading-tight text-slate-50 md:text-4xl lg:text-5xl">
            <Balancer>
              The fastest way to get hired in the solar industry
            </Balancer>
          </h1>
          <SearchBar />
        </div>
      </section>
      {/* <section className="relative">
        <img
          src="https://i.imgur.com/PZzuRFL.png"
          className="h-80 w-full object-cover object-center"
        />

        <div className="absolute inset-x-0 top-12 my-2">
          <p className="text-3xl lg:text-4xl !leading-tight font-semibold mx-auto max-w-xl text-center my-12 text-slate-50">
            Create solar energy
          </p>
        </div>
      </section> */}
      {/* <div className="relative min-h-min">
        {/* <img
          // src="https://i.imgur.com/PZzuRFL.png"
          src="/images/lanasdev_a_guy_putting_a_solar_panel_on_top_of_a_german_roof.png"
          alt="Hero Image"
          className=" h-64 w-full object-fill"
        /> 
        <Image
          src={HeroImg2}
          // src="https://i.imgur.com/PZzuRFL.png"
          alt="Hero Image"
          // width={1024}
          // height={1024}
          placeholder="blur"
          priority={true}
          className=" h-32 w-full object-cover object-center bg-blend-saturation md:h-48"
          // style={{ objectFit: "cover" }}
        />
        <div className="absolute inset-0 top-8 z-10 my-2 w-full backdrop-blur-sm md:top-16">
          <h1 className="sr-only">
            The fastest way to get hired in the solar industry
          </h1>
          <p className="mx-auto max-w-xl text-center text-3xl font-semibold !leading-tight text-white md:text-4xl lg:text-6xl">
            <Balancer>
              The fastest way to get hired in the solar industry
            </Balancer>
          </p>
          <SearchBar />
        </div>
      </div> */}
    </>
  );
}
