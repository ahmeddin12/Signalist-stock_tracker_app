import React from 'react'
import {nav_items} from "@/lib/constants";

const NavItems = () => {
    return (
       <ul className='flex flex-col sm:flex-row p-2 gap-3 sm:gap-10 font-medium'>
           {nav_items.map({ href, label}) => (
               <li key={href}>
                    <Link href={href} className={'hover'}
               </li>
               )}
       </ul>
    )
}
export default NavItems
