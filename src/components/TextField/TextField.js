/**
 * @param {props string} label this is the text to label the input
 * @param {props string} type this is a valid input attribute i.e. 'password'
 * @param {props function ref} onChange this is the function that gets called on change 
 * @returns {div with p and input}
 * Standardizes a simple input with label form component.
 */
export default TextField = ({ props }) => {
    return (
        <div className = 'App-textfield-wrap'>
            <p className = 'App-textfield-label'>
                { label }
            </p>
            <input 
                className = 'App-textfield-input'
                type = { type }
                onChange = { onChange }
            />
        </div>
    )
}