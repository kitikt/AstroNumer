
import DefaultLayout from "./layouts/DefaultLayout";
function App() {
  return (
    <>
      <div style={{ backgroundImage: `url(/images/background.png)`, backgroundSize: 'cover', minHeight: '100vh', position: 'relative' }}>
        <DefaultLayout />

      </div>
    </>

  );
}

export default App;