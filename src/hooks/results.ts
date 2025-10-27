import { useMutation, useQuery } from "@tanstack/react-query";
import DataService from "@/services/data-service";
import { toast } from "sonner";

const fetchResultsReq = async (data: any) => {
  try {
    const requestResults = await DataService.fetch_request_results(data);
    return requestResults.data;
  } catch (error) {
    throw Error(`Request Results Error: ${error}`);
  }
};

const fetchRequestDetails = async (data: any) => {
  try {
    const requestResults = await DataService.fetch_result_details(data);
    return requestResults.data;
  } catch (error) {
    throw Error(`Request Results Details Error: ${error}`);
  }
};

const authorizeResultReq = async (data: any) => {
  try {
    const requestResults = await DataService.authorize_results(data);
    return requestResults.data;
  } catch (error) {
    throw Error(`Authorize Results Error: ${error}`);
  }
};

const postRequestResults = async (data: any) => {
  try {
    const requestResults = await DataService.post_results(data);
    return requestResults.data;
  } catch (error) {
    throw Error(`Post Results Error: ${error}`);
  }
};

const fetchResult = async (data: any) => {
  try {
    const requestResults = await DataService.fetch_result(data);
    return requestResults.data;
  } catch (error) {
    throw Error(`Fetch Result Error: ${error}`);
  }
};

const fetchAnalyzerResults = async (data: any) => {
  try {
    const requestResults = await DataService.analyzer_results(data);
    return requestResults.data;
  } catch (error) {
    throw Error(`Fetch Analyzer Result Error: ${error}`);
  }
};

const modifyParameterReq = async (data: any) => {
  try {
    const requestResult = await DataService.modify_result(data);
    return requestResult?.data;
  } catch (error) {
    throw Error(`Modify Result Error: ${error}`);
  }
};

export const useFetchRequestResultsQuery = (data: any) =>
  useQuery({
    queryKey: ["FETCH_REQ_RESULTS"],
    queryFn: () => fetchResultsReq(data),
  });

export const useFetchReqResultDetailsQuery = (data: any) =>
  useQuery({
    queryKey: [`FETCH_REQ_RESULT_DETAILS_${data?.requestResultId}`],
    queryFn: () => fetchRequestDetails(data),
  });

export const useFetchAnalyzerResultQuery = (data: any) =>
  useQuery({
    queryKey: [`ANALYZER_RESULTS_QUERY_${data?.referenceNumber}`],
    queryFn: () => fetchAnalyzerResults(data),
  });

export const useAuthorizeResultMutation = () =>
  useMutation({
    mutationKey: ["AUTHORIZE_RESULTS_MUTATION"],
    mutationFn: (data) => authorizeResultReq(data),
    onSuccess: (data: any) => {
      toast.success("Authorize Results Successfully", {
        description: `${JSON.stringify(data?.data)}`,
        duration: 5000,
        cancel: {
          label: "Cancel",
          onClick: () => toast.dismiss(),
        },
      });
    },
    onError: (error) => {
      toast.error("Something went wrong", {
        description: `Failed to authorize results ${error}`,
        duration: 5000,
        cancel: {
          label: "Cancel",
          onClick: () => toast.dismiss(),
        },
      });
    },
  });

export const usePostResultsMutation = () =>
  useMutation({
    mutationKey: ["POST_RESULT_REQ"],
    mutationFn: (data: any) => postRequestResults(data),
    onSuccess: (data: any) => {
      toast.success(" Results Posted Successfully", {
        description: `${JSON.stringify(data?.data)}`,
        duration: 5000,
        cancel: {
          label: "Cancel",
          onClick: () => toast.dismiss(),
        },
      });
    },
    onError: (error) => {
      toast.error("Something went wrong", {
        description: `Failed to Post results ${error}`,
        duration: 5000,
        cancel: {
          label: "Cancel",
          onClick: () => toast.dismiss(),
        },
      });
    },
  });

export const useModifyItemResultMutation = () =>
  useMutation({
    mutationKey: ["MODIFY_ITEM_RESULT"],
    mutationFn: (data: any) => modifyParameterReq(data),
    onSuccess: (data: any) => {
      toast.success(" Results Modified Successfully", {
        description: `${JSON.stringify(data?.data)}`,
        duration: 5000,
        cancel: {
          label: "Cancel",
          onClick: () => toast.dismiss(),
        },
      });
    },
    onError: (error) => {
      toast.error("Something Went Wrong", {
        description: `Failed to Modify result ${error}`,
        duration: 5000,
        cancel: {
          label: "Cancel",
          onClick: () => toast.dismiss(),
        },
      });
    },
  });
