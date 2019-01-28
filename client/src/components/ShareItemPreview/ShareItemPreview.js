import React, { Component } from 'react';
import ItemCard from '../ItemCard';

class ShareItemPreview extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const item = {
      imageurl:
        'http://via.placeholder.com/500x250?text=Please select an image',
      itemowner: {
        fullname: 'Example',
        email: 'example@example.com'
      },
      title: 'Name your item',
      description: 'Describe your item',
      tags: []
    };
    return <ItemCard item={item} />;
  }
}

export default ShareItemPreview;
