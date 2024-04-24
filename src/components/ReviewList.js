import React from 'react';
import Slider from 'react-slick';
import ReviewItem from './ReviewItem';
import styles from './styles/Review.module.css';
import './ReviewList.css';

function ReviewList({ sortedData, searchText }) {
  //주어진 배열(arr)을 입력되는 사이즈(chunkSize) 만큼 잘라서 push
  const chunkArray = (arr, chunkSize) => {
    const chunkedArray = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunkedArray.push(arr.slice(i, i + chunkSize));
    }
    return chunkedArray;
  };

  // 검색어(제목)와 일치하는 데이터 추출(혹시 영어가 입력되면 소문자로 다 바꿔서 비교)
  // 검색어가 없으면 그냥 전부 추출.
  // const getFilteredData = () => {
  //   console.log('검색어:' + searchText);
  //   if (searchText === '') {
  //     return sortedData;
  //   }
  //   return sortedData.filter((item) => item.title.includes(searchText));
  // };

  const filteredData = searchText
    ? sortedData.filter((item) => item.title.includes(searchText))
    : sortedData;

  //3개씩 추출
  const chunkedData = chunkArray(filteredData, 3);

  // const settings = {
  //   className: 'slider',
  //   vertical: true,
  //   variableWidth: true, //false
  //   swipeToSlide: true,
  //   slidesToShow: 3,
  //   infinite: false,
  //   arrows: false,
  // };

  return (
    <div className="reviewContainer">
      {/* <Slider {...settings}> */}
      {chunkedData.map((group, index) => (
        <div key={index} className="review_group">
          {group.map((item) => (
            <ReviewItem key={item.id} img={item.img} {...item} />
          ))}
        </div>
      ))}
      {/* </Slider> */}
    </div>
  );
}

export default ReviewList;
