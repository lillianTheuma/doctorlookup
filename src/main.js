import $ from 'jquery';
import DoctorService from './doctorService.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';


$(document).ready(function() {
  (async () => {
    let doctorService = new DoctorService();
    const response = await doctorService.getDoctors("pain");
    getElements(response);
  })();

  const getElements = function(response) {
    console.log(response);
  };
});
