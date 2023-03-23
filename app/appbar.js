import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signOut, signIn, useSession } from "next-auth/react";

export const Appbar = () => {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setisSearchOpen] = useState(false);
  const [searchterm, setsearchterm] = useState("");
  const router = useRouter();

  const openSearch = (e) => {
    e.preventDefault();
    setisSearchOpen(true);
    console.log("The link was clicked.");
  };

  const handleSearch = (e) => {
    e.preventDefault();

    let searchParams = {
      id: "text",
    };

    router.push("pages/search?searchterm=" + searchterm);
  };

  return (
    <>
      <div className="bg-teal-500 px-5 py-5 shadow-md mx-auto md:px-30 lg:px-8">
        <div className="relative flex items-center justify-between">
          <a
            href="/"
            aria-label="Company"
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
            <span className="ml-2 text-xl font-bold tracking-wide text-gray-100 uppercase">
              News Aggregate
            </span>
          </a>
          <ul className="flex items-center hidden space-x-8 lg:flex">
            <li>
              <Link
                href="/"
                aria-label="Our product"
                title="Our product"
                className="font-medium tracking-wide text-orange-200 transition-colors duration-200 hover:text-orange-400"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                href="/pages/settings"
                aria-label="Our product"
                title="Our product"
                className="font-medium tracking-wide text-orange-200 transition-colors duration-200 hover:text-orange-400"
              >
                Settings
              </Link>
            </li>
            <li>
              <button
                onClick={openSearch}
                className="font-bold py-2 px-2 rounded inline-flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </button>
            </li>

            {session?.user ? (
              <>
                <li>
                  <div classNameName="inline-flex">
                    <button
                      className="inline-flex items-center justify-center h-8 px-3 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-orange-200 hover:bg-orange-700 focus:shadow-outline focus:outline-none"
                      aria-label="Sign out"
                      title="Sign out"
                      onClick={() =>
                        signOut({
                          redirect: false,
                          callbackUrl: "http://localhost:3000/auth/login",
                        })
                      }
                    >
                      {session.user.name}: Sign Out
                    </button>
                  </div>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    href="/auth/login"
                    className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-black transition duration-200 rounded shadow-md bg-orange-200 hover:bg-orange-700 focus:shadow-outline focus:outline-none"
                    aria-label="Sign up"
                    title="Sign up"
                    // onClick={() => signIn()}
                  >
                    Sign In
                  </Link>
                </li>
              </>
            )}
          </ul>
          <div className="lg:hidden">
            <button
              aria-label="Open Menu"
              title="Open Menu"
              className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50"
              onClick={() => setIsMenuOpen(true)}
            >
              <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                />
                <path
                  fill="currentColor"
                  d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
                />
                <path
                  fill="currentColor"
                  d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
                />
              </svg>
            </button>
            {isMenuOpen && (
              <div className="absolute top-0 left-0 w-full">
                <div className="p-5 bg-white border rounded shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <a
                        href="/"
                        aria-label="Company"
                        title="Company"
                        className="inline-flex items-center"
                      >
                        <svg
                          className="w-8 text-orange-400"
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
                        <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
                          New Aggregate
                        </span>
                      </a>
                    </div>
                    <div>
                      <button
                        onClick={openSearch}
                        className="font-bold py-2 px-2 rounded inline-flex items-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                          />
                        </svg>
                      </button>
                      <button
                        aria-label="Close Menu"
                        title="Close Menu"
                        className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <nav>
                    <ul className="space-y-4">
                      <li>
                        <Link
                          href="/"
                          aria-label="Our product"
                          title="Our product"
                          className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-orange-400"
                        >
                          Home
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/pages/settings"
                          aria-label="Our product"
                          title="Our product"
                          className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-orange-400"
                        >
                          Settings
                        </Link>
                      </li>

                      
                      <li>
                        {session?.user ? (
                          <button
                            className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-orange-400 hover:bg-orange-700 focus:shadow-outline focus:outline-none"
                            aria-label="Sign up"
                            title="Sign up"
                            onClick={() =>
                              signOut({
                                redirect: false,
                                callbackUrl: "http://localhost:3000/auth/login",
                              })
                            }
                          >
                            Sign Out
                          </button>
                        ) : (
                          <Link
                          href="/auth/login"
                            className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-orange-400 hover:bg-orange-700 focus:shadow-outline focus:outline-none"
                            aria-label="Sign up"
                            title="Sign up"
                          >
                            Sign up
                          </Link>
                        )}
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        id="search-box"
        className={
          isSearchOpen
            ? "fixed top-0 left-0 w-screen h-screen bg-gray-900 z-90 bg-opacity-75"
            : "hidden"
        }
      >
        <span
          className="cursor-pointer text-6xl text-white hover:text-amber-500 absolute right-5 top-5"
          onClick={() => setisSearchOpen(false)}
          title="Close"
        >
          &times;
        </span>
        <div className="w-full h-full flex justify-center items-center">
          <form action="">
            <input
              type="text"
              placeholder="What are you looking for?"
              name="author"
              value={searchterm}
              onChange={(e) => setsearchterm(e.target.value)}
              className="md:w-full lg:w-96 md:px-3 py-2 rounded-tl-full rounded-bl-full border-0 focus:outline-0"
            />

            <button
              type="submit"
              onClick={handleSearch}
              className="px-3 py-2 -ml-1.5 bg-orange-300 hover:bg-orange-800 text-white rounded-tr-full rounded-br-full"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
