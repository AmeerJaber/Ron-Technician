import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { checkUserIsWorker } from './../../Utils';
import './styles.scss';

const mapState = ({ user }) => ({
  currentUser: user.currentUser
})

const WorkerToolbar = props => {
  const { currentUser } = useSelector(mapState);

  const isWorker = checkUserIsWorker(currentUser);
  if (!isWorker) return null;

  return (
    <div className="workerToolbar">
      <ul>
        <li>
          <Link to="/worker">
            סרגל עובד
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default WorkerToolbar;