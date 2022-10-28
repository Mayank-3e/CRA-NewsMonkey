import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import Iferror from './Iferror';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';


const News =(props)=> {
  const [articles,setArticles]=useState([]);
  const [loading,setLoading]=useState(true);
  const [page,setPage]=useState(1);
  const [totalResults,setTotalResults]=useState(0);
  const [parseError,setParseError]=useState(Boolean(0));
  const [parseObject,setParseObject]=useState();
  
  const capitalize1stLetter=(string)=>{
    return string.charAt(0).toUpperCase()+string.slice(1);
  }
  document.title=`${capitalize1stLetter(props.category)} - NewsMonkey`;
  useEffect(()=>{
    const f = async() => {    
      props.setProgress(10);
      let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
      setLoading(true);
      let data=await fetch(url);
      props.setProgress(30);
      let parsedData=await data.json();
      props.setProgress(70);
      if(parsedData.status=="ok")
      {
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
      }
      else
      {
        setParseError(1);
        setParseObject(parsedData);
      }
      setLoading(false);
      props.setProgress(100);
    }
    f();
  }, []);

  // const updateArticles=async()=>
  // {
  //   let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
  //   setLoading(true);
  //   let data=await fetch(url);
  //   let parsedData=await data.json();
  //   setArticles(parsedData.articles);
  //   setLoading(false);
  // }
  // const PrevClick=async ()=>
  // {
  //   setPage(page-1);
  //   updateArticles();
  // }
  // const NextClick=async ()=>
  // {
  //   setPage(page+1);
  //   updateArticles();
  // }
  const fetchMoreData =async () =>
  {
    let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1);
    let data=await fetch(url);
    let parsedData=await data.json();
    if(parsedData.status=="ok") setArticles(articles.concat(parsedData.articles));
    else
    {
      setParseError(1);
      setParseObject(parsedData);
    }
  }
    return (
      <>
        <h1 className='text-center' style={{margin: '25px 0px', marginTop: '80px'}}>Newsmonkey - Top {capitalize1stLetter(props.category)} headlines</h1>
        {loading&&<Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length!==totalResults}
          loader={<Spinner/>} >
          <div className="container">
            <div className="row">
              {articles.map(element=>{
                return <div className='col-md-4' key={element.url}>
                <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage?element.urlToImage:"https://i.ytimg.com/vi/BOAp5YLHrdw/maxresdefault.jpg"} newsUrl={element.url} author={element.author?element.author:"Unknown"} date={element.publishedAt}/>
                </div>
              })}
            </div>
            {parseError&&<Iferror {...parseObject}/>}
          </div>
        </InfiniteScroll>
      </>
    )
}

News.defaultProps={
  pageSize: 5,
  country: 'in',
  category: 'general'
}
News.propTypes={
  pageSize: PropTypes.number,
  country: PropTypes.string,
  category: PropTypes.string
}
export default News