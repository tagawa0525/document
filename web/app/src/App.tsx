import React from 'react';

import './App.css';
import UserPage from './users/UserPage';
import PositionPage from './positions/PositionPage';

class App extends React.Component<{}, {
}> {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <UserPage />
        <br></br>
        <br></br>
        <PositionPage />
      </div>
    );
  }
}

export default App;
