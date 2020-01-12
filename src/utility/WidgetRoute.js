import React from 'react';
import { Route } from 'react-router-dom';
//https://spectrum.chat/react/help/how-can-i-hide-the-navigation-bar-in-admin-page~e5f45799-e541-4e87-9651-fddd96490126

const WidgetRoute = ({component: Component, ...rest}) => {
  const component = props => (
    <div>
      <Component {...props} />
    </div>
  ) 
  return <Route {...rest} component={component} />
}
export default WidgetRoute;