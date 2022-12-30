import React from 'react'
import AnalyzeDataKeyBox from './AnalyzeDataKeyBox'

export default function AnalyzeDataKVBox({ children, name }) {
    return (
        <div className="flex">
            <AnalyzeDataKeyBox title={name}/>
            <div className="font-medium">
                {children}
            </div>
        </div>
    )
}
