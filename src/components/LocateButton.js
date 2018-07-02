import React from 'react';
import { Button } from 'semantic-ui-react';

class LocateButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };
  }

  componentWillUpdate(nextProps) {
    if (this.props !== nextProps) {
      this.setState({ loading: false });
    }
  }

  handleClick = () => {
    this.setState({ loading: true }, this.props.locate());
  };

  handleRender() {
    if (this.state.loading === true) {
      return (
        <Button loading primary fluid>
          Loading
        </Button>
      );
    } else {
      return (
        <Button primary onClick={this.handleClick} fluid>
          Locate me
        </Button>
      );
    }
  }

  render() {
    return this.handleRender();
  }
}

export default LocateButton;
