import React, { useRef, useState } from 'react'
import { Input } from "./ui/input.js"
import { Label } from "./ui/label.js"
import { Button } from './ui/button.js'
import { iMiniPost } from '../pages/ProtectedRoute/NewTasks.js'
interface InewLogisticInput {
    handleFilesChange: (value: iMiniPost) => void
}
const NewLogisticInput = ({ handleFilesChange }: InewLogisticInput) => {
    const fileRef = useRef(null)
    const [desc, setDesc] = useState<iMiniPost | null>(null)
    const handleFileChange = () => {
        const file = fileRef.current.files[0]
        setDesc({
            image: file,
            text: "",
            createdAt: new Date()
        })
    }
    return (
        <div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="image">
                    {!desc ? <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbAVXZhlM-qA4bg_bOHRutl3wQVQdAbSWx_A&usqp=CAU'
                        alt="inputimage"
                    /> : <img src={URL.createObjectURL(desc.image)}
                    />}
                </Label>

                <Input id="image" type="file"
                    onChange={handleFileChange}
                    className='hidden'
                    ref={fileRef}
                    accept="image/jpeg, image/png, image/jpg"

                />
                {desc && <div>
                    <Label htmlFor=""
                        className='m-0 text-start'
                    >Description</Label>
                    <Input
                        onChange={(e) => {
                            const text = e.target.value;
                            // const temp = {
                            //     ...image,
                            //     text
                            // }
                            // setImage()/
                            setDesc({
                                ...desc,
                                text
                            })
                        }}
                        type="text"
                    />
                    <Button

                        onClick={() => {
                            handleFilesChange(desc)
                            setDesc(null)
                            // setImage(null)
                        }}
                        type='button'
                        className='mt-6 w-[min(400px,calc(100%-0.2rem))] mx-auto block'
                    >Add to List </Button>
                </div>}
            </div>
        </div>
    )
}

export default NewLogisticInput