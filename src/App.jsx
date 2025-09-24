import { useEffect, useContext } from "react";
import './App.css'
import Routing from './Components/Routing/Routing'
import { DataContext } from './Components/DataProvider/DataContext'
import { Type } from './Utility/action.type'
import {auth} from './Utility/firebase'

function App() {
const [{user},dispatch]=useContext(DataContext)
console.log(user)
useEffect( ()=>{
auth.onAuthStateChanged((authUser)=>{
if (authUser){
  dispatch({
    type:Type.SET_USER,
    user:authUser
  })
}else{
   dispatch({
     type: Type.SET_USER,
     user: null,
   });
}



})


},[])




  return (
    <>
      <Routing />
      
    </>
  )
}

export default App
