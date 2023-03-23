"use client";
import { useState, useEffect } from "react";
import { Appbar } from "@/app/appbar";
import FooterComponent from "@/app/components/footer/page";
import Link from "next/link";
import React from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

const SettingsPage = () => {
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");
  const [settings, setSettings] = useState([]);
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const accesstoken = session.user.accesstoken;

  let bearer = `Bearer ` + accesstoken;
  useEffect(() => {
    const fetchData = async () => {
      axios.defaults.withCredentials = true;
      const result = await axios.get("http://localhost/api/settings", {
        headers: {
          Accept: "application/json",
          Authorization: bearer,
        },
      });
      setSettings(result.data);
      setLoading(false);
    };
    fetchData();
  }, [source, category]);

  const postParams = {
    category: category,
    source: source,
  };

  const handleSourceChange = (event) => {
    setSource(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    // const accesstoken = session.user.accesstoken;
    // let bearer = `Bearer ` + accesstoken;
    axios.defaults.withCredentials = true;

    const result = await axios.post(
      "http://localhost/api/save-settings",
      postParams,
      {
        headers: {
          Accept: "application/json",
          Authorization: bearer,
        },
      }
    );
    setLoading(false);
    setSettings(result.data);
  };

  let sources = settings.filter((el) => el.type === "source");
  let categories = settings.filter((el) => el.type === "category");

  return (
    <>
      <Appbar />
      {loading ? (
        <div class="flex items-center justify-center p-10">
          <div
            class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </div>
      ) : ''}

      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-10">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <Link
              href="/"
              className="text-sm text-gray-700 hover:text-gray-900 inline-flex items-center dark:text-gray-400 dark:hover:text-white"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
              </svg>
              Home
            </Link>
          </li>

          <li aria-current="page">
            <div className="flex items-center">
              <svg
                className="w-6 h-6 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="text-gray-400 ml-1 md:ml-2 text-sm font-medium dark:text-gray-500">
                Settings
              </span>
            </div>
          </li>
        </ol>
      </div>
      <div className="w-full pt-5 grid gap-8 lg:grid-cols-2 mb-10 sm:max-w-sm sm:mx-auto lg:max-w-full">
        <div className="flex flex-col pb-10 lg:pt-0 px-10 sm:justify-center sm:pt-0">
          <div className="bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg w-full p-3 lg:p-6 sm:max-w-md">
            <form className="mt-4" onSubmit={handleSubmit}>
              <input
                type="hidden"
                name="_token"
                value="GhpGn48rFRsMAQKf8HQEOWZsRb9F8VJQwwAQs6Ck"
              />
              <div>
                <label className="block text-sm font-medium text-gray-800 dark:text-gray-400">
                  {" "}
                  Category{" "}
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  name="category"
                  value={category}
                  onChange={(event) => {
                    setCategory(event.target.value);
                  }}
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-800 dark:text-gray-400">
                  {" "}
                  Source{" "}
                </label>
                <select
                  name="source"
                  value={source}
                  onChange={handleSourceChange}
                  id="source"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="">Select Source</option>
                  <option value="Newyork Times">Newyork Times</option>
                  <option value="Newsapi.org">Newsapi.org</option>
                  <option value="The Guradian">The Guradian</option>
                </select>
              </div>

              <div className="mt-4 flex items-center justify-center">
                <button
                  type="submit"
                  className="inline-flex items-center p-2 rounded-lg text-gray-800 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-800 text-xs font-bold ml-3"
                >
                  Save Settings
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="flex flex-col">
          <div className=" sm:mx-0.5 lg:mx-0.5">
            <div className="py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full border-separate">
                  <tbody>
                    <tr>
                      <th className="bg-gray-200 border-b text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Source
                      </th>
                      <td className="bg-gray-200 border-b text-sm font-normal text-gray-900 px-6 py-4 text-left">
                        {sources.map((item) => (
                          <span className="px-1">{item.value},</span>
                        ))}
                      </td>
                    </tr>
                    <tr>
                      <th className="bg-gray-200 border-b text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Category
                      </th>
                      <td className="bg-gray-200 border-b text-sm font-normal text-gray-900 px-6 py-4 text-left">
                        {categories.map((item) => (
                          <span className="px-1">{item.value},</span>
                        ))}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterComponent />
    </>
  );
};

export default SettingsPage;
