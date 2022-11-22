import './button.css';

export function Button (props) {
    /**
     * @todo need to validate props. 
     */
    return (
        <button 
            className = {'App-button'}
            onClick = {props.onClick}
        >
            {props.label}
        </button>
    )
}