"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Inter } from "next/font/google";
import NewsComponents from "./components/news/page";

import FooterComponent from "./components/footer/page";
import { Appbar } from "./appbar";
import HeaderComponent from "./components/header/page";
import { useSession } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [headerArticles, setHeaderArticles] = useState([]);
  const [dateFilter, setDateFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      let url = "";
      let result;
      if (status === "authenticated") {
        const accesstoken = session.user.accesstoken;
        let bearer = `Bearer ` + accesstoken;
        axios.defaults.withCredentials = true;
        url = `http://localhost/api/filter`;
        result = await axios.get(url, {
          headers: {
            Accept: "application/json",
            Authorization: bearer,
          },
        });
      } else {
        url = `http://localhost/api/news`;
        result = await axios.get(url);
      }
      const articles = result.data;
      const headerRes = articles.slice(0, 3);
      let difference = articles.filter((x) => !headerRes.includes(x));
      setArticles(difference);
      setLoading(false);
      //const headerRes = result.data.sort(() => Math.random() - Math.random()).slice(0, 4);
      setHeaderArticles(headerRes);
    };
    fetchData();
  }, [dateFilter, categoryFilter]);

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
      ): ''}
      {headerArticles && headerArticles.length ? (
        <HeaderComponent articles={headerArticles} />
      ) : null}
      {articles && articles.length ? (
        <NewsComponents articles={articles} search={false} />
      ) : null}
      <FooterComponent />
    </>
  );
}
