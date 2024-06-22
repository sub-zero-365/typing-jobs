import React, { Suspense, lazy } from 'react'
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
import { action as CreateInVoiceAction } from "./pages/DownLoadInvoice"
import NotFoundPage from './pages/ProtectedRoute/404Page.js'
import Contact from './pages/Contact.js'
import About from './pages/About.js'
import EditedTaskHistory from './pages/ProtectedRoute/EditedTaskHistory.js'
import { pdfjs } from 'react-pdf';
import SubmitDocLayout from './components/layout/SubmitDocLayout.js'
const OTPPage = lazy(() => import("./pages/OPTPage"))
const DownLoadInvoice = lazy(() => import("./pages/DownLoadInvoice"))
import Payment from './pages/Payment.js'
import DocPage from './pages/DocPage.js'
import UserInForPage from './pages/UserInForPage.jsx'
import Preview from './pages/Preview.js'
import { Toaster } from 'react-hot-toast';
import { Worker } from '@react-pdf-viewer/core';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import * as OTP from './pages/OPTPage'
import { ErrorElement } from './components/error/errorComponents.js'
import UpdatePdfFile, { action as updatePdfFileAction } from './pages/ProtectedRoute/UpdatePdfFile.js'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

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
            action: loginAction,
            loader: loginLoader
          },
          {
            path: "register",
            element: <Suspense fallback={<div>loading ... </div>}>
              <Register /></Suspense>,
            action: loginAction,
            loader: loginLoader
          },



        ]
      }, {
        path: "otp",
        element: <Suspense fallback={<div>loading ... </div>} >
          <OTPPage />
        </Suspense>,
        action: OTP.action
      },
      {
        path: "upload",
        element: <SubmitDocLayout />,
        errorElement: <ErrorElement />,
        children: [{
          index: true,
          element: <DocPage />,

        }
          ,
        {
          path: "payment",
          element: <Payment />,

        }
          ,
        {
          path: "user",
          element: <UserInForPage />,

        }
          ,
        {
          path: "preview",
          element: <Preview />,

        }
          ,
        {
          path: "invoice-download",
          element: <Suspense fallback={<div>loading ... </div>} >
            <DownLoadInvoice />
          </Suspense>
          ,
          action: CreateInVoiceAction

        }

        ]

      },

    ]

  },
  {
    path: "/",
    element: <Dashboard />,
    loader: dashboardLoader(queryClient),
    errorElement: <ErrorElement />,
    children: [
      {
        // path: "logistics",
        index: true,
        element: <AllLogisticsPage />,
        loader: allLogisticsLoader(queryClient),
        // id: "taskquery"

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
        loader: SingleTaskPage.loader(queryClient),
        id: "maintaskRouter",
        children: [

          { element: <EditedTaskHistory />, index: true },
          {
            element: <UpdatePdfFile />,
            path: 'later',
            action: updatePdfFileAction(queryClient),
            id: "adddetails"
          },
          {
            element: <div>pdf file here</div>,
            path: 'view-pdf',


          },
        ]
      },
      {

        path: "user/:userId",
        element: <SingleUser.default />,
        loader: SingleUser.loader(queryClient)
      },

      {
        path: "upload",
        element: <SubmitDocLayout />,
        errorElement: <ErrorElement />,

        children: [{
          index: true,
          element: <DocPage />,

        }
          ,
        {
          path: "payment",
          element: <Payment />,

        }
          ,
        {
          path: "user",
          element: <UserInForPage />,

        }
          ,
        {
          path: "preview",
          element: <Preview />,

        }
          ,
        {
          path: "invoice-download",
          element: <Suspense fallback={<div>loading ... </div>} >
            <DownLoadInvoice />
          </Suspense>
          ,
          action: CreateInVoiceAction
        }

        ]

      },
      {
        path: "logistics",
        element: <AllLogisticsPage />,
        loader: allLogisticsLoader(queryClient),
        id: "taskquery"

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
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
          <ReactQueryDevtools initialIsOpen={false} position='right' />
          <RouterProvider
            router={router}
          ></RouterProvider>
        </Worker>
      </QueryClientProvider>
      <Toaster />
    </Provider>

  )
}

export default App
