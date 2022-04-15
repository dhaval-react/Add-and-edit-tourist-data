import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

class GroupedButtons extends React.Component {
  state = { counter: 0 };

  handleIncrement = () => {
    this.setState(state => ({ counter: state.counter + 1 }));
  };

  handleDecrement = () => {
    this.setState(state => ({ counter: state.counter - 1 }));
  };
  render() {
    const displayCounter = this.state.counter >= 0;

    return (
      <ButtonGroup size="small" aria-label="small outlined button group">
        <Button style={{border: 'none',minWidth: '47px',padding:'8px 9px' }} onClick={this.handleDecrement}><span style={{ color:'#292C31',backgroundColor:'#7950F3',height:'20px',width:'20px',borderRadius:'6px' }}>-</span></Button>  
         
        <Button disabled style={{border: 'none',fontSize:'16px',color:'white',minWidth: '47px',padding:'8px 9px' }}>{this.state.counter}</Button>

        <Button onClick={this.handleIncrement} style={{border: 'none',minWidth: '47px',padding:'8px 9px' }}><span style={{  color:'#292C31', backgroundColor:'#7950F3',height:'20px',width:'20px',borderRadius:'6px' }}>+</span></Button>
        
      </ButtonGroup>
    );
  }
}

export default GroupedButtons;
