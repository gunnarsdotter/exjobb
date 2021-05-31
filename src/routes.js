import React, { Suspense, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Import all page components here
//import MenuBar from './components/menu/menu';
import CustumerRegistration  from "./views/custumerRegistration";
import Productdivider  from "./views/productDivider";
import SUS  from "./views/sus";
import Result  from "./views/result";
import Menu  from "./components/menu/menu";
import Border  from "./components/user/border";
import ImportPopup  from "./components/import/importPopup";
import { YearContext, yeararray, UserContext, custumers } from './features/custumer';

const Routes = () => {
    const [year, setYear] = useState(yeararray[0]);
    const [user, setUser] = useState(custumers[0]);
   
   	return (
        <YearContext.Provider value={[year, setYear]}>	
        <UserContext.Provider value={[user, setUser]}>	
            <Router basename={'/exjobb'}>
                <Menu/>
                <Border/>
                <Suspense fallback={<div>Loading...</div>}>
                    <Switch>
                        <Route exact path="/" component={CustumerRegistration}/>
                        <Route path="/custumerregistration" component={CustumerRegistration}/>
                        <Route path="/productdivider" component={Productdivider}/>
                        <Route path="/import" component={ImportPopup}/>
                        <Route path="/result" component={Result}/>
                        <Route path="/sus" component={SUS}/>
                    </Switch>
                </Suspense>
            </Router>
        </UserContext.Provider>
        </YearContext.Provider>
	);
}
export default Routes;