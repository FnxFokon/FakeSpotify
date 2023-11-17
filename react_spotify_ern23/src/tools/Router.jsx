import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../screens/ErrorPage";
import Home from "../screens/Home";
import Library from "../screens/Library";
import Search from "../screens/Search";
import Wishlist from "../screens/Wishlist";
import Detail from "../screens/Detail";
import Playlist from "../screens/Playlist";
import ArtistDetail from "../components/ArtistDetail";
import Account from "../screens/Account";
import AvatarList from "../components/Account/AvatarList";
import EditInfo from "../components/Account/EditInfo";
import Genre from "../screens/Genre";

const Router = createBrowserRouter([
    {
        element: (
            <>
                {/* on appelle l'élément que l'on souhaite afficher sur toutes nos vue */}
                <App />
            </>
        ),
        //on appelle la vue ErrorPage en cas de route inconnue
        errorElement: <ErrorPage />,
        //ici on déclare nos routes
        children: [
            {
                path: "/",
                element: <Home />,
                errorElement: <ErrorPage />,//optionnel pour renvoyer une erreur particulière dans une route
            },
            {
                path: "/library",
                element: <Library />,
            },
            {
                path: "/search",
                element: <Search />,
            },
            {
                path: "/wishlist",
                element: <Wishlist />,
            },
            {
                path: "/detail/:id",
                element: <Detail />,
            },
            {
                path: "/playlist",
                element: <Playlist />,
            },
            {
                path: "/artist-detail",
                element: <ArtistDetail />,
            },
            {
                //on passe un paramètre à la route
                path: "/account/:id",
                element: <Account />,
            },
            {
                path: "/edit/avatar",
                element: <AvatarList />,
            },
            {
                path: "/edit/info",
                element: <EditInfo />,
            },
            {
                path: "/genre/:name",
                element: <Genre />,
            },
        ]
    }
])

export default Router;