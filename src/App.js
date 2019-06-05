import React from 'react';
import FlexSearch from 'flexsearch';
import TorrentSearch from './components/torrentSearch';
import ResultList from './components/resultList';
import Header from './components/header';
import Divider from '@material-ui/core/Divider';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Message from './components/message';
import './App.css';

var index = new FlexSearch({
  encode: "balance",
  tokenize: "strict",
  threshold: 0,
  resolution: 3,
  depth: 4,
  async: true,
  doc: {
    id: "id",
    field: [
      "title",
      "date"
    ]
  }
});

var doc1 = {
    id: 1,
    title: "Game of Thrones season 1 episode 3",
    url: "magnet:?xt=bla",
    date: new Date("2019-06-05 00:00:00")
}

var doc2 = {
    id: 2,
    title: "Game of Thrones season 8 ep 5",
    url: "magnet:?xt=blb",
    date: new Date("2019-05-29 00:00:00")

}

var doc3 = {
  id: 3,
  title: "Game of Thrones season 8 episode 5",
  url: "magnet:?xt=bla",
  date: new Date("2019-05-30 00:00:00")

}

index.add([doc1, doc2, doc3]);

const dateUntil = new Date();
dateUntil.setHours(0, 0, 0, 0);

const dateMinusSeven = new Date();
dateMinusSeven.setDate(dateMinusSeven.getDate()-6);
dateMinusSeven.setHours(0, 0, 0, 0);

const initialState = {
  search: '',
  results: [],
  limit: 100,
  dateFrom: null,
  dateUntil: dateUntil
}

class App extends React.Component {
  constructor() {
    super();
    this.state = initialState;
  }

  onSearchChange = (event) => {
    this.setState({ 
      search: event.target.value
    }, () => {if (this.state.search === '')
    {
      this.setState({
        results: []
      })
    }});
  }

  onSubmitSearch = () => {
    const searchQuery = {
      field: "title",
      query: this.state.search,
      suggest: true,
      limit: this.state.limit
    }

    if(this.state.dateFrom !== null){
      searchQuery.where = (item) => {
        return item.date >= this.state.dateFrom 
        && item.date <= this.state.dateUntil
      };
    }
    else {
      searchQuery.where = (item) => {
        return item.date <= this.state.dateUntil
      };
    }

    index.search(searchQuery)
    .then((results) => {
      var resultsByDate = results.sort( (a, b) => {
        a = new Date(a.date);
        b = new Date(b.date);
        return a>b ? -1 : a<b ? 1 : 0;
      });

      this.setState({ results: resultsByDate });
    });
  }

  onKeyPress = (event) => {
      if(event.key === 'Enter'){
          this.onSubmitSearch();
      }
  }

  onDateChangeFrom = (dateValueFrom) => {
    if (dateValueFrom != null)
    {
      dateValueFrom.setHours(0,0,0,0);
    }

    this.setState({
      dateFrom: dateValueFrom
    })
  }

  onDateChangeUntil = (dateValueUntil) => {
    if (dateValueUntil != null)
    {
      dateValueUntil.setHours(0,0,0,0);
    }

    this.setState({
      dateUntil: dateValueUntil
    })
  }

  onClickSevenDays = () => {
    this.setState({
      dateUntil: dateUntil,
      dateFrom: dateMinusSeven
    })
  }

  render() {
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <main role="main" className='App'>
          <Header/>
          <TorrentSearch 
            className='center'
            onSearchChange={this.onSearchChange} 
            onSubmitSearch={this.onSubmitSearch} 
            onKeyPress={this.onKeyPress}
            onDateChangeFrom={this.onDateChangeFrom}
            dateValueFrom={this.state.dateFrom}
            onDateChangeUntil={this.onDateChangeUntil}
            dateValueUntil={this.state.dateUntil}
            onClickSevenDays={this.onClickSevenDays}
          />
          <Divider variant="middle" />
          <br />
          { this.state.results.length === 0 ?
          <Message />
          :
          <ResultList 
            results={this.state.results}
          />
          }
        </main>
      </MuiPickersUtilsProvider>
    );
  }
}

export default App;
