import React, { Component } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

class MyCal extends Component {

    render() {
        return (
                <Calendar value={this.props.value}
                          onChange={this.props.onChange}
                          minDate={new Date()}
                />
        );
    }
}

export default MyCal;