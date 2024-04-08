import React, { createContext, useContext } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog.js"
import { Button } from '../ui/button.js';
export const DeleteLogContext = createContext<any>({})
// export 
export const DeleteLogModal = ({children}) => {
// const name="the code and thee coder"
    const triggerRef = React.useRef<any>(null);
    // const [name]
    const TriggerButton = <Button onClick={() => {
        triggerRef.current?.click()
    }}>
        open Modal
    </Button>

    return (
        <DeleteLogContext.Provider key={"ouodousui"}
            value={{
                name:"the man",
                // TriggerButton
            }}
        >
        {children}
        
            {/* <Dialog >
                <DialogContent className="w-[min(425px,calc(100%-2rem))] rounded-sm  mx-auto !z-[2000]">
                    hello user k

                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos enim eius vero veritatis eligendi deleniti magnam est iste tenetur ducimus temporibus, quae doloribus repellat impedit magni, error perferendis cupiditate accusamus.
                </DialogContent>
                <DialogTrigger
                    ref={triggerRef}
                    className='hidden'
                >

                </DialogTrigger>
            </Dialog> */}
        </DeleteLogContext.Provider>


    )
}
export const useDeleteModalContext = () => { const display = useContext(DeleteLogContext);
if (display == null) {
  throw Error("useDisplay requires DisplayProvider to be used higher in the component tree");
}
return display;}
// export default DeleteLogModal