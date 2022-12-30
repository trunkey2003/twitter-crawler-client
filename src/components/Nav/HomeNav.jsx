import { useState, useEffect} from 'react';
import TransparentNav from './TransparentNav';

export default function HomeNav() {
  const [isScrolledFarFromTop, setIsScrolledFarFromTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolledFarFromTop = window.scrollY > 0;
      setIsScrolledFarFromTop(isScrolledFarFromTop);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [])

  return (
    <nav className='fixed top-0 w-full h-[60px] z-30'>
      <TransparentNav/>
      {(isScrolledFarFromTop) && <div className='fixed h-[60px] w-full bg-white z-20'></div>}
    </nav>
  )
}
