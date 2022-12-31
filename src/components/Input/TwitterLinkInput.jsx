import { useState } from 'react'

export default function TwitterLinkInput({ value, onChange, onSubmit, errorValidation }) {
    const [scaleClass, setScaleClass] = useState('');

    const handleOnKeyDown = (e) => {
        if (e.key === 'Enter') {
            onSubmit();
        };
    }

    const handleToogleScalableInput = () => {
        setScaleClass(scaleClass === '' ? 'scale-150' : '')
    };
    return (
        <div
            className={`mx-auto mb-12 w-fit relative ${scaleClass} transition-all duration-500 ease-in-out animate__animated animate__slideInUp`}
        >
            <input
                name="twitterLinkInput"
                className="border-b border-white bg-transparent h-[40px] w-[400px] w-full text-center min-w-[15vw] max-w-[60vw] focus:outline-none px-2 "
                value={value}
                onChange={onChange}
                onKeyDown={handleOnKeyDown}
                onFocus={handleToogleScalableInput}
                onBlur={handleToogleScalableInput}
            ></input>
            {errorValidation.twitterLinkInput && 
            <p className='text-sm text-red-400 mt-2'>
                <i className="fa-solid fa-triangle-exclamation"></i> {errorValidation.twitterLinkInput}
            </p>}
        </div>
    )
}
