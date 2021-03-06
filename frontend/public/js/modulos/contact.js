'use strict';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import Swal from 'sweetalert2';
import endpoint from './api';
import functions from './functions';

let opcionContact = null;
let idContact,
  nameContact,
  lastnameContact,
  positionContact,
  emailContact,
  companyContact,
  regionContact,
  countryContact,
  cityContact,
  addressContact,
  interestContact,
  channelContact,
  userAccountContact,
  preferencesContact,
  filaContact;

const formContact = document.getElementById('formContact');
const modalContact = document.getElementById('modalContact');
const modalHeaderContact = document.querySelector('.modal-header-contact');
const modalTitleContact = document.querySelector('.modal-title-contact');
const inputIdContact = document.getElementById('contactId');
const inputNameContact = document.getElementById('contactName');
const inputLastNameContact = document.getElementById('contactLastName');
const inputPositionContact = document.getElementById('contactPosition');
const inputEmailContact = document.getElementById('contactEmail');
const selectCompanyContact = document.getElementById('contactCompany');
const selectRegionContact = document.getElementById('contactRegion');
const selectCountryContact = document.getElementById('contactCountry');
const selectCityContact = document.getElementById('contactCity');
const inputAddressContact = document.getElementById('contactAddress');
const progressContact = document.getElementById('contactInterest');
const selectPercentageContact = document.getElementById('contactPercentage');
const selectChannelContact = document.getElementById('contactChannel');
const inputUserAccountContact = document.getElementById('contactUserAccount');
const selectPreferencesContact = document.getElementById('contactPreferences');
const addChannelContact = document.getElementById('contactAddChannel');
const menuContact = document.querySelector('.menuContact');
const contenedorTableContact = document.querySelector('.contenedor-table');

if (contenedorTableContact) {
  contenedorTableContact.addEventListener('click', (e) => {
    const tagName = e.target;
    if (tagName.classList.contains('btnCrearContact')) {
      createdContactId();
    }
    if (tagName.classList.contains('btnEditarContact')) {
      editContactId(e);
    }
    if (tagName.classList.contains('btnBorrarContact')) {
      deletedContactId(e);
    }
  });
}

if (menuContact) {
  menuContact.addEventListener('click', async () => {
    await renderTableContact();
  });
}

async function renderTableContact() {
  $('.contenedor-table').empty();
  $('.contenedor-table').append(`
    <div class="container-fluid">
      <button id="btnCrearContact" class="btn btn-dark mt-2 btnCrearContact">Crear Contacto</button>
      <br>
      <br>
      <div class="row">
        <div class="col">
          <table id="tableContact" class="table table-striped table-bordered" style="width:100%;">
            <thead>
              <tr>
                <th><input type="checkbox"></th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Email</th>
                <th>Cargo</th>
                <th>Dirección</th>
                <th>Interés</th>
                <th>Usuario</th>
                <th>Canal</th>
                <th>Preferencia</th>
                <th>Ciudad</th>
                <th>País</th>
                <th>Región</th>
                <th>Compañía</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>  
    </div>
  `);
  const contacts = await endpoint.renderDataContact();
  $('#tableContact').DataTable({
    data: contacts,
    scrollY: '500px',
    scrollX: true,
    scrollCollapse: true,
    paging: false,
    deferRender: true,
    retrieve: true,
    proccesing: true,
    destroy: true,
    dom: 'Bfrtilp',
    buttons: functions.buttonsTable,
    order: [],
    columns: [
      {
        data: null,
      },
      { data: 'name' },
      { data: 'lastname' },
      { data: 'email' },
      { data: 'position' },
      { data: 'address' },
      { data: null },
      { data: 'useraccount' },
      { data: null },
      { data: null },
      { data: null },
      { data: null },
      { data: null },
      { data: null },
      {
        defaultContent:
          "<div class='text-center'><div class='btn-group'><button class='btn btn-info btn-sm btnEditarContact'>Editar</button><button class='btn btn-danger btn-sm btnBorrarContact'>Borrar</button></div></div>",
      },
    ],
    columnDefs: [
      {
        targets: 0,
        data: 'id',
        render: function (data) {
          return "<input type='checkbox' data-idcontact=" + data.id + ' />';
        },
      },
      {
        targets: 6,
        data: 'interests',
        render: function (data) {
          const percentage = data.interests;
          const number = +percentage.replace('%', '');
          return (
            '<span>' +
            data.interests +
            '</span> <progress value=' +
            number +
            " max='100'></progress>"
          );
        },
      },
      {
        targets: 8,
        data: 'Channel',
        render: function (data) {
          return (
            '<span data-idchannel=' +
            data.Channel.id +
            '>' +
            data.Channel.name +
            '</span>'
          );
        },
      },
      {
        targets: 9,
        data: 'Preference',
        render: function (data) {
          return (
            '<span data-idpreference=' +
            data.Preference.id +
            '>' +
            data.Preference.name +
            '</span>'
          );
        },
      },
      {
        targets: 10,
        data: 'City',
        render: function (data) {
          if (data.City) {
            return (
              '<span data-idcity=' +
              data.City.id +
              '>' +
              data.City.name +
              '</span>'
            );
          } else {
            return '<span></span>';
          }
        },
      },
      {
        targets: 11,
        data: 'Country',
        render: function (data) {
          if (data.Country) {
            return (
              '<span data-idcountry=' +
              data.Country.id +
              '>' +
              data.Country.name +
              '</span>'
            );
          } else {
            return '<span></span>';
          }
        },
      },
      {
        targets: 12,
        data: 'Region',
        render: function (data) {
          if (data.Region) {
            return (
              '<span data-idregion=' +
              data.Region.id +
              '>' +
              data.Region.name +
              '</span>'
            );
          } else {
            return '<span></span>';
          }
        },
      },
      {
        targets: 13,
        data: 'Company',
        render: function (data) {
          if (data.Company) {
            return (
              '<span data-idcompany=' +
              data.Company.id +
              '>' +
              data.Company.name +
              '</span>'
            );
          } else {
            return '<span></span>';
          }
        },
      },
    ],
  });
}

//CREAR
async function createdContactId() {
  opcionContact = 'crear';
  idContact = null;
  formContact.reset();
  modalHeaderContact.style.backgroundColor = '#23272b';
  modalHeaderContact.style.color = '#FFFFFF';
  modalTitleContact.innerHTML = 'Crear Contacto';
  $(modalContact).modal('show');
  const companys = await endpoint.getCompanys();
  functions.renderOptionSelect(
    selectCompanyContact,
    companys,
    '',
    'Seleccionar compañía'
  );
  const regions = await endpoint.getRegions();
  functions.renderOptionSelect(
    selectRegionContact,
    regions,
    '',
    'Seleccionar región'
  );
  const channels = await endpoint.getChannels();
  functions.renderOptionSelect(selectChannelContact, channels, '', 'Canal');
  const preferences = await endpoint.getPreferences();
  functions.renderOptionSelect(
    selectPreferencesContact,
    preferences,
    '',
    'Preferencia'
  );
}

if (selectRegionContact) {
  selectRegionContact.addEventListener('change', async () => {
    const id = selectRegionContact.value;
    const countrys = await endpoint.getCountrysRegionId(id);
    functions.renderOptionSelect(
      selectCountryContact,
      countrys,
      '',
      'Seleccionar país'
    );
  });
}

if (selectCountryContact) {
  selectCountryContact.addEventListener('change', async () => {
    const id = selectCountryContact.value;
    const citys = await endpoint.getCitysContactCountryId(id);
    functions.renderOptionSelect(
      selectCityContact,
      citys,
      '',
      'Seleccionar ciudad'
    );
  });
}

//EDITAR
async function editContactId(e) {
  opcionContact = 'editar';
  filaContact = e.path[4];
  idContact = +filaContact
    .getElementsByTagName('td')[0]
    .querySelector('input')
    .dataset.idcontact.trim();
  nameContact = filaContact.getElementsByTagName('td')[1].innerHTML.trim();
  lastnameContact = filaContact.getElementsByTagName('td')[2].innerHTML.trim();
  emailContact = filaContact.getElementsByTagName('td')[3].innerHTML.trim();
  positionContact = filaContact.getElementsByTagName('td')[4].innerHTML.trim();
  addressContact = filaContact.getElementsByTagName('td')[5].innerHTML.trim();
  interestContact = filaContact
    .getElementsByTagName('td')[6]
    .querySelector('span')
    .innerHTML.trim();
  userAccountContact = filaContact
    .getElementsByTagName('td')[7]
    .innerHTML.trim();
  channelContact = +filaContact
    .getElementsByTagName('td')[8]
    .querySelector('span').dataset.idchannel;
  preferencesContact = +filaContact
    .getElementsByTagName('td')[9]
    .querySelector('span').dataset.idpreference;
  cityContact = +filaContact
    .getElementsByTagName('td')[10]
    .querySelector('span').dataset.idcity;
  countryContact = +filaContact
    .getElementsByTagName('td')[11]
    .querySelector('span').dataset.idcountry;
  regionContact = +filaContact
    .getElementsByTagName('td')[12]
    .querySelector('span').dataset.idregion;
  companyContact = +filaContact
    .getElementsByTagName('td')[13]
    .querySelector('span').dataset.idcompany;

  inputIdContact.value = +idContact;
  inputNameContact.value = nameContact;
  inputLastNameContact.value = lastnameContact;
  inputPositionContact.value = positionContact;
  inputEmailContact.value = emailContact;
  selectCompanyContact.value = +companyContact;
  selectRegionContact.value = +regionContact;
  selectCountryContact.value = +countryContact;
  selectCityContact.value = +cityContact;
  inputAddressContact.value = addressContact;
  selectPercentageContact.value = interestContact;
  progressContact.value = +interestContact.replace('%', '');
  selectChannelContact.value = +channelContact;
  inputUserAccountContact.value = userAccountContact;
  selectPreferencesContact.value = preferencesContact;

  modalHeaderContact.style.backgroundColor = '#17A2B8';
  modalHeaderContact.style.color = '#FFFFFF';
  modalTitleContact.innerHTML = 'Editar Contacto';

  const companys = await endpoint.getCompanys();
  functions.renderOptionSelect(
    selectCompanyContact,
    companys,
    +companyContact,
    'Seleccionar compañía'
  );
  const regions = await endpoint.getRegions();
  functions.renderOptionSelect(
    selectRegionContact,
    regions,
    +regionContact,
    'Seleccionar región'
  );
  const countrys = await endpoint.getCountrys();
  functions.renderOptionSelect(
    selectCountryContact,
    countrys,
    +countryContact,
    'Seleccionar país'
  );
  const citys = await endpoint.getCitys();
  functions.renderOptionSelect(
    selectCityContact,
    citys,
    +cityContact,
    'Seleccionar ciudad'
  );
  const channels = await endpoint.getChannels();
  functions.renderOptionSelect(
    selectChannelContact,
    channels,
    +channelContact,
    'Canal'
  );
  const preferences = await endpoint.getPreferences();
  functions.renderOptionSelect(
    selectPreferencesContact,
    preferences,
    +preferencesContact,
    'Preferencia'
  );

  $(modalContact).modal('show');
}

//BORRAR
async function deletedContactId(e) {
  filaContact = e.path[4];
  idContact = +filaContact
    .getElementsByTagName('td')[0]
    .querySelector('input')
    .dataset.idcontact.trim();
  Swal.fire({
    title: '¿Confirma eliminar el registro?',
    showCancelButton: true,
    confirmButtonText: `Confirmar`,
  }).then(async (result) => {
    if (result.isConfirmed) {
      const deleteCompany = await endpoint.deletedContact(idContact);
      if (deleteCompany.status === 200) {
        Swal.fire('¡Registro Eliminado!', '', 'success');
        await renderTableContact();
      } else {
        Swal.fire('!No se pudo eliminar el registro!', '', 'error');
        await renderTableContact();
      }
    }
  });
}

//submit para el CREAR y EDITAR
formContact.addEventListener('submit', async (e) => {
  e.preventDefault();
  const contact = {
    id: +inputIdContact.value.trim(),
    name: inputNameContact.value.trim(),
    lastname: inputLastNameContact.value.trim(),
    position: inputPositionContact.value.trim(),
    email: inputEmailContact.value.trim(),
    companyId: +selectCompanyContact.value.trim(),
    regionId: +selectRegionContact.value.trim(),
    countryId: +selectCountryContact.value.trim(),
    cityId: +selectCityContact.value.trim(),
    address: inputAddressContact.value.trim(),
    interests: selectPercentageContact.value.trim(),
    channelId: +selectChannelContact.value.trim(),
    useraccount: inputUserAccountContact.value.trim(),
    preferencesId: +selectPreferencesContact.value.trim(),
  };
  if (opcionContact === 'crear') {
    const contactCreated = await endpoint.createdContact(contact);
    if (contactCreated.status === 201) {
      Swal.fire('!Registro creado!', '', 'success');
      await renderTableContact();
    } else {
      Swal.fire('!Error', '', 'error');
      await renderTableContact();
    }
  }
  if (opcionContact === 'editar') {
    const contactUpdated = await endpoint.updatedContact(contact);
    if (contactUpdated.status === 200) {
      Swal.fire('!Registro actualizado!', '', 'success');
      await renderTableContact();
    } else {
      Swal.fire('!Error', '', 'error');
      await renderTableContact();
    }
  }
  $(modalContact).modal('hide');
});

//validar si existe EMAIL
inputEmailContact.addEventListener('blur', async () => {
  emailContact = inputEmailContact.value.trim();
  if (emailContact !== '') {
    const validEmailContact = await endpoint.getContactEmail(emailContact);
    functions.renderSpanError(
      validEmailContact,
      inputEmailContact,
      'Email ya existe'
    );
  }
});

if (selectPercentageContact) {
  selectPercentageContact.addEventListener('change', () => {
    const percentage = selectPercentageContact.value;
    progressContact.value = +percentage.replace('%', '');
  });
}

export default renderTableContact;
