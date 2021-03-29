import React from "react";
import axios from "axios";
// import "antd/dist/antd.css";
import InfiniteScroll from "react-infinite-scroller";
import Cards from "@/components/popular/Cards";
import Loading from "@/components/popular/Loading";
import MyNavLink from "@/components/popular/my-nav-link";
import "@/styles/git.css";

export default class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      loading: false,
      // end: false,
      page: 1,
      // querys: '',
      warningMsg: [],
      warning: false,
      tap: [
        { title: "All", query: "All" },
        { title: "JavaScript", query: "javascript" },
        { title: "Ruby", query: "ruby" },
        { title: "Java", query: "java" },
        { title: "Css", query: "css" },
        { title: "Python", query: "python" },
      ],
    };
  }

  async componentDidMount() {
    const q = window.location.href.split("=")[1];
    console.log(q);
    this.search(true, q);
  }

  //  clicktap = index => {
  //   console.log("query", index)
  //   const { tap } = this.state;
  //   const t = tap[index].query
  //   console.log('---',t)
  //   this.setState({
  //     querys: t
  //   })

  //   this.search(true);
  //   // console.log(this.state.querys)
  // }

  // 模拟发送ajax请求
  search = async (clear = false, q = null) => {
    const page = clear ? 1 : this.state.page;

    const { query } = this.state;

    let newQuery = q;
    if (!q) {
      newQuery = query;
    }

    this.setState({
      loading: true,
      warning: false,
      query: newQuery,
    });

    if (clear) {
      this.setState({ items: [] });
    }
    let url = `https://api.github.com/search/repositories?q=stars:%3E1&sort=stars&order=desc&type=Repositories&page=${page}&per_page=10`;
    if (!newQuery || newQuery === "All") {
      url = `https://api.github.com/search/repositories?q=stars:%3E1&sort=stars&order=desc&type=Repositories&page=${page}&per_page=10`;
    } else {
      url = `https://api.github.com/search/repositories?q=stars:%3E1+language:${newQuery}&sort=stars&order=desc&type=Repositories&page=${page}&per_page=10`;
    }

    try {
      const res = await axios.get(url);
      this.setState((state) => ({
        items: clear ? res.data.items : [...state.items, ...res.data.items],
        page: clear ? 1 : state.page + 1,
        loading: false,
      }));
    } catch (error) {
      if (error.response && error.response.status === 403) {
        const msg =
          error.response && error.response.data && error.response.data.message;

        this.setState({
          warningMsg: msg,
          warning: true,
        });
      }
      if (error.response && error.response.status === 404) {
        const msg = error.response.data;
        const warn = Object.values(msg);
        this.setState({
          warningMsg: warn[0],
          warning: true,
        });
      }
    }
    this.setState({ loading: false });
  };
  

  render() {
    const { tap, items, warningMsg, warning, loading, query } = this.state;
    // console.log("query===", this.state.querys,window.location.href.split("=")[1])
    const lists = items.map((item, key) => (
      <Cards item={item} index={key} key={key} />
    ));
    let langs = window.location.href.split("=")[1];
    if (langs === undefined || langs === "") {
      langs = "All";
    }
    const list = tap.map((m) => (
      <ul key={m.query} style={{ marginRight: 5, color: "black" }}>
        <MyNavLink
          style={{
            marginRight: 4,
            color: langs === m.query ? "red" : "black",
          }}
          to={{
            pathname: "/popular",
            search: `?lang=${m.query}`,
          }}
          onClick={() => this.search(true, m.query)}
          // onKeyDown={this.handleKeyDown}
        >
          {m.title}
        </MyNavLink>
      </ul>
    ));

    return (
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ul id="headbar">{list}</ul>
        </div>
        <InfiniteScroll
          initialLoad={false}
          loadMore={() => this.search(false, query)}
          hasMore={!loading && !warning}
          loader={null}
        >
          <div className="content">{lists}</div>
          {warning ? (
            // <p style={{ color: "red", textAlign: "center" }}>{warningMsg}</p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                color: "red",
              }}
            >
              <span style={{ width: "50%" }}>{warningMsg}</span>
              {/* message= type="error" showIcon style={{ width: '50%' }} /> */}
            </div>
          ) : (
            ""
          )}

          {loading && <Loading />}
        </InfiniteScroll>
      </div>
    );
  }
}
