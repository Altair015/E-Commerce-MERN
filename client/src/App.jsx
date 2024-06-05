import './App.css';
import MyCard from './components/MyCard';
import MyNavBar from './components/NavBar';

function App() {

  return (
    <>
      <MyNavBar />
      <div className="d-flex">
        <MyCard image="/images/purefood.webp" title="Cat Food" description="Good Cat Food" />
      </div>
    </>
  )
}

export default App;