import axios from 'axios';

const getConcertsFromPredictHQ = async (coords) => {
  // console.log('latLong: ', latLong);
  try {
    const { data } = await axios.post('/api/concerts', coords);
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
  }
};

export default getConcertsFromPredictHQ;
