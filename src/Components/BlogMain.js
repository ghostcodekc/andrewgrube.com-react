import React, { Component } from "react";
import BlogPost from "./BlogPost";

class BlogMain extends Component {
  render() {
    if (this.props.data) {
    }
    console.log(this.props.data);

    return (
      <div>
        <nav id="nav-wrap">
          <a className="mobile-btn" href="#nav-wrap" title="Show navigation">
            Show navigation
          </a>
          <a className="mobile-btn" href="#home" title="Hide navigation">
            Hide navigation
          </a>

          <ul id="nav" className="nav">
            <li>
              <a className="smoothscroll" href="/">
                Home
              </a>
            </li>
            <li>
              <a href="/blog">Blog</a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default BlogMain;
