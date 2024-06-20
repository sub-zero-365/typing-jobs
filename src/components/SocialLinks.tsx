import React from 'react'
import { IconBrandFacebook, IconBrandMessenger, IconBrandWhatsapp } from '@tabler/icons-react'
import PopOver from './utils/socialpopover'

const SocialLinks = () => {
  return (
    <div className='flex [*:not(:hover):bg-red-500]-- justify-center items-center gap-x-4 mb-6'>

    <PopOver
        className='size-12 bg-slate-300'
        text='facebook page'>
        <IconBrandFacebook
            color='black'
            size={25}
        />

    </PopOver>
    <PopOver
        className='size-12 bg-slate-300'
        text='facebook page'>
        <IconBrandWhatsapp
            color='black'
            size={25}
        />

    </PopOver>
    <PopOver
        className='size-12 bg-slate-300'
        text='facebook page'>
        <IconBrandMessenger
            color='black'
            size={25}
        />

    </PopOver>




</div>
  )
}

export default SocialLinks
