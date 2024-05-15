import React from 'react'
import Heading from '../components/Heading'
import HandleGetFileFromStorage from '../components/HandleFilesUpload/HandleGetFileFromStorage'
import DisplayFile from '../components/HandleFilesUpload/DisplayFile'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../components/ui/dialog"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "../components/ui/drawer"
import { useMediaQuery } from 'react-responsive'
import { cn } from '../lib/utils'
import { Button } from '../components/ui/button'
import { DialogClose } from '@radix-ui/react-dialog'
import { Link } from 'react-router-dom'


const DocPage = () => {

    const isDesktop = useMediaQuery({ query: "(min-width: 768px)" })
    const buttonRef = React.useRef<any>(null)
    const [open, setOpen] = React.useState(false)
    React.useEffect(() => {
        if (buttonRef.current) {
            buttonRef.current.click()
        }
    }, [])

    function ProfileForm({ className }: React.ComponentProps<"form">) {
        return (
            <form onSubmit={e => e.preventDefault()} className={cn("grid items-start gap-4", className)}>
                <Link to="/home/auth" className='block w-full'>
                    <Button className='bg-colorPrimary w-full' >
                        Login
                    </Button>
                </Link>
                <Link to="/home/auth/register" className='block w-full'>
                    <Button className=' w-full' >
                    Create account
                    </Button>
                </Link>
                
            </form>
        )
    }

    return (
        <div>
            {
                isDesktop ?
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger ref={buttonRef} asChild className='hidden'>
                            <Button variant="outline">Edit Profile</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Create an Account for a Seamless Experience</DialogTitle>
                                <DialogDescription>
                                    Save your documents, track order history, and enjoy a more convenient printing experience. Plus, your files will be securely stored in your account
                                </DialogDescription>
                            </DialogHeader>
                            <ProfileForm />
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                        </DialogContent>
                    </Dialog>
                    :
                    <Drawer open={open} onOpenChange={setOpen}>
                        <DrawerTrigger asChild ref={buttonRef} className='hidden'>
                            <Button variant="outline">Edit Profile</Button>
                        </DrawerTrigger>
                        <DrawerContent className=''>
                            <DrawerHeader className="text-left">
                                <DrawerTitle>Create an Account for a Seamless Experience</DrawerTitle>
                                <DrawerDescription>
                                    Save your documents, track order history, and enjoy a more convenient printing experience. Plus, your files will be securely stored in your account
                                </DrawerDescription>
                            </DrawerHeader>
                            <ProfileForm className="px-4" />
                            <DrawerFooter className="pt-2">
                                <DrawerClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>

            }


            <Heading className='text-center'>upload files</Heading>
            <div className="lg:flex w-full max-w-5xl mx-auto border-2 py-10" >
                <HandleGetFileFromStorage />
                <DisplayFile />
            </div>

        </div>
    )
}

export default DocPage