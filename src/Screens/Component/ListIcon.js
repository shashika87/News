import React from 'react';
import {Svg, G, Path} from 'react-native-svg';
function ListIcon(props) {
  return props.listView === true ? (
    <Svg height="48" viewBox="0 0 48 48" width="48" fill="#157EFB">
      <Path d="M8 21c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm0-12c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm0 24.33c-1.47 0-2.67 1.19-2.67 2.67s1.2 2.67 2.67 2.67 2.67-1.19 2.67-2.67-1.2-2.67-2.67-2.67zm6 4.67h28v-4h-28v4zm0-12h28v-4h-28v4zm0-16v4h28v-4h-28z" />
      <Path d="M0 0h48v48h-48z" fill="none" />
    </Svg>
  ) : (
    <Svg height="48" viewBox="0 0 48 48" width="48" fill="#157EFB">
      <Path d="M10.246,4.228c0-0.547-0.443-0.991-0.99-0.991H3.914c-0.548,0-0.991,0.443-0.991,0.991V9.57   c0,0.546,0.443,0.99,0.991,0.99h5.342c0.547,0,0.99-0.444,0.99-0.99V4.228z" />
      <Path d="M19.453,4.228c0-0.547-0.443-0.991-0.991-0.991h-5.343c-0.546,0-0.99,0.443-0.99,0.991V9.57   c0,0.546,0.444,0.99,0.99,0.99h5.343c0.548,0,0.991-0.444,0.991-0.99V4.228z" />
      <Path d="M28.868,4.228c0-0.547-0.443-0.991-0.99-0.991h-5.342c-0.548,0-0.991,0.443-0.991,0.991V9.57   c0,0.546,0.443,0.99,0.991,0.99h5.342c0.547,0,0.99-0.444,0.99-0.99V4.228z" />
      <Path d="M10.246,13.224c0-0.547-0.443-0.99-0.99-0.99H3.914c-0.548,0-0.991,0.443-0.991,0.99v5.342   c0,0.549,0.443,0.99,0.991,0.99h5.342c0.547,0,0.99-0.441,0.99-0.99V13.224z" />
      <Path d="M19.453,13.224c0-0.547-0.443-0.99-0.991-0.99h-5.343c-0.546,0-0.99,0.443-0.99,0.99v5.342   c0,0.549,0.444,0.99,0.99,0.99h5.343c0.548,0,0.991-0.441,0.991-0.99V13.224z" />
      <Path d="M28.868,13.224c0-0.547-0.443-0.99-0.99-0.99h-5.342c-0.548,0-0.991,0.443-0.991,0.99v5.342   c0,0.549,0.443,0.99,0.991,0.99h5.342c0.547,0,0.99-0.441,0.99-0.99V13.224z" />
      <Path d="M10.246,22.43c0-0.545-0.443-0.99-0.99-0.99H3.914c-0.548,0-0.991,0.445-0.991,0.99v5.344   c0,0.547,0.443,0.99,0.991,0.99h5.342c0.547,0,0.99-0.443,0.99-0.99V22.43z" />
      <Path d="M19.453,22.43c0-0.545-0.443-0.99-0.991-0.99h-5.343c-0.546,0-0.99,0.445-0.99,0.99v5.344   c0,0.547,0.444,0.99,0.99,0.99h5.343c0.548,0,0.991-0.443,0.991-0.99V22.43z" />
      <Path d="M28.868,22.43c0-0.545-0.443-0.99-0.99-0.99h-5.342c-0.548,0-0.991,0.445-0.991,0.99v5.344   c0,0.547,0.443,0.99,0.991,0.99h5.342c0.547,0,0.99-0.443,0.99-0.99V22.43z" />
    </Svg>
  );
}

export default ListIcon;