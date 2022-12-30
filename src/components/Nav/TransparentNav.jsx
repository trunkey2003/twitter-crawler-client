import React from 'react'

export default function TransparentNav() {
  return (
    <div className='absolute top-0 z-30 w-full h-[60px] flex items-center justify-end px-4 md:px-12 space-x-6 bg-transparent text-primary'>
      <button><i className="fa-solid fa-magnifying-glass"></i></button>
      <div className=''>Using time remaining: <span className='font-semibold text-red-500'>12 days</span></div>
      <button className='border-dashed border-2 border-white w-32 p-1 text-left rounded-md flex items-center text-sm font-medium'>
        <i className="fa-solid fa-message text-green-500 mr-2"></i> Ready
      </button>
      <button className='border-dashed border-2 border-white w-32 p-1 text-left rounded-md flex items-center text-sm font-medium'>
        <i className='h-2 w-2 bg-green-600 border-2 border-white rounded-full mr-2'></i> Ready
      </button>
      <i className="fa-regular fa-bell"></i>
      <button className='bg-green-500 text-white w-10 h-10'>
        <i className="fa-solid fa-phone-volume"></i>
      </button>
      <button className='border rounded-full b-2'>
        <img src='/images/default-user-avatar.png' alt='user-avatar' width={40} height={40} className="m-[2px] rounded-full"></img>
      </button>
    </div>
  )
}
