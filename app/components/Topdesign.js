import React from 'react'
import Image from 'next/image'
import stars from '../../assets/star.jpg'
import { ArrowBack } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useRouter } from 'next/navigation';


const Topdesign = ({title}) => {
  const router = useRouter(); 
  return (
    <div>
        <IconButton onClick={() => router.push('/')}>
        <ArrowBack className='mt-4 float-left'/>
        </IconButton>
        <Image
            src={stars}
            alt="star"
            width={50}
            height={50}
            class='float-right mt-[2rem]'
        />
        <p class='text-left font-bold text-3xl mt-8'>{title}</p>
    </div>
  )
}

export default Topdesign