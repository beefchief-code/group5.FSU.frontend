import { createBrowserRouter } from "react-router-dom";
import Root from "./src/layout/Root";
import Home from "./src/features/home/Home";
import Departments from "./src/features/departments/Departments";
import Auth from "./src/features/auth/Auth";
import Department from "./src/features/departments/Department";
import Professors from "./src/features/professors/Professors";
import Professor from "./src/features/professors/Professor";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            { index: true, element: <Home /> },
            { path: "/login", element: <Auth /> },
            { path: "/departments", element: <Departments /> },
            { path: "/departments/:id", element: <Department /> },
            { path: "/professors", element: <Professors /> },
            { path: "/professors/:id", element: <Professor /> },
        ],
    },
]);

export default router;