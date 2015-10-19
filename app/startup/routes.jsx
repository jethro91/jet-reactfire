var routes = (
  <Route handler={App} name="App" path="/">
    <Route handler={LayoutBasic}>
      <DefaultRoute handler={PageHome}/>
      <Route handler={PageHome} name="home" path="home"/>
    </Route>
    <Route handler={LayoutEmpty}>
      <Route handler={PageLogin} name="login" path="login"/>
      <NotFoundRoute handler={PageNotFound} name="notFound"/>
    </Route>
  </Route>
);

Router.run(routes, function(Handler) {
  ReactDOM.render(<Handler/>, document.getElementById('app'));
});
