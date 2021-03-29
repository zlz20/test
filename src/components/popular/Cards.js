import React from "react";
// import Menu from "@/components/popular/Menu";
import LazyLd from "@/components/popular/LazyLd";
import "@/styles/git.css";

class Cards extends React.Component {
  render() {
    const { item, index } = this.props;
    // console.log(index)
    return (
        
      <div className="card col-lg-3 col-md-3 col-sm-6 col-6">
        <div className="it" key={item.id}>
          <div className="num">#{index + 1}</div>
          <div className="img">
            {<LazyLd width={150} height={150} src={item.owner.avatar_url} />}
            {/* <img src={item.owner.avatar_url} style={{ width: '150px', height: '150px',}} /> */}
            {/* 无占位图 */}
          </div>
          <div className="name">
            <a href={item.html_url}>{item.name}</a>
          </div>
          <div className="desc">
            <div>
              <i className="fa fa-user" id="u" />
              <a href={item.owner.html_url}>{item.name}</a>
            </div>
            <div>
              <i className="fa fa-star" id="s" />
              <span>{item.stargazers_count} stars</span>
            </div>
            <div>
              <i className="fa fa-code-fork" id="c" />
              <span>{item.forks_count} forks</span>
            </div>
            <div>
              <i className="fa fa-exclamation-triangle" id="t" />
              <span>{item.open_issues_count} open_issues</span>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default Cards;
