import axios from 'axios';

const instance = axios.create(
    {
      baseURL:"https://burgurbuilder-468fb.firebaseio.com/"
    }
);

export default instance;