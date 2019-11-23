import $ from 'jquery';
import DoctorService from './doctorService.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';


$(document).ready(function() {
  $("#search").submit(function(event) {
    const search = $("#keyword").val();
    event.preventDefault();
    (async () => {
      let doctorService = new DoctorService();
      const response = await doctorService.getDoctors(search);
      getElements(response);
    })(); // async() => {}
  }); // $("#search").submit(function(event){})

  const getElements = (response) => {
    $("#output").html("");
    if (response.meta.error) {
      $("#output").html(`
        <div class="card">
          <div class="card-header">
          <p class="card-text"> We were unable to process your request </p>
          </div> <!-- class = card-header -->
          <div class="card-body">
          <p class="card-text"> Error ${response.meta.http_status_code}: ${response.meta.message} </p>
          </div>
          </div> <!-- class = card -->
        `); // $("#output").html(``)
    } else if (response.data[0]) {
      response.data.forEach(function(doctor) {
        $("#output").append(`
          <div class="card">
          <div class="card-header">
          ${doctor.profile.first_name} ${doctor.profile.last_name}
          <img class="card-img-top" src="${doctor.profile.image_url}" alt="image of doctor ${doctor.profile.first_name} ${doctor.profile.last_name}">
          </div> <!-- class = card-header -->
          <div class="card-body">
          Specialies:
          <ul class="list-group list-group-flush" id="${doctor.npi}"></ul>
          Practices:
          <ul class="list-group list-group-flush" id="${doctor.profile.first_name}${doctor.profile.last_name}"></ul>
          </div> <!-- class = card-body -->
          </div> <!-- class = card -->
        `); // $("#output").append(``)
        doctor.specialties.forEach(function(specialty) {
          $("#"+doctor.npi).append(`
            <li class="list-group-item">
            ${specialty.name}
            </li>
            <li class="list-group-item">
            ${specialty.description}
            </li>
          `); // $("#"+doctor.npi).append(``)
        }); // doctor.specialties.forEach(function(specialty) {})
        doctor.practices.forEach(function(practice) {
          if (practice.accepts_new_patients) {
            practice.accepts_new_patients = "Yes";
          } else {
            practice.accepts_new_patients = "No";
          } // else
          $("#"+doctor.profile.first_name+doctor.profile.last_name).append(`
            <li class="list-group-item">
            Practice: ${practice.name} <br>
            Location: ${practice.visit_address.street}, ${practice.visit_address.city} ${practice.visit_address.state}, ${practice.visit_address.zip}<br>
            Phone Numbers:
            <ul class="list-group list-group-flush" id="${practice.uid}"></ul>
            Accepting New Patients: ${practice.accepts_new_patients}
          `); // $("#"+doctor.profile.first_name+doctor.profile.last_name).append(`
          practice.phones.forEach(function(phone) {
            $("#"+practice.uid).append(`
              <li class="list-group-item"> ${phone.type}: ${phone.number}</li>
            `); // $("#"+practice.uid).append
          }); // practice.phones.forEach(function(phone)
        }); // doctor.practices.forEach(function(practice)
      }); // response.data.forEach(function(doctor)
    } else {
      $("#output").html(`
        <div class="card">
        <div class="card-header">
        </div> <!-- class = card-header -->
        <div class="card-body">
        <p class="card-text">We could not find any doctors meeting your criteria.</p>
        </div>
        </div> <!-- class = card -->
      `); // $("#output").html(
    } // else
  }; // const getElements = (response) => {}
}); // $(document).ready(function() {})
