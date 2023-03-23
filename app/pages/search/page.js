"use client";
import { useState, useEffect } from "react";
import { Appbar } from "@/app/appbar";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import FooterComponent from "@/app/components/footer/page";
import NewsComponents from "@/app/components/news/page";

const SearchPage = () => {
  const searchParams = useSearchParams();

  const [articles, setArticles] = useState([]);

  const searchterm = searchParams.get("searchterm");

  const endpointUrl = "http://localhost/api/search/";
  const postParams = {
    search: searchterm,
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.post(endpointUrl, postParams);
      setArticles(result.data);
    };
    fetchData();
  }, []);

  return (
    <>
      <Appbar />
      
      {articles && articles.length ? (
        <NewsComponents articles={articles} search={true} />
      ) : null}
      <FooterComponent />
    </>
  );
};

export default SearchPage;
