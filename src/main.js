import DoctorService from './doctorService.js';
import './styles.css';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';


$(document).ready(function() {
  let doctorService = new DoctorService();
  console.log(doctorService.getDoctors());
});
