
import './App.css';
import { Route , Routes } from 'react-router-dom';

import Layout from "./Pages/Layout/Layout";
import HomePage from './Pages/HomePage/HomePage';
import Products from './Pages/Products/Products';
import AddItems from './Pages/AddItems/AddItems';
import CheckOut from './Pages/CheckOut/CheckOut';

import { DataProvider } from './Context/useDataProvider';

function App() {
  return (
    <div className="App">
      <DataProvider>
        <Routes>
          <Route path='/' element={<Layout />} >
            <Route index path="/home" element={<HomePage />}></Route>
            <Route path="/products" element={<Products />} >
            </Route>
            <Route path="/additems" element={<AddItems />} />
          </Route>
          <Route path="/check" element={<CheckOut />}></Route> 
        </Routes>
      </DataProvider>
    </div>
  );
}

export default App;
