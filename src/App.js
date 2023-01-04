import React, { Component } from "react";
import ReactGA from "react-ga";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import $ from "jquery";
import "./App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import About from "./Components/About";
import Resume from "./Components/Resume";
import Portfolio from "./Components/Portfolio";
// import BlogMain from './Components/BlogMain';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foo: "bar",
      resumeData: {},
    };

    ReactGA.initialize("UA-117264334-1");
    ReactGA.pageview(window.location.pathname);
  }

  getResumeData() {
    $.ajax({
      url: "/resumeData.json",
      dataType: "json",
      cache: false,
      success: function (data) {
        this.setState({ resumeData: data });
      }.bind(this),
      error: function (xhr, status, err) {
        console.log(err);
        alert(err);
      },
    });
  }
  getBlogData() {
    $.ajax({
      url: "/blogData.json",
      dataType: "json",
      cache: false,
      success: function (data) {
        this.setState({ blogData: data });
      }.bind(this),
      error: function (xhr, status, err) {
        console.log(err);
        alert(err);
      },
    });
  }

  componentDidMount() {
    this.getResumeData();
    this.getBlogData();
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route
              path="/"
              exact
              component={() => (
                <>
                  <Header data={this.state.resumeData.main} />
                  <About data={this.state.resumeData.main} />
                  <Resume data={this.state.resumeData.resume} />
                  <Portfolio data={this.state.resumeData.portfolio} />
                  <Footer data={this.state.resumeData.main} />
                </>
              )}
            />
            {/* <Route path="/blog" exact component={() => <BlogMain data={this.state.blogData} />} /> */}
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
