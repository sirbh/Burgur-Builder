import React from 'react';
import cssClasses from './Spinner.module.css'

const spinner = ()=>
{
      return <div className={cssClasses.loader}>Loading....</div>
}

export default spinner;