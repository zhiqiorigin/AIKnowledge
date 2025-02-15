import { BrowserRouter } from 'react-router-dom';
import Router from './routers';
import styles from './App.module.scss'


const App = () => {
  return (
    <div className={styles.appContainer}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  );
};

export default App;
