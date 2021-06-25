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
      pixels: Array(100).fill(null),
    }
  }
  
  renderPixel(i) {
    return (
      <Pixel
        id={i}
        style={{backgroundColor: this.state.pixels[i]}}
        onClick={() => this.changeColor(i)}
      />
    );
  }
  
  renderRow(i) {
    return (
      <tr>
        {this.renderPixel(0 + i*10)}
        {this.renderPixel(1 + i*10)}
        {this.renderPixel(3 + i*10)}
        {this.renderPixel(4 + i*10)}
        {this.renderPixel(5 + i*10)}
        {this.renderPixel(6 + i*10)}
        {this.renderPixel(7 + i*10)}
        {this.renderPixel(8 + i*10)}
        {this.renderPixel(9 + i*10)}
      </tr>
    );
  }
  
  changeColor(i) {
    console.log(i);
    const pixels = this.state.pixels.slice();
    pixels[i] = this.props.color;
    this.setState({pixels: pixels});
  }
  
  render() {
    
    console.log(this.state);
    const canvas = this.state.pixels.slice();
    console.log(canvas);

    return (
      <table className="pixels">
        <tbody>
          {this.renderRow(0)}
          {this.renderRow(1)}
          {this.renderRow(2)}
          {this.renderRow(3)}
          {this.renderRow(4)}
          {this.renderRow(5)}
          {this.renderRow(6)}
          {this.renderRow(7)}
          {this.renderRow(8)}
          {this.renderRow(9)}
        </tbody>
      </table>
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
