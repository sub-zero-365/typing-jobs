import React from 'react'
import { useLogisticsContext } from '../pages/SingleLogisticPage.js'
import { CustomInput } from './Inputs/Input.js'
import SubmitBtn from './buttons/SubmitBtn.js'
import Select from "react-select"
import { statusOptions } from '../constants/options.js'
import { Label } from './ui/label.js'
const UpdateLogistic = () => {
    const { logistics } = useLogisticsContext();

    return (
        <div className='px-2'>
            <CustomInput
                labelText='name'
                labelclassName="text-lg mb-2 capitalize"
                defaultValue="rosemary"
                className='my-1 mb-2 h-8'

            />
            <CustomInput
                labelText='Price'
                labelclassName="text-lg mb-2 capitalize"
                defaultValue="2222F"
                className='my-1 mb-2 h-8'
                type='number'

            />
            {/* <Select/> */}
            <Label
                htmlFor='status'
                className='text-sm'
            >
                select status
            </Label>
            <Select id='status'
                className='mb-2 max-w-[100px] text-xs sm:text-sm'
                name='status'
                isSearchable={false}
                options={statusOptions}
            />
            <SubmitBtn
                submittingText="creating logistic ..."
                type="button"
                // variant='outline'
                className='
                                w-[min(250px,calc(100%-0.2rem))] py-6
                                text-sm
                                '
            >
                Update Logistic

            </SubmitBtn>


        </div>
    )
}

export default UpdateLogistic