import * as z from "zod";

export const LoginSchema = z.object({
  username: z.string().min(1, { message: "Please enter user number" }),
  password: z
    .string()
    .min(6, { message: "Password should be 6 characters or more" }),
  remember: z.boolean().default(false).optional(),
});

export const CheckInSchema = z.object({
  referral_type: z.string({
    message: "Select Referral Type",
  }),
  checkin_type: z.string({
    message: "Select Checkin Type",
  }),
  section: z.string({
    message: "Select Department Section",
  }),
  private_doctor: z.string().optional(),
  checkinNotes: z.string().optional(),
});

export const PatientSchema = z.object({
  first_name: z.string({
    message: "Enter Patent First Name",
  }),
  middle_name: z.string().optional(),
  family_name: z.string({
    message: "Enter Patient Last name",
  }),
  initials: z.string({}).optional(),
  email: z
    .string()
    .email({
      message: "Invalid Email, Please Enter a correct email address",
    })
    .optional(),
  phone: z
    .string({
      message: "Enter Patient Mobile Number",
    })
    .min(10, {
      message: "Phone Number has to have 10 digits or more",
    }),
  gender: z.string({
    message: "Select Gender",
  }),
  religion: z.string({
    message: "Select Religion",
  }),
  tribe: z.string({
    message: "Select Religion",
  }),
  birthdate: z.date({
    message: "Patient Date of Birth is required",
  }),
  nationality: z.string({
    message: "Select Nationality",
  }),
  region: z.string({
    message: "Select Region",
  }),
  district: z.string({
    message: "Select Respective District",
  }),
  ward_village: z.string({
    message: "Enter ward name of the district",
  }),
  house_number: z.string({
    message: "Enter Patient House Number",
  }),
  id_number: z.string().optional(),
  kin_firstname: z
    .string({
      message: "Select kin first name",
    })
    .min(2, {
      message: "Firstname must have 2 characters or more",
    }),
  kin_middlename: z.string({}).optional(),
  kin_familyname: z.string().min(2, {
    message: "Lastname must have 2 characters or more",
  }),
  kin_address: z.string().optional(),
  kin_phone: z.string().min(10, {
    message: "Lastname must have 10 digits",
  }),
  kin_email: z.string().optional(),
  occupation: z.string().optional(),
  relation: z.string({
    message: "Please select relation",
  }),
  sponsor_name: z.string(),
  scheme: z.string(),
  card_number: z.string(),
});

export const ClinicalNotesSchema = z.object({
  note_type: z.string({
    message: "Select Note Kind",
  }),
  general: z.object({
    chief_complaint: z.string(),
    present_illness: z.string(),
    medical_history: z.string(),
    family_history: z.string(),
    other_systems: z.string(),
  }),
  differential: z.string(),
  plan_management: z.string(),
});

export const DiagnosisSchema = z.object({
  primary_diagnosis: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
        disable: z.boolean().optional(),
      })
    )
    .min(1),
  secondary_diagnosis: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
        disable: z.boolean().optional(),
      })
    )
    .min(1),
  notes: z.string().optional(),
});

export const VitalsSchema = z.object({
  temp: z.string(),
  pulse: z.string(),
  oxygen: z.string(),
  pressure: z.string(),
  respiratory: z.string(),
  glucose: z.string(),
  height: z.string(),
  weight: z.string(),
  remarks: z.string().optional(),
});

export const LabRequestSchema = z.object({
  urgency: z.string({ message: "Select Urgency" }),
  type: z.string(),
  selected: z.string().optional(),
  notes: z.string().optional(),
});

export const SpecimenCollectionSchema = z.object({
  specimen: z.string(),
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
  comments: z.string().optional(),
});

export const SpecimenAcceptanceSchema = z.object({
  anatomical_site: z.string().optional(),
  specimen_number: z.string().optional(),
  room_temperature: z.string().optional(),
  remarks: z.string().optional(),
});

export const SpecimenRejectionSchema = z.object({
  rejectReason: z.string({
    message: "Specify Rejection Reason",
  }),
  remarks: z.string({
    message: "Emphasize more on why the specimen is being rejected",
  }),
});

export const SearchSpecimenSchema = z.object({
  specimen_number: z.string({
    message: "Enter Specimen number",
  }),
});

export const TestReportSchema = z.object({
  parameter: z.string({
    message: "Enter Test Parameter",
  }),
  value: z.string({
    message: "Enter Value",
  }),
  unit: z.string({
    message: "Select Test Unit",
  }),
  reference_range: z.string().optional(),
  remarks: z.string().optional(),
});

export const AuthorizeSchema = z.object({
  notes: z
    .string({
      message: "Enter authorization notes",
    })
    .optional(),
});

export const ReportingSchema = z.object({});

export const QCRecordSchema = z.object({
  qc_number: z
    .string({
      message: "Enter qc number",
    })
    .optional(),
  test_parameter: z
    .string({
      message: "Enter common test parameter for this QC",
    })
    .optional(),
  source_machine: z.string({
    message: "Select source machine for the QC",
  }),
  remarks: z.string().optional(),
});

export const QCSpecimenSchema = z.object({
  qc_test: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
        disable: z.boolean().optional(),
      })
    )
    .min(2),
});

export const RegistrationSchema = z.object({
  username: z.string({
    message: "Enter Username",
  }),
  first_name: z.string({
    message: "Enter First Name",
  }),
  last_name: z
    .string({
      message: "Enter Last Name",
    })
    .optional(),
  phone: z.string({
    message: "Enter Phone Number",
  }),
  email: z
    .string({
      message: "Enter Email",
    })
    .email({ message: "Enter Correct Email Address" }),
  address: z.string({
    message: "Enter User Address",
  }),
  role: z.string({
    message: "Select User Role",
  }),
  password: z
    .string({
      message: "Enter User Password",
    })
    .min(6, "Password must be at least 6 characters long"),
});

export const ParameterSchema = z.object({
  iso: z.string({
    message: "Enter Parameter Iso",
  }),
  name: z.string({
    message: "Enter Parameter Name",
  }),
  description: z
    .string({
      message: "Enter Parameter Description",
    })
    .optional(),
  department: z.string({
    message: "Enter Parameter Department",
  }),
  specimen: z.string({
    message: "Enter Parameter Specimen",
  }),
  base_price: z
    .string({
      message: "Enter Parameter Base Price",
    })
    .optional(),
  nhif_price: z
    .string({
      message: "Enter Parameter NHIF Price",
    })
    .optional(),
  processMethod: z.string({
    message: "Select Parameter Process Method",
  }),
  equipmentId: z.string({}).optional(),
  isPanel: z.boolean().default(false).optional(),
});

export const SpecimenSchema = z.object({
  specimenName: z.string({
    message: "Enter Specimen Name",
  }),
  specimenIso: z.string({
    message: "Enter Specimen ISO",
  }),
  specimenColor: z.string({
    message: "Enter Specimen Color",
  }),
  collectionSite: z.string({
    message: "Enter Collection Site",
  }),
  description: z
    .string({
      message: "Enter Specimen Description",
    })
    .optional(),
  lifespan: z.string({
    message: "Enter Specimen Lifespan",
  }),
  lifespanUnit: z.string({
    message: "Enter Lifespan Unit",
  }),
});

export const DepartmentSchema = z.object({
  departmentName: z.string({
    message: "Enter Department Name",
  }),
  departmentShort: z.string({
    message: "Enter Department Short",
  }),
  description: z.string({}).optional(),
  manager: z.string({}).optional(),
});

export const CreateEquipmentSchema = z.object({
  equipmentName: z.string({
    message: "Enter Equipment Name",
  }),
  manufacturer: z.string({
    message: "Enter Manufacturer Name",
  }),
  model: z.string({
    message: "Enter Model Name",
  }),
  serialNumber: z.string({
    message: "Enter Serial Number",
  }),
  departmentId: z.string({
    message: "Select Department",
  }),
  deviceIp: z.string({}).optional(),
  description: z.string({}).optional(),
});

export const InParameterSchema = z.object({
  inParameterGroupId: z.string({
    message: "Select InParameter Group",
  }),
  inParameterName: z.string({
    message: "Enter InParameter Name",
  }),
  normalLow: z.string({}).optional(),
  normalHigh: z.string({}).optional(),
  unit: z.string({
    message: "Enter Parameter Unit",
  }),
});

export const ResultFormSchema = z.object({
  parametersList: z.array(
    z.object({
      group: z.string().optional(),
      parameters: z.array(
        z.object({
          displayName: z.string(),
          resultValue: z
            .string({
              message: "Enter a result value",
            })
            .min(1, "Please Enter Result Value"),
          unit: z.string(),
          normalHigh: z.string(),
          normalLow: z.string(),
          highlight: z.string(),
        })
      ),
    })
  ),
});

export const WorklistFormSchema = z.object({
  worklistName: z.string({
    message: "Enter Worklist Name",
  }),
  equipmentId: z.string({
    message: "Select Equipment Name",
  }),
  departmentId: z.string({
    message: "Select Department Name",
  }),
});

export const ClientSchema = z.object({
  clientId: z.string({}),
  clientName: z.string({
    message: "Enter Client Name",
  }),
  phone: z.string({
    message: "Enter Phone Number",
  }),
  email: z.string({
    message: "Enter User Email",
  }),
  contactPerson: z.string({
    message: "Enter Contact Person Name",
  }),
  endpointUrl: z.string({}),
});

export const LaboratorySchema = z.object({
  labName: z.string({
    message: "Enter Laboratory Name",
  }),
  address: z.string({
    message: "Enter Laboratory Address",
  }),
  tagline: z.string({
    message: "Enter Laboratory Tagline",
  }),
  mainPhone: z.string({
    message: "Enter Main Phone Number",
  }),
  secondaryPhone: z.string({
    message: "Enter Secondary Phone Number",
  }),
  email: z.string({
    message: "Enter Email Address",
  }),
  accreditationNumber: z.string({}).optional(),
  accreditationDate: z.string({}).optional(),
});

export const CommonSettingSchema = z.object({
  printer: z.string({}),
  labelSize: z.string({
    message: "Select Default Setting Size",
  }),
  patient_service: z.boolean().default(true),
  result_service: z.boolean().default(true),
  parameter_service: z.boolean().default(true),
  notification_service: z.boolean().default(true),
});

export const SectionSchema = z.object({
  sectionName: z.string({
    message: "Enter Section Name",
  }),
  sectionDescription: z.string({
    message: "Enter Section Description",
  }),
});

export const ParameterGroupSchema = z.object({
  groupName: z.string({
    message: "Enter Group Name",
  }),
  description: z.string({
    message: "Enter Group Description",
  }),
});

export const InParameterConfigSchema = z.object({
  inParameterName: z.string({
    message: "Enter Parameter Name",
  }),
  inParameterDescription: z.string({
    message: "Enter Parameter Description",
  }),
  inParameterGroup: z.string({
    message: "Select Parameter Group",
  }),
  resultType: z.string({
    message: "Select Result Type",
  }),
  normalLow: z.string({}).optional(),
  normalHigh: z.string({}).optional(),
  separationSymbol: z
    .string({
      message: "Enter Separation Symbol",
    })
    .optional(),
  unit: z
    .string({
      message: "Enter Parameter Unit",
    })
    .optional(),
  targetedPatient: z.string({
    message: "Enter Parameter Targeted Patient",
  }),
});

export const TATConfigurationSchema = z.object({
  parameterId: z.string({
    message: "Enter TAT Configuration Name",
  }),
  expectedTime: z.string({
    message: "Enter Expected Time",
  }),
  expectedTimeUnit: z.string({
    message: "Enter Expected Time Unit",
  }),
  maximumTime: z.string({
    message: "Enter TAT Configuration Name",
  }),
  notes: z
    .string({
      message: "Enter Notes",
    })
    .optional(),
});

export const CreatePanelSchema = z.object({
  panelName: z.string({
    message: "Enter Panel Name",
  }),
  panelDescription: z.string({
    message: "Enter Panel Description",
  }),
});

export const CreateCriteriaSchema = z.object({
  criteriaName: z.string({
    message: "Enter Criteria Name",
  }),
  criteriaDescription: z.string({
    message: "Enter Criteria Description",
  }),
});

export const ResetPasswordSchema = z.object({
  oldPassword: z.string({
    message: "Enter Old Password",
  }),
  newPassword: z.string({
    message: "Enter New Password",
  }),
  confirmPassword: z.string({
    message: "Confirm New Password",
  }),
});

export const MeasurementUnitSchema = z.object({
  name: z.string({
    message: "Enter Measurement Unit",
  }),
  symbol: z.string({
    message: "Enter Symbol",
  }),
  measurement: z.string({
    message: "Select Measurement",
  }),
  standardUnit: z.string({
    message: "Enter Standard Unit",
  }),
  precision: z.string({
    message: "Enter Precision",
  }),
});

export const UpdateInParameter = z.object({
  inParameterName: z.string({
    message: "Enter Parameter Name",
  }),
  inParameterDescription: z.string({
    message: "Enter Parameter Description",
  }),
  inParameterGroup: z.string({
    message: "Select Parameter Group",
  }),
  resultType: z.string().optional(),
});

export const UpdateParamConfigSchema = z.object({
  normalLow: z.string({
    message: "Enter Normal Low",
  }),
  normalHigh: z.string({
    message: "Enter Normal High",
  }),
  separationSymbol: z.string({
    message: "Enter Separation Symbol",
  }),
  unit: z.string({
    message: "Select Parameter Unit",
  }),
  targetedPatient: z.string({
    message: "Select Targeted Patient",
  }),
});

export const ForgotPasswordSchema = z.object({
  email: z.string({
    message: "Enter your email or username",
  }),
  password: z.string({
    message: "Enter New Password",
  }),
  confirmPassword: z.string({
    message: "Confirm New Password",
  }),
});

export const DefaultResultSchema = z.object({
  name: z.string({
    message: "Enter Default Result Name",
  }),
  description: z.string({}).optional(),
});

export const AutologinSchema = z.object({
  username: z.string({
    message: "Enter Username",
  }),
  password: z.string({
    message: "Enter Password",
  }),
});

export const UserAccountSchema = z.object({
  fullName: z.string({}).optional(),
  username: z.string({}).optional(),
  displayName: z.string({}).optional(),
  userEmail: z.string({}).optional(),
});

export const AddParameterSchema = z.object({
  parameter: z.string({ message: "Enter Parameter Parameter Name" }),
  resultValue: z.string({ message: "Enter Parameter Value" }),
  abnormalFlag: z.string({ message: "Enter Abnormal Flag" }),
});

export const EditResultParamSchema = z.object({
  parameter: z.string({ message: "Enter Parameter Parameter Name" }),
  resultValue: z.string({ message: "Enter Parameter Value" }),
  abnormalFlag: z.string({ message: "Enter Abnormal Flag" }),
});

export const ReportSchema = z.object({
  category: z.string({
    message: "Select Report Category",
  }),
  subCategory: z.string({
    message: "Select Report Sub Category",
  }),
  orderBy: z.string({
    message: "Select Order Method",
  }),
  sort: z.string({
    message: "Select Report Sort Order",
  }),
  date: z.string({
    message: "Select Report Date",
  }),
});

export const VerificationSchema = z.object({
  cardNumber: z
    .string({
      message: "Enter Patient Card",
    })
    .optional(),
  fingerIndex: z
    .string({
      message: "Select Finger Index",
    })
    .optional(),
  approvalNumber: z.string({}).optional(),
});

export const SetupDistrictSchema = z.object({
  regionId: z.string({
    message: "Select Region",
  }),
  district: z.string({
    message: "Enter District Name",
  }),
});
