import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import newRequest from '../../utils/newRequest';
import './Message.scss';

const Message = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const { isLoading, error, data } = useQuery({
    queryKey: ['messages'],
    queryFn: () => newRequest.get(`/messages/${id}`).then((res) => res.data),
  });

  const mutation = useMutation({
    mutationFn: (message) => {
      return newRequest.post(`/messages/`, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries('messages');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(e.target[0].value);
    mutation.mutate({
      conversationId: id,
      desc: e.target[0].value,
    });
    e.target[0].value = '';
  };

  return (
    <div className="message">
      <div className="container">
        <span className="breadcrumbs">
          {' '}
          <Link to="/messages" className="link">
            MESSAGES
          </Link>{' '}
          &gt; {id} &gt;
        </span>
        {isLoading ? (
          'Loading...'
        ) : error ? (
          'Somethong went wrong!'
        ) : (
          <div className="messages">
            {data.map((m) => (
              <div
                key={m._id}
                className={m.userId === currentUser._id ? 'owner item' : 'item'}
              >
                <img
                  src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                />
                <p>{m.desc}</p>
              </div>
            ))}
          </div>
        )}
        <hr />
        <form onSubmit={handleSubmit} className="writing">
          <textarea
            name=""
            placeholder="Write a message"
            id=""
            cols="30"
            rows="10"
          ></textarea>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Message;
