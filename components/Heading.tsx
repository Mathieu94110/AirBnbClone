'use client'

interface HeadingProps {
    title: string,
    subtitle?: string;
    center?: boolean
    pageContent?: boolean
}

const Heading: React.FC<HeadingProps> = ({ title, subtitle, center, pageContent }) => {
    return (
        <div className={`${center ? 'text-center' : 'text-start'} ${pageContent ? 'mb-12 ml-12' : ''}`}>
            <div className="text-2xl font-bold">
                {title}
            </div>
            <div className="font-light text-neutral-500 mt-2">
                {subtitle}
            </div>
        </div>
    )
}

export default Heading
