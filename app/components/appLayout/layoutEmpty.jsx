var LayoutEmpty = React.createClass({
  displayName:'LayoutEmpty',
  render: function() {
    return (
      <div>
        <nav className="navbar navbar-inverse navbar-fixed-top">
          <div className="container">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">Simple Crud</a>
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
