const style = {
  backgroundColor: "blue",
  width: "20px",
  height: "20px",
  border: "1px solid white"
};

function Pixel(props) {
  return (
    <td style={style}>{props.value}</td>
  );
}

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pixels: Array(10).fill(null),
    }
  }
  
  render() {
    console.log(this.state.pixels);
    const pixels = this.state.pixels.map(pixel => <td style={style}></td>);
    return (
      <div className="pixels">
        {pixels}
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div className="canvas">
        <Canvas />
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById("root")
);
