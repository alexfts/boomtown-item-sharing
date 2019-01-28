import React, { Component } from 'react';
import ItemCard from '../ItemCard';

class ShareItemPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {
        itemowner: {}
      }
    };
  }

  render() {
    return <div>Preview</div>;
  }
}

export default ShareItemPreview;
