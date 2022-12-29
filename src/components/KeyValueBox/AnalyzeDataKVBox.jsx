import React from 'react'

export default function AnalyzeDataKVBox({ children, name }) {
    return (
        <div className="flex">
            <span className="w-[200px]">{name}</span>
            <div className="font-medium">
                {children}
            </div>
        </div>
    )
}
