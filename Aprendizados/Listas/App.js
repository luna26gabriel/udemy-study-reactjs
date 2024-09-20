import React, { Component } from 'react';
import Feed from './components/Feed';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      feed: [
        {id: 1, username: 'Luna', likes: 10, comments: 23},
        {id: 2, username: 'Ana', likes: 17347340, comments: 230000},
        {id: 3, username: 'Batata', likes: 1000, comments: 230},
        {id: 4, username: 'Lupi', likes: 1, comments: 0}
      ]
    }
  }

  render() {
    return (
      <div>
        {this.state.feed.map((item)=>{
          return(
            <Feed id={item.id} username={item.username} likes={item.likes} comments={item.comments}/>
          )
        })}
      </div>
    )
  }
}

export default App