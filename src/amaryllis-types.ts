export interface SysUserProp {
  systemUserId: string;
  firstName: string;
  lastName: string;
  userName: string;
  userNumber: string;
  userPhone: string;
  userEmail: string;
  userAddress: string;
  status: Status;
  laboratory: any;
}

export interface LabProp {
  laboratoryId: string;
  laboratoryCode: string;
  laboratoryName: string;
  address: string;
  regionId: string;
  logoUrl: string;
  tagline: string;
  mainPhone: string;
  secondaryPhone: string;
  email: string;
  accreditationNumber: string;
  accreditationDate: string;
}

export interface PatientProps {
  patientId: string;
  patientNumber: string;
  medicalRecordNo: string;
  fullName: string;
  gender: string;
  dateOfBirth: string;
  religion: string;
  tribe: string;
  profileUrl: string;
  phoneNumber: string;
  email: string;
  nationality: string;
  region: string;
  district: string;
  ward: string;
  street: string;
  idNumber: string;
  createdDate: string;
  clientName: string;
  clientNumber: string;
  relatives: Relatives;
  insurance: Insurance;
  patientCheckin: PatientCheckin[];
  patientVitals: any[];
  patientNotes: any[];
  patientDiagnosis: any[];
  patientLabRequests: any[];
}

export interface Insurance {
  insuranceId: string;
  insuranceName: string;
  insuranceSchemeId: string;
  insuranceSchemeName: string;
  cardNumber: string;
  verificationCode: string;
  verificationRemarks: string;
}

export interface PatientCheckin {
  patientCheckinId: string;
  chekinNumber: string;
  referral: string;
  checkinType: string;
  section: string;
  doctor: string;
  createdBy: string;
  checkinNotes: string;
  checkinStartDate: string;
  checkinEndDate: null;
  checkinStatus: string;
  createdDate: string;
}

export interface Relatives {
  relativeId: string;
  fullName: string;
  address: string;
  phoneNumber: string;
  email: string;
  occupation: string;
  relation: string;
}

export interface CheckinProps {
  patientCheckinId: string;
  chekinNumber: string;
  patient: PatientProps;
  referral: ReferralProps;
  checkinType: CheckinTypeProps;
  department: DepartmentProps;
  section: TSections;
  checkinStartDate: string;
  checkinEndDate: string;
  checkinNotes: string;
  doctor: SysUserProp;
  createdBy: SysUserProp;
  status: Status;
}

export interface ClientProps {
  clientId: string;
  clientNumber: string;
  clientName: string;
}

export interface RelativeProps {
  relativeId: string;
  firstName: string;
  middleName: string;
  familyName: string;
  address: string;
  phoneNumber: string;
  email: string;
  occupation: string;
  relation: RelationProps;
}

export interface SplashProps {
  roles: TRoles[];
  genders: GenderProps[];
  status: Status[];
  sections: TSections[];
  urgencies: [];
  religions: ReligionProps[];
  tribes: TribeProps[];
  relations: RelationProps[];
  referrals: ReferralProps[];
  specimens: SpecimenProps[];
  noteCategories: TNoteCategories[];
  methods: [];
  checkinTypes: CheckinTypeProps[];
  insurances: Insurances[];
  departments: DepartmentProps[];
  nationalities: NationalitiesProps[];
  regions: Region[];
  rejectionCriteria: RejectionCriteriaProps[];
  measurementUnits: TUnitEnums[];
  targetPatients: TUnitEnums[];
  resultTypes: TUnitEnums[];
  periods: TUnitEnums[];
}

export interface TUnitEnums {
  value: number;
  name: string;
}

export interface TRoles {
  id: string;
  name: string;
  normalizedName: string;
  concurrencyStamp: string | null;
}

export interface TNoteCategories {
  noteCategoryId: string;
  name: string;
  description: string;
}

export interface SpecimenProps {
  specimenId: string;
  specimenCode: string;
  specimenIso: string;
  specimenName: string;
  specimenColor: string;
  specimenDescription: string;
  createdDate: string;
}

export interface CheckinTypeProps {
  checkinTypeId: string;
  checkinTypeName: string;
}

export interface GenderProps {
  genderId: string;
  genderName: string;
}

export interface ReferralProps {
  referralId: string;
  referralName: string;
}

export interface DepartmentProps {
  departmentId: string;
  departmentCode: string;
  departmentName: string;
  departmentShort: string;
}

export interface Status {
  statusId: string;
  statusName: string;
  normalizedName: string;
  color: string;
}

export interface Insurances {
  insuranceId: string;
  insuranceName: string;
  insuranceDescription: string;
  insuranceSchemes: InsuranceSchemes[];
}

export interface PatientInsuranceProps {
  insurance: Insurances;
  insuranceScheme: InsuranceSchemes;
}

export interface InsuranceSchemes {
  insuranceSchemeId: string;
  insuranceSchemeName: string;
}

export interface Region {
  regionId: string;
  regionIso: string;
  regionName: string;
  districts: Districts[];
}

export interface Districts {
  districtId: string;
  districtName: string;
}

export interface ReligionProps {
  religionId: string;
  religionName: string;
}

export interface TribeProps {
  tribeId: string;
  tribeName: string;
}

export interface RelationProps {
  relationId: string;
  relationName: string;
}

export interface NationalitiesProps {
  nationalityId: string;
  nationalityName: string;
}

export interface ParameterProps {
  parameterId: string;
  parameterCode: string;
  parameterIso: string;
  parameterName: string;
  parameterDescription: string;
  createdDate: string;
  createdBy: null;
}

export interface LabRequestProps {
  labRequestId: string;
  patientName: string;
  gender: string;
  dateOfBirth: string;
  priority: string;
  clientName: string;
  clientNumber: string;
  requestNumber: string;
  requestDate: string;
  requestedBy: string;
  totalTests: number;
  completedTests: number;
  totalReceived: number;
  totalProcessed: number;
  totalSaved: number;
  totalSubmitted: number;
  requestNotes: string;
  attachments: string;
  status: string;
  chekinNumber: string;
  checkinDate: string;
  remarks: string;
  createdDate: string;
  patientNumber: string;
  birthDate: string;
  labRequestItems: LabRequestItem[];
}

export interface LabRequestItem {
  labRequestItemsId: string;
  labRequestId: string;
  parameterId: string;
  parameterIso: string;
  parameterName: string;
  chargedAmount: number;
  authorized: boolean;
  status: string;
  specimenColor: string;
  specimenIso: string;
  specimen: string;
  accessionNumber: string;
  collectionLogId: string;
  collectedDate: string;
  receivedDate: string;
  collectedBy: string;
  temperature: string;
  comments: string;
  area: string;
  requestResult: IRequestResult | null;
  collectionLog: CollectionLog | null;
}

export interface IRequestResult {
  requestItemResultId: string;
  labRequestItemId: string;
  resultNumber: string;
  postedDate: Date;
  lastModified: Date;
  status: string;
  authorized: boolean;
  published: boolean;
  resultNotes: string;
  postedBy: string;
  equipment: string;
  isPostedResult: boolean;
  filePath: string;
  fileName: string;
  authorizationLogId: string;
  authorizationNotes: string;
  authorizedBy: string;
  dateAuthorized: string;
  observationResults: IObservationResult[];
}

export interface IObservationResult {
  valueType: string;
  testId: string;
  displayName: string;
  testName: string;
  observationSubId: string;
  resultValue: string;
  testResult: string;
  unit: string;
  referenceRange: string;
  abnormalFlag: string;
  highlight: string;
  abnormalTestNature: string;
  resultStatus: string;
  normalHigh: string;
  normalLow: string;
  userDefinedAccessChecks: string;
  resultsDatetime: string;
  producerId: string;
  responsibleObserver: string;
  resultMethod: string;
  deviceIdentifier: string;
  validation: boolean;
  validationMessage: string;
  isModified: boolean;
  isOriginal: boolean;
}

export interface IModifiedResult {
  testName: string;
  testResult: string;
  unit: string;
  referenceRange: string;
  abnormalFlag: string;
  validation: string;
  isOriginal: boolean;
}

export interface CollectionLog {
  collectionLogId: string;
  referenceNumber: string;
  roomTemperature: string;
  collectionArea: string;
  remarks: string;
  status: string;
  collectedDate: string;
  collectedBy: string;
  receptionLog: ReceptionLog;
  rejectionLog: RejectionLog;
}

export interface ReceptionLog {
  receivingLogId: string;
  referenceNumber: string;
  receivedBy: string;
  status: string;
  receivedDate: string;
}

export interface RejectionLog {
  rejectionLogId: string;
  criteria: string;
  rejectedBy: string;
  remarks: string;
  status: string;
  dateCreated: string;
}

export interface PatientChekinProps {
  chekinNumber: string;
  createdDate: string;
}

export interface UrgencyProp {
  urgencyId: string;
  urgencyName: string;
  createdDate: string;
}

export interface RequestItemsProp {
  labRequestItemsId: string;
  panelParameter: string;
  parameter: ParameterProps;
  chargedAmount: number;
  authorized: boolean;
  status: Status;
  createdDate: string;
  labRequest: LabRequestProps;
  specimenItems: SpecimenItemsProp;
}

export interface RequestSpecimenProps {
  labRequestSpecimenId: string;
  labRequest: LabRequestProps;
  specimen: SpecimenProps;
  referenceNumber: string;
  status: Status;
  createdDate: string;
}

export interface SpecimenItemsProp {
  specimenItemsId: string;
  labRequestSpecimen: LabRequestSpecimenProp;
  labRequestItems: RequestItemsProp;
  referenceNumber: string;
  status: Status;
  createdDate: string;
}

export interface LabRequestSpecimenProp {
  labRequestSpecimenId: string;
  specimen: SpecimenProps;
  referenceNumber: string;
  status: Status;
  specimenCollection: SpecimenCollectionProp;
}

export interface SpecimenCollectionProp {
  specimenCollectionId: string;
  anatomicalSite: string;
  specimenNumber: string;
  roomTemperature: string;
  collectionComments: string;
  acceptanceRemarks: string;
  rejectionCriteria: RejectionCriteriaProps;
  rejectionComments: string;
  status: Status;
  collectedById: string;
  collectedBy: SysUserProp;
  deliveredBy: SysUserProp;
  collectionDate: string;
  rejectionDate: string;
  createdDate: string;
  lastUpdated: string;
}

export interface RejectionCriteriaProps {
  criteriaId: string;
  criteriaDescription: string;
  criteriaName: string;
}

export interface LabReqSpecimenDetailsProps {
  labRequestSpecimenId: string;
  labRequest: LabRequestProps;
  specimen: SpecimenProps;
  referenceNumber: string;
  status: Status;
  createdDate: string;
  specimenCollection: SpecimenCollectionProp;
  specimenItems: SpecimenItemsProp[];
}

export interface RequestResultsProps {
  requestResultId: string;
  requestResultsId: string;
  resultNumber: string;
  referenceNumber: string;
  createdDate: string;
  authorized: boolean;
  remarks: string;
  validated: boolean;
  dateValidated: string;
  dateAuthorized: string;
  status: Status;
  client: ClientProps;
  method: MethodProps;
  specimenItems: SpecimenItemsProp;
  labRequestSpecimens: LabRequestSpecimenProp;
  observationResults: ObservationResultsProps[];
}

export interface MethodProps {
  methodId: string;
  methodName: string;
  methodDescription: string;
}

export interface ObservationResultsProps {
  valueType: string;
  testId: string;
  testName: string;
  observationSubId: string;
  testResult: number;
  unit: string;
  referenceRange: string;
  abnormalFlag: string;
  abnormalTestNature: string;
  resultStatus: string;
  userDefinedAccessChecks: string;
  resultsDatetime: string;
  producerId: string;
  responsibleObserver: string;
  resultMethod: string;
  deviceIdentifier: string;
}

export interface TBreadCrumbProps {
  homeElement: any;
  separator: any;
  activeClasses?: string;
  capitalizeLinks?: boolean;
}

export interface TPatientNotes {
  patientNotesId: string;
  noteCategory: TNoteCategories;
  notes: TNotes[];
  patientCheckin: PatientChekinProps;
  createdDate: string;
}

export interface TNotes {
  title: string;
  shortName: string;
  description: string;
}

export interface TPatientOverview {
  vitals: TVitals;
  checkins: CheckinProps[];
  labRequests: LabRequestProps[];
}

export interface TVitals {
  bodyTemperature: string;
  pulseRate: string;
  oxygenSaturation: string;
  bloodPressure: string;
  respiratoryRate: string;
  bloodGlucose: string;
  weight: string;
  height: string;
  remarks: string;
  createdDate: string;
  patientCheckin: PatientChekinProps;
}

export interface TLabUsers {
  systemUser: SysUserProp;
  status: Status;
}

export interface TDepartment {
  departmentId: string;
  departmentCode: string;
  departmentName: string;
  departmentShort: string;
  departmentDescription: string;
  createdDate: Date;
  departmentManager: null;
  status: null;
}

export interface TSections {
  sectionId: string;
  sectionName: string;
  sectionDescription: string;
  createdDate: string;
}

export interface TSpecimen {
  specimenId: string;
  specimenCode: string;
  specimenIso: string;
  specimenName: string;
  specimenColor: string;
  collectionSite: string;
  specimenDescription: string;
  createdDate: Date;
  createdBy: string;
}

export interface Equipment {
  equipmentId: string;
  equipmentName: string;
  equipmentCode: string;
  manufacturer: string;
  model: string;
  serialNumber: string;
  dateCreated: string;
  lastUsed: null;
  department: string;
  status: string;
  equipmentUsage: EquipmentUsage[];
  totalParameters: number;
  totalMaintenances: number;
  maintenance: [];
  parameterEquipments: [];
}

export interface EquipmentUsage {
  equipmentUsageId: string;
  usageType: string;
  usageDate: Date;
}

export interface InParameterGroup {
  inParameterGroupId: string;
  groupName: string;
  description: string;
  createdDate: Date;
}

export interface TWaitlist {
  labRequestId: string;
  requestNumber: string;
  accessionNumber: string;
  completedTests: number;
  progress: number;
  totalTests: number;
  patientNumber: string;
  patientName: string;
  birthDate: string;
  gender: string;
  status: string;
  clientNumber: string;
  clientName: string;
  chekinNumber: string;
  checkinDate: string;
  requestedBy: string;
  remarks: string;
  priority: string;
  createdDate: string;
  labRequestItems: TLabRequestItem[];
}

export interface TLabRequestItem {
  labRequestItemsId: string;
  parameterId: string;
  parameterIso: string;
  parameterName: string;
  chargedAmount: number;
  authorized: boolean;
  status: string;
  specimenItemsId: string;
  labRequestSpecimenId: string;
  specimenIso: string;
  specimen: string;
  specimenReference: string;
  specimenCollection: TSpecimenCollection;
}

export interface TSpecimenCollection {
  specimenCollectionId: string;
  anatomicalSite: string;
  specimenNumber: string;
  roomTemperature: string;
  collectionComments: string;
  acceptanceRemarks: string;
  collectionStatus: string;
  collectedBy: string;
  collectionDate: string;
}

export interface TParameterGroup {
  group: string;
  parameters: TInParameter[];
}

export type IParameterGroup = {
  group: string;
  parameters: IParameterList[];
};

export type IParameterList = {
  displayName: string;
  resultValue: string;
  unit: string;
  resultType: string;
  normalHigh: string;
  normalLow: string;
  separator: string;
  highlight: string;
};

export interface TInParameter {
  parameterId: string;
  inParameterId: string;
  inParameterName: string;
  normalHigh: number;
  normalLow: number;
  resultValue: string;
  mode: string;
  unit: string;
  highlight: string;
}

export interface TResults {
  requestResultsId: string;
  resultNumber: string;
  referenceNumber: string;
  createdDate: Date;
  authorized: boolean;
  remarks: string;
  validated: boolean;
  dateValidated: null;
  dateAuthorized: null;
  authorizedBy: null;
  status: string;
  client: string;
  method: string;
  observationResults: TObservationResult[];
}

export interface TObservationResult {
  valueType: string;
  testId: string;
  testName: string;
  observationSubId: string;
  testResult: string;
  unit: string;
  referenceRange: string;
  abnormalFlag: string;
  abnormalTestNature: string;
  resultStatus: string;
  userDefinedAccessChecks: string;
  resultsDatetime: Date;
  producerId: string;
  responsibleObserver: string;
  resultMethod: string;
  deviceIdentifier: string;
}

export interface TWaitlistResult {
  labRequestId: string;
  requestNumber: string;
  createdDate: Date;
  patientNumber: string;
  patientName: string;
  requestedBy: string;
  dateOfBirth: Date;
  gender: string;
  priority: string;
  completedTests: number;
  totalTests: number;
  status: string;
}

export interface PageProps {
  params: Promise<{ id: string }>;
}

export interface TMeasurementUnit {
  unitId: string;
  name: string;
  symbol: string;
  measurement: string;
  standardUnit: string;
  precision: number;
  createdDate: string;
}

export interface TCriteria {
  criteriaId: string;
  criteriaName: string;
  criteriaDescription: string;
  createdDate: string;
  totalLogs: number;
}

export interface TGroups {
  inParameterGroupId: string;
  groupName: string;
  description: string;
  createdDate: string;
}

export interface TInParams {
  inParameterId: string;
  groupName: string;
  inParameterName: string;
  description: string;
  totalParameters: number;
  totalConfigs: number;
  createdDate: string;
  inParameterConfigs: InParameterConfig[];
}

export interface InParameterConfig {
  inParameterConfigId: string;
  normalLow: number;
  normalHigh: number;
  criticalLow: number;
  criticalHigh: number;
  separation: string;
  unit: string;
  createdDate: string;
  targetPatient: string;
  status: string;
  isDefault: boolean;
}

export interface TurnAroundTimeProps {
  turnAroundTimeId: string;
  parameterId: string;
  parameterName: string;
  parameterIso: string;
  expectedTime: string;
  maximumAllowableTime: string;
  period: string;
  notes: string;
  createdDate: Date;
}

export interface TLabTest {
  labParameterId: string;
  laboratoryId: string;
  parameterId: string;
  parameterCode: string;
  parameterIso: string;
  parameterName: string;
  parameterDescription: string;
  basePrice: number;
  nhifPrice: number;
  createdDate: Date;
  lastModified: Date;
  specimen: string;
  department: string;
  isPanel: boolean;
  processMethod: string;
  totalPanels: number;
  totalRequests: number;
  totalEquipments: number;
  totalInParameters: number;
  qualityParameters: number;
  status: string;
  createdBy: null;
}

export interface IParameterProfile {
  parameterId: string;
  parameterCode: string;
  parameterIso: string;
  parameterName: string;
  parameterDescription: string;
  createdDate: string;
  createdBy: string;
  specimen: string;
  department: string;
  isPanel: boolean;
  processMethod: string;
  totalPanels: number;
  totalRequests: number;
  totalEquipments: number;
  totalInParameters: number;
  qualityParameters: number;
  inParameters: IInParameter[];
  equipment: any[];
  parameterSpecimen: any[];
}

export interface IParameterConfig {
  inParameterConfigId: string;
  inParameterId: string;
  groupName: string;
  inParameterName: string;
  displayName: string;
  resultType: string;
  unit: null | string;
  normalLow: number | null;
  normalHigh: number | null;
  criticalLow: number | null;
  criticalHigh: number | null;
  separation: null | string;
  createdDate: string;
  targetPatient: string;
  status: string;
  isDefault: boolean;
}

export interface IInParameter {
  inParameterConfigId: string;
  inParameterId: string;
  groupName: string;
  inParameterName: string;
  displayName: string;
  resultType: string;
  unit: string;
  normalLow: number;
  normalHigh: number;
  criticalLow: number;
  criticalHigh: number;
  separation: string;
  createdDate: Date;
  targetPatient: string;
  status: string;
  isDefault: boolean;
}

export interface IRequestItems {
  labRequestItemsId: string;
  labRequestId: string;
  patientName: string;
  gender: string;
  birthDate: string;
  parameterId: string;
  parameterIso: string;
  parameterName: string;
  chargedAmount: number;
  authorized: boolean;
  status: string;
  specimenColor: string;
  specimenIso: string;
  specimen: string;
  accessionNumber: string;
  reference: string;
  collectionLogId: null;
  collectedDate: string;
  receivedDate: null;
  collectedBy: string;
  temperature: string;
  comments: string;
  area: string;
  requestResult: IRequestResult | null;
}

export interface ICollectionLog {
  collectionLogId: string;
  referenceNumber: string;
  roomTemperature: string;
  collectionArea: string;
  remarks: string;
  status: string;
  collectedDate: string;
  collectedBy: string;
  receptionLog: null;
  rejectionLog: null;
}

export type IUserList = {
  systemUserId: string;
  userName: string;
  userNumber: string;
  userPhone: string;
  userEmail: string;
  userAddress: string;
  createdDate: Date;
  designation: string;
  status: string;
};

export type IAnalyzerResults = {
  requestResultsId: string;
  resultNumber: string;
  referenceNumber: string;
  createdDate: string;
  remarks: string;
  status: string;
  method: string;
  observationResults: IObservationResult[];
};

export interface ISpecimenWorkload {
  date: string;
  specimen: string;
  ordered: number;
  collected: number;
  pending: number;
  rejected: number;
}

export interface IDepartmentWorkload {
  title: string;
  requests: number;
  pending: number;
  authorized: number;
}

export interface ISpecimenHighlight {
  specimenType: string;
  total: number;
}

export interface IDashboard {
  overview: OverviewStats[];
  requests: IRequestsOverview[];
  specimenWorkload: ISpecimenWorkload[];
  departmentWorkload: IDepartmentWorkload[];
  testWorkload: IDepartmentWorkload[];
  specimens: ISpecimenHighlight[];
}

export interface OverviewStats {
  title: string;
  today: number;
  yesterday: number;
  monthly: number;
  overall: number;
}

export interface IRequestsOverview {
  date: string;
  requests: number;
  authorized: number;
}

export interface IReportInterface {
  department: string;
  records: Record[];
}

export interface Record {
  testName: string;
  total: number;
}
