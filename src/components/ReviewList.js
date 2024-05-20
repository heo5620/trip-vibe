import React from 'react';
import ReviewItem from './ReviewItem';
import styles from './styles/ReviewList.module.css';

function ReviewList({ sortedData, searchText }) {
  //주어진 배열(arr)을 입력되는 사이즈(chunkSize) 만큼 잘라서 push
  const chunkArray = (arr, chunkSize) => {
    const chunkedArray = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunkedArray.push(arr.slice(i, i + chunkSize));
    }
    return chunkedArray;
  };

  const filteredData = searchText
    ? sortedData.filter((item) => item.title.includes(searchText))
    : sortedData;

  //3개씩 추출
  const chunkedData = chunkArray(filteredData, 3);

  return (
    <div className={styles.reviewContainer}>
      {chunkedData.map((group, index) => (
        <div key={index} className={styles.review_group}>
          {group.map((item) => (
            <ReviewItem key={item.id} img={item.imgName} {...item} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default ReviewList;
