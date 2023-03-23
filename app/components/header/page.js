import React from "react";
import Image from "next/image";

const HeaderComponent = (props) => {
  return (
    <>

      <div className="hidden md:flex px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-2">
        <div className="px-2 flex-initial w-2/3 ">
          <a href={props.articles[0].web_url} target="_blank" aria-label="View Item">
            <div className="relative -z-10 overflow-hidden transition duration-200 transform shadow-lg hover:-translate-y-2 hover:shadow-2xl">
              <img
                className="object-cover w-full max-h-96"
                src={props.articles[0].image}
                alt=""
              />
              <div className="absolute  inset-x-0 bottom-0 px-6 py-4 bg-orange-300 bg-opacity-75">
                <p className="text-sm font-medium tracking-wide text-white">
                  {props.articles[0].title}
                </p>
              </div>
            </div>
          </a>
        </div>
        <div className="px-1 flex-initial w-1/3 flex-col">
          <a href={props.articles[1].web_url} target="_blank" aria-label="View Item">
            <div className="relative  -z-10 overflow-hidden transition duration-200 transform shadow-lg hover:-translate-y-2 hover:shadow-2xl">
              <img
                className="object-cover w-full max-h-48"
                src={props.articles[1].image}
                alt=""
              />
              <div className="absolute inset-x-0 bottom-0 px-6 py-4 bg-orange-300 bg-opacity-75">
                <p className="text-sm font-medium tracking-wide text-white">
                  {props.articles[1].title}
                </p>
              </div>
            </div>
          </a>
          <a href={props.articles[2].web_url} target="_blank" className="mt-1" aria-label="View Item">
            <div className=" relative -z-10 overflow-hidden transition duration-200 transform shadow-lg hover:-translate-y-2 hover:shadow-2xl">
              <img
                className="object-cover w-full max-h-48"
                src={props.articles[2].image}
                alt=""
              />
              <div className="absolute inset-x-0 bottom-0 px-6 py-4 bg-orange-300 bg-opacity-75">
                <p className="text-sm font-medium tracking-wide text-white">
                  {props.articles[2].title}
                </p>
              </div>
            </div>
          </a>
        </div>
      </div>

     
    </>
  );
};

export default HeaderComponent;
