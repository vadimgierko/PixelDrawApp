function Pixel(props) {
  return (
    <td className="pixel" style={props.style} onClick={props.onClick} ></td>
  );
}

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pixels: Array(10).fill(Array(10).fill(null)),
    }
  }
  
  render() {
    console.log(this.state.pixels);
    const pixels = this.state.pixels.map((row, i) =>
                                         <tr key={i} >
                                           {row.map((pixel, i) =>
                                                    <Pixel
                                                      key={i}
                                                      style={{backgroundColor: "red"}}
                                                     />
                                                   )}
                                         </tr>
                                        );
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
