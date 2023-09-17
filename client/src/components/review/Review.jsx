import { useQuery } from '@tanstack/react-query';
import './Review.scss';
import newRequest from '../../utils/newRequest';

const Review = ({ review }) => {
  const userId = review?.userId;

  const {
    isLoading,
    error,
    data: userData,
  } = useQuery({
    queryKey: ['userId', userId],
    queryFn: () => newRequest.get(`/users/${userId}`).then((res) => res.data),
    enabled: !!userId,
  });
  return (
    <div className="review">
      {isLoading ? (
        'Loading....'
      ) : error ? (
        'Somethong went wrong'
      ) : (
        <div className="user">
          <img
            className="pp"
            src={userData.img || '/img/noavatar.jpg'}
            alt=""
          />
          <div className="info">
            <span>{userData?.username}</span>
            <div className="country">
              <img
                src="https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png"
                alt=""
              />
              <span>{userData?.country}</span>
            </div>
          </div>
        </div>
      )}
      <div className="stars">
        {Array(review.star)
          .fill()
          .map((item, i) => (
            <img src="/img/star.png" alt="" key={i} />
          ))}
        <span>{review.star}</span>
      </div>

      <p>{review.desc}</p>
      <div className="helpful">
        <span>Helpful?</span>
        <img src="/img/like.png" alt="" />
        <span>Yes</span>
        <img src="/img/dislike.png" alt="" />
        <span>No</span>
      </div>
    </div>
  );
};

export default Review;
