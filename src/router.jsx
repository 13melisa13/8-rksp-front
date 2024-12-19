import { createBrowserRouter, Navigate } from 'react-router-dom'
import Layout from './Layout.jsx'
import * as React from 'react'
import Login from "./Login.jsx"
import Portfolio from "./Investments/Portfolio.jsx";
import GameJams from "./GameJams/GameJams.jsx"

import Register from "./Register.jsx";
import Stocks from "./Investments/Stocks.jsx";
import Index from "./Index.jsx";
import Profile from "./GameJams/Profile.jsx";


export const router = createBrowserRouter(
	[
		{
			path: '*',
			element: <Navigate to={'/'}/>

		},
		{
			path: '/',
			element: <Layout />,
			children: [
				{
					index: true,
					element: <Index/>

				},
				{
					path: '/login',
					element: <Login/>
				},
				{
					path: '/register',
					element: <Register/>
				},
			]
		},

		{
			path: '/investments',
			element: <Layout />,
			children: [
				{
					path: 'portfolio',
                    element: <Portfolio/>

				},
				{
                    index: true,
                    element: <Stocks/>
				},

				]},
            {
            			path: '/gamejams',
            			element: <Layout />,
            			children: [
            				{
            					path: 'profile',
                                element: <Profile/>

            				},
            				{
                                index: true,
                                element: <GameJams/>
            				},

            				]}
	],
	{
		future: {
			v7_relativeSplatPath: true,
			v7_fetcherPersist: true,
			v7_normalizeFormMethod: true,
			v7_partialHydration: true,
			v7_skipActionErrorRevalidation: true,
		},
	}
)
