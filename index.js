function Pixel(props) {
  return (
    <td
      className="pixel"
      id={props.id}
      style={props.style}
      onMouseDown={props.onMouseDown}
      onMouseMove={props.onMouseMove}
      onMouseUp={props.onMouseUp}
    ></td>
  );
}

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pixels: Array(1600).fill(null),
      isMouseDown: false,
    }
  }
  
  renderPixel(i) {
    return (
      <Pixel
        id={i}
        style={{backgroundColor: this.state.pixels[i]}}
        onMouseDown={() => this.handleMouseDown(i)}
        onMouseMove={() => this.handleMouseMove(i)}
        onMouseUp={() => this.handleMouseUp(i)}
      />
    );
  }

  handleMouseDown(i) {
    this.setState({isMouseDown: true});
    this.changeColor(i);
  }

  handleMouseUp(i) {
    this.setState({isMouseDown: false});
  }

  handleMouseMove(i) {
    if (this.state.isMouseDown) {
      this.changeColor(i);
    }
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

  render() {
    return (
      <div className="container">
        <div className="navbar .form-inline bg-dark justify-content-between text-white my-1 mx-n3 rounded">
          <div className="col">
            <span className="navbar-brand mb-0 ml-n3 h1 font-weight-bold text-white">
              <a
                href="#"
                className="text-reset"
              >
                Pixel Drawing App
              </a>
            </span>
          </div>
          <button
            className="btn btn-outline-secondary mx-3 text-white"
            id="about-app-btn"
            onClick={() => {
              alert("Pixel Drawing App allows you to create pictures by filling pixels (squares on the board below) with color. All you need is to pick the color from  color picker and then click on any pixel on the board to fill it with the color. If you want to color bigger area, click at any pixel and then drag the mouse while it is pressed above pixels you want to fill with color. Enjoy!");
            }}
          >About app</button>
          <a target="_blank" href="https://en.wikipedia.org/wiki/Pixel_art" className="btn btn-outline-secondary mx-3 text-white text-reset">More about pixel art</a>
        </div>
        <div className="row">
          <div className="col"></div>
          <div className="col">
            <div className="app">
              <p className="text-center mt-3">
                Pick color:
                <input
                  type="color"
                  onChange={this.setColor.bind(this)}
                  className="ml-3"
                />
              </p>
              <Canvas color={this.state.color} />
            </div>
          </div>
          <div className="col"></div>
        </div>
        <div className="fixed-bottom text-center">
          <p>designed and programmed by Vadim Gierko | 2021</p>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById("root")
);
