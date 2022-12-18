
import "../src/App.css";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from "./pages/home";
import Image from "./pages/image";


function App() {
    const router = createBrowserRouter([
        {
          path: "/",
          element: (<Home/>
          ),
        },
        {
          path: "/:id",
          element: <Image/>,
        },
      ]);
    return (
        <RouterProvider router={router}/>
    )
}

export default App;
