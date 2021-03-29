import React from "react";
// import 'font-awesome/css/font-awesome.min.css';
import "font-awesome/less/font-awesome.less";
import Content from "@/components/popular/Content";
// import Header from "@/components/popular/Header";
import "@/styles/git.css";

class Popular extends React.Component {
  render() {
    return (
      <div style={{ textAlign: "center" }}>
        {/* <Header onClick={this.onClick} /> */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Content />
        </div>
      </div>
    );
  }
}

export default Popular;
