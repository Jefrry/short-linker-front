import { useNotificationStore } from '@/entities/notification';
import { useDeleteUserLinks } from '@/entities/user';

interface UseDeleteLinkProps {
  onSuccess?: (ids: string[]) => void;
}

export const useDeleteLink = ({ onSuccess }: UseDeleteLinkProps = {}) => {
  const { mutate, isPending } = useDeleteUserLinks();
  const { addNotification } = useNotificationStore();

  const deleteLinks = (selectedIds: string[]) => {
    if (selectedIds.length === 0) {
      addNotification({
        type: 'error',
        title: 'Selection empty',
        description: 'Please select at least one link to delete',
      });
      return;
    }

    mutate(selectedIds, {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: 'Deleting links',
          description: `Deletion may take some time... Deleting ${selectedIds.length} link(s)`,
        });
        onSuccess?.(selectedIds);
      },
      onError: () => {
        addNotification({
          type: 'error',
          title: 'Error',
          description: 'Failed to delete links',
        });
      },
    });
  };

  return {
    deleteLinks,
    isDeleting: isPending,
  };
};
