import "./App.css";
import Form from "./components/Form";
import Table from "./components/Table";
import DarkMode from "./ui/DarkMode";

function App() {
  return (
    <>
      <DarkMode />
      <div className="container">
        <div className="card m-0 mt-3 m-md-3 m-lg-4">
          <div className="card-head">
            <Form />
          </div>
          <div className="card-body">
            <Table />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
