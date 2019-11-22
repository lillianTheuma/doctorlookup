export default class DoctorService {
  async getDoctors(search) {
    try {
      let response = await fetch(`https://api.betterdoctor.com/2016-03-01/doctors?user_key=${process.env.API_KEY}&location=OR&query=`+search);
      let jsonifiedResponse = await response.json();
      return jsonifiedResponse;
    } catch(error) {
      return error;
    }
  }
}
