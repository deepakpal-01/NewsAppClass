import React, { Component } from "react";
import NewsItem from "./NewsItem";
import "./Styles/News.css";
import Loader from "./Loader";
import PropTypes from 'prop-types';
import LoadingBar from "react-top-loading-bar";
import InfiniteScroll from "react-infinite-scroll-component";


export default class News extends Component {
    static defaultProps={
        category:"science",
        country:"in"
    }
    static propTypes={
        category:PropTypes.string.isRequired
    }
    constructor(props){
        super(props)
        this.state={
            articles:[],
            loading:false,
            page:1,
            totalResults:0,
            progress:10,
            
        }    
        let cat=this.props.category;
        cat=cat.charAt(0).toUpperCase()+cat.slice(1)
        document.title=`${cat} Latest News :- NewWaveOnline`;    
    }   
    
    setProgress=(progress)=>{
        this.setState({progress:progress})
    }
    
    async updateNews(curr){
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${curr}&pageSize=${this.props.pageSize}`;
        // let url=`https://gnews.io/api/v4/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=9b46bd41cb36b945f56d9720fb5162cc&max=${this.props.pageSize}`
        this.setProgress(40)
        this.setState({loading:true})
        let response=await fetch(url);
        this.setProgress(50)
        let data=await response.json()
        this.setProgress(70)
           this.setState({
            articles:data.articles,
            totalResults:data.totalResults,
            loading:false
        })
        this.setProgress(100)
    }  

    async componentDidMount(){
        this.updateNews(1);
    }    
   
    fetchMoreData=async()=>{
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;

        // let url=`https://gnews.io/api/v4/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=9b46bd41cb36b945f56d9720fb5162cc&max=${this.props.pageSize}`
        this.setState({loading:true})
        this.setProgress(40)
        let response=await fetch(url);
        this.setProgress(50)
        let data=await response.json()
        this.setProgress(70)
           this.setState({
            articles:this.state.articles.concat(data.articles),
            totalResults:data.totalResults,
            loading:false,
            page:this.state.page+1
        })
        this.setProgress(100)
        
    }
    
    render() { 
        
        return (
            <> 
                 <LoadingBar
                        color='#f11946'
                        progress={this.state.progress}
                        onLoaderFinished={this.setProgress}
                 />
                {console.log(this.props.apiKey)}
                {<h2 style={{color:`${this.props.mode==="light"?"black":"white"}`}}>NewsWave :- Top <b style={{color:"#a92c2c",fontFamily:"cursive"}}>{this.props.category}</b> Headlines..</h2>}
                {this.state.loading && <Loader/>}

                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length!==this.state.totalResults}
                    loader={<Loader/>}
                    
                    >   
                <div id="mainBox" className=" newsBox container">
                   { this.state.articles.map((i)=>{
                        return <NewsItem key={i.url}title={i.title} imgUrl={i.urlToImage}
                        description={i.content} newsUrl={i.url} author={i.author} publishedAt={i.publishedAt}
                        source={i.source} category={this.props.category} mode={this.props.mode} toggleMode={this.toggleMode} />
                    }) }        
                </div>

                </InfiniteScroll>    

            </>
        );
    }
}
