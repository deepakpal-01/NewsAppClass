import React,{Component} from 'react'
import './App.css';
import NavBar from './Components/NavBar'
import News from './Components/News'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
// import Footer from './Components/Footer';

export default class App extends Component{
  pageSize=10; 
  apiKey=process.env.REACT_APP_NEWS_API;
  constructor(){
    super();
    this.state={
      pageCountry:"in",
      mode:"light",
      bodyColor:"white",
    }
  }
  

  setCountry=(country)=>{
    if(country==="US"){
      this.setState({
        pageCountry:"us",
      })
    }
    else if(country==="Japan"){
      this.setState({
        pageCountry:"jp",
      })
    }
    else if(country==="Canada"){
      this.setState({
        pageCountry:"ca",
      })
    }
    else if(country==="South Korea"){
      this.setState({
        pageCountry:"kr",
      })
    }
      else{
        this.setState({
          pageCountry:"in",
        })
      }    
  }
  toggleMode=()=>{
    if(this.state.mode==="light"){
      this.setState({
        mode:"dark",
        bodyColor:"black"
      })
      document.body.style.background="#000000";
    }
    else{
      this.setState({
        mode:"light",
        bodyColor:"white"
      })
      document.body.style.background="white";
    }
  }
  
  
  render(){
    
    return(
      <>
      {console.log(this.apiKey)}
      <Router>
          <NavBar  setCountry={this.setCountry} mode={this.state.mode} toggleMode={this.toggleMode} />

            <Routes>
              
            <Route exact path="/" element={<News apiKey={this.apiKey} key={this.state.pageCountry} pageSize={this.pageSize} category={"general"} country={this.state.pageCountry} mode={this.state.mode} toggleMode={this.toggleMode}  />}/>

                <Route exact path="/science" element={<News apiKey={this.apiKey} key="science" pageSize={this.pageSize} category={"science"} country={this.state.pageCountry} mode={this.state.mode} toggleMode={this.toggleMode} />}/>

                <Route exact path="/sports" element={<News apiKey={this.apiKey} key="sports" pageSize={this.pageSize} category={"sports"} country={this.state.pageCountry} mode={this.state.mode} toggleMode={this.toggleMode} />}/>

                <Route exact path="/technology" element={<News apiKey={this.apiKey} key="technology" pageSize={this.pageSize} category={"technology"} country={this.state.pageCountry} mode={this.state.mode} toggleMode={this.toggleMode} />}/>

                <Route exact path="/business" element={<News apiKey={this.apiKey} key="business" pageSize={this.pageSize} category={"business"} country={this.state.pageCountry} mode={this.state.mode} toggleMode={this.toggleMode} />}/>

                <Route exact path="/health" element={<News apiKey={this.apiKey} key="health" pageSize={this.pageSize} category={"health"} country={this.state.pageCountry} mode={this.state.mode} toggleMode={this.toggleMode} />}/>

                <Route exact path="/entertainment" element={<News apiKey={this.apiKey} key="entertainment" pageSize={this.pageSize} category={"entertainment"} country={this.state.pageCountry} mode={this.state.mode} toggleMode={this.toggleMode} />}/>

                
             </Routes>
            {/* <Footer/> */}
        </Router>

      
      </>
    )
  }
}

