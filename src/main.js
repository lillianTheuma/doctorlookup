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
        Specialies:
        <ul class="list-group list-group-flush" id="${doctor.npi}"></ul>
        Practices:
        <ul class="list-group list-group-flush" id="${doctor.profile.first_name}${doctor.profile.last_name}"></ul>
        </div> <!-- class = card-body -->
        <div class="card-footer">

        </div> <!-- class = card-footer -->
        </div> <!-- class = card -->
      `);
      doctor.specialties.forEach(function(specialty) {
        $("#"+doctor.npi).append(`
          <li class="list-group-item">
            ${specialty.name}
          </li>
          <li class="list-group-item">
            ${specialty.description}
          </li>
        `)
      });
      doctor.practices.forEach(function(practice) {
        $("#"+doctor.profile.first_name+doctor.profile.last_name).append(`
          <li class="list-group-item">
          Practice: ${practice.name} <br>
          Location: ${practice.visit_address.street}, ${practice.visit_address.city} ${practice.visit_address.state}, ${practice.visit_address.zip}<br>
          Phone Numbers:
          <ul class="list-group list-group-flush" id="${practice.uid}">
          </ul>
          Accepting New Patients: ${practice.accepts_new_patients}
        `);
        practice.phones.forEach(function(phone) {
          $("#"+practice.uid).append(`
            <li class="list-group-item> ${phone.type}: ${phone.number}"
          `);
        });
      });
    });
    console.log(response);
  };
});
