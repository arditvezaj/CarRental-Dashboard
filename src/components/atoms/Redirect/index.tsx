import {usePathname, useRouter} from 'next/navigation'
import {useEffect} from 'react'

interface RedirectProps {
    to: string
}

const Redirect: React.FC<RedirectProps> = ({to}) => {
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        router.push(to)
    }, [to, pathname, router])

    return null
}

export default Redirect
