import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Pixel(props) {
  return (
    <td
      className="pixel"
      id={props.id}
      style={props.style}
      onClick={props.onClick}
    ></td>
  );
}

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pixels: Array(15).fill(Array(15).fill(null)),
    }
  }
  
  renderPixel(r, c) {
    return (
      <Pixel
        id={c + r*10}
        style={{backgroundColor: this.state.pixels[r][c]}}
        onClick={() => this.changeColor(r, c)}
      />
    );
  }

  renderRow(r) {
    const row = this.state.pixels[r];
    return (
      <tr>
        {row.map((pixel, index) => this.renderPixel(r, index))}
      </tr>
    );
  }

  changeColor(r, c) {
    console.log("change color fun work");
    console.log(r, c);
    const pixels = this.state.pixels.slice();
    const row = pixels[r];
    //pixels[r][c] = this.props.color;
    row[c] = this.props.color;
    console.log(row[c]);
    console.log(pixels[r][c])
    this.setState({pixels: pixels});
  }
  
  render() {
    
    console.log(this.state);
    const canvas = this.state.pixels.slice();
    console.log(canvas);

    return (
      <table className="pixels">
        <tbody>
          {canvas.map((row, index) => this.renderRow(index))}
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
