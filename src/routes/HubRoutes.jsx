import { Routes, Route } from "react-router-dom"
import HubPage from "@/app/hub/page"
import Home from "@/app/hub/Home"




import ErrorPage from "@/components/ErrorPage";


function HubRoutes() {
    return (
        
        <Routes>
            <Route path="*" element={<ErrorPage/>}/>

            <Route path="/" element={<HubPage/>}>
            <Route index element={<Home />} />
            </Route>
        </Routes>

    )
}


export default HubRoutes