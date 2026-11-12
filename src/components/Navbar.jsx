function Navbar() {
  return (
    <nav className="navbar">
      <a href="#home" className="nav-logo">
        STUDENT<span>LY.</span>
      </a>

      <div className="nav-links">
        <a href="#home">Home</a>
        <a href="#students">Students</a>
        <a href="#footer">About</a>
      </div>

      <a href="#students" className="nav-button">
        Manage Students
      </a>
    </nav>
  );
}

export default Navbar;