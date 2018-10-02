import React, { PureComponent } from 'react';

function isTestable(value) {
   return function decorator(target) {
      target.isTestable = value;
      console.log(target);
   }
}

@isTestable(true)
class Spinner extends PureComponent {
    render() {
        return (
            <div>
                Cool
            </div>
        )
    }
}

export default Spinner;