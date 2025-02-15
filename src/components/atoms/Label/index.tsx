import classNames from 'classnames'
import {ReactNode} from 'react'

const Label = ({id, className, children}: {id?: string; className?: string; children: ReactNode}) => {
    return (
        <label className={classNames('block mb-2 text-sm leading-6 font-medium text-gray-900', className)} htmlFor={id}>
            {children}
        </label>
    )
}

export default Label
