import { useWorkerAuth } from './../customHooks';

const WithWorkerAuth = props => useWorkerAuth(props) && props.children;

export default WithWorkerAuth;