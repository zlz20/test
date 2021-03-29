/* eslint-disable react/no-deprecated */
import React from "react";

class LazyLd extends React.Component {
  constructor() {
    super();
    this.state = {
      done: false,
    };
  }

  componentWillMount() {
    // 创建一个虚拟图片
    const img = new Image();
    // 发出请求，请求图片
    img.src = this.props.src;
    // 当图片加载完毕
    img.onload = () => {
      this.setState({
        done: true,
      });
    };
  }

  render() {
    return (
      <div>
        {this.state.done ? (
          <img
            style={{
              width: "200px",
              height: "250px",
            }}
            src={this.props.src}
            alt="no"
          />
        ) : (
          <img
            style={{
              width: "150px",
              height: "150px",
            }}
            src="https://img.devrant.com/devrant/rant/r_228415_fDWmt.gif"
            alt="no"
          />
        )}
      </div>
    );
  }
}

export default LazyLd;
