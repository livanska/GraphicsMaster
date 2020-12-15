import React from "react";
import "../Style/Dropdown.scss"
import Icon from '../Resources/Images/Dropdown-icon.svg'
class Dropdown extends React.Component {
  constructor(props) {
    super(props);

    // @defaultSelectText => Show default text in select
    // @showOptionList => Show / Hide List options
    // @optionsList => List of options
    this.state = {
      defaultSelectText: "",
      showOptionList: false,
      optionsList: [],
      currentOption:""
    };
    this.handleOptionClick = this.handleOptionClick.bind(this)
  }

  componentDidMount() {
    // Add Event Listner to handle the click that happens outside
    // the Custom Select Container
    document.addEventListener("mousedown", this.handleClickOutside);
    this.setState({
      defaultSelectText: this.props.defaultText
    });
  }

  componentWillUnmount() {
    // Remove the event listner on component unmounting
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  // This method handles the click that happens outside the
  // select text and list area
  handleClickOutside = e => {
    if (
      !e.target.classList.contains("custom-select-option") &&
      !e.target.classList.contains("selected-text")
    ) {
      this.setState({
        showOptionList: false
      });
    }
  };

  // This method handles the display of option list
  handleListDisplay = () => {
    this.setState(prevState => {
      return {
        showOptionList: !prevState.showOptionList
      };
    });
  };

  // This method handles the setting of name in select text area
  // and list display on selection
  handleOptionClick = e => {
    this.setState({
      defaultSelectText: e.target.getAttribute("data-name"),
      showOptionList: false,
      currentOption: e.target.getAttribute("value"),
      
     
        
    });

  this.props.onClick( e.target.getAttribute("value"))
    e.preventDefault();
 // console.log(e.target.getAttribute("value"))
    
  };

  render() {
    const { optionsList } = this.props;
    const { showOptionList, defaultSelectText } = this.state;
    return (
      <div className="custom-select-container">
         
        <div onClick={this.handleListDisplay}>
          <img className={showOptionList ? "selected-text active" : "selected-text"} src={Icon} />
        
          
           <div className = "custom-select-container-text"> {defaultSelectText}</div></div>
         
       
       
        {showOptionList && (
          <ul className="select-options">
            {this.props.optionsList.map(option => {
              return (
                <li
                  className="custom-select-option"
                  data-name={option.text}
                  key={option.key}
                  value={[option.key]}
                  onClick ={ this.handleOptionClick}
                >
                  {option.text}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }
}

export default Dropdown;