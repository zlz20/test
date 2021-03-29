import React from "react";
import Battle from "@/components/Battle/Battle";
import Result from "@/components/Battle/Result";

class Battle1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player1: "",
      player2: "",
    };
  }

  componentDidMount = () => {
    if (window.location.hash !== "#/battle") {
      const myhref = window.location.href.split("?")[1].split("&");
      console.log("href", window.location.href.split("?")[1].split("&"));
      const play1 = myhref[0].split("=")[1];
      const play2 = myhref[1].split("=")[1];
      console.log(play1, play2);
      this.setState({
        player1: play1,
        player2: play2,
      });
    }
  };

  startBattle = (p1, p2) => {
    this.setState({
      player1: p1,
      player2: p2,
    });
  };

  reset = () => {
    this.setState({
      player1: "",
      player2: "",
    });
    window.location.hash = "#/battle";
  };

  render() {
    const { player1, player2 } = this.state;
    if (player1 && player2) {
      return <Result player1={player1} player2={player2} reset={this.reset} />;
    }
    return <Battle startBattle={this.startBattle} />;
  }
}
export default Battle1;
