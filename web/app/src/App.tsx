import React from 'react';

import './App.css';
import UserPage from './users/UserPage';

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
      </div>
    );
  }
}

export default App;
