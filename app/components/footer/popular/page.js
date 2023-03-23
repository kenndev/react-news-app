import { useState, useEffect } from "react";
import axios from "axios";

export const PopularNews = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost/api/footer-news");
      setArticles(result.data);
      setLoading(false);
    };
    fetchData();
  }, []);
  return (
    <>
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
      ) : (
        ""
      )}

      <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-2">
        <div className="border-t border-b divide-y">
          {articles.map((article) => (
            <div className="grid py-2 sm:grid-cols-4">
              <div className="mb-4 sm:mb-0">
                <div className="space-y-1 text-xs font-semibold tracking-wide uppercase">
                  <img
                    src={article.image}
                    className="object-cover w-16"
                    alt=""
                  />
                </div>
              </div>
              <div className="sm:col-span-3 lg:col-span-2">
                <div className="mb-3">
                  <a
                    href={article.web_url}
                    aria-label="Article"
                    className="inline-block text-gray-100 transition-colors duration-200 hover:text-grey-100"
                  >
                    <p className="text-sm font-extrabold leading-none">
                    {article.title}
                    </p>
                  </a>
                </div>
                <div className="space-y-1 text-xs font-semibold tracking-wide uppercase">
                  
                  <p className="text-orange-200">{article.published_at}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PopularNews;
