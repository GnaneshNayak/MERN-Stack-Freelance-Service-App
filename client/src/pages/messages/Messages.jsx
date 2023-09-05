import './Messages.scss';
import { Link } from 'react-router-dom';

const Messages = () => {
  // const currentUser = {
  //   id: 1,
  //   userName: 'Gnanesh nayak',
  //   isSeller: true,
  // };

  const message =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, harum! Corrupti officia nesciunt rem ullam quibusdam quidem porro placeat doloremque sequi, blanditiis possimus illum modi, impedit excepturi expedita minus corporis';

  return (
    <div className="messages">
      <div className="container">
        <div className="title">
          <h1>Messages</h1>
        </div>
        <table>
          <tr>
            <th>Buyer</th>
            <th>Last Message</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
          <tr className="active">
            <td>Gnanesh</td>
            <td>
              <Link to={`/message/gneshn`} className="link">
                {message.substring(0, 100)}...
              </Link>
            </td>
            <td>1 day ago</td>
            <td>
              <button>Mark as Read</button>
            </td>
          </tr>
          <tr className="active">
            <td>John Doe</td>

            <td>
              <Link to={'/message/sasa'} className="link">
                {message.substring(0, 100)}...
              </Link>
            </td>
            <td>2 hours ago</td>
            <td>
              <button>Mark as Read</button>
            </td>
          </tr>
          <tr>
            <td>Elinor Good</td>
            <td>
              <Link to={'/message/123'} className="link">
                {message.substring(0, 100)}...
              </Link>
            </td>
            <td>1 day ago</td>
          </tr>
          <tr>
            <td>Garner David </td>
            <td>
              <Link to={'/message/sas'} className="link">
                {message.substring(0, 100)}...
              </Link>
            </td>
            <td>2 days ago</td>
          </tr>
          <tr>
            <td>Troy Oliver</td>
            <td>{message.substring(0, 100)}</td>
            <td>1 week ago</td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default Messages;
