const AnimatedButton = ({className='', text = '', ...props }) => {
    return (
        <button className={className}
        {...props}>
            <span>{text}</span>
        </button>
    )
}

export default AnimatedButton;