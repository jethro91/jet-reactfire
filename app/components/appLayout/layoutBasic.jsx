var LayoutBasic = React.createClass({
  displayName: 'LayoutBasic',
  render: function() {
    return (
      <div>
        <nav className="navbar navbar-inverse navbar-fixed-top">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#">Simple Crud</a>
            </div>
            <div id="navbar" className="collapse navbar-collapse">
              <ul className="nav navbar-nav">
                <li>
                  <Link to={'/home'}>Master URL Manage</Link>
                </li>
                <li>
                  <Link to={'/magage'}>Daftar Nomor</Link>
                </li>
                <li>
                  <Link to={'/login'}>Logout</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container">
          <RouteHandler/>
        </div>
      </div>
    );
  }
});
