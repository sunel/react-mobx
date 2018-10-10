import React, { PureComponent } from 'react';

class Spinner extends PureComponent {
    render() {
        return (
            <div>
                Cool {this.props.route} <pre>{JSON.stringify(this.props.params, null, 2) }</pre>
            </div>
        )
    }
}

export default Spinner;