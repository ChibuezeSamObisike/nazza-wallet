import AppRouter from "routes/Router";
import UserProvider from "contexts/UserProvider";

function App() {
  return (
    <div className='App'>
      <UserProvider>
        <AppRouter />
      </UserProvider>
    </div>
  );
}

export default App;
