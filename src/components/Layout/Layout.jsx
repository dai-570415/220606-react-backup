const Layout = ({ children }) => {
    return (
        <div className="container">
            <header></header>
            { children }
            <footer></footer>
        </div>
    );
}

export default Layout;