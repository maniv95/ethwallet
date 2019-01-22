import React from 'react'
import { Link } from 'react-router-dom'
import Icon from 'react-icons-kit';
import {home} from 'react-icons-kit/fa/home';
import {userPlus} from 'react-icons-kit/icomoon/userPlus'
import {ic_account_balance_wallet} from 'react-icons-kit/md/ic_account_balance_wallet'
import {ic_send} from 'react-icons-kit/md/ic_send'
import {send} from 'react-icons-kit/fa/send'
import {ic_list} from 'react-icons-kit/md/ic_list'
import {listAlt} from 'react-icons-kit/fa/listAlt';
// The Header creates links that can be used to navigate
// between routes.
const Header = () => (
  <header>
    <nav>
      <ul>
        <li><Link to='/'><Icon size={25} icon={home}/>Home</Link></li>
        <li><Link to='/CreateAccount'><Icon size={25} icon={userPlus}/><br/>New Account</Link></li>
        <li><Link to='/ViewAccount'><Icon size={25} icon={ic_account_balance_wallet}/><br/>View Account</Link></li>
        <li><Link to='/SendEth'><Icon size={25} icon={ic_send}/><br/>Send Eth</Link></li>
        <li><Link to='/SendAllEth'><Icon size={23} icon={send}/><br/>Send All Eth</Link></li>
        <li><Link to='/GetByTxHash'><Icon size={25} icon={ic_list}/><br/>Details By Hash</Link></li>
        <li><Link to='/GetByAddress'><Icon  size={25}icon={listAlt}/><br/>Details By Address</Link></li>
      </ul>
    </nav>
  </header>
)
export default Header;
