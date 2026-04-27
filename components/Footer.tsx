import Image from "next/image";
import { Twitter, Facebook, Instagram } from "lucide-react";
import Section from "./base/Section";

const Footer = () => {
  return (
    <Section className="py-6">
      <div className="flex flex-col justify-between">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* site links */}
          <div className="flex flex-wrap gap-5 md:gap-7 w-full md:w-1/2 justify-start">
            <h5 className="text-lg md:text-xl font-medium">Home</h5>
            <h5 className="text-lg md:text-xl font-medium">About Us</h5>
            <h5 className="text-lg md:text-xl font-medium">Products</h5>
            <h5 className="text-lg md:text-xl font-medium">Contact</h5>
          </div>

          {/* Social Links */}
          <div className="flex flex-col w-full md:w-1/2 items-start md:items-end">
            <h6 className="text-lg md:text-xl text-zinc-400">Socials</h6>
            <div className="flex justify-start md:justify-end gap-3 pt-4">
              <div className="bg-[#7f2f821b] p-2.5 rounded-full">
                <Twitter color="#7f2f82" />
              </div>
              <div className="bg-[#7f2f821b] p-2.5 rounded-full">
                <Facebook color="#7f2f82" />
              </div>
              <div className="bg-[#7f2f821b] p-2.5 rounded-full">
                <Instagram color="#7f2f82" />
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section */}
        <div className="flex flex-col gap-8 mt-10">
          {/* Contact & Email */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            {/* Left */}
            <div className="text-left">
              <h6 className="text-zinc-400 w-[211px] text-base md:text-xl">
                © 2025 All Rights Reserved
              </h6>
            </div>

            {/* Right */}
            <div className="flex flex-col sm:flex-row justify-start md:justify-between items-start md:items-center gap-6 md:gap-12">
              <div className="text-left">
                <h6 className="text-base md:text-xl text-zinc-400">
                  Business Inquiries
                </h6>
                <h6 className="text-base md:text-xl text-black font-medium">
                  Shahid@metro-metal.com
                </h6>
              </div>
              <div className="text-left">
                <h6 className="text-base md:text-xl text-zinc-400">Phone</h6>
                <h6 className="text-base md:text-xl text-black font-medium">
                  +42 35846163
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Footer;
