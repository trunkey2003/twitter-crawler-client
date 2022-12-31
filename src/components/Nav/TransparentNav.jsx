import { useState } from 'react'

export default function TransparentNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  return (
    <div className='absolute top-0 z-30 w-full h-[60px] flex items-center justify-end px-4 md:px-12 space-x-6 bg-transparent text-primary'>
      {<div className={`${isMenuOpen ? 'block' : 'hidden'} lg:block fixed h-screen w-full top-0 right-0 bg-black bg-opacity-80 lg:bg-opacity-0 flex justify-end lg:relative lg:h-auto lg:w-fit`} onClick={() => setIsMenuOpen(false)}>
        <div className='lg:flex lg:space-x-6 lg:bg-transparent p-5 w-fit h-full bg-gray-900 text-white animate__animated animate__slideInRight animate__disble_lg' onClick={(e) => e.stopPropagation()}>
          <div className='my-5 lg:my-0'>
            <button><i className="fa-solid fa-magnifying-glass"></i></button>
            <input className='ml-5'></input>
          </div>
          <div className='my-5 lg:my-0'>Using time remaining: <span className='font-semibold text-red-500'>12 days</span></div>
          <button className='border-dashed border-2 border-white w-32 my-5 lg:my-0 p-1 text-left rounded-md flex items-center text-sm font-medium'>
            <i className="fa-solid fa-message text-green-500 mr-2"></i> Ready
          </button>
          <button className='border-dashed border-2 border-white w-32 my-5 lg:my-0 p-1 text-left rounded-md flex items-center text-sm font-medium'>
            <i className='h-2 w-2 bg-green-600 border-2 border-white rounded-full mr-2'></i> Ready
          </button>
        </div>
      </div>}
      <i className="fa-regular fa-bell"></i>

      <button className='bg-green-500 text-white w-10 h-10'>
        <i className="fa-solid fa-phone-volume"></i>
      </button>
      <button className='border rounded-full b-2'>
        <img src='/images/default-user-avatar.png' alt='user-avatar' width={40} height={40} className="m-[2px] rounded-full"></img>
      </button>
      <button className='mr-auto lg:hidden' onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <i className="fa-solid fa-bars"></i>
      </button>
    </div>
  )
}
