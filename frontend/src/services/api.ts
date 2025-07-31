const BACKEND = process.env.REACT_APP_BACKEND;

console.log(`Backend URL: ${BACKEND}`);

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

export const updateItemName = async (itemId: string, newName: string) => {
  try {
    const response = await fetch(`${BACKEND}/item/update/name/${itemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        newName: newName
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || 'Failed to update item name');
    }

    return result.data;
  } catch (error) {
    console.error('Error updating item name:', error);
    throw error;
  }
}

export const updateItemAssignedTo = async (itemId: string, newAssignedToId: string) => {
  try {
    const response = await fetch(`${BACKEND}/item/update/assigned_to/${itemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        newAssignedToId: newAssignedToId
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || 'Failed to update item assigned to');
    }

    return result.data;
  } catch (error) {
    console.error('Error updating item assigned to:', error);
    throw error;
  }
}
