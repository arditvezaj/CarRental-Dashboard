import React, {createElement, FC} from 'react'
import {EmptyStateProps} from '@/components/organisms/EmptyState/interface'

const EmptyState: FC<EmptyStateProps> = ({icon, title, subtitle, buttonContent, border = true}) => (
    <div className={`overflow-hidden rounded-xl ${border ? 'border' : ''} bg-card text-card-foreground`}>
        <div className="flex justify-center mx-10 my-44">
            <div className="text-center">
                {icon &&
                    createElement(icon, {
                        className: 'mx-auto h-12 w-12 text-gray-400',
                        'aria-hidden': 'true'
                    })}
                <h3 className="mt-2 text-sm font-semibold text-gray-900">{title}</h3>
                <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
                {buttonContent && <div className="mt-6">{buttonContent}</div>}
            </div>
        </div>
    </div>
)

export default EmptyState
