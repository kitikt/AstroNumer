
import ThemeProvider from "./context/ThemeContext";
import DefaultLayout from "./layouts/DefaultLayout";

function App() {
  return (
    <ThemeProvider>
      <DefaultLayout />
    </ThemeProvider>
  );
}

export default App;