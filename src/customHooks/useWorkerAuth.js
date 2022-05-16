import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { checkUserIsWorker } from './../Utils';

const mapState = ({ user }) => ({
  currentUser: user.currentUser
});

const useWorkerAuth = props => {
  const { currentUser } = useSelector(mapState);
  const history = useHistory();

  useEffect(() => {
    if (!checkUserIsWorker(currentUser)) {
      history.push('/login');
    }

  }, [currentUser]);

  return currentUser;
}

export default useWorkerAuth;