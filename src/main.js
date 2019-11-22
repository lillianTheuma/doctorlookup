import DoctorService from './doctorService.js';
import './styles.css';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';


$(document).ready(function() {
  (async () => {
    let doctorService = new DoctorService();
    const response = await doctorService.getDoctors("pain");
    getElements(response);
  })();

  const getElements = function(response) {
  };
});
