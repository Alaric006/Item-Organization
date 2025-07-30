const BACKEND="http://localhost:3000"

export const addItem = async (itemName: string, assignedToUserId: string, listId: string) => {
    try {
      const response = await fetch(`${BACKEND}/item/new`, {
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

export const removeItem = async(itemId: string) => {
  try {
    const response = await fetch(`${BACKEND}/item/${itemId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`HTPP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result);

    if (!result.success) {
      throw new Error(result.error || 'Failed to remove item');
    }
  } catch (error) {
    console.error('Error removing item:', error);
    throw error;
  }
}
