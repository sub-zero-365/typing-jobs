import React, { Suspense } from 'react'
import './App.css'
// import { QueryClient } from '@tanstack/react-query'

import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import axios from 'axios'
import { Provider } from 'react-redux'
import {
  createBrowserRouter,
  Link,
  RouterProvider
} from 'react-router-dom'
import AuthLayout from './components/AuthLayout.js'
import { RootElement } from './components/index.js'
import { action as loginAction, loader as loginLoader } from './pages/Auth/Login.js'
import { Login, Register } from "./pages/Auth"
// import Register, { action as registerAction } from './pages/Auth/Register.js'
import { Home, TrackingPage, } from './pages/index.js'
import Dashboard, { loader as dashboardLoader } from './pages/ProtectedRoute/Dashboard.js'
import DashBoardHome from './pages/ProtectedRoute/DashBoardHome.js'
import NewLogistics from './pages/ProtectedRoute/NewTasks.js'
import AllLogisticsPage from './pages/ProtectedRoute/AllTasksPage.js'
import UpdateUserProfile from './pages/ProtectedRoute/UpdateUserProfile.js'
import Users, { loader as userLoader } from './pages/ProtectedRoute/Users.js'
import UserProfilePage from './pages/ProtectedRoute/UserProfilePage.js'
import { loader as TrackingLoader } from "./pages/TrackingPage.js"
import { loader as allLogisticsLoader } from "./pages/ProtectedRoute/AllTasksPage.js"
import { store } from './store/store.js'
import * as SingleUser from './pages/ProtectedRoute/SingleUser.js'
import * as SingleTaskPage from './pages/ProtectedRoute/SingleTaskPage.js'
import { action as newLogisticAction } from "./pages/ProtectedRoute/NewTasks.js"
import SingleLogisticPage, { loader as singleLogisticPageLoader } from './pages/SingleLogisticPage.js'
import NotFoundPage from './pages/ProtectedRoute/404Page.js'
import Contact from './pages/Contact.js'
import About from './pages/About.js'
import EditedTaskHistory from './pages/ProtectedRoute/EditedTaskHistory.js'
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();
axios.defaults.withCredentials = true;
const queryClient = new QueryClient({
  defaultOptions: {
    // queries: {
    //   refetchOnMount: false
    // },
    mutations: {}
  }
})

// import { Home } from 'lucide-react'

const router = createBrowserRouter([
  {
    path: "/home",
    element: <RootElement />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'contact-us',
        element: <Contact />
      }
      ,
      {
        path: 'about-us',
        element: <About />
      }
      ,
      {
        path: "auth",
        element: <AuthLayout />,
        children: [
          {
            index: true,
            // path: "login",
            element: <Suspense fallback={<div>loading ... </div>}>
              <Login /></Suspense>,
            action: loginAction(queryClient),
            loader: loginLoader
          },
          {
            path: "register",
            element: <Suspense fallback={<div>loading ... </div>}>
              <Register /></Suspense>,
            action: loginAction(queryClient),
            loader: loginLoader
          },


        ]
      }, {
        path: "tracking",
        element: <TrackingPage />,
        loader: TrackingLoader(queryClient),
        errorElement: <div>oops something went wrong</div>
      }
    ]

  },
  {
    path: "/",
    element: <Dashboard />,
    loader: dashboardLoader(queryClient),
    errorElement: <div>something went wrong</div>,
    children: [
      {
        index: true,
        element: <DashBoardHome />,
        // loader: userLoader(queryClient)
      },
      {
        // index: true,
        path: "users",
        element: <Users />,
        loader: userLoader(queryClient)
      },
      {

        path: "task/:taskId",
        element: <SingleTaskPage.default />,
        loader: SingleTaskPage.loader,
        children: [

          { element: <EditedTaskHistory />, index: true },
          { element: <div>later</div>, path:'later'},
        ]
      },
      {

        path: "user/:userId",
        element: <SingleUser.default />,
        loader: SingleUser.loader(queryClient)
      },
      {
        path: "newlogistic",
        element: <NewLogistics />,
        action: newLogisticAction(queryClient)
      },
      {
        path: "logistics",
        element: <AllLogisticsPage />,
        loader: allLogisticsLoader(queryClient)
      },
      {
        path: "logistic/:tracking_number",
        element: <SingleLogisticPage />,
        loader: singleLogisticPageLoader(queryClient)
      },
      {
        path: "profile",
        element: <UserProfilePage />,
        children: [
          {
            index: true,
            element: <UpdateUserProfile />
          },
          {
            path: "users1",
            element: <div>user1 details page</div>
          },
        ]
      },

    ]
  },


  {
    path: "*",
    element: <NotFoundPage />
  }
])


function App() {
  // const queryClient=useq
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
      
        <RouterProvider
          router={router}
        ></RouterProvider>
      </QueryClientProvider>
    </Provider>

  )
}

export default App
