import React from 'react'

export default function Nav() {
  return (
    <nav className='flex items-center justify-end mx-4 md:mx-12 h-[60px] space-x-6'>
      <button><i class="fa-solid fa-magnifying-glass"></i></button>
      <div className=''>Thời gian sử dụng còn lại: <span className='font-semibold text-red-500'>12 ngày</span></div>
      <button className='border-dashed border-2 border-black w-32 p-1 text-left rounded-md flex items-center text-sm font-medium'>
        <i class="fa-solid fa-message text-green-500 mr-2"></i> Sẵn sàng
      </button>
      <button className='border-dashed border-2 border-black w-32 p-1 text-left rounded-md flex items-center text-sm font-medium'>
        <i className='h-2 w-2 bg-green-600 border-2 border-black rounded-full mr-2'></i> Sẵn sàng
      </button>
      <i class="fa-regular fa-bell"></i>
      <button className='bg-green-500 text-white w-10 h-10'>
        <i class="fa-solid fa-phone-volume"></i>
      </button>
      <button>
        <img src='/images/default-user-avatar.png' alt='user-avatar' width={40} height={40}></img>
      </button>
    </nav>
  )
}
