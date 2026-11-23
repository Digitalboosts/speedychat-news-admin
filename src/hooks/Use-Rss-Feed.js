

export const UseRssFeed = async (url) => {
    // console.log("file:",file)
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

        return feedData;
    } catch (error) {
        console.error("Error checking file size:", error);
    }
};