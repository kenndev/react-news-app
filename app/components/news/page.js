import React, { useState, useEffect } from "react";
import Link from "next/link";

export const NewsComponents = (props) => {
  const [isSearch, setIsSearch] = useState(props.search);
  const [isSearchOpen, setisSearchOpen] = useState(false);
   const [articles, setArticles] = useState(props.articles);
  const [filteredArticles, setFilteredArticles] = useState(props.articles);

  const [filters, setFilters] = useState({
    source: "",
    published_at: "",
  });

  const [dateValue, setValue] = useState({
    startDate: new Date(),
  });

  const openSearch = (e) => {
    e.preventDefault();
    setisSearchOpen(true);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;

    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFilteredArticles(filterArticles(articles, filters));
  };

  const filterArticles = (articles, filters) => {
    let filteredArticles = [...articles];

    if (filters.source) {
      filteredArticles = filteredArticles.filter(
        (article) => article.source === filters.source
      );
    }

    if (filters.published_at) {
      filteredArticles = filteredArticles.filter((article) =>
        article.published_at.includes(filters.published_at)
      );
    }

    setisSearchOpen(false);

    return filteredArticles;
  };

  let sources = props.articles.map((el) => el.source);
  let uniqueSource = [...new Set(sources)];

  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-10">
      {isSearch ? (
        <nav
          className="flex justify-between bg-gray-50 text-gray-700 border border-gray-200 py-3 px-5 rounded-lg dark:bg-gray-800 dark:border-gray-700"
          aria-label="Breadcrumb"
        >
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
                  Search results
                </span>
              </div>
            </li>
          </ol>
          <button
          onClick={openSearch}
          className="bg-orange-200 font-bold py-2 px-2 rounded items-end"
        >
          Filter
        </button>
        </nav>
      ) : (
        <div className="flex justify-between border-t border-b p-2 border-orange-200 ">
          <h3 className="text-lg font-extrabold text-gray-900 dark:text-white md:text-2xl lg:text-2xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-orange-200">
              Popular
            </span>{" "}
            News.
          </h3>
          <button
          onClick={openSearch}
          className=" bg-orange-200 font-bold py-2 px-2 rounded inline-flex items-center"
        >
          Filter
        </button>
        </div>
      )}

      <div className="pt-5 grid gap-8 lg:grid-cols-4 mb-10 sm:max-w-sm sm:mx-auto lg:max-w-full">
        {filteredArticles.map((article, index) => (
          <div
            key={index}
            className="overflow-hidden transition-shadow duration-300 bg-white rounded shadow-sm"
          >
            <img
              src={article.image}
              className="object-cover w-full h-64"
              alt=""
            />
            <div className="p-5 border-t-0">
              <p className="mb-3 text-xs font-semibold tracking-wide uppercase">
                <a
                  href={article.web_url}
                  className="transition-colors duration-200 text-blue-gray-900 hover:text-orange-200"
                  aria-label="Category"
                  title="traveling"
                  target="_blank"
                >
                  {article.source}
                </a>
                <span className="text-orange-600">
                  — {article.published_at}
                </span>
              </p>
              <a
                href={article.web_url}
                aria-label="Category"
                title="Film It!"
                target="_blank"
                className="inline-block mb-3 text-lg font-bold leading-5 transition-colors duration-200 text-orange-800 hover:text-orange-200"
              >
                {article.title}
              </a>
              <p className="mb-2 text-gray-700">
                {article.lead_paragraph.length > 50
                  ? `${article.lead_paragraph.substring(0, 50)}...`
                  : article.lead_paragraph}
              </p>
              <a
                href={article.web_url}
                target="_blank"
                aria-label=""
                className="inline-flex items-center font-semibold transition-colors duration-200 text-orange-800 hover:text-orange-200"
              >
                Learn more
              </a>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center">
        <a
          href="/"
          className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-black transition duration-200 rounded shadow-md md:w-auto bg-orange-200 hover:bg-orange-800 focus:shadow-outline focus:outline-none"
        >
          Load more
        </a>
      </div>
      <div
        id="search-box"
        className={
          isSearchOpen
            ? "fixed top-0 left-0 w-screen h-screen bg-gray-900 z-10 bg-opacity-75"
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
        <div className="w-full h-full">
          <div className="flex flex-col items-center min-h-screen pt-20 lg:pt-20 px-10 sm:justify-start sm:pt-0">
            <div className="bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg w-full p-3 lg:p-6 sm:max-w-md">
              <form className="mt-4" onSubmit={handleSubmit}>
                <input
                  type="hidden"
                  name="_token"
                  value="GhpGn48rFRsMAQKf8HQEOWZsRb9F8VJQwwAQs6Ck"
                />
                <div>
                  <label
                    className="block text-sm font-medium text-gray-800 dark:text-gray-400"
                    
                  >
                    {" "}
                    Date{" "}
                  </label>
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="date"
                    min="1997-01-01"
                    max="2030-12-31"
                    name="published_at"
                    value={filters.published_at}
                    onChange={handleFilterChange}
                  />
                </div>

                <div className="mt-4">
                  <label
                    className="block text-sm font-medium text-gray-800 dark:text-gray-400"
                 
                  >
                    {" "}
                    Source{" "}
                  </label>
                  <select
                    name="source"
                    value={filters.source}
                    onChange={handleFilterChange}
                    id="source"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="">Select Source</option>
                    {uniqueSource.map((source, index) => (
                      <option key={index} value={source}>
                        {source}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-4 flex items-center justify-center">
                  <button
                    type="submit"
                    className="inline-flex items-center p-2 rounded-lg text-gray-800 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-800 text-xs font-bold ml-3"
                  >
                    Filter
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsComponents;
