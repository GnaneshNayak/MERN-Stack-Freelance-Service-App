import { useQuery } from '@tanstack/react-query';
import newRequest from '../utils/newRequest';

// const {
//   isLoading: isLoadingUser,
//   error: userError,
//   data: userData,
// }

const useUser = (userId) =>
  useQuery({
    queryKey: ['gigUser'],
    queryFn: () => newRequest.get(`/users/${userId}`).then((res) => res.data),
  });

export default useUser;
