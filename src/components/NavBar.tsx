import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import {
  AnimatePresence, motion,
  useMotionValueEvent,
  useScroll,
} from 'framer-motion';
import { Menu } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { NavItemsLinks } from "../constants/NavItemsLinks.js";
import useAuthenticalUser from '../hooks/Authentication.js';
import useMousePosition from '../hooks/mouse-hooks/useMouseHook.js';
import useGetLoginUser from '../utils/getLogInUser.js';
import AnimatedLinks from './Links/AnimatedLinks.js';
import NavItem from './NavItem.js';
import Theme from './Theme.js';
import SpringModal from './modals/MainModal.js';
import { Button } from './ui/button.js';
import Cursor from './ui/cursor.js';

const NavBar = () => {
  const { logOut } = useAuthenticalUser()

  const user = useGetLoginUser()
  const [isOpen, setIsOpen] = useState(false);
  const navbarRef = useRef<any>()
  const { x, y } = useMousePosition({ ref: navbarRef });
  const { scrollYProgress } = useScroll();

  const [visible, setVisible] = useState(true);
  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        // setVisible(false);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <>
      {/* smaller screens menu here  */}
      <SpringModal
        isOpen={isOpen} setIsOpen={setIsOpen} >

        {user ? <Link to={"/dashboard/profile"} className='mb-6 block'>
          <Avatar className=''>
            <AvatarImage className='rounded-full size-24 mx-auto' src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p className='font-medium mb-2 text-xl text-center mt-2'>{user.email}</p>
        </Link> : null}
        <div
          className=' space-y-2 relative'>
          {
            NavItemsLinks.map((item, idx) => {
              if (user == null && item.name.toLocaleLowerCase() == "dashboard") return
              return (<NavItem
                {...item}
                key={idx}
                index={idx}
              />)
            }
            )
          }
        </div>

        <div className='grid  my-4 space-y-2'>
          {!user && <>
            <Button asChild className='bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500'
              onClick={() => setIsOpen(false)}
            >


              <Link
                to='/home/auth/register'
                className='text-xs'
              >
                Create Account
              </Link>
            </Button>
            <Button asChild className='relative'
              onClick={() => setIsOpen(false)}

            >
              <Link
                to='/home/auth'
                className='text-xs'
              >
                Login
              </Link>
            </Button>
          </>}
        </div>

      </SpringModal>

      <AnimatePresence mode='wait'>
        <motion.div
          initial={{
            opacity: 1,
            y: -100,
          }}
          animate={{
            y: visible ? 0 : -100,
            opacity: visible ? 1 : 0,
          }}
          transition={{
            duration: 0.2,
          }}

          className='flex overflow-hidden  items-center h-14  sticky top-0 cursor-none w-full z-50  bg-white  dark:bg-black dark:text-white'>
          <div ref={navbarRef} className='w-full
            
              '>
            <Cursor
              {...{ x, y }}
            />




            <div
              className=' py-4   px-2 shadow-sm border '

            >
              <div className='flex justify-between sm:container mx-auto items-center'>
                <AnimatedLinks
                  to='/home'
                  text={import.meta.env.VITE_APP_NAME || ''}
                />
                <div className=' space-x-4 hidden lg:flex'>
                  {
                    NavItemsLinks.map(linkItem => {
                      const { icon, name, link }: typeof NavItemsLinks[number] = linkItem
                      if (user == null && name.toLocaleLowerCase() == "dashboard") return
                      return (
                        <div>
                          <AnimatedLinks
                            className='text-[1rem] font-normal text-blue-600'
                            to={link}
                            secondTextClassName='text-black'
                          >
                            {name}
                          </AnimatedLinks>
                        </div>
                      )
                    })
                  }
                </div>

                <div className='p-1 cursor-pointer lg:hidden flex items-center space-x-2  transition-all duration-500 rounded-sm hover:rounded-none'>

                  <Theme
                    className='size-4'
                    containerClassName='w-14'
                  />
                  <Menu
                    onClick={() => setIsOpen(true)}

                    size={25} />
                </div>
                <div
                  className='lg:flex items-center  space-x-2 hidden '
                >



                  {
                    !user ? <>
                      <Button asChild className='bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500'>
                        <Link
                          to='/home/auth/register'
                          className='text-xs'
                        >
                          Create Acount
                        </Link>
                      </Button>
                      <Button asChild className='relative'>
                        <Link
                          to='/home/auth'
                          className='text-xs'
                        >
                          Login
                        </Link>
                      </Button>
                    </> : <>
                      <Link to={"/dashboard/profile"}
                        className='p-1 hover:ring-2
      size-[2.5rem] rounded-full grid place-items-center
      bg-slate-400/15 hover:bg-slate-400/25
      transition-all duration-500 '>
                        <Avatar className='rounded-full'>
                          <AvatarImage className='rounded-full' src="https://github.com/shadcn.png" alt="@shadcn" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                      </Link>
                      <Button
                        variant='destructive'
                        onClick={() => logOut()}
                      >logout</Button>
                    </>

                  }
                  <Theme
                    className='size-6'
                    containerClassName='flex-none w-16'
                  />

                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>



    </>


  )
}

export default NavBar