import DataService from '@/services/data-service';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

const createParameterReq = async (data: any) => {
  try {
    const parameterResults = await DataService.create_lab_parameter(data);
    return parameterResults.data;
  } catch (error) {
    throw Error(`Create Parameter Error: ${error}`);
  }
};

const fetchParameterReq = async (data: any) => {
  try {
    const parameterResults = await DataService.fetch_lab_parameters(data);
    return parameterResults.data;
  } catch (error) {
    throw Error(`Fetch Lab Parameter Error: ${error}`);
  }
};

const createSpecimenReq = async (data: any) => {
  try {
    const specimenResults = await DataService.create_specimen(data);
    return specimenResults.data;
  } catch (error) {
    throw Error(`Create Specimen Error: ${error}`);
  }
};

const fetchDepartmentsReq = async (data: any) => {
  try {
    const departmentResults = await DataService.fetch_department(data);
    return departmentResults.data;
  } catch (error) {
    throw Error(`Fetch Departments Error: ${error}`);
  }
};

const createDepartmentReq = async (data: any) => {
  try {
    const departmentResults = await DataService.create_department(data);
    return departmentResults.data;
  } catch (error) {
    throw Error(`Create Department Error: ${error}`);
  }
};

const createSectionReq = async (data: any) => {
  try {
    const sectionResults = await DataService.create_sections(data);
    return sectionResults.data;
  } catch (error) {
    throw Error(`Create Section Error: ${error}`);
  }
};

const fetchSectionReq = async (data: any) => {
  try {
    const sectionResults = await DataService.fetch_sections(data);
    return sectionResults.data;
  } catch (error) {
    throw Error(`Fetch Sections Error: ${error}`);
  }
};

const fetchSpecimenReq = async (data: any) => {
  try {
    const specimenResults = await DataService.fetch_specimens(data);
    return specimenResults.data;
  } catch (error) {
    throw Error(`Fetch SpecimenReq Error: ${error}`);
  }
};

const fetchParameterGroupsReq = async (data: any) => {
  try {
    const inParameterResults = await DataService.fetch_groups(data);
    return inParameterResults.data;
  } catch (error) {
    throw Error(`Fetch Parameter Groups Error: ${error}`);
  }
};

const createInParameterReq = async (data: any) => {
  try {
    const inParameterResult = await DataService.create_inparameter(data);
    return inParameterResult.data;
  } catch (error) {
    throw Error(`Create InParameter Error: ${error}`);
  }
};

const fetchInParameterListReq = async (data: any) => {
  try {
    const inParameterResult = await DataService.fetch_inparameter_list(data);
    return inParameterResult.data;
  } catch (error) {
    throw Error(`Fetch InParameter List Error: ${error}`);
  }
};

const updateInParameterConfigReq = async (data: any) => {
  try {
    const inParameterResult =
      await DataService.update_param_configuration(data);
    return inParameterResult.data;
  } catch (error) {
    throw Error(`Update InParameter Error: ${error}`);
  }
};

const updateInparameterReq = async (data: any) => {
  try {
    const inParameterResult = await DataService.update_inparameters(data);
    return inParameterResult.data;
  } catch (error) {
    throw Error(`Update InParameter Error: ${error}`);
  }
};

const createParamConfig = async (data: any) => {
  try {
    const parameterConfig = await DataService.create_parameter_config(data);
    return parameterConfig.data;
  } catch (error) {
    throw Error(`Create Param Config Error: ${error}`);
  }
};

const setDefaultConfigReq = async (data: any) => {
  try {
    const requestResult = await DataService.set_config_default(data);
    return requestResult.data;
  } catch (error) {
    throw Error(`Set Default Config error: ${error}`);
  }
};

const fetchTatConfigReq = async (data: any) => {
  try {
    const requestResult = await DataService.fetch_turnaroundtime(data);
    return requestResult.data;
  } catch (error) {
    throw Error(`Fetch TAT Config error: ${error}`);
  }
};

const createTatConfigReq = async (data: any) => {
  try {
    const requestResult = await DataService.create_turnaroundtime(data);
    return requestResult.data;
  } catch (error) {
    throw Error(`Create TAT Config error: ${error}`);
  }
};

const fetchParameterProfileReq = async (data: any) => {
  try {
    const requestResult = await DataService.fetch_parameter_profile(data);
    return requestResult.data;
  } catch (error) {
    throw Error(`Parameter Profile Fetch Error: ${error}`);
  }
};

const fetchParameterConfigReq = async (data: any) => {
  try {
    const requestResult = await DataService.fetch_config_list(data);
    return requestResult.data;
  } catch (error) {
    throw Error(`Parameter Configuration List Fetch Error: ${error}`);
  }
};

const attachParameterReq = async (data: any) => {
  try {
    const requestResult = await DataService.attach_parameters(data);
    return requestResult.data;
  } catch (error) {
    throw Error(`Attach Parameter Request Error: ${error}`);
  }
};

const detachParameterReq = async (data: any) => {
  try {
    const requestResult = await DataService.detach_parameters(data);
    return requestResult.data;
  } catch (error) {
    throw Error(`Detach Parameter Request Error: ${error}`);
  }
};

export const useFetchLabParamQuery = (data: any) =>
  useQuery({
    queryKey: [`LAB_PARAMS_QUERY`],
    queryFn: () => fetchParameterReq(data),
  });

export const useFetchDepartmentQuery = (data: any) =>
  useQuery({
    queryKey: [`FETCH_DEPARTMENT_QUERY`],
    queryFn: () => fetchDepartmentsReq(data),
  });

export const useFetchSectionsQuery = (data: any) =>
  useQuery({
    queryKey: [`FETCH_SECTIONS_QUERY`],
    queryFn: () => fetchSectionReq(data),
  });

export const useFetchSpecimenQuery = (data: any) =>
  useQuery({
    queryKey: [`FETCH_SPECIMEN_QUERY`],
    queryFn: () => fetchSpecimenReq(data),
  });

export const useFetchGroupQuery = (data: any) =>
  useQuery({
    queryKey: [`FETCH_GROUP_QUERY`],
    queryFn: () => fetchParameterGroupsReq(data),
  });

export const useFetchInParameterListQuery = (data: any) =>
  useQuery({
    queryKey: [`FETCH_IN_PARAMS_QUERY`],
    queryFn: () => fetchInParameterListReq(data),
  });

export const useFetchTatQuery = (data: any) =>
  useQuery({
    queryKey: [`FETCH_TAT_QUERY`],
    queryFn: () => fetchTatConfigReq(data),
  });

export const useFetchParameterProfileQuery = (data: any) =>
  useQuery({
    queryKey: [`FETCH_PARAMETER_PROFILE_QUERY_${data?.parameterId}`],
    queryFn: () => fetchParameterProfileReq(data),
  });

export const useFetchParameterConfigQuery = (data: any) =>
  useQuery({
    queryKey: [`PARAM_CONFIG_QUERY_${data?.parameterId}`],
    queryFn: () => fetchParameterConfigReq(data),
  });

export const useCreateParameterMutation = () =>
  useMutation({
    mutationFn: (data) => createParameterReq(data),
    mutationKey: ['CREATE_TEST_PARAMETER'],
    onSuccess: (data) => {
      toast.success('Parameter Created Successfully', {
        description: `${JSON.stringify(data?.data)}`,
        duration: 3000,
        cancel: {
          label: 'Cancel',
          onClick: () => toast.dismiss(),
        },
      });
    },
    onError: (error: any) => {
      toast.error('Something went wrong', {
        description: `Failed to create parameter ${error}`,
        duration: 3000,
        cancel: {
          label: 'Cancel',
          onClick: () => toast.dismiss(),
        },
      });
    },
  });

export const useFetchParameterProfileMutation = () =>
  useMutation({
    mutationKey: ['FETCH_PARAM_CONFIG_LIST'],
    mutationFn: (data) => fetchParameterProfileReq(data),
    onSuccess: (data) => {
      toast.success('Configuration Successfully', {
        description: `Configuration Fetched Successfully`,
        duration: 3000,
        cancel: {
          label: 'Cancel',
          onClick: () => toast.dismiss(),
        },
      });
    },
    onError: (error: any) => {
      toast.error('Something went wrong', {
        description: `Failed to fetch configuration ${error}`,
        duration: 3000,
        cancel: {
          label: 'Cancel',
          onClick: () => toast.dismiss(),
        },
      });
    },
  });

export const useCreateSpecimenMutation = () =>
  useMutation({
    mutationFn: (data) => createSpecimenReq(data),
    mutationKey: ['CREATE_SPECIMEN_REQ'],
    onSuccess: (data) => {
      toast.success('Specimen Created Successfully', {
        description: `${JSON.stringify(data?.data)}`,
        duration: 3000,
        cancel: {
          label: 'Cancel',
          onClick: () => toast.dismiss(),
        },
      });
    },
    onError: (error: any) => {
      toast.error('Something went wrong', {
        description: `Failed to create specimen ${error}`,
        duration: 3000,
        cancel: {
          label: 'Cancel',
          onClick: () => toast.dismiss(),
        },
      });
    },
  });

export const useCreateDepartmentMutation = () =>
  useMutation({
    mutationFn: (data) => createDepartmentReq(data),
    mutationKey: ['CREATE_DEPARTMENT_QUERY'],
    onSuccess: (data) => {
      toast.success('Department Created Successfully', {
        description: `${JSON.stringify(data?.data)}`,
        duration: 3000,
        cancel: {
          label: 'Cancel',
          onClick: () => toast.dismiss(),
        },
      });
    },
    onError: (error: any) => {
      toast.error('Something went wrong', {
        description: `Failed to create department ${error}`,
        duration: 3000,
        cancel: {
          label: 'Cancel',
          onClick: () => toast.dismiss(),
        },
      });
    },
  });

export const useCreateInParameterMutation = () =>
  useMutation({
    mutationFn: (data) => createInParameterReq(data),
    mutationKey: ['CREATE_IN_PARAMETER'],
    onSuccess: (data) => {
      toast.success('In Parameters Created Successfully', {
        description: `${JSON.stringify(data?.data)}`,
        duration: 3000,
        cancel: {
          label: 'Cancel',
          onClick: () => toast.dismiss(),
        },
      });
    },
    onError: (error: any) => {
      toast.error('Something went wrong', {
        description: `Failed to create in parameters ${error}`,
        duration: 3000,
        cancel: {
          label: 'Cancel',
          onClick: () => toast.dismiss(),
        },
      });
    },
  });

export const useUpdateInParamConfigMutation = () =>
  useMutation({
    mutationFn: (data) => updateInParameterConfigReq(data),
    mutationKey: ['UPDATE_IN_PARAM_CONFIG'],
    onSuccess: (data) => {
      toast.success('In Parameter Config Created Successfully', {
        description: `${JSON.stringify(data?.data)}`,
        duration: 3000,
        cancel: {
          label: 'Cancel',
          onClick: () => toast.dismiss(),
        },
      });
    },
    onError: (error: any) => {
      toast.error('Something went wrong', {
        description: `Failed to update in parameter config ${error}`,
        duration: 3000,
        cancel: {
          label: 'Cancel',
          onClick: () => toast.dismiss(),
        },
      });
    },
  });

export const useUpdateInParameterMutation = () =>
  useMutation({
    mutationFn: (data) => updateInparameterReq(data),
    mutationKey: ['UPDATE_IN_PARAM_MUTATION'],
    onSuccess: (data) => {
      toast.success('In Parameter Created Successfully', {
        description: `${JSON.stringify(data?.data)}`,
        duration: 3000,
        cancel: {
          label: 'Cancel',
          onClick: () => toast.dismiss(),
        },
      });
    },
    onError: (error: any) => {
      toast.error('Something went wrong', {
        description: `Failed to update in parameter ${error}`,
        duration: 3000,
        cancel: {
          label: 'Cancel',
          onClick: () => toast.dismiss(),
        },
      });
    },
  });

export const useCreateParamConfigMutation = () =>
  useMutation({
    mutationFn: (data) => createParamConfig(data),
    mutationKey: ['CREATE_PARAMETER_CONFIG_MUTATION'],
    onSuccess: (data) => {
      toast.success('In Parameter Config Created Successfully', {
        description: `${JSON.stringify(data?.data)}`,
        duration: 3000,
        cancel: {
          label: 'Cancel',
          onClick: () => toast.dismiss(),
        },
      });
    },
    onError: (error: any) => {
      toast.error('Something went wrong', {
        description: `Failed to create in parameter config ${error}`,
        duration: 3000,
        cancel: {
          label: 'Cancel',
          onClick: () => toast.dismiss(),
        },
      });
    },
  });

export const useSetDefaultConfigMutation = () =>
  useMutation({
    mutationFn: (data) => setDefaultConfigReq(data),
    mutationKey: ['SET_DEFAULT_CONFIG_MUTATION'],
    onSuccess: (data) => {
      toast.success('Success', {
        description: `Default Parameter Config Set Successfully`,
        duration: 3000,
        cancel: {
          label: 'Cancel',
          onClick: () => toast.dismiss(),
        },
      });
    },
    onError: (error: any) => {
      toast.error('Something went wrong', {
        description: `Failed to set default param configuration ${error}`,
        duration: 3000,
        cancel: {
          label: 'Cancel',
          onClick: () => toast.dismiss(),
        },
      });
    },
  });

export const useCreateTatConfigMutation = () =>
  useMutation({
    mutationFn: (data) => createTatConfigReq(data),
    mutationKey: ['CREATE_TAT_CONFIG_MUTATION'],
    onSuccess: (data) => {
      toast.success('Success', {
        description: `TAT Configuration Created Successfully`,
        duration: 3000,
        cancel: {
          label: 'Cancel',
          onClick: () => toast.dismiss(),
        },
      });
    },
    onError: (error: any) => {
      toast.error('Something went wrong', {
        description: `Failed to create TAT Configuration ${error}`,
        duration: 3000,
        cancel: {
          label: 'Cancel',
          onClick: () => toast.dismiss(),
        },
      });
    },
  });

export const useAttachParameterMutation = () =>
  useMutation({
    mutationFn: (data) => attachParameterReq(data),
    mutationKey: ['ATTACH_PARAM_MUTATION'],
    onSuccess: (data) => {
      toast.success('Success', {
        description: `Attachment Successful`,
        duration: 3000,
        cancel: {
          label: 'Cancel',
          onClick: () => toast.dismiss(),
        },
      });
    },
    onError: (error: any) => {
      toast.error('Something went wrong', {
        description: `Failed to attach parameter ${error}`,
        duration: 3000,
        cancel: {
          label: 'Cancel',
          onClick: () => toast.dismiss(),
        },
      });
    },
  });

export const useDetachParameterMutation = () =>
  useMutation({
    mutationFn: (data) => detachParameterReq(data),
    mutationKey: ['DETACH_PARAM_MUTATION'],
    onSuccess: (data) => {
      toast.success('Success', {
        description: `Parameter Removed Successful`,
        duration: 3000,
        cancel: {
          label: 'Cancel',
          onClick: () => toast.dismiss(),
        },
      });
    },
    onError: (error: any) => {
      toast.error('Something went wrong', {
        description: `Failed to remove parameter ${error}`,
        duration: 3000,
        cancel: {
          label: 'Cancel',
          onClick: () => toast.dismiss(),
        },
      });
    },
  });