import { useState, useEffect } from 'react';
import axios from 'axios';

const FilterPage = () => {
  const [articles, setArticles] = useState([]);
  const [dateFilter, setDateFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const url = `http://localhost/api/news`;
      const result = await axios.get(url);
      setArticles(result.data);
    };
    fetchData();
  }, [dateFilter, categoryFilter]);

  const handleDateFilterChange = (event) => {
    setDateFilter(event.target.value);
  };

  const handleCategoryFilterChange = (event) => {
    setCategoryFilter(event.target.value);
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between mb-4">
        <div className="w-1/2">
          <label htmlFor="dateFilter" className="block font-medium mb-2">Filter by date:</label>
          <input
            id="dateFilter"
            type="date"
            className="border border-gray-400 p-2 rounded w-full"
            value={dateFilter}
            onChange={handleDateFilterChange}
          />
        </div>
        <div className="w-1/2">
          <label htmlFor="categoryFilter" className="block font-medium mb-2">Filter by category:</label>
          <select
            id="categoryFilter"
            className="border border-gray-400 p-2 rounded w-full"
            value={categoryFilter}
            onChange={handleCategoryFilterChange}
          >
            <option value="">Select category</option>
            <option value="politics">Politics</option>
            <option value="sports">Sports</option>
            <option value="entertainment">Entertainment</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {articles.map((article) => (
          <div key={article.id} className="bg-gray-100 p-4 rounded">
            <h2 className="font-bold text-lg mb-2">{article.title}</h2>
            <p className="text-gray-700 text-base">{article.lead_paragraph}</p>
            <p className="text-gray-600 text-sm mt-2">{article.published_at}</p>
            <p className="text-blue-500 text-sm mt-2">{article.source}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterPage;
