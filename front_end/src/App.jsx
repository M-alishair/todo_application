import ContextApp from "./Context/ContextApp";
import MainComponent from "./components/MainComponent";
import { ThemeProvider } from "@material-tailwind/react";

function App() {
  return (
    <>
      <ThemeProvider>
        <ContextApp>
          <MainComponent />
        </ContextApp>
      </ThemeProvider>
    </>
  );
}

export default App;
