import React from 'react';
import ReactDOM from 'react-dom';

import Login from './components/Login.js';
import CreateAccount from './components/CreateAccount.js';
import UserList from './components/UserList.js';
import UserEdit from './components/UserEdit.js';
import UserView from './components/UserView.js';

ReactDOM.render(<UserView/>, document.getElementById('app'));
