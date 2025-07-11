
import { useState } from 'react';
import './App.css';
import Pagination from './components/common/pagination/Pagination';

function App() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
   
    <Pagination
    currentPage={currentPage}
    totalPages={12}
    onPageChange={setCurrentPage}
   
  />
   
    // <Header />
  )
}

export default App;
