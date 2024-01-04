import { Outlet } from "react-router-dom";
import NavBar from "../Shared/NavBar/NavBar";



export default function MasterLayout() {
  return (
    <>

      <NavBar/>

      <div className='d-flex'>

      

        <div className='w-100'>
            <div className='bgOutlet'>
                <Outlet/>
            </div>
        </div>

      </div>

    </>
  )
}
