import React from "react";
import Player from "@/components/Battle/Player";
import "@/styles/battle.css";
// import style from "@/pages/Battle/battle.less"

export default class Battle extends React.Component {
  render() {
    const { startBattle } = this.props;
    const style = {
      cola: { fontSize: "20px", textAlign: "center", margin: "8px 16px" },
      icon1: {
        backgroundColor: "#eee",
        fontSize: "120px",
        padding: "32px",
        color: "rgba(255,191,116)",
      },
      colb: { fontSize: "20px", textAlign: "center", margin: "8px 16px" },
      icon2: {
        backgroundColor: "#eee",
        fontSize: "120px",
        padding: "32px",
        color: "gray",
      },
      colc: { fontSize: "20px", textAlign: "center", margin: "8px 16px" },
      icon3: {
        backgroundColor: "#eee",
        fontSize: "120px",
        padding: "32px",
        color: " gold",
      },
      row: { display: "flex", justifyContent: "center" },
    };
    return (
      <div className={style.battle}>
        <div id="instuct">
          <div style={{ textAlign: "center" }}>
            <h2 className="text-center">Instructions</h2>
          </div>
          <div style={style.row}>
            <div className="row" style={{ width: "60%" }}>
              <div className="cola">
                <div style={style.col1}>Enter two Github</div>
                <div>
                  <i className="fa fa-users" style={style.icon1} />
                </div>
              </div>
              <div className="colb">
                <div style={style.col2}>Battle</div>
                <div>
                  <i className="fa fa-fighter-jet" style={style.icon2} />
                </div>
              </div>
              <div className="colc">
                <div style={style.col3}>See the winner</div>
                <div>
                  <i className="fa fa-trophy" style={style.icon3} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Player startBattle={startBattle} />
      </div>
    );
  }
}
