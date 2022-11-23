import './textField.css';
/**
 * @param {props string} label this is the text to label the input
 * @param {props string} type this is a valid input attribute i.e. 'password'
 * @param {props function ref} onChange this is the function that gets called on change 
 * @returns {div with p and input}
 * Standardizes a simple input with label form component.
 */
export function TextField (props) {
    return (
        <div className = 'App-textfield-wrap'>
            <p className = 'App-textfield-label'>
                { props.label }
            </p>
            <input 
                className = 'App-textfield-input'
                name = { props.name }
                value = { props.value }
                type = { props.type }
                onChange = { props.onChange }
            ></input>
        </div>
    )
}
