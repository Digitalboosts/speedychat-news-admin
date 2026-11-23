import React from 'react';
import './UrlMapSection.scss';

const UrlMapSections = ({ articles, handleSelectedRefrenceUrl, selectedArticle ,article_id }) => {
    const shortenText = (text, wordLimit) => {
        const wordsArray = text?.split(' ');
        if (wordsArray?.length > wordLimit) {
            return wordsArray.slice(0, wordLimit).join(' ') + '...';
        }
        return text;
    };
   
    
    return (
        <div className="articles-list-container">
            {articles?.map((article, index) => (
                <div className={`articles-card ${selectedArticle[article_id]?.url === article.url ? 'selected' : ''}`} key={index} onClick={()=>handleSelectedRefrenceUrl(article , article_id)}>
                    <a
                        key={index}
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="articles-card_url"
                    >
                        <div className="articles-title">
                            {/* <p>{article.title !== "No title available" ? article.title : article.domain}</p> */}
                            <p>{article.title !== "No title available" ?    shortenText(article.title ,10): article.domain}</p>
                            {/* {shortenText(item.summary_dict.summary, 30)} */}
                        </div>
                        <div className="articles-logo">
                            <img src={article.logo} alt={article.domain} />
                            <p>{article.domain}</p>
                        </div>
                    </a>
                </div>
            ))}
        </div>
    );
};

export default UrlMapSections;
