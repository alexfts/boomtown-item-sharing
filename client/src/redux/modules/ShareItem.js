// Actions
const UPDATE_ITEM = 'UPDATE_ITEM';
const RESET_ITEM = 'RESET_ITEM';
const RESET_IMAGE = 'RESET_IMAGE';

// Action creators
export const updateItem = item => ({
  type: UPDATE_ITEM,
  payload: item
});

export const resetItem = () => ({
  type: RESET_ITEM
});

export const resetImage = () => ({
  type: RESET_IMAGE
});

const initialState = {
  imageurl: 'http://via.placeholder.com/500x250?text=Please select an image',
  itemowner: {
    fullname: 'Example',
    email: 'example@example.com',
    id: '1'
  },
  title: 'Name your item',
  description: 'Describe your item',
  tags: []
};

export default (state = initialState, action) => {
  switch (action.type) {
  case UPDATE_ITEM:
    return { ...state, ...action.payload };
  case RESET_ITEM:
    return { ...initialState };
  case RESET_IMAGE:
    return { ...state, imageurl: initialState.imageurl };
  default:
    return state;
  }
};