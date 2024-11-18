import './App.css';
import { store } from "./actions/store";
import { Provider} from "react-redux";
import DCandidates from './components/DCandidates';
import { Container } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Provider store={store}>
        <Container maxWidth = "lg">
          <DCandidates/>
        </Container>
        <ToastContainer
        position="top-right"
        autoClose={5000} 
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Provider>
  );
}

export default App;
