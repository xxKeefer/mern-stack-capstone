const { v4: uuidv4 } = require("uuid");
const axios = require("axios").default;
const { SQUARE_API_CONFIG } = require("../utils/squareConfig");

const createOrder = async (req, res) => {
  const { square_id: customer_id } = req.user;
  const { line_items, location_id = "LWB7HW6Z45KS9" } = req.body;

  line_items.map((i) => {
    i.uid = uuidv4();
    i.quantity = i.quantity.toString();
  });

  /**
   * line_items looks like an array of the following objects:
   *
   * {
   *   quantity: 1,
   *   catalog_object_id: "WXKXRP7DKLD3UEGKOUXRVVZV",
   *   uid: "SomeUniqueIdentifier1",
   * }
   *
   * the uid is added on line 9
   */

  try {
    const { data } = await axios.post(
      "/orders",
      {
        idempotency_key: uuidv4(),
        location_id,
        order: {
          location_id,
          customer_id,
          state: "OPEN",
          line_items,
        },
      },
      SQUARE_API_CONFIG
    );

    res.status(201).json(data);
  } catch (e) {
    res.status(400).json(e.message);
  }
};

//retrieves all orders for current user
const searchAllOwned = async (req, res) => {
  const { square_id: customer_id } = req.user;
  const { location_id = "LWB7HW6Z45KS9" } = req.body;

  try {
    const { data } = await axios.post(
      "/orders/search",
      {
        location_ids: [location_id],
        return_entries: true,
        query: {
          sort: {
            sort_field: "CREATED_AT",
            sort_order: "DESC",
          },
          filter: {
            customer_filter: {
              customer_ids: [customer_id],
            },
          },
        },
      },
      SQUARE_API_CONFIG
    );

    res.status(201).json(data);
  } catch (e) {
    res.status(400).json(e.message);
  }
};

const retrieveOrder = async (req, res) => {
  const { square_id: customer_id, roles } = req.user;
  const { id } = req.params;

  try {
    const { data } = await axios.get(`/orders/${id}`, SQUARE_API_CONFIG);

    if (
      (data && data.order.customer_id !== customer_id) ||
      roles.includes("admin")
    ) {
      res.status(200).json({});
    } else {
      res.status(200).json(data);
    }
  } catch (e) {
    res.status(400).json(e.message);
  }
};

module.exports = { createOrder, searchAllOwned, retrieveOrder };
