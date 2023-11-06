'use client'

import React from 'react'
// import remixiconUrl from '../../../utils/remixicon/remixicon.symbol.svg';

// console.log(remixiconUrl);
export default function MenuItem({
  icon,
  title,
  action,
  isActive = null,
}: any) {
  return (
    <button
      className={`menu-item${isActive && isActive() ? ' is-active' : ''}`}
      onClick={action}
      title={title}
    >
      {icon}
      {/* <symbol viewBox="0 0 24 24" id={`ri-${icon}`}>
            <g>
                <path fill="none" d="M0 0h24v24H0z"/>
                <path d="M6 5h2v14H6V5zm10 0h2v14h-2V5z"/>
            </g>
        </symbol> */}
      {/* {icon} */}
      {/* <svg className="remix">
          <use xlinkHref={`${remixiconUrl}#ri-${icon}`} />
        </svg> */}
    </button>
  )
}

// export default function MenuItem ({
//   icon, title, action, isActive = null,
// }) (
//   <button
//     className={`menu-item${isActive && isActive() ? ' is-active' : ''}`}
//     onClick={action}
//     title={title}
//   >
//     <svg className="remix">
//       <use xlinkHref={`${remixiconUrl}#ri-${icon}`} />
//     </svg>
//   </button>
// )
