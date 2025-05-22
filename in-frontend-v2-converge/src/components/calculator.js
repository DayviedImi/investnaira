import React from "react";
import "../assets/css/calc.css";
import { Table, Container, Row, Card, Col } from "react-bootstrap";
import { Chart } from "react-charts";
import Fade from "react-reveal/Fade";

const myObj = {
  useGrouping: false,
};

export default class Calculator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 100000,
      value2: 30000,
      value4: 30000,
      value3: 10,
      data: [],
      display: "",
      show: "",
      agg: "8,917,498",
      bal: "7,202,770",
      cons: "5,097,884",
      year: "10",
      age: "20",
      type: "years",
    };
  }

  data = [
    {
      label: "Conservative Fund",
      data: this.consGraph,
    },
    {
      label: "Balanced Fund",
      data: this.balGraph,
    },
    {
      label: "Aggressive Fund",
      data: this.aggGraph,
    },
  ];

  Arrays() {
    this.data = [];
    const invest = [];
    const time = [];
    const cons = [];
    const bal = [];
    const agg = [];
    const depGraph = [];
    const consGraph = [];
    const balGraph = [];
    const aggGraph = [];

    for (let j = 0; j <= this.state.value3; j++) {
      time.push(j);
      invest.push(j * this.state.value2 * 12);
      cons.push(
        Math.floor(
          (this.state.value2 / (22 / 1200)) * (Math.pow(22 / 1200 + 1, time[j] * 12) - 1) +
            this.state.value * Math.pow(22 / 1200 + 1, time[j] * 12)
        )
      );
      bal.push(
        Math.floor(
          (this.state.value2 / (27 / 1200)) * (Math.pow(27 / 1200 + 1, time[j] * 12) - 1) +
            this.state.value * Math.pow(27 / 1200 + 1, time[j] * 12)
        )
      );

      agg.push(
        Math.floor(
          (this.state.value2 / (32 / 1200)) * (Math.pow(32 / 1200 + 1, time[j] * 12) - 1) +
            this.state.value * Math.pow(32 / 1200 + 1, time[j] * 12)
        )
      );
      depGraph.push({ x: time[j], y: invest[j] });

      consGraph.push({ x: time[j], y: cons[j] });
      balGraph.push({ x: time[j], y: bal[j] });
      aggGraph.push({ x: time[j], y: agg[j] });
    }

    this.data = [
      {
        label: "Conservative Fund",
        data: consGraph,
      },
      {
        label: "Balanced Fund",
        data: balGraph,
      },
      {
        label: "Aggressive Fund",
        data: aggGraph,
      },
    ];
  }

  updateDimensions() {
    if (window.innerWidth < 992) {
      this.setState({ display: "none", top: "10vh", show: "" });
    } else {
      this.setState({ display: "", top: "10vh", show: "none" });
    }
  }

  over = () => {
    this.setState({
      agg: this.agg,
      bal: this.bal,
      cons: this.cons,
      year: this.year,
      age: this.age,
    });
  };

  agg = "8,917,498";

  bal = "7,202,770";

  cons = "5,097,884";

  year = "10";

  age = "20";

  numbers = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
  ];

  render() {
    return (
      <Container id="calculator">
        <form className="form">
          <div className="horizontal-bar" />
          <Row className="container">
            <Col className="slider-column">
              <div className="controls">
                <h3 className="calcHeader">Your Investment</h3>
                <h3 className="calcHeader">Calculator</h3>
                <div className="calcForm">
                  <label className="calcSlider">Duration of Investment</label>
                  <div class="flex">
                    <select
                      className="field"
                      id="durationLength"
                      style={{
                        width: "30%",
                        border: "2px solid #ccc",
                        borderRadius: "7px",
                        color: "black",
                      }}
                      value={this.state.value3}
                      onChange={() => {
                        let value = document.getElementById("durationLength").value;
                        console.log(value);
                        this.setState({ value3: value });
                      }}
                      onBlur={() => {
                        document.getElementById("durationLength").value = parseInt(
                          document.getElementById("durationLength").value
                        ).toLocaleString(myObj);
                      }}>
                      {this.numbers.map((item, index) => (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>

                    <select
                      style={{
                        width: "60%",
                        border: "2px solid #ccc",
                        borderRadius: "7px",
                        color: "black",
                      }}
                      id="durationType"
                      onChange={(value) =>
                        this.setState({
                          type: document.getElementById("durationType").value,
                        })
                      }>
                      <option value="months">Months</option>
                      <option selected value="years">
                        Years
                      </option>
                    </select>
                  </div>
                  <label className="calcSlider" for="monthlyDep">
                    Monthly Deposit
                  </label>
                  <div class="flex">
                    <span class="currency">{`\u20A6`}</span>
                    <input
                      className="field"
                      id="monthlyDep"
                      style={{ color: "black" }}
                      type="select"
                      placeholder={this.state.value2.toLocaleString(myObj)}
                      value={this.state.value2.toLocaleString(myObj)}
                      maxLength={9}
                      onChange={() => {
                        let value = document.getElementById("monthlyDep").value;
                        this.setState({ value2: value });
                      }}
                      onBlur={() => {
                        document.getElementById("monthlyDep").value = parseInt(
                          document.getElementById("monthlyDep").value
                        ).toLocaleString(myObj);
                      }}
                    />
                  </div>
                  <label className="calcSlider" for="initialDep">
                    Initial Deposit
                  </label>
                  <div class="flex">
                    <span class="currency">{`\u20A6`}</span>
                    <input
                      className="field"
                      id="initialDep"
                      type="text"
                      style={{ color: "black" }}
                      placeholder={this.state.value.toLocaleString(myObj)}
                      value={this.state.value.toLocaleString(myObj)}
                      maxLength={9}
                      onChange={() => {
                        let value = document.getElementById("initialDep").value;
                        console.log(value);
                        this.setState({ value });
                      }}
                      onBlur={() => {
                        document.getElementById("initialDep").value = parseInt(
                          document.getElementById("initialDep").value
                        ).toLocaleString(myObj);
                      }}
                    />
                  </div>
                </div>
              </div>
            </Col>
            <Col className="card-container">
              <Card>
                <div className="controls">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      justifyContent: "space-between",
                      color: "black",
                    }}>
                    <h6 style={{ textAlign: "left" }}>Results</h6>
                    <h6
                      style={{
                        color: "#ccc",
                        fontWeight: "bold",
                        margin: "0 1em",
                      }}>
                      Year:
                      {` ${parseInt(new Date().getFullYear()) + parseInt(this.state.value3)}`}
                    </h6>
                  </div>

                  <Table className="calcTable tbl" responsive="sm" borderless>
                    <tbody>
                      <tr>
                        <td className="tbl_data"></td>
                        <td className="tbl_data"></td>
                        <td className="tbl_data"></td>
                        <td className="tbl_data">
                          <h6 style={{ color: "#DECF3F" }}>Aggressive</h6>
                        </td>
                        <td className="tbl_data">
                          <h6 style={{ color: "#FC6868" }}>Balanced</h6>
                        </td>
                        <td className="tbl_data">
                          <h6 style={{ color: "#8BD0F2" }}>Conservative</h6>
                        </td>
                      </tr>
                      <tr>
                        <td className="tbl_data" style={{ width: "50em" }}>
                          <h6 style={{ color: "#ccc", fontWeight: "bold", textAlign: "left" }}>
                            Total Networth:
                          </h6>
                        </td>
                        <td className="tbl_data"></td>
                        <td className="tbl_data"></td>
                        <td className="tbl_data">
                          <h6>{`\u20A6${
                            this.state.type === "years"
                              ? Math.floor(
                                  (this.state.value2 / (32 / 1200)) *
                                    (Math.pow(32 / 1200 + 1, this.state.value3 * 12) - 1) +
                                    this.state.value *
                                      Math.pow(32 / 1200 + 1, this.state.value3 * 12)
                                ).toLocaleString(myObj)
                              : Math.floor(
                                  (this.state.value2 / (32 / 1200)) *
                                    (Math.pow(32 / 1200 + 1, this.state.value3) - 1) +
                                    this.state.value * Math.pow(32 / 1200 + 1, this.state.value3)
                                ).toLocaleString(myObj)
                          }`}</h6>
                        </td>
                        <td className="tbl_data">
                          <h6>
                            {`\u20A6${
                              this.state.type === "years"
                                ? Math.floor(
                                    (this.state.value2 / (27 / 1200)) *
                                      (Math.pow(27 / 1200 + 1, this.state.value3 * 12) - 1) +
                                      this.state.value *
                                        Math.pow(27 / 1200 + 1, this.state.value3 * 12)
                                  ).toLocaleString(myObj)
                                : Math.floor(
                                    (this.state.value2 / (27 / 1200)) *
                                      (Math.pow(27 / 1200 + 1, this.state.value3) - 1) +
                                      this.state.value * Math.pow(27 / 1200 + 1, this.state.value3)
                                  ).toLocaleString(myObj)
                            }`}
                          </h6>
                        </td>
                        <td className="tbl_data">
                          <h6>
                            {`\u20A6${
                              this.state.type === "years"
                                ? Math.floor(
                                    (this.state.value2 / (22 / 1200)) *
                                      (Math.pow(22 / 1200 + 1, this.state.value3 * 12) - 1) +
                                      this.state.value *
                                        Math.pow(22 / 1200 + 1, this.state.value3 * 12)
                                  ).toLocaleString(myObj)
                                : Math.floor(
                                    (this.state.value2 / (22 / 1200)) *
                                      (Math.pow(22 / 1200 + 1, this.state.value3) - 1) +
                                      this.state.value * Math.pow(22 / 1200 + 1, this.state.value3)
                                  ).toLocaleString(myObj)
                            }`}
                          </h6>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
                <Fade up>
                  <div
                    style={{
                      height: "320px",
                    }}
                    id="charts"
                    onMouseMove={this.over}>
                    <Chart
                      onChange={this.Arrays()}
                      data={this.data}
                      series={() => ({
                        type: "line",
                        showPoints: false,
                      })}
                      axes={[
                        {
                          primary: true,
                          position: "bottom",
                          type: "ordinal",
                        },
                        {
                          position: "left",
                          type: "linear",
                          min: 0,
                          stacked: true,
                          show: false,
                        },
                      ]}
                      tooltip
                    />
                  </div>
                </Fade>
              </Card>
            </Col>
          </Row>
        </form>
      </Container>
    );
  }
}
