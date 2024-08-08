import React from 'react'
import { Link } from 'react-router-dom'
 

export default function Nav() {


return (
<>      
<header class="header">
		<div class="container-fluid">
			<div class="row">
            <div class="col-sm-4 col-md-3 order-2 order-sm-1">
                   <div class="header__social">
						
					</div>
				</div>
				<div class="col-sm-4 col-md-6 order-1  order-md-2 text-center">
                   <Link to="/" class="site-logo"><h2>React Gallery</h2></Link>
					 
				</div>
				<div class="col-sm-4 col-md-3 order-3 order-sm-3">
					<div class="header__switches">
					
					</div>
				</div>
			</div>
			<nav class="main__menu">
				<ul class="nav__menu">
                    <li><Link to="/upload" class="menu--active">Home</Link></li>
                    <li> <Link to="/upload">Upload</Link></li>
				</ul>
			</nav>
		</div>
	</header>
   
  </>
         );
        }