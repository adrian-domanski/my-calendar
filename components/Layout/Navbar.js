import Link from "next/link";

const Navbar = () => {
  return (
    <nav
      className="l-navbar navbar flex-center"
      role="navigation"
      aria-label="main navigation">
      <div className="navbar-brand">
        <Link href="/">
          <a className="navbar-logo">
            <img src="/img/logo.png" className="navbar-logo__img" />
            <div className="title is-size-5 ml-2 has-text-primary">
              My Calendar
            </div>
          </a>
        </Link>

        <a
          role="button"
          className="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
