const BACKEND="http://localhost:3000"
export const addItem = async (itemName: string, assignedToUserId: string, listId: string) => {
    try {
      const response = await fetch(`${BACKEND}/new/item`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          itemName,
          assignedToUserId,
          listId
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Failed to add item');
      }

      return result.data;
    } catch (error) {
      console.error('Error adding item:', error);
      throw error;
    }
};