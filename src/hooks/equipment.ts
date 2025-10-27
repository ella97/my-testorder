import DataService from '@/services/data-service';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

const createEquipmentReq = async (data: any) => {
  try {
    const equipmentResults = await DataService.create_equipment(data);
    return equipmentResults.data;
  } catch (error) {
    throw Error(`Create Equipment Req Error: ${error}`);
  }
};

const fetchEquipmentReq = async (data: any) => {
  try {
    const equipmentResults = await DataService.fetch_equipments(data);
    return equipmentResults.data;
  } catch (error) {
    throw Error(`Fetch Equipment Req Error: ${error}`);
  }
};

const fetchEquipmentProfile = async (data: any) => {
  try {
    const equipmentResults = await DataService.fetch_equipment(data);
    return equipmentResults.data;
  } catch (error) {
    throw Error(`Fetch Equipment Profile Error: ${error}`);
  }
};

export const useFetchEquipmentQuery = (data: any) =>
  useQuery({
    queryKey: [`EQUIPMENT_LIST`],
    queryFn: () => fetchEquipmentReq(data),
  });

export const useEquipmentProfileQuery = (data: any) =>
  useQuery({
    queryKey: [`EQUIPMENT_${data?.equipmentId}`],
    queryFn: () => fetchEquipmentProfile(data),
  });

export const useCreateEquipmentMutation = () =>
  useMutation({
    mutationFn: (data) => createEquipmentReq(data),
    mutationKey: ['CREATE_EQUIPMENT'],
    onSuccess: (data) => {
      toast.success('Equipment Created Successfully', {
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
        description: `Failed to Create Equipment ${error}`,
        duration: 5000,
        cancel: {
          label: 'Cancel',
          onClick: () => toast.dismiss(),
        },
      });
    },
  });