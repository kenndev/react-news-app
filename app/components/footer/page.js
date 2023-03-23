import React from "react";
import PopularNews from "./popular/page";

export const FooterComponent = () => {
  const today = new Date();
  const year = today.getFullYear();
  return (
    <div className="bg-teal-500">
      <div className="px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="grid gap-10 row-gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="md:col-span-1 sm:col-span-2">
            <a
              href="/"
              aria-label="Go home"
              title="Company"
              className="inline-flex items-center"
            >
              <svg
                className="w-8 text-orange-200"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeWidth="2"
                strokeLinecap="round"
                strokeMiterlimit="10"
                stroke="currentColor"
                fill="none"
              >
                <rect x="3" y="1" width="7" height="12" />
                <rect x="3" y="17" width="7" height="6" />
                <rect x="14" y="1" width="7" height="6" />
                <rect x="14" y="11" width="7" height="12" />
              </svg>
              <span className="ml-2 text-l font-bold tracking-wide text-gray-100 uppercase">
                News Aggregate Website
              </span>
            </a>
            <div className="mt-6 lg:max-w-sm">
              <p className="text-sm text-gray-100">
                We are a new Aggregate platform built with Next.js
              </p>
              
            </div>
          </div>
          <div className="md:col-span-2 text-sm">
            <p className="text-center text-base font-bold tracking-wide text-gray-100">
              Popular News
            </p>
            <PopularNews />
          </div>
          <div>
            <span className="text-base font-bold tracking-wide text-gray-100">
              Our Socials
            </span>
            <div className="flex items-center mt-1 space-x-3">
              <a
                href="/"
                className="text-orange-200 transition-colors duration-300 hover:text-deep-purple-accent-400"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
                  <path d="M24,4.6c-0.9,0.4-1.8,0.7-2.8,0.8c1-0.6,1.8-1.6,2.2-2.7c-1,0.6-2,1-3.1,1.2c-0.9-1-2.2-1.6-3.6-1.6 c-2.7,0-4.9,2.2-4.9,4.9c0,0.4,0,0.8,0.1,1.1C7.7,8.1,4.1,6.1,1.7,3.1C1.2,3.9,1,4.7,1,5.6c0,1.7,0.9,3.2,2.2,4.1 C2.4,9.7,1.6,9.5,1,9.1c0,0,0,0,0,0.1c0,2.4,1.7,4.4,3.9,4.8c-0.4,0.1-0.8,0.2-1.3,0.2c-0.3,0-0.6,0-0.9-0.1c0.6,2,2.4,3.4,4.6,3.4 c-1.7,1.3-3.8,2.1-6.1,2.1c-0.4,0-0.8,0-1.2-0.1c2.2,1.4,4.8,2.2,7.5,2.2c9.1,0,14-7.5,14-14c0-0.2,0-0.4,0-0.6 C22.5,6.4,23.3,5.5,24,4.6z" />
                </svg>
              </a>
              
            </div>
            
          </div>
        </div>
        <div className="flex flex-col justify-between pt-5 pb-10 border-t border-orange-200 sm:flex-row">
          <p className="text-sm text-gray-100">
            © Copyright {year} Lorem Inc. All rights reserved. <a target="_blank" className="px-5 text-orange-300 font-semibold transition-colors duration-200 hover:text-orange-500" href="https://creativekenn.netlify.app">Developed with love by Kennedy</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FooterComponent;
