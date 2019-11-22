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
    response = response.data;
    response.forEach(function(doctor) {
      $("#output").append(`
        <div class="card">
        <div class="card-header">
        ${doctor.profile.first_name} ${doctor.profile.last_name}
        </div> <!-- class = card-header -->
        <div class="card-body">
        Specialies: ${doctor.specialties[0].actor}
        <ul class="list-group list-group-flush" id="${doctor.profile.first_name}${doctor.profile.last_name}">
        </ul>
        </div> <!-- class = card-body -->
        <div class="card-footer">

        </div> <!-- class = card-footer -->
        </div> <!-- class = card -->
      `);
      doctor.practices.forEach(function(practice) {
        $("#"+doctor.profile.first_name+doctor.profile.last_name).append(`
          <li class="list-group-item">
          Practice: ${practice.name} <br>
          Location: ${practice.visit_address.street}, ${practice.visit_address.city} ${practice.visit_address.state}, ${practice.visit_address.zip}<br>
          Accepting New Patients: ${practice.accepts_new_patients}
        `);
      });
    });
    console.log(response);
  };
});
