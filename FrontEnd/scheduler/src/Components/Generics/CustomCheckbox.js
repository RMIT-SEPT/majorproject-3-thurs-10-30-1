import React, { Component} from 'react';
import PropTypes from 'prop-types';

//small components to allow selection of multiple things- very generic
class CustomCheckbox extends Component {
    state = {
        isChecked: false,
    }

    toggleCheckboxChange = () => {
        const { handleCheckboxChange, data } = this.props;

        this.setState(({ isChecked }) => (
            {
                isChecked: !isChecked,
            }
        ));

        handleCheckboxChange(data);
    }

    render() {
        const { label } = this.props;
        const { data } = this.props;
        const { isChecked } = this.state;

        return (
            <div className="checkbox">
                <label>
                    <input
                        type="checkbox"
                        value={data}
                        checked={isChecked}
                        onChange={this.toggleCheckboxChange}
                    />
                    {label}
                </label>
            </div>
        );
    }
}

CustomCheckbox.propTypes = {
    label: PropTypes.string.isRequired,
    handleCheckboxChange: PropTypes.func.isRequired,
};

export default CustomCheckbox;