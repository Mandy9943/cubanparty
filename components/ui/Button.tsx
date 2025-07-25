const AnimatedButton = ({className='', text = '', ...props }) => {
    return (
        <button className={`${className} px-6 py-3 ripple-outer hover:cursor-pointer rounded-sm transition-colors duration-300`}
        {...props}>
            <span>{text}</span>
        </button>
    )
}

export default AnimatedButton;