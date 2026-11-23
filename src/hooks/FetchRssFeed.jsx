import { useState, useEffect } from 'react';

function useRSSFeed(url) {
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const text = await response.text();

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, 'text/xml');

        const items = xmlDoc.querySelectorAll('item');
        const feedData = Array.from(items).map(item => {
          const description = item.querySelector('description')?.textContent || '';
          const imgSrcMatch = description.match(/<img[^>]+src="([^">]+)"/);
          const imageUrl = imgSrcMatch ? imgSrcMatch[1] : item.querySelector('media\\:content')?.getAttribute('url');

          return {
            title: item.querySelector('title')?.textContent,
            link: item.querySelector('link')?.textContent,
            contentSnippet: description.replace(/<[^>]+>/g, ''), // Remove HTML tags from description
            imageUrl,
            guid: item.querySelector('guid')?.textContent,
          };
        });

        setFeed(feedData);

        // If you have additional functions to call, you can place them here
        // await fetchFeedData();
        // await handleSendData();
        // await addRelatedUrls();

      } catch (error) {
        setError(error);
        console.error('Error fetching or parsing the RSS feed:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { feed, loading, error };
}

export default useRSSFeed;
