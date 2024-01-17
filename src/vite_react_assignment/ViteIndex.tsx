// import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ViteHome } from './ViteHome';
import { Login } from './Login';
import { LoginHome } from './LoginHome';
import { Component_1_JsonData } from './JSON_Data_Component1/Component_1_JsonData';

const router = createBrowserRouter([
    {
        path: "/",
        element: <ViteHome />,
        children: [{
            path: "/login",
            element: <Login />
        }]
    },
    {
        path: "/loginhomepage",
        element: <LoginHome />,
        children: [
            {
                path: "/loginhomepage/",
                element: <Component_1_JsonData />
            }
        ]
    }
])

export function ViteIndex() {
    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}