import DataService from '@/services/data-service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const fetchParameterReq = async (data: any) => {
  try {
    const parameterResults = await DataService.fetch_parameters(data);
    return parameterResults.data;
  } catch (error) {
    throw Error(`Fetch Parameter Error: ${error}`);
  }
};

const createLabRequest = async (data: any) => {
  try {
    const requestResults = await DataService.create_request(data);
    return requestResults.data;
  } catch (error) {
    throw Error(`Create Lab Request Error: ${error}`);
  }
};

const fetchAllLabRequest = async (data: any) => {
  try {
    const requestResults = await DataService.fetch_lab_requests(data);
    return requestResults.data;
  } catch (error) {
    throw Error(`Fetch Lab Requests Error: ${error}`);
  }
};

const refreshLabRequests = async (data: any) => {
  try {
    const results = await DataService.refresh_lab_requests(data);
    return results.data;
  } catch (error) {
    throw error;
  }
};

const fetchLabRequestDetails = async (data: any) => {
  try {
    const requestResults = await DataService.fetch_request_details(data);
    return requestResults.data;
  } catch (error) {
    throw Error(`Fetch Lab Request Details Error: ${error}`);
  }
};

const createLabReqSpecimen = async (data: any) => {
  try {
    const requestResults = await DataService.create_request_specimen(data);
    return requestResults.data;
  } catch (error) {
    throw Error(`Create Lab Request Specimen Error: ${error}`);
  }
};

const fetchLabUsersReq = async (data: any) => {
  try {
    const requestResults = await DataService.fetch_lab_users(data);
    return requestResults.data;
  } catch (error) {
    throw Error(`Fetch Lab Users Error: ${error}`);
  }
};

const collectSpecimenReq = async (data: any) => {
  try {
    const requestResults = await DataService.collect_specimen(data);
    return requestResults.data;
  } catch (error) {
    throw Error(`Fetch Collect Specimen Error: ${error}`);
  }
};

const receiveSpecimenReq = async (data: any) => {
  try {
    const requestResults = await DataService.receive_specimen(data);
    return requestResults.data;
  } catch (error) {
    throw Error(`Receive Collected Specimen Error: ${error}`);
  }
};

const collectReceiveSpecimenReq = async (data: any) => {
  try {
    const requestResults = await DataService.collect_receive(data);
    return requestResults.data;
  } catch (error) {
    throw Error(`Receive and Collect Specimen Error: ${error}`);
  }
};

const rejectSpecimenReq = async (data: any) => {
  try {
    const requestResults = await DataService.reject_specimen(data);
    return requestResults.data;
  } catch (error) {
    throw Error(`Reject Specimen Error: ${error}`);
  }
};

const fetchCollectionLogs = async (data: any) => {
  try {
    const requestResults = await DataService.specimen_logs(data);
    return requestResults.data;
  } catch (error) {
    throw Error(`Fetch Collect Logs Error: ${error}`);
  }
};

const submitCaptureRequest = async (data: any) => {
  try {
    const requestResults = await DataService.poc_authorization(data);
    return requestResults.data;
  } catch (error) {
    throw Error(`POS Authorization Request Failed: ${error}`);
  }
};

const submitRecollectionReq = async (data: any) => {
  try {
    const requestResults = await DataService.recollect_specimen(data);
    return requestResults.data;
  } catch (error) {
    throw Error(`Specimen Recollection Request Failed: ${error}`);
  }
};

const fetchSpecimenDisposalReq = async (data: any) => {
  try {
    const result = await DataService.fetch_disposal(data);
    return result.data;
  } catch (error) {
    throw Error(`Specimen Disposal Error ${error}`);
  }
};

const fetchNormalizedLabReq = async (data: any) => {
  try {
    const result = await DataService.fetch_normalized_lab_request(data);
    return result.data;
  } catch (error) {
    throw Error(`Normalized Lab Request Error ${error}`);
  }
};

export const useFetchParameterQuery = (data: any) =>
  useQuery({
    queryKey: [`ALL_PARAMETERS`],
    queryFn: () => fetchParameterReq(data),
  });

export const useFetchLabRequestsQuery = (data: any) =>
  useQuery({
    queryKey: [`ALL_LAB_REQUESTS`],
    queryFn: () => fetchAllLabRequest(data),
  });

export const useFetchLabRequestDetailsQuery = (data: any) =>
  useQuery({
    queryKey: [`LAB_REQ_DETAILS_${data?.labRequestId}`],
    queryFn: () => fetchLabRequestDetails(data),
  });

export const useFetchLabUsersQuery = (data: any) =>
  useQuery({
    queryKey: [`LAB_USER_QUERY`],
    queryFn: () => fetchLabUsersReq(data),
  });

export const useCollectionLogQuery = (data: any) =>
  useQuery({
    queryKey: [`COLLECTION_LOG_${data?.collectionLogId}`],
    queryFn: () => fetchCollectionLogs(data),
  });

export const useFetchDisposalQuery = (data: any) => {
  return useQuery({
    queryKey: ['SPECIMEN_DISPOSAL_REQ'],
    queryFn: () => fetchSpecimenDisposalReq(data),
  });
};

export const useFetchNormalizedQuery = (data: any) => {
  return useQuery({
    queryKey: ['FETCH_NORMALIZED_LAB_REQ'],
    queryFn: () => fetchNormalizedLabReq(data),
  });
};

export const useCreateLabRequestMutation = () =>
  useMutation({
    mutationFn: (data) => createLabRequest(data),
    mutationKey: ['CREATE_LAB_REQUEST'],
    onSuccess: (data) => {
      toast.success('Lab Request', {
        description: `Lab Request Created Successfully`,
        duration: 5000,
        cancel: {
          label: 'Cancel',
          onClick: () => toast.dismiss(),
        },
      });
    },
    onError: (error) => {
      toast.error('Request Failed', {
        description: `Failed to Create Lab Request ${error}`,
        duration: 5000,
        cancel: {
          label: 'Cancel',
          onClick: () => toast.dismiss(),
        },
      });
    },
  });

export const useCollectSpecimenMutation = () =>
  useMutation({
    mutationFn: (data) => collectSpecimenReq(data),
    mutationKey: ['COLLECT_SPECIMEN_MUTATION'],
    onSuccess: (data) => {
      toast.success('Success', {
        description: `${data?.data}`,
        duration: 5000,
        cancel: {
          label: 'Cancel',
          onClick: () => toast.dismiss(),
        },
      });
    },
    onError: (error) => {
      toast.error('Request Failed', {
        description: `Failed to Collect Specimen ${error}`,
        duration: 5000,
        cancel: {
          label: 'Cancel',
          onClick: () => toast.dismiss(),
        },
      });
    },
  });

export const useReceiveSpecimenMutation = () =>
  useMutation({
    mutationFn: (data) => receiveSpecimenReq(data),
    mutationKey: ['RECEIVE_SPECIMEN_MUTATION'],
    onSuccess: (data) => {
      toast.success('Success', {
        description: `${data?.data}`,
        duration: 5000,
        cancel: {
          label: 'Cancel',
          onClick: () => toast.dismiss(),
        },
      });
    },
    onError: (error) => {
      toast.error('Request Failed', {
        description: `Failed to Receive Specimen ${error}`,
        duration: 5000,
        cancel: {
          label: 'Cancel',
          onClick: () => toast.dismiss(),
        },
      });
    },
  });

export const useCollectReceiveSpecimenMutation = () =>
  useMutation({
    mutationFn: (data) => collectReceiveSpecimenReq(data),
    mutationKey: ['COLLECT_RECEIVE_MUTATION'],
    onSuccess: (data) => {
      toast.success('Success', {
        description: `${data?.data}`,
        duration: 5000,
        cancel: {
          label: 'Cancel',
          onClick: () => toast.dismiss(),
        },
      });
    },
    onError: (error) => {
      toast.error('Request Failed', {
        description: `Failed to Collect and Receive Specimen ${error}`,
        duration: 5000,
        cancel: {
          label: 'Cancel',
          onClick: () => toast.dismiss(),
        },
      });
    },
  });

export const useRejectSpecimenMutation = () =>
  useMutation({
    mutationFn: (data) => rejectSpecimenReq(data),
    mutationKey: ['REJECT_SPECIMEN_MUTATION'],
    onSuccess: (data) => {
      toast.success('Success', {
        description: `${data?.data}`,
        duration: 5000,
        cancel: {
          label: 'Cancel',
          onClick: () => toast.dismiss(),
        },
      });
    },
    onError: (error) => {
      toast.error('Request Failed', {
        description: `Failed to Reject Specimen ${error}`,
        duration: 5000,
        cancel: {
          label: 'Cancel',
          onClick: () => toast.dismiss(),
        },
      });
    },
  });

export const useCaptureRequestMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => submitCaptureRequest(data),
    mutationKey: ['POC_AUTH_MUTATION'],
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['ALL_LAB_REQUESTS'] });

      toast.success('Success', {
        description: `${data?.data}`,
        duration: 5000,
        cancel: {
          label: 'Cancel',
          onClick: () => toast.dismiss(),
        },
      });
    },
    onError: (error) => {
      toast.error('Request Failed', {
        description: `Failed to Authorize Patient ${error}`,
        duration: 5000,
        cancel: {
          label: 'Cancel',
          onClick: () => toast.dismiss(),
        },
      });
    },
  });
};

export const useRecollectSpecimenMutation = () => {
  return useMutation({
    mutationFn: (data) => submitRecollectionReq(data),
    mutationKey: ['RECOLLECT_SPECIMEN_MUTATION'],
    onSuccess: (data) => {
      toast.success('Success', {
        description: `${data?.data}`,
        duration: 5000,
        cancel: {
          label: 'Cancel',
          onClick: () => toast.dismiss(),
        },
      });
    },
    onError: (error) => {
      toast.error('Request Failed', {
        description: `Failed to Authorize Patient ${error}`,
        duration: 5000,
        cancel: {
          label: 'Cancel',
          onClick: () => toast.dismiss(),
        },
      });
    },
  });
};

export const useRefreshRequests = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => refreshLabRequests(data),
    mutationKey: ['REFRESH_REQ_MUTATION'],
    onSuccess: (data) => {
      queryClient
        .invalidateQueries({ queryKey: ['ALL_LAB_REQUESTS'] })
        .then((r) => {
          toast.success('Success', {
            description: `${data?.message}`,
            duration: 5000,
            cancel: {
              label: 'Cancel',
              onClick: () => toast.dismiss(),
            },
          });
        });
    },
    onError: (error) => {
      toast.error('Request Failed', {
        description: `Failed to Authorize Patient ${error}`,
        duration: 5000,
        cancel: {
          label: 'Cancel',
          onClick: () => toast.dismiss(),
        },
      });
    },
  });
};