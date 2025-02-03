localhost:5000/api/usersx

common Reactjs errors

To update react or angular project version update (all packages)
npm install -g npm-check-updates
ncu -u
npm i
npm install --save-dev ajv@^7 
// Test@test.com => test@test.com

Redirect -> Navigate react-router-dom'
Attempted import error: 'Switch' is not exported from 'react-router-dom'
Switch -> Routes -> update route
   <Routes>
        <Route path="/" exact="true" element={<Users />}>
        
        Module '"react-router-dom"' has no exported member 'useHistory'.ts(2305)
Replace useHistory with useNavigate then
const navigate = useNavigate();
replace history.push('/path') with navigate('/path')

Attempted import error: 'redux-thunk' does not contain a default export (imported as 'thunk').
import {thunk} from 'redux-thunk';

: react_dom__WEBPACK_IMPORTED_MODULE_1__.render is not a function
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

[Navigate] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>
check each  <Route>  has element attribute or not.


Cannot find module 'ajv/dist/compile/codegen'
npm install --save-dev ajv@^7 

inpage.js:12 StreamMiddleware - Unknown response id react project
remove MetaMask browser chrome extension

Cannot find module 'sass' react project
npm i sass --save-dev

useNavigate() may be used only in the context of a <Router> component.
move router to new comp
 <BrowserRouter>
          <App />
        </BrowserRouter>

Each child in a list should have a unique "key" prop.
 {infoData.map((object, i) => {
          return (
            <div className={"row"} key={i}>

Error: Invalid <Link> with <a> child. Please remove <a> or use <Link legacyBehavior>.
            <Link><a id="link">Home<a></Link> to <Link id="link">Home</Link>

error:0308010C:digital envelope routines::unsupported at new Hash (node:internal/crypto
            run the npm audit fix --force command

Module not found: Error: Can't resolve 'url' in 'D:\new\chrome-react-seo-extension\node_modules\react-dev-utils'BREAKING CHANGE: webpack < 5 used to include polyfills for node.js core modules by default.
This is no longer the case. Verify if you need this module and configure a polyfill for it.

If you want to include a polyfill, you need to:
- add a fallback 'resolve.fallback: { "url": require.resolve("url/") }'
- install 'url'
If you don't want to include a polyfill, you can use an empty module like this:
resolve.fallback: { "url": false }

npm install react-scripts@4.0.3


ReactDOM.render is no longer supported in React 18. Use createRoot instead.