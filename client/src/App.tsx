import { HashRouter } from 'react-router-dom';
import Router from './routers';
import styles from './App.module.scss'

const App = () => {
  return (
    <div className={styles.appContainer}>
      <HashRouter>
        <Router />
      </HashRouter>
    </div>
  );
};

export default App;
