import React from "react";
import axios from "axios";
// import InfiniteScroll from "react-infinite-scroller";
import { HashRouter as Router, Link } from "react-router-dom";
// import { Spin } from 'antd';
import InfiniteScroll from "react-infinite-scroller";
import Cards from "@/components/popular/Cards";
import Loading from "@/components/popular/Loading";
import "font-awesome/css/font-awesome.min.css";
import "font-awesome/less/font-awesome.less";
import "@/styles/git.css";

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      end: false,
      page: 1,
      items: [],
      errrr: null,
      links: [
        { title: "All", query: "" },
        { title: "JavaScript", query: "javascript" },
        { title: "Ruby", query: "ruby" },
        { title: "Java", query: "java" },
        { title: "CSS", query: "css" },
        { title: "Python", query: "python" },
      ],
      query: "all",
    };
  }

  async componentDidMount() {
    window.addEventListener("hashchange", () => {
      this.search(true);
    });
    this.search(true);
  }

  // // eslint-disable-next-line react/no-deprecated
  // componentWillReceiveProps(nextProps) {
  //   if (this.props.query !== nextProps.query) {
  //     this.search(true);
  //   }
  // }

  // componentDidUpdate(prevProps) {
  //   if (this.props.query !== prevProps.query) {
  //     this.search(true);
  //   }
  // }

  search = async (clear = false, query) => {
    // 另一种获取地址方法
    // function GetQueryString(name) {
    //   var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    //   var r = window.location.search.substr(1).match(reg);  //获取url中"?"符后的字符串并正则匹配
    //   var context = "";
    //   if (r != null)
    //     context = r[2];
    //   reg = null;
    //   r = null;
    //   return context === null || context === "" || context === "undefined" ? "" : context;
    // }
    // console.log(GetQueryString("q"));
    const page = clear ? 1 : this.state.page;
    const q = window.location.href.split("=").slice(1).toString();
    console.log("q", q);
    this.setState({
      query,
    });
    const url = `https://api.github.com/search/repositories?q=stars:>1+language:${query}&sort=stars&order=desc&type=Repositories&page=${page}&per_page=10`;
    console.log("url", url);
    this.setState({ loading: true });
    //
    //   try {
    //     const res = await axios.get(url)
    //     console.log('res', res.data)
    //     this.setState({
    //       items: res.data.items
    //     })
    //   } catch (e) {
    //     console.log('error', e)
    //   }
    //   this.setState({ loading: false });
    // }

    if (clear) {
      this.setState({ items: [] });
    }
    try {
      const res = await axios.get(url);
      console.log("res", res.data);
      this.setState((state) => ({
        items: clear ? res.data.items : [...state.items, ...res.data.items],
        page: clear ? 1 : state.page + 1,
      }));
    } catch (e) {
      const { response } = e;
      console.log(response);

      this.setState({
        end: true,
        errrr:
          (response && response.data && response.data.message) || e.message,
      });
    }

    this.setState({
      loading: false,
    });
  };
  

  render() {
    const { loading, end, errrr, query } = this.state;
    const r = window.location.href.split("=").slice(1).toString();
    // console.log(r);
    const { links } = this.state;
    // const cards = this.state.items.map((item, key) => {
    //   return (
    //     <div className="card col-lg-3 col-md-3 col-sm-6 col-6">
    //       <div className="it" key={item.id}>
    //         <div className="num">#{key + 1}</div>
    //         <div className="img">
    //           {<LazyLd width={150} height={150} src={item.owner.avatar_url} />}
    //           {/* <img src={item.owner.avatar_url} style={{ width: '150px', height: '150px',}} /> */}
    //           {/* 无占位图 */}
    //         </div>
    //         <div className="name">
    //           <a href={item.html_url}>{item.name}</a>
    //         </div>
    //         <div className="desc">
    //           <div>
    //             <i className="fa fa-user" id="u" />
    //             <a href={item.owner.html_url}>{item.name}</a>
    //           </div>
    //           <div>
    //             <i className="fa fa-star" id="s" />
    //             <span>{item.stargazers_count} stars</span>
    //           </div>
    //           <div>
    //             <i className="fa fa-code-fork" id="c" />
    //             <span>{item.forks_count} forks</span>
    //           </div>
    //           <div>
    //             <i className="fa fa-exclamation-triangle" id="t" />
    //             <span>{item.open_issues_count} open_issues</span>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   );
    // });
    return (
      <div>
        {/* {loading ? <Loading />
          : ( */}
        <ul id="headbar">
          {links.map((item, key) => (
            // <div key={key}>
            //   <a
            //     href={`/gitrain/#/popular/?q=${item.query}`}
            //     style={{ color: r === item.query ? "red" : "black" }}
            //   >
            //     {item.title}
            //   </a>
            // </div>

            <Router>
              <div key={key}>
                <Link
                  onClick={() => this.search(false, item.query)}
                  to={{ pathname: `/popular/?q=${item.query}` }}
                  style={{ color: r === item.query ? "red" : "black" }}
                >
                  {item.title}
                </Link>
                {/* <Switch>
              <Route path={{ `/popular/?q=${item.query}` }} component={Content} />
            </Switch> */}
              </div>
            </Router>
          ))}
        </ul>
        <InfiniteScroll
          initialLoad={false}
          loadMore={() => this.search(false, query)}
          hasMore={!loading || end}
          loader={null}
        >
          <div className="content">
            {this.state.items.map((item, key) => (
              <Cards item={item} index={key} key={key} />
            ))}

            {errrr && !loading && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  color: "red",
                }}
              >
                <span style={{ width: "50%" }}>{errrr}</span>
                {/* message= type="error" showIcon style={{ width: '50%' }} /> */}
              </div>
            )}
          </div>
          {loading && <Loading />}

          {/* {errrr ? (
            <h3 style={{ textAlign: "center" }}>{errrr}</h3>
          ) : (
            <div> </div>
            )} */}
        </InfiniteScroll>
      </div>
    );
  }
}
export default Content;
