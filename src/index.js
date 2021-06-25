import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Pixel(props) {
  return (
    <td className="pixel" id={props.id} style={props.style} onClick={props.onClick} ></td>
  );
}

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //pixels: Array(10).fill(Array(10).fill({id: "", color: ""})),
      pixels: Array(9).fill(null),
    }
  }
  
  renderPixel(i) {
    return (
      <Pixel id={i} style={{backgroundColor: this.state.pixels[i]}} onClick={() => this.changeColor(i)} />
    );
  }
  
  renderRow(i) {
    return (
      <tr>
        {this.renderPixel(0 + i*3)}
        {this.renderPixel(1 + i*3)}
        {this.renderPixel(2 + i*3)}
      </tr>
    );
  }
  
  changeColor(i) {
    const pixels = this.state.pixels.slice();
    pixels[i] = this.props.color;
    this.setState({pixels: pixels});
  }
  
  render() {
    //const rows = this.state.pixels.map((row, i) => <tr key={i} ></tr>);
    //const pixels = rows.map((pixel, i) => <Pixel key={i} />);
    /*
    const pixels = this.state.pixels.map((row, i) =>
                                         <tr key={i} >
                                           {row.map((pixel, j) =>
                                                    <Pixel
                                                      id={i + j}
                                                      key={j}
                                                      style={{
                                                        backgroundColor: this.state.pixels[i][j].color,
                                                      }}
                                                      onClick={() => this.changeColor(i, j, "blue").bind(this)}
                                                     />
                                                   )}
                                         </tr>
                                        );
    */
    console.log(this.state);
    return (
      <div className="pixels">
        {this.renderRow(0)}
        {this.renderRow(1)}
        {this.renderRow(2)}
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "",
    }
  }
  setColor(e) {
    //console.log(e.target.value);
    const color = e.target.value;
    this.setState({color: color}, console.log(this.state.color));
  }
  render() {
    return (
      <div className="app">
        <input type="color" onChange={this.setColor.bind(this)} />
        <Canvas color={this.state.color} />
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById("root")
);
