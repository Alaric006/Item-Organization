curl -X POST http://localhost:3000/new/item \
    -H "Content-Type: application/json" \
    -d '{
      "itemName": "Chocolate",
      "assignedToUserId": "986d1e48-09ea-40e8-96ee-6be390426c2c",
      "listId": "4bb0c34a-2774-43ca-afd4-8cdcf63b66ae"
    }'