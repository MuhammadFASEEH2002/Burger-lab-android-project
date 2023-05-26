import React from 'react';
import { TouchableOpacity, Dimensions, StyleSheet, Image } from 'react-native';
import Carousel from 'react-native-anchor-carousel';
const { width: windowWidth } = Dimensions.get('window');
const styles = StyleSheet.create({
  carousel: {
    flexGrow: 0,
    height: 180,
  },
});

export default function MyCrousel() {
  const carouselRef = React.useRef(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    setTimeout(() => {
      if (currentIndex === 2) {
        setCurrentIndex(0);
        if (carouselRef.current) carouselRef.current.scrollToIndex(0);
      } else if (currentIndex == 1) {
        setCurrentIndex(2);
        if (carouselRef.current) carouselRef.current.scrollToIndex(2);
      } else {
        setCurrentIndex(1);
        if (carouselRef.current) carouselRef.current.scrollToIndex(1);
      }
    }, 4000);
  }, [currentIndex]);

  function handleCarouselScrollEnd(item, index) {
    setCurrentIndex(index);
  }
  renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          carouselRef.current.scrollToIndex(index);
        }}>
        <Image
          source={item}
          alt="image"
          style={{ width: 300, height: '100%' }}
        />
      </TouchableOpacity>
    );
  };
  return (
    <>
      <Carousel
        ref={carouselRef}
        data={[
          require("../../../assets/banner1.jpg"),
          require("../../../assets/banner2.jpg"),
          require("../../../assets/banner3.jpg"),
        ]}
        renderItem={renderItem}
        style={styles.carousel}
        itemWidth={windowWidth * 0.8}
        containerWidth={windowWidth}
        separatorWidth={0}
        inActiveOpacity={0.3}
        onScrollEnd={handleCarouselScrollEnd}
      />
    </>
  );
}
// <SimplePaginationDot currentIndex={currentIndex} length={3} />
