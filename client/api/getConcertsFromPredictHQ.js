import axios from 'axios';

const getConcertsFromPredictHQ = async (latLong) => {
  console.log('latLong: ', latLong);
  try {
    const { data } = await axios.post('/api/getConcerts', { latLong });
    return data;
  } catch (e) {
    console.log(e);
  }
};

export default getConcertsFromPredictHQ;
