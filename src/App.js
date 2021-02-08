import { Component } from "react";
import CharacterList from "./components/character-list";
import "./App.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      characterList: [],
      nextUrl: "https://rickandmortyapi.com/api/character/?page=1",
    };
  }

  getCharacters() {
    const { nextUrl } = this.state;
    const { characterList } = this.state;
    fetch(nextUrl)
      .then((res) => res.json())
      .then((body) => {
        this.setState({
          characterList: [...characterList, ...body.results],
          nextUrl: body.info.next,
        });
        //this.setState({ characterList: body.results, nextUrl: body.info.next });
      });
  }

  componentDidMount() {
    const { nextUrl } = this.state;
    this.getCharacters(nextUrl);
  }
  componentDidUpdate() {
    const { nextUrl } = this.state;
    this.getCharacters(nextUrl);
  }

  render() {
    const { characterList } = this.state;
    return (
      <>
        <div className="App">
          <header className="App-header">
            <CharacterList list={characterList} />
          </header>
        </div>
      </>
    );
  }
}
