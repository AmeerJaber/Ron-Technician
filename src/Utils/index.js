import axios from 'axios';

export const checkUserIsAdmin = currentUser => {
  if (!currentUser || !Array.isArray(currentUser.userRoles)) return false;
  const { userRoles } = currentUser;
  if (userRoles.includes('admin')) return true;

  return false;
}

export const checkUserIsWorker = currentUser => {
  if (!currentUser || !Array.isArray(currentUser.userRoles)) return false;
  const { userRoles } = currentUser;
  if (userRoles.includes('worker')) return true;

  return false;
}

export const apiInstance = axios.create({
  baseURL: 'http://localhost:5001/rontechnician-68174/us-central1/api'
});
