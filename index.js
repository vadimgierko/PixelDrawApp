const style = {
  backgroundColor: "blue",
  width: "20px",
  height: "20px",
  border: "1px solid white"
};

function Pixel(props) {
  return (
    <td style={style}></td>
  );
}

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }
  render() {
    return (
      <div className="canvas">
        <Pixel />
        <Pixel />
        <Pixel />
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
