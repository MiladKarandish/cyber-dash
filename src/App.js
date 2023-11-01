import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes/index';
import Header from './components/header/Header2';
import 'react-toastify/dist/ReactToastify.css';
import './styles/app.scss';
import { ToastContainer } from 'react-toastify';
import MintContextProvider from './contexts/autoMintContext';
import SnipeContextProvider from './contexts/snipeContext';
import BulkContextProvider from './contexts/bulkContext';
import Footer from './components/footer/Footer2';

const App = () => {
  return (
    <div className="App">
      <Router>
        <MintContextProvider>
          <SnipeContextProvider>
            <BulkContextProvider>
              <Header />
              <Routes />
            </BulkContextProvider>
          </SnipeContextProvider>
        </MintContextProvider>
      </Router>

      <Footer />

      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default App;
