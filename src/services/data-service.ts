import dotenv from 'dotenv';
import http from '@/services/http';

const dotnetConfig = dotenv.config();

class DataService {
  login_user(data: any) {
    console.log(data);
    return http.post(`User/Login`, JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
      },
    });
  }

  logout(data: any) {
    return http.post(`User/Logout/${data.systemUserId}`, null, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
        credentials: 'include',
      },
    });
  }

  auto_logout(data: any) {
    return http.post(`User/AutoLogout/${data.systemUserId}`, null, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
        credentials: 'include',
      },
    });
  }

  invalidate_session(data: any) {
    return http.post(`User/InvalidateSession`, JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
        credentials: 'include',
      },
    });
  }

  reset_password(data: any) {
    return http.post(`User/ResetPassword`, JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
        credentials: 'include',
      },
    });
  }

  change_password(data: any) {
    return http.post(`User/ChangePassword`, JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
        credentials: 'include',
      },
    });
  }

  get_splash(data: any) {
    return http.get('Splash/InitialData', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${data.token}`,
        'x-api-key': process.env.API_KEY,
      },
    });
  }

  create_user(data: any) {
    return http.post('User/CreateUser', JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${data.token}`,
        'x-api-key': process.env.API_KEY,
      },
    });
  }

  fetch_lab_users(data: any) {
    return http.get(`Laboratory/FetchLaboratoryUsers/${data.laboratoryId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${data.token}`,
        'x-api-key': process.env.API_KEY,
      },
    });
  }

  fetch_patients(data: any) {
    return http.get(`Patient/FetchLaboratoryPatients/${data?.laboratoryId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${data?.token}`,
        'x-api-key': process.env.API_KEY,
      },
    });
  }

  register_patient(data: any) {
    return http.post(`Patient/CreatePatient`, data, {
      headers: {
        Authorization: `Bearer ${data.token}`,
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
      },
    });
  }

  patient_profile(data: any) {
    return http.get(`Patient/FetchPatientDetails/${data?.patientId}`, {
      headers: {
        Authorization: `Bearer ${data.token}`,
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
      },
    });
  }

  checkin_patient(data: any) {
    return http.post(`Patient/CheckinPatient`, JSON.stringify(data), {
      headers: {
        Authorization: `Bearer ${data.token}`,
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
      },
    });
  }

  start_checkin(data: any) {
    return http.post(`Patient/StartCheckin/${data?.checkinId}`, null, {
      headers: {
        Authorization: `Bearer ${data.token}`,
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
      },
    });
  }

  end_checkin(data: any) {
    return http.post(`Patient/EndCheckin/${data?.checkinId}`, null, {
      headers: {
        Authorization: `Bearer ${data.token}`,
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
      },
    });
  }

  fetch_checkins(data: any) {
    return http.get(`Patient/FetchLabCheckins/${data?.laboratoryId}`, {
      headers: {
        Authorization: `Bearer ${data?.token}`,
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
      },
    });
  }

  fetch_active_checkin(data: any) {
    return http.get(`Patient/FetchPatientActiveVisit/${data?.patientId}`, {
      headers: {
        Authorization: `Bearer ${data?.token}`,
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
      },
    });
  }

  create_request(data: any) {
    return http.post(`Patient/CreateLabRequest`, JSON.stringify(data), {
      headers: {
        Authorization: `Bearer ${data?.token}`,
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
        ClientId: process.env.CLIENT_ID,
      },
    });
  }

  fetch_patient_requests(data: any) {
    return http.get(`Patient/FetchLabRequests/${data?.patientId}`, {
      headers: {
        Authorization: `Bearer ${data?.token}`,
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
      },
    });
  }

  fetch_lab_requests(data: any) {
    return http.get(`LabRequest/FetchLabRequests/${data?.laboratoryId}`, {
      headers: {
        Authorization: `Bearer ${data?.token}`,
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
      },
    });
  }

  refresh_lab_requests(data: any) {
    return http.post(`LabRequest/RefreshRequests`, null, {
      headers: {
        Authorization: `Bearer ${data?.token}`,
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
      },
    });
  }

  fetch_request_details(data: any) {
    return http.get(`LabRequest/FetchLabRequestProfile/${data?.labRequestId}`, {
      headers: {
        Authorization: `Bearer ${data?.token}`,
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
      },
    });
  }

  create_request_specimen(data: any) {
    return http.post(`LabRequest/CreateRequestSpecimen`, JSON.stringify(data), {
      headers: {
        Authorization: `Bearer ${data?.token}`,
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
      },
    });
  }

  fetch_request_results(data: any) {
    return http.get(`Result/FetchMachineResults`, {
      headers: {
        Authorization: `Bearer ${data?.token}`,
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
      },
    });
  }

  fetch_result_details(data: any) {
    return http.get(
      `Result/FetchRequestResultDetails/${data?.requestResultId}`,
      {
        headers: {
          Authorization: `Bearer ${data?.token}`,
          'Content-Type': 'application/json',
          'x-api-key': process.env.API_KEY,
        },
      }
    );
  }

  fetch_parameters(data: any) {
    return http.get(`Parameter/FetchParameter`, {
      headers: {
        Authorization: `Bearer ${data?.token}`,
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
      },
    });
  }

  post_vitals(data: any) {
    return http.post(`Patient/CreateVitals`, JSON.stringify(data), {
      headers: {
        Authorization: `Bearer ${data?.token}`,
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
      },
    });
  }

  fetch_vitals(data: any) {
    return http.get(`Patient/FetchPatientVitals/${data?.patientId}`, {
      headers: {
        Authorization: `Bearer ${data?.token}`,
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
      },
    });
  }

  create_notes(data: any) {
    return http.post(`Patient/CreateNotes`, JSON.stringify(data), {
      headers: {
        Authorization: `Bearer ${data?.token}`,
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
      },
    });
  }

  fetch_notes(data: any) {
    return http.get(`Patient/FetchPatientNotes/${data?.patientId}`, {
      headers: {
        Authorization: `Bearer ${data?.token}`,
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
      },
    });
  }

  fetch_overview(data: any) {
    return http.get(`Patient/FetchPatientOverview/${data?.patientId}`, {
      headers: {
        Authorization: `Bearer ${data?.token}`,
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
      },
    });
  }

  create_lab_parameter(data: any) {
    return http.post(`Parameter/CreateLabParameter`, JSON.stringify(data), {
      headers: {
        Authorization: `Bearer ${data?.token}`,
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
      },
    });
  }

  authorize_results(data: any) {
    return http.put(`Result/AuthorizeResult`, JSON.stringify(data), {
      headers: {
        Authorization: `Bearer ${data?.token}`,
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
      },
    });
  }

  fetch_lab_parameters(data: any) {
    return http.get(`Parameter/FetchLabParameters/${data?.laboratoryId}`, {
      headers: {
        Authorization: `Bearer ${data?.token}`,
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
      },
    });
  }

  create_specimen(data: any) {
    return http.post(`Specimen/CreateSpecimen`, JSON.stringify(data), {
      headers: {
        Authorization: `Bearer ${data?.token}`,
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
      },
    });
  }

  fetch_specimens(data: any) {
    return http.get(`Specimen/FetchSpecimenList`, {
      headers: {
        Authorization: `Bearer ${data?.token}`,
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
      },
    });
  }

  fetch_department(data: any) {
    return http.get(`Department/FetchDepartments`, {
      headers: {
        Authorization: `Bearer ${data?.token}`,
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
      },
    });
  }

  create_department(data: any) {
    return http.post(`Department/CreateDepartment`, JSON.stringify(data), {
      headers: {
        Authorization: `Bearer ${data?.token}`,
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
      },
    });
  }

  create_sections(data: any) {
    return http.post(`Section/CreateSection`, JSON.stringify(data), {
      headers: {
        Authorization: `Bearer ${data?.token}`,
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
      },
    });
  }

  fetch_sections(data: any) {
    return http.get(`Section/FetchSections`, {
      headers: {
        Authorization: `Bearer ${data?.token}`,
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
      },
    });
  }

  fetch_clients(data: any) {
    return http.get(`Client/FetchClients`, {
      headers: {
        Authorization: `Bearer ${data?.token}`,
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
      },
    });
  }

  fetch_equipments(data: any) {
    return http.get(`Equipment/FetchEquipment`, {
      headers: {
        Authorization: `Bearer ${data?.token}`,
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
      },
    });
  }

  create_equipment(data: any) {
    return http.post(`Equipment/CreateEquipment`, JSON.stringify(data), {
      headers: {
        Authorization: `Bearer ${data?.token}`,
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
      },
    });
  }

  fetch_equipment(data: any) {
    return http.get(`Equipment/FetchEquipmentProfile/${data?.equipmentId}`, {
      headers: {
        Authorization: `Bearer ${data?.token}`,
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
      },
    });
  }

  fetch_groups(data: any) {
    return http.get(`Parameter/FetchInParameterGroups`, {
      headers: {
        Authorization: `Bearer ${data?.token}`,
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
      },
    });
  }

  create_inparameter(data: any) {
    return http.post(`Parameter/CreateInParameter`, JSON.stringify(data), {
      headers: {
        Authorization: `Bearer ${data?.token}`,
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
      },
    });
  }

  fetch_waitlist(data: any) {
    return http.get(`Waitlist/FetchWaitlist/${data?.laboratoryId}`, {
      headers: {
        Authorization: `Bearer ${data?.token}`,
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
      },
    });
  }

  fetch_waitlist_profile(data: any) {
    return http.get(`Waitlist/FetchWaitlistProfile/${data?.labRequestId}`, {
      headers: {
        Authorization: `Bearer ${data?.token}`,
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
      },
    });
  }

  fetch_inparameters(data: any) {
    return http.get(`Parameter/FetchInParameterList/${data?.parameterId}`, {
      headers: {
        Authorization: `Bearer ${data?.token}`,
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
      },
    });
  }

  post_results(data: any) {
    return http.post(`Result/PostRequestResult`, JSON.stringify(data), {
      headers: {
        Authorization: `Bearer ${data?.token}`,
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
      },
    });
  }

  fetch_result(data: any) {
    return http.get(`Result/FetchResult/${data?.referenceNumber}`, {
      headers: {
        Authorization: `Bearer ${data?.token}`,
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
      },
    });
  }

  create_unit(data: any) {
    return http.post(`Unit/CreateUnit`, JSON.stringify(data), {
      headers: {
        Authorization: `Bearer ${data?.token}`,
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
      },
    });
  }

  fetch_units(data: any) {
    return http.get(`Unit/FetchUnits`, {
      headers: {
        Authorization: `Bearer ${data?.token}`,
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
      },
    });
  }

  update_unit(data: any) {
    return http.put(`Unit/UpdateUnit`, JSON.stringify(data), {
      headers: {
        Authorization: `Bearer ${data?.token}`,
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
      },
    });
  }

  create_criteria(data: any) {
    return http.post(`Criteria/CreateCriteria`, JSON.stringify(data), {
      headers: {
        Authorization: `Bearer ${data?.token}`,
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
      },
    });
  }

  fetch_criteria(data: any) {
    return http.get(`Criteria/FetchAllCriteria`, {
      headers: {
        Authorization: `Bearer ${data?.token}`,
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
      },
    });
  }

  update_criteria(data: any) {
    return http.put(`Criteria/UpdateCriteria`, JSON.stringify(data), {
      headers: {
        Authorization: `Bearer ${data?.token}`,
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
      },
    });
  }

  create_group(data: any) {
    return http.post(`Parameter/CreateInParameterGroup`, JSON.stringify(data), {
      headers: {
        Authorization: `Bearer ${data?.token}`,
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
      },
    });
  }

  fetch_inparameter_list(data: any) {
    return http.get(`Parameter/FetchInParameters`, {
      headers: {
        Authorization: `Bearer ${data?.token}`,
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
      },
    });
  }

  update_param_configuration(data: any) {
    return http.put(
      `Parameter/UpdateParameterConfiguration`,
      JSON.stringify(data),
      {
        headers: {
          Authorization: `Bearer ${data?.token}`,
          'Content-Type': 'application/json',
          'x-api-key': process.env.API_KEY,
        },
      }
    );
  }

  update_inparameters(data: any) {
    return http.put(`Parameter/UpdateInParameter`, JSON.stringify(data), {
      headers: {
        Authorization: `Bearer ${data?.token}`,
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
      },
    });
  }

  update_parameter(data: any) {
    return http.put(`Parameter/UpdateLabTest`, JSON.stringify(data), {
      headers: {
        Authorization: `Bearer ${data?.token}`,
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
      },
    });
  }

  create_parameter_config(data: any) {
    return http.post(`Parameter/CreateParameterConfig`, JSON.stringify(data), {
      headers: {
        Authorization: `Bearer ${data?.token}`,
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
      },
    });
  }

  set_config_default(data: any) {
    return http.put(`Parameter/SetConfigAsDefault`, JSON.stringify(data), {
      headers: {
        Authorization: `Bearer ${data?.token}`,
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
      },
    });
  }

  create_turnaroundtime(data: any) {
    return http.post(`Parameter/CreateTurnAroundTime`, JSON.stringify(data), {
      headers: {
        Authorization: `Bearer ${data?.token}`,
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
      },
    });
  }

  fetch_turnaroundtime(data: any) {
    return http.get(`Parameter/FetchTurnAroundTime`, {
      headers: {
        Authorization: `Bearer ${data?.token}`,
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
      },
    });
  }

  fetch_parameter_profile(data: any) {
    return http.get(`Parameter/FetchParameterProfile/${data.parameterId}`, {
      headers: {
        Authorization: `Bearer ${data?.token}`,
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
      },
    });
  }

  fetch_config_list(data: any) {
    return http.get(`Parameter/FetchInParameterConfigList`, {
      headers: {
        Authorization: `Bearer ${data?.token}`,
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
      },
    });
  }

  attach_parameters(data: any) {
    return http.post(
      `Parameter/AttachParameterToInParameter`,
      JSON.stringify(data),
      {
        headers: {
          Authorization: `Bearer ${data?.token}`,
          'Content-Type': 'application/json',
          'x-api-key': process.env.API_KEY,
        },
      }
    );
  }

  detach_parameters(data: any) {
    return http.post(
      `Parameter/DetachParameterFromInParameter`,
      JSON.stringify(data),
      {
        headers: {
          Authorization: `Bearer ${data?.token}`,
          'Content-Type': 'application/json',
          'x-api-key': process.env.API_KEY,
        },
      }
    );
  }

  collect_specimen(data: any) {
    return http.post(
      `LabRequest/CollectSpecimen`,
      JSON.stringify(data?.labRequestItems),
      {
        headers: {
          Authorization: `Bearer ${data?.token}`,
          'Content-Type': 'application/json',
          'x-api-key': process.env.API_KEY,
        },
      }
    );
  }

  receive_specimen(data: any) {
    return http.post(
      `LabRequest/ReceiveSpecimen`,
      JSON.stringify(data?.requestItems),
      {
        headers: {
          Authorization: `Bearer ${data?.token}`,
          'Content-Type': 'application/json',
          'x-api-key': process.env.API_KEY,
        },
      }
    );
  }

  collect_receive(data: any) {
    return http.post(
      `LabRequest/CollectAndReceiveSpecimen`,
      JSON.stringify(data?.requestItems),
      {
        headers: {
          Authorization: `Bearer ${data?.token}`,
          'Content-Type': 'application/json',
          'x-api-key': process.env.API_KEY,
        },
      }
    );
  }

  reject_specimen(data: any) {
    return http.post(`LabRequest/RejectSpecimen`, JSON.stringify(data), {
      headers: {
        Authorization: `Bearer ${data?.token}`,
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
      },
    });
  }

  specimen_logs(data: any) {
    return http.post(
      `LabRequest/FetchSpecimenLogs/${data?.collectionLogId}`,
      JSON.stringify(data),
      {
        headers: {
          Authorization: `Bearer ${data?.token}`,
          'Content-Type': 'application/json',
          'x-api-key': process.env.API_KEY,
        },
      }
    );
  }

  analyzer_results(data: any) {
    return http.get(`Result/FetchResult/${data?.referenceNumber}`, {
      headers: {
        Authorization: `Bearer ${data?.token}`,
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
      },
    });
  }

  modify_result(data: any) {
    return http.put(`Result/ModifyRequestResult`, JSON.stringify(data), {
      headers: {
        Authorization: `Bearer ${data?.token}`,
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
      },
    });
  }

  dashboard(data: any) {
    return http.get(`Dashboard/FetchDashboard`, {
      headers: {
        Authorization: `Bearer ${data?.token}`,
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
      },
    });
  }

  report(data: any) {
    return http.get(`Report/FetchDepartmentReport?month=${data.month}`, {
      headers: {
        Authorization: `Bearer ${data?.token}`,
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
      },
    });
  }

  poc_authorization(data: any) {
    return http.post(
      `LabRequest/PointOfCareAuthorization`,
      JSON.stringify(data),
      {
        headers: {
          Authorization: `Bearer ${data?.token}`,
          'Content-Type': 'application/json',
          'x-api-key': process.env.API_KEY,
        },
      }
    );
  }

  recollect_specimen(data: any) {
    return http.post(
      `LabRequest/RecollectSpecimen/${data?.labRequestItemId}`,
      JSON.stringify(data),
      {
        headers: {
          Authorization: `Bearer ${data?.token}`,
          'Content-Type': 'application/json',
          'x-api-key': process.env.API_KEY,
        },
      }
    );
  }

  fetch_worklist(data: any) {
    return http.get(`Worklist/FetchWorklist`, {
      headers: {
        Authorization: `Bearer ${data?.token}`,
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
      },
    });
  }

  fetch_disposal(data: any) {
    return http.get(`LabRequest/FetchSpecimenDisposal`, {
      headers: {
        Authorization: `Bearer ${data?.token}`,
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
      },
    });
  }

  fetch_invoices(data: any) {
    return http.get(`Invoice/FetchInvoices`, {
      headers: {
        Authorization: `Bearer ${data?.token}`,
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
      },
    });
  }

  fetch_quality(data: any) {
    return http.post(`Quality/FetchQualityControls`, null, {
      headers: {
        Authorization: `Bearer ${data?.token}`,
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
      },
    });
  }

  fetch_store(data: any) {
    return http.get(`Inventory/FetchInventoryList`, {
      headers: {
        Authorization: `Bearer ${data?.token}`,
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
      },
    });
  }

  fetch_normalized_lab_request(data: any) {
    return http.get(`LabRequest/FetchNormalizedLabRequests`, {
      headers: {
        Authorization: `Bearer ${data?.token}`,
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
      },
    });
  }

  create_worklist(data: any) {
    return http.post(`Worklist/CreateWorklist`, JSON.stringify(data), {
      headers: {
        Authorization: `Bearer ${data?.token}`,
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
      },
    });
  }
}

const service = new DataService();

export default service;