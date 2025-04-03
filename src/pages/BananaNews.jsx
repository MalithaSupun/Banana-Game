import React, { useEffect, useState } from 'react';
import BottomRightImage from "../assets/MainMenuBanana.png";

function BananaNews() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
const response = await fetch('https://newsdata.io/api/1/news?apikey=pub_74281a8daabe98935b9099be749631a16a3b5&country=lk&category=top');
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
        console.log("News API Response:", data);
        
        if (!data.results || data.results.length === 0) {
          throw new Error("No news data received.");
        }
  
        setNews(data.results);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };
  
    fetchNews();
  }, []);

  return (
     <div className="flex flex-col items-start justify-start h-full w-full bg-gray-300 p-6 overflow-hidden bg-opacity-70 rounded-3xl">
          {/* Header */}
          <div className="bg-red-200 p-4 rounded-lg mb-6 w-fit text-center">
            <h2 className="text-6xl font-bold text-red-600 italic font-dancingScript p-3">
              Banana News
            </h2>
          </div>
    
          {/* News Container */}
          <div className="bg-[#F5E8C7] p-8 rounded-lg shadow-lg w-[750px] h-[500px] overflow-y-auto">
            {news.length > 0 ? (
              news.map((article, index) => (
                <div key={index} className="p-4 border-b border-gray-400">
                  <h3 className="text-2xl font-bold">{article.title}</h3>
                  <p className="text-lg mt-2">{article.description}</p>
                </div>
              ))
            ) : (
              <p>Loading news...</p>
            )}
          </div>

          {/* Bottom Right Image */}
          <img
            src={BottomRightImage}
            alt="Decorative"
            className="absolute bottom-4 right-4 max-w-96 max-h-96 object-contain"
          />
        </div>
  );
}

export default BananaNews;

// i get apikey from https://newsdata.io/login
// and i use this api to get news data