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
      pixels: Array(1600).fill(null),
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
    
    for (let r = 0; r < 40; r++) {
      rows[r] = [];
      for (let i = 0; i < 40; i++) {
        rows[r].push(pixels[i + r*40]);
      }
    }
    console.log(rows);
    return (
      <table className="pixels">
        <tbody>
          {rows.map((row, r) => (
            <tr>
              {row.map((pixel, i) => this.renderPixel(i + r*40))}
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
  download() {
    html2canvas(document.querySelector('.pixels')).then(canvas => {
         document.getElementById("downloaded-picture").appendChild(canvas);
      });
  }
  render() {
    return (
      <div className="app">
        <h1>PIXEL DRAWING APP</h1>
        <h2>Pick color: <input type="color" onChange={this.setColor.bind(this)} /></h2>
        <button
          type="button"
          onClick={this.download}
        >download image</button>
        <Canvas color={this.state.color} />
        
        <footer>
          <p>designed and programmed by Vadim Gierko | 2021</p>
          <p><a target="_blank" href="https://en.wikipedia.org/wiki/Pixel_art">Read more about pixel art</a></p>
        </footer>
        <div id="downloaded-picture"></div>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById("root")
);
