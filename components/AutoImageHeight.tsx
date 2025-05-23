// does not work

import { Image, ImageSourcePropType } from 'react-native';
import { Image as RNImage } from 'react-native';
import { StyleProp, ImageStyle } from 'react-native';

type AutoHeightImageProps = {
  source: ImageSourcePropType;
  width: number;
  alignSelf?: ImageStyle['alignSelf'];
  position?: ImageStyle['position'];
  bottom?: ImageStyle['bottom'];
  top?: ImageStyle['top'];
}


export const AutoHeightImage = ({ source, width, alignSelf, position, bottom}: AutoHeightImageProps) => {
  console.log(RNImage.resolveAssetSource(source));
  const { width: imgWidth, height: imgHeight } = RNImage.resolveAssetSource(source);
  const aspectRatio = imgHeight / imgWidth;
  const height = width * aspectRatio;

  return (
    <Image
      source={source}
      style={{width: width, height: height, alignSelf: alignSelf || 'center', position: position || 'absolute', bottom: bottom} as StyleProp<ImageStyle>}
    />
  );
};