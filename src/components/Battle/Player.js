import React from "react";
// import { withFormik } from "formik";
import { NavLink } from "react-router-dom";
import style from "@/components/Battle/battle.less";
import axios from "axios";
import LazyLd from "@/components/popular/LazyLd";
import "@/styles/index.less";

// import { withFormik } from "formik";

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player1: "",
      player2: "",
      disabled: true,
      disabled2: true,
      inputValue: "",
      inputValue2: "",
      put: null,
      put2: null,
      lists: [],
      lists2: [],
      // onLoading: false,
      done: false,
      done2: false,
    };
  }

  handleChange = (e) => {
    this.setState({
      disabled: !(e.target.value.length > 0),
    });

    const name = e.target.value;
    if (name === "") {
      return;
    }
    const reg = /^[\u4e00-\u9fa5]+|[a-zA-Z0-9]+$/;
    if (reg.test(name) === false) {
      this.setState({
        put: "zxc",
        disabled: true,
      });

      // alert("请不要输入特殊字符!");
      document.getElementById("inputName").value = "";
    }
    this.setState({
      put: null,
      // disabled:true,
    });
    e.preventDefault();
  };

  handleChange2 = (e) => {
    this.setState({
      disabled2: !(e.target.value.length > 0),
    });

    const name = e.target.value;
    if (name === "") {
      return;
    }
    const reg = /^[\u4e00-\u9fa5]+|[a-zA-Z0-9]+$/;
    if (reg.test(name) === false) {
      this.setState({
        put2: "zxc",
        disabled: true,
      });

      // alert("请不要输入特殊字符!");
      document.getElementById("inputName").value = "";
    }
    this.setState({
      put: null,
      // disabled:true,
    });
    e.preventDefault();
  };

  playerBlur1 = (e) => {
    this.setState({
      inputValue: e.target.value,
    });
  };

  playerBlur2 = (e) => {
    this.setState({
      inputValue2: e.target.value,
    });
  };

  onClick = () => {
    const { inputValue } = this.state;
    this.setState({
      player1: inputValue,
    });
    this.getimage();
  };

  onClick2 = () => {
    const { inputValue2 } = this.state;
    this.setState({
      player2: inputValue2,
    });

    this.getimage2();
    // console.log(res.data)
  };


  getimage = async () => {
    // this.setState({ onLoading: true });
    const { inputValue } = this.state;
    // 在此做提交操作，比如发dispatch等
    // const { transmitDate } = this.props;
    const url = `https://api.github.com/users/${inputValue}`;

    try {
      const res = await axios.get(url);
      // axios.get(url).then(response => {
      console.log(res);
      console.log(res.data.avatar_url);
      if (res.status === 200) {
        // const { login } = res.data;
        this.setState({
          lists: res.data,
          done: true,
        });
        // const state = {
        //   login,
        //   click: false
        // };
        // this.setState(state);
        // transmitDate(state);
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        console.log(error.message);
      }
      if (error.response && error.response.status === 404) {
        alert(error.message);
      }

      // this.setState({
      //   onLoading: false
      // });
    }
    // event.preventDefault();
    // this.setState({onLoading:false})
  };

  getimage2 = async () => {
    // this.setState({ onLoading: true });
    const { inputValue2 } = this.state;
    // 在此做提交操作，比如发dispatch等
    // const { transmitDate } = this.props;
    const url2 = `https://api.github.com/users/${inputValue2}`;

    console.log('url', url2);
    try {
      const res2 = await axios.get(url2);
      // axios.get(url).then(response => {
      console.log(res2);
      console.log(res2.data.avatar_url);
      if (res2.status === 200) {
        // const { login2 } = res2.data;
        this.setState({
          lists2: res2.data,
          done2: true
        });
        // this.setState({
        //   login2,
        //   // click2: false
        // });
        // transmitDate(state);
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        console.log(error.message);
      }
      // if (error.response && error.response.status === 404) {
      //   alert(error.message);
      // }

      // this.setState({
      //   onLoading: false
      // });
    }
    // event.preventDefault();
    // this.setState({done2:false})
  };

  onKeyDown = (e) => {
    if (e.nativeEvent.code === "Enter") {
      this.setState({
        player1: e.target.value,
      });
    }
  };

  onKeyDown2 = (e) => {
    if (e.nativeEvent.code === "Enter") {
      this.setState({
        player2: e.target.value,
      });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
  };

  onput = () => {
    this.setState({
      lists: "",
    });
  };

  // onput = event => {
  //   // const { put } = this.state;
  //   const name = event.target.value;
  //   if (name === "") {
  //     return;
  //   }
  //   const reg = /^[\u4e00-\u9fa5]+|[a-zA-Z0-9]+$/;
  //   if (reg.test(name) === false) {
  //     this.setState({
  //       put:'zxc',
  //       disabled:true,
  //     });

  //     // alert("请不要输入特殊字符!");
  //     document.getElementById("inputName").value = "";
  //   }
  //   this.setState({
  //     put:null,
  //     // disabled:true,
  //   });
  // };

  cancel = (player) => {
    this.setState({
      [player]: "",
      disabled: true,
      disabled2: true,
      done2: false,
    });
  };

  render() {
    const { handleKeyDown, startBattle } = this.props;
    const { disabled, disabled2, player1, player2, put, put2 } = this.state;
    // console.log(this.state.lists.avatar_url)
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: "80%" }}>
          <h2 className="text-center">Players</h2>
          <form onSubmit={this.handleSubmit}>
            <div className={style.playerBox}>
              <div className={style.play}>
                <h3>Player One</h3>
                {player1 ? (
                  <div className={style.selected}>
                    <div className={style.info}>
                      <div className={style.imgbox}>
                        {/* <img src={`https://github.com/${player1}.png?size=200`} alt='' className={style.playerimg} /> */}

                        {this.state.done ? (
                          // <LazyLd width={80} height={80} src={this.state.lists.avatar_url} />
                          <img
                            style={{ width: "80px", height: "80px" }}
                            src={this.state.lists.avatar_url}
                            alt=""
                          />
                        ) : (
                          <LazyLd
                            width={80}
                            height={80}
                            src={this.state.lists.avatar_url}
                          />
                        )}
                      </div>
                      <span>{player1}</span>
                    </div>
                    <div>
                      <span
                        role="button"
                        tabIndex="0"
                        className="fa-stack fa-lg"
                        onKeyDown={handleKeyDown}
                        onClick={() => this.cancel("player1")}
                        onKeyPress={this.handleKeyDown}
                      >
                        <i className="fa fa-window-close" />
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className={style.emptyBox}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <input
                        id="user"
                        type="text"
                        placeholder="github user"
                        className={style.emptyIn}
                        onInput={this.onput}
                        onChange={this.handleChange}
                        onBlur={this.playerBlur1}
                        onKeyDown={this.onKeyDown}
                      />
                      {put && (
                        <div
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <span style={{ color: "red" }}>特殊字符</span>
                          {/* message= type="error" showIcon style={{ width: '50%' }} /> */}
                        </div>
                      )}
                    </div>

                    <button disabled={disabled} type="button" id="123" className={disabled === true ? style.submitBtn : style.dis} onClick={this.onClick}>submit</button>
                  </div>
                )}
              </div>
              <div className={style.play}>
                <h3>Player Two</h3>
                {player2 ? (
                  <div className={style.selected}>
                    <div className={style.info}>
                      <div className={style.imgbox}>

                        {this.state.done2 ? (
                          // <LazyLd width={80} height={80} src={this.state.lists.avatar_url} />
                          <img style={{width:'80px',height:'80px'}} src={this.state.lists2.avatar_url} alt="" />
                        ) : (
                          <LazyLd width={80} height={80} src={this.state.lists2.avatar_url} />
                        )}
                      </div>
                      <span>{player2}</span>
                    </div>
                    <div>
                      <span
                        role="button"
                        tabIndex="0"
                        className="fa-stack fa-lg"
                        onKeyDown={handleKeyDown}
                        onClick={() => this.cancel("player2")}
                      >
                        <i className="fa fa-window-close" />
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className={style.emptyBox}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <input
                        type="text"
                        placeholder="github user"
                        className={style.emptyIn}
                        onChange={this.handleChange2}
                        onInput={this.onput}
                        onBlur={this.playerBlur2}
                        onKeyDown={this.onKeyDown2}
                      />
                      {put2 && (
                        <div
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <span style={{ color: "red" }}>特殊字符</span>
                          {/* message= type="error" showIcon style={{ width: '50%' }} /> */}
                        </div>
                      )}
                    </div>
                    <button type="button" disabled={disabled2} id="124" className={disabled2 === true ? style.submitBtn : style.dis} onClick={this.onClick2}>submit</button>
                  </div>
                )}
              </div>
            </div>
            <div className={style.start_battle}>
              {player1 && player2 ? (
                <div className={style.startBattle}>
                  <NavLink
                    exact
                    to={{
                      search: `player1=${player1}&player2=${player2}`,
                    }}
                    onClick={() => startBattle(player1, player2)}
                    className={style.startBattle1}
                  >
                    提交
                  </NavLink>
                  {/* <button type="button" onClick={() => startBattle(player1,player2)} className={style.startBattle}>Battle</button> */}
                </div>
              ) : (
                ""
              )}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Player;
