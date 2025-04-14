import "../styles/Header.css";

import { ShoppingCartIcon } from '@heroicons/react/24/outline';

function Header() {
    return (
        <header className="header-container">
            <h1 className="header-title">Fake_Store_</h1>

            <div className="header-search">
                <input
                    type="text"
                    placeholder="What are you looking for?"
                    className="search-input"
                />
            </div>

            <button className="cart-button">
                <ShoppingCartIcon className="cart-icon" />
                <span className="cart-badge">3</span>
            </button>
            
        </header>
    );
}

export { Header };

