
import './header.css';

export function Header (props) {
    const { left, middle, right } = props || null;
    return(
        <header className = 'App-header'>
            <div className = 'App-header-left'>
                { left }
            </div>
            <div className = 'App-header-middle'>
                { middle }
            </div>
            <div className = 'App-header-right'>
                { right }
            </div>
        </header>
    )
}