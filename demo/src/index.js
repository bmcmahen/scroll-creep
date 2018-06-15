import React, { Component } from "react";
import { render } from "react-dom";

import ScrollSpy from "../../src";

const getNums = () => {
  const array = [];
  for (let i = 0; i < 50; i++) {
    array.push(i.toString());
  }
  return array;
};

class Demo extends Component {
  state = {
    nums: getNums()
  };
  render() {
    return (
      <div>
        <ScrollSpy elements={this.state.nums}>
          {activeIds => (
            <div
              style={{
                width: "100%",
                justifyContent: "center",
                display: "flex",
                position: "fixed",
                top: "0",
                left: 0
              }}
            >
              {this.state.nums.map(num => (
                <div
                  style={{
                    padding: "2px",
                    fontWeight: activeIds.includes(num) ? "bold" : "normal"
                  }}
                  key={num}
                >
                  {num}
                </div>
              ))}
            </div>
          )}
        </ScrollSpy>
        {this.state.nums.map(num => (
          <div
            id={num}
            key={num}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: num % 2 ? "#fafafa" : "white",
              height: "200px",
              width: "100%"
            }}
          >
            {num}
          </div>
        ))}
      </div>
    );
  }
}

render(<Demo />, document.querySelector("#demo"));
