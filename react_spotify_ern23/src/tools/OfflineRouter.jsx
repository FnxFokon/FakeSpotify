import { createBrowserRouter } from "react-router-dom";
import HomeOffline from "../screens/Offline/HomeOffline";
import ErrorPage from "../screens/ErrorPage";
import Login from "../screens/Offline/Login";
import Registration from "../screens/Offline/Registration";

const OfflineRouter = createBrowserRouter([
    {
        element: (
            <>
                <HomeOffline />
            </>
        ),
        //on appelle la vue ErrorPage en cas de route inconnue ou d'erreur
        errorElement: <ErrorPage />,
        //ici on déclare nos routes
        children: [
            {
                path: "/",
                element: <Login/>,
            },
            {
                path: "/registration",
                element: <Registration/>,
            },
        ]
    }
])

export default OfflineRouter;