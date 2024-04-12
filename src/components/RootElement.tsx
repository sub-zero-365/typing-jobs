import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import NavBar from './NavBar.js'
import { Toaster } from './ui/toaster.js'
// import { createContext } from 'vm'
import useAuthenticalUser from '../hooks/Authentication.js'
import Footer from './Footer.js'
import { AnimatePresence, motion } from 'framer-motion'
import { pageAnimationVariants, pageAnimationVariantsTransiton } from '../utils/framervariants.js'



const RootElement = () => {

  const { loginUser } = useAuthenticalUser()
  useEffect(() => {
    loginUser();
  }, [])

  const { pathname } = useLocation()
  return (

    <>
      <NavBar>
      </NavBar>
      <AnimatePresence mode='wait' initial>
        <motion.div
          initial='initial'
          animate='animate'
          exit='exit'
          variants={pageAnimationVariants}
          transition={pageAnimationVariantsTransiton}
          key={pathname}
        >
          <Outlet />
          <Footer />
        </motion.div>
      </AnimatePresence>

      <Toaster />
    </>


  )
}

export default RootElement