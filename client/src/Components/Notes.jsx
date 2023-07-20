import React from 'react'
import Header from "./notes/Nav"
import CreateNote from './notes/CreateNote'
import Home from './notes/Home'
import EditNote from './notes/EditNote'
import {BrowserRouter as Router , Route, Routes} from 'react-router-dom'
import SearchBar from './SearchBar'




const Notes = ({setIsLogin}) => {
  return (
    <Router>
        <div className='notes-page'>
       <Header setIsLogin={setIsLogin} />
    <SearchBar/>
       <section>
        <Routes>
        <Route path='/'  exact element={<Home/>}/>
         <Route path='/create'  exact element={<CreateNote/>} />
         <Route path='/edit/:id'  exact element={<EditNote/>} />
        </Routes>
       </section>
       
        </div>
    </Router>
  )
}

export default Notes