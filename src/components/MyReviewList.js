import React from 'react';
import styles from './styles/ReviewList.module.css';
import MyReviewItem from './MyReviewItem';

function MyReviewListEdit({ sortedData, searchText }) {
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

  const chunkedData = chunkArray(filteredData, 3);

  return (
    <div className={styles.reviewContainer}>
      {chunkedData.map((group, index) => (
        <div key={index} className={styles.review_group}>
          {group.map((item) => (
            <MyReviewItem key={item.id} img={item.imgName} {...item} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default MyReviewListEdit;
