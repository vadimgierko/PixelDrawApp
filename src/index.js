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
      pixels: Array(2500).fill(null),
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

  changeColor(i) {
    console.log("change color fun work");
    console.log(i);
    const pixels = this.state.pixels.slice();
    pixels[i] = this.props.color;
    console.log(pixels[i]);
    this.setState({pixels: pixels});
  }
  
  render() {
    
    console.log(this.state);
    const pixels = this.state.pixels.slice();
    console.log(pixels);
    let rows = [];
    
    for (let r = 0; r < 50; r++) {
      rows[r] = [];
      for (let i = 0; i < 50; i++) {
        rows[r].push(pixels[i + r*50]);
      }
    }
    console.log(rows);
    return (
      <table className="pixels">
        <tbody>
          {rows.map((row, r) => (
            <tr>
              {row.map((pixel, i) => this.renderPixel(i + r*50))}
            </tr>
          ))}
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
