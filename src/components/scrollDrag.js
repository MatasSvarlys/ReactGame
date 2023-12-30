import React from 'react';

class ScrollDrag extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.state = {
      isScrolling: false,
      clientX: 0,
      clientY: 0,
      scrollX: 0,
      scrollY: 0,
    };
  }

  onMouseDown = (e) => {
    this.setState({
      isScrolling: true,
      clientX: e.clientX,
      clientY: e.clientY,
    });
  };

  onMouseUp = () => {
    this.setState({ isScrolling: false });
  };

  onMouseMove = (e) => {
    const { clientX, clientY, scrollX, scrollY } = this.state;
    const { current } = this.ref;
  
    if (current && this.state.isScrolling) {
      const deltaX = e.clientX - clientX;
      const deltaY = e.clientY - clientY;
  
      current.scrollLeft = -(scrollX + deltaX);
      current.scrollTop = -(scrollY + deltaY);
  
      this.setState({
        scrollX: -current.scrollLeft,
        scrollY: -current.scrollTop,
        clientX: e.clientX,
        clientY: e.clientY,
      });
    }
  };
  

  render() {
    const { rootClass } = this.props;
    return (
      <div
        ref={this.ref}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
        onMouseMove={this.onMouseMove}
        className={rootClass}
        style={{ overflow: 'auto' }}
      >
        {React.Children.map(this.props.children, (child) =>
          React.cloneElement(child, {
            style: { ...child.props.style, position: 'relative' },
          })
        )}
      </div>
    );
  }
  
}
export default ScrollDrag;
