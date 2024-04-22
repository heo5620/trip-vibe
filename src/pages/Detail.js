import { useParams } from 'react-router-dom';
const Detail = () => {
  const params = useParams();
  return <div>{params.id}번 상세 페이지입니다.</div>;
};

export default Detail;
