import './Gig.scss';
import { Slider } from 'infinite-react-carousel';
import { useQuery } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';
import { Link, useParams } from 'react-router-dom';
import Reviews from '../../components/reviews/Reviews';

const Gig = () => {
  const { id } = useParams();

  // First Query
  const { isLoading, error, data } = useQuery({
    queryKey: ['gig'],
    queryFn: () => newRequest.get(`/gigs/single/${id}`).then((res) => res.data),
  });

  const userId = data?.userId;

  const {
    isLoading: isLoadingUser,
    error: userError,
    data: userData,
  } = useQuery({
    queryKey: ['gigUser', data?.userId],
    queryFn: () => newRequest.get(`/users/${userId}`).then((res) => res.data),
    enabled: !!userId && !error,
  });

  if (isLoading) return 'Loading...';
  if (error) return 'something went wrong!';

  return (
    <div className="gig">
      <div className="container">
        <div className="left">
          <span className="breadcrumbs">
            Liverr &gt; Graphics & Design &gt;
          </span>
          <h1>{data.title}</h1>
          {isLoadingUser ? (
            'Loading...'
          ) : userError ? (
            'Something went wrong!'
          ) : (
            <div className="user">
              <img
                className="pp"
                src={userData?.img || '/img/noavatar.jpg'}
                alt=""
              />
              <span>{userData?.username}</span>
              {!isNaN(data.totalStars / data.starNumber) && (
                <div className="stars">
                  {Array(Math.round(data.totalStars / data.starNumber))
                    .fill()
                    .map((item, i) => (
                      <img src="/img/star.png" alt="" key={i} />
                    ))}

                  <span>{Math.round(data.totalStars / data.starNumber)}</span>
                </div>
              )}
            </div>
          )}
          <Slider slidesToShow={1} arrowsScroll={1} className="slider">
            {data.images.map((img, i) => (
              <img key={i} src={img} alt="" />
            ))}
          </Slider>

          <h2>About This Gig</h2>
          <p>{data.desc}</p>
          {isLoadingUser ? (
            'Loading...'
          ) : userError ? (
            'Something went wrong!'
          ) : (
            <div className="seller">
              <h2>About The Seller</h2>
              <div className="user">
                <img src={userData?.img || '/img/noavatar.jpg'} alt="" />
                <div className="info">
                  <span>{userData?.username}</span>
                  {!isNaN(data.totalStars / data.starNumber) && (
                    <div className="stars">
                      {Array(Math.round(data.totalStars / data.starNumber))
                        .fill()
                        .map((item, i) => (
                          <img src="/img/star.png" alt="" key={i} />
                        ))}

                      <span>
                        {Math.round(data.totalStars / data.starNumber)}
                      </span>
                    </div>
                  )}
                  <button>Contact Me</button>
                </div>
              </div>
              <div className="box">
                <div className="items">
                  <div className="item">
                    <span className="title">From</span>
                    <span className="desc">{userData?.country}</span>
                  </div>
                  <div className="item">
                    <span className="title">Member since</span>
                    <span className="desc">Aug 2022</span>
                  </div>
                  <div className="item">
                    <span className="title">Avg. response time</span>
                    <span className="desc">4 hours</span>
                  </div>
                  <div className="item">
                    <span className="title">Last delivery</span>
                    <span className="desc">1 day</span>
                  </div>
                  <div className="item">
                    <span className="title">Languages</span>
                    <span className="desc">English</span>
                  </div>
                </div>
                <hr />
                <p>{userData?.desc}</p>
              </div>
            </div>
          )}
          <Reviews gigId={id} />
        </div>
        <div className="right">
          <div className="price">
            <h3>{data.shortTitle}</h3>
            <h2>$ {data.price}</h2>
          </div>
          <p>{data.shortDesc}</p>
          <div className="details">
            <div className="item">
              <img src="/img/clock.png" alt="" />
              <span>{data.deliveryTime} Days Delivery</span>
            </div>
            <div className="item">
              <img src="/img/recycle.png" alt="" />
              <span>{data.revisionNumber} Revisions</span>
            </div>
          </div>
          <div className="features">
            {data?.features?.map((f) => (
              <div key={f} className="item">
                <img src="/img/greencheck.png" alt="" />
                <span>{f}</span>
              </div>
            ))}
          </div>
          <Link to={`/pay/${id}`}>
            <button>Continue</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Gig;
