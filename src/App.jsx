import { Provider } from "react-redux"
import { RouterProvider } from 'react-router-dom'
import store from "./store/store";
import router from '../router'
import './App.css'

function App() {

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App
