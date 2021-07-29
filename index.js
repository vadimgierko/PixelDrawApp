//=== !!! all saved pictures will be saved in local storage - they will be pushed in "pixel-pictures" item !!! ===//

// if you want to clear storage for this app (all saved pictures) uncomment the code below:
//window.localStorage.removeItem("pixel-pictures");

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
    const pixels = this.state.pixels.slice();
    pixels[i] = this.state.color;
    this.setState({pixels: pixels});
  }
  setColor(e) {
    const color = e.target.value;
    this.setState({color: color});
  }
  save() {
    const pictureName = prompt("Input the name for your picture. It will be saved in your browser under this name.");
    const savedPicture = this.state.pixels.slice();
    if (window.localStorage.getItem("pixel-pictures")) {
      const savedPixelPictures = JSON.parse(window.localStorage.getItem("pixel-pictures")); // return an array with objects inside
      savedPixelPictures.push({name: pictureName, pixels: savedPicture});
      window.localStorage.setItem("pixel-pictures", JSON.stringify(savedPixelPictures));
    } else {
      window.localStorage.setItem("pixel-pictures", JSON.stringify([{name: pictureName, pixels: savedPicture}]));
    }
    alert("You saved a new pixel picture: " + pictureName + "! If you want to open it in the future, press open button and input the name.");
  }
  open() {
    if (window.localStorage.getItem("pixel-pictures")) {
      // check the names of saved pixel pictures in storage:
      let savedPixelPicturesNames = [];
      const savedPixelPictures = JSON.parse(window.localStorage.getItem("pixel-pictures")); // return an array with objects inside
      for (let i = 0; i < savedPixelPictures.length; i++) {
        let savedPictureName = savedPixelPictures[i].name;
        savedPixelPicturesNames.push(savedPictureName);
      }
      // ask for name:
      let inputedPictureName = prompt(`Input the name of your saved picture. There are the names of saved pixel pictures in your storage: ${savedPixelPicturesNames}.`);
      // search the picture by filtering names:
      if (inputedPictureName) {
        for (let i = 0; i < savedPixelPictures.length; i++) {
          let savedPictureName = savedPixelPictures[i].name;
          if (savedPictureName === inputedPictureName) {
            this.setState({pixels: savedPixelPictures[i].pixels});
          }
        }
      } else {
        alert("You need to input some saved picture name... or nothing will be opened...");
      }
    } else {
      alert("There is no saved pixel pictures yet... Create a new one, save it and then try to open it ;-)");
    }
  }
  showTemplatePicture() {
    this.setState({pixels: templatePicture});
  }
  render() {
    const pixels = this.state.pixels.slice();
    let rows = [];
    
    for (let r = 0; r < 40; r++) {
      rows[r] = [];
      for (let i = 0; i < 40; i++) {
        rows[r].push(pixels[i + r*40]);
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
          >Save <i className="bi bi-bookmark"></i></button>
          <button
            className="btn btn-outline-secondary mx-3 text-white"
            onClick={() => this.open()}
          >Open <i className="bi bi-folder2-open"></i></button>
          <button
            className="btn btn-outline-secondary mx-3 text-white"
            onClick={() => this.showTemplatePicture()}
          >Show template <i className="bi bi-image"></i></button>
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
              <table className="pixels">
                <tbody>
                  {rows.map((row, r) => (
                    <tr>
                      {row.map((pixel, i) => this.renderPixel(i + r*40))}
                    </tr>
                  ))}
                </tbody>
              </table>
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
