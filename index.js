//=== !!! all saved pictures will be saved in local storage - they will be pushed in "pixel-pictures" item !!! ===//

// if you want to clear storage for this app (all saved pictures) uncomment the code below:
//window.localStorage.removeItem("pixel-pictures");
//console.log(window.localStorage.getItem("pixel-pictures"));

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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pixels: Array(1600).fill(null),
      isMouseDown: false,
      color: "",
      name: "",
    }
  }
  renderPixel(i) {
    return (
      <Pixel
        id={i}
        key={`pixel-${i}`}
        style={{ backgroundColor: this.state.pixels[i] }}
        onMouseDown={() => this.handleMouseDown(i)}
        onMouseMove={() => this.handleMouseMove(i)}
        onMouseUp={() => this.handleMouseUp(i)}
      />
    );
  }
  handleMouseDown(i) {
    this.setState({ isMouseDown: true });
    this.changeColor(i);
  }
  handleMouseUp(i) {
    this.setState({ isMouseDown: false });
  }
  handleMouseMove(i) {
    if (this.state.isMouseDown) {
      this.changeColor(i);
    }
  }
  changeColor(i) {
    const pixels = this.state.pixels.slice();
    pixels[i] = this.state.color;
    this.setState({ pixels: pixels });
  }
  setColor(e) {
    const color = e.target.value;
    this.setState({ color: color });
  }
  getSavedPictures() {
    return JSON.parse(localStorage.getItem("pixel-pictures")) || [];
  }
  save() {
    const savedPixelPictures = this.getSavedPictures();

    // NEW picture
    if (!this.state.name) {
      const pictureName = prompt(
        "Input the name for your picture. It will be saved in your browser under this name."
      );

      if (!pictureName) return;

      const exists = savedPixelPictures.some(p => p.name === pictureName);
      if (exists) {
        alert("A picture with this name already exists.");
        return;
      }

      const savedPicture = {
        name: pictureName,
        pixels: this.state.pixels.slice()
      };

      savedPixelPictures.push(savedPicture);
      localStorage.setItem("pixel-pictures", JSON.stringify(savedPixelPictures));
      this.setState({ name: pictureName });

      alert(`You saved a new pixel picture: ${pictureName}!`);
      return;
    }

    // UPDATE existing picture
    for (let i = 0; i < savedPixelPictures.length; i++) {
      if (savedPixelPictures[i].name === this.state.name) {
        savedPixelPictures[i].pixels = this.state.pixels.slice();
        localStorage.setItem("pixel-pictures", JSON.stringify(savedPixelPictures));
        break;
      }
    }
  }

  new() {
    const needSave = confirm("Do you want to save changes to the current picture?");
    if (needSave) {
      this.save();
    }

    this.setState({
      pixels: Array(1600).fill(null),
      isMouseDown: false,
      color: "",
      name: "",
    });
  }

  open() {
    const needSave = confirm("Do you want to save changes to the current picture?");
    if (needSave) {
      this.save();
    }

    const savedPixelPictures = this.getSavedPictures();
    if (!savedPixelPictures.length) {
      alert("There is no saved pixel pictures yet...");
      return;
    }

    const names = savedPixelPictures.map(p => p.name);
    const inputedPictureName = prompt(
      `Input the name of your saved picture. Available: ${names.join(", ")}`
    );

    if (!inputedPictureName) return;

    const picture = savedPixelPictures.find(p => p.name === inputedPictureName);
    if (!picture) {
      alert("No picture with this name found.");
      return;
    }

    this.setState({
      name: picture.name,
      pixels: picture.pixels.slice()
    });
  }

  showTemplatePicture() {
    this.setState({ pixels: templatePicture, name: "" });
  }
  render() {
    const pixels = this.state.pixels.slice();
    const rows = [];

    for (let r = 0; r < 40; r++) {
      rows[r] = [];
      for (let i = 0; i < 40; i++) {
        rows[r].push(pixels[i + r * 40]);
      }
    }

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
            onClick={() => this.save()}
          >Save <i className="bi bi-bookmark"></i>
          </button>
          <button
            className="btn btn-outline-secondary mx-3 text-white"
            onClick={() => this.open()}
          >Open <i className="bi bi-folder2-open"></i></button>
          <button
            className="btn btn-outline-secondary mx-3 text-white"
            onClick={() => this.new()}
          >New <i className="bi bi-image"></i></button>
          <button
            className="btn btn-outline-secondary mx-3 text-white"
            onClick={() => this.showTemplatePicture()}
          >Show template</button>
          <button
            className="btn btn-outline-secondary mx-3 text-white"
            id="about-app-btn"
            onClick={() => {
              alert("Pixel Drawing App is the old app of mine which allows you to create pictures by filling pixels (squares on the board below) with color. All you need is to pick the color from  color picker and then click on any pixel on the board to fill it with the color. If you want to color bigger area, click at any pixel and then drag the mouse while it is pressed above pixels you want to fill with color. Enjoy!");
            }}
          >About</button>
          <a target="_blank" href="https://en.wikipedia.org/wiki/Pixel_art" className="btn btn-outline-secondary mx-3 text-white text-reset">More about pixel art</a>
        </div>
        <div className="row">
          <div className="col"></div>
          <div className="col">
            <div className="app">
              {this.state.name && <h1 className="text-center">{this.state.name}</h1>}
              <p className="text-center mt-3">
                Pick color:
                <input
                  type="color"
                  onChange={this.setColor.bind(this)}
                  className="ml-3"
                />
              </p>
              <table className="pixels">
                <tbody>
                  {rows.map((row, r) => (
                    <tr key={`row-${r}`}>
                      {row.map((pixel, i) => this.renderPixel(i + r * 40))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col"></div>
        </div>
        <div className="fixed-bottom text-center">
          <p>&copy; 2021 <a href="" target="_blank">Vadim Gierko</a></p>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById("root")
);
