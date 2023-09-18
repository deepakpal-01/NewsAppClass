import React, { Component } from "react";
import './Styles/NewsItem.css'

export default class NewsItem extends Component {
  render() {
    let color="primary"
    
    let {title,description,imgUrl,newsUrl,author,publishedAt,source,category}=this.props;

    if(category==="general" || category==="technology" || category==="health"){
      color="danger"
    }
    else{
      color="primary"
    }    
    if(imgUrl===null){
      imgUrl="https://cbl.salfordhomesearch.co.uk/choice/images/shared/noimagethumb.jpg"
    }
    if(author===null){
      author="unknown"
    }


    return (
      <div>
        <div className="card" style={{backgroundColor:`${this.props.mode==="light"?"white":"#121114"}`}}>
          <img src={imgUrl} className="card-img-top" alt="Not Available..." />
          <div className="card-body" style={{color:`${this.props.mode==="light"?"black":"white"}`}}>

          <span className={`position-absolute rounded-pill badge bg-${color}`} style={{padding:"5px",zIndex:"100",top:"-5px",right:"-10px"}}>
            {source.name}
            </span>

            <h5 className="card-title">{title===null?"No Title Available":`${title.slice(0,45)+"..."}`}</h5>
            <p className="card-text">
                {description===null?"Read the full news here...... ":`${description.slice(0,80)+"..."}`}
            </p>
            <span className="card-text" ><small>By</small><small style={{color:"rgb(221,15,15, 0.85)"}}> {author}</small></span>
            <br />
            <span className="card-text"><small>Published on :</small><small  style={{color:"rgb(221,15,15, 0.85)"}}>  {new Date(publishedAt).toUTCString()}</small></span>
            <br />
            <br />
            <a href={newsUrl} className="btn btn-sm btn-dark">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}
