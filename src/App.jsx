import logo from './logo.svg';
import './App.css';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

// Exported unwrapped so tests can render it without a configured Amplify backend.
export function App({ signOut }) {
  return (
    <div className="App">
      <header>
        <img src={logo} className="App-logo" alt="logo" />
        <h1>We now have Auth!</h1>
      </header>
      <button type="button" onClick={signOut}>
        Sign out
      </button>
    </div>
  );
}

export default withAuthenticator(App);
