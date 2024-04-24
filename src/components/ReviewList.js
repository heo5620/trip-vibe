import React from 'react';
import Slider from 'react-slick';
import ReviewItem from './ReviewItem';
import styles from './styles/Review.module.css';

function ReviewList({ data, searchText }) {
  const chunkArray = (arr, chunkSize) => {
    const chunkedArray = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunkedArray.push(arr.slice(i, i + chunkSize));
    }
    return chunkedArray;
  };

  const filteredData = searchText
    ? data.review.filter(item => item.title.toLowerCase().includes(searchText.toLowerCase()))
    : data.review;

  const chunkedData = chunkArray(filteredData, 3);

  const settings = {
    className: 'slider',
    vertical: true,
    variableWidth: false,
    swipeToSlide: true,
    slidesToShow: 3,
    infinite: false,
    arrows: false,
  };

  return (
    <div className={styles.reviewContainser}>
      <Slider {...settings}>
        {chunkedData.map((group, index) => (
          <div key={index} className='review_group'>
            {group.map(item => (
              <ReviewItem key={item.id} img={item.img} {...item} />
            ))}
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default ReviewList;
