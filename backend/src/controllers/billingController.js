import { prisma } from "../utils/prisma.js";

export const createBilling = async (req, res) => {
  try {
    const {
      customer_name,
      payment_method,
      table_number,
      room_number,
      bill_type,
      room_reservation_id,
      table_reservation_id,
      food_order_id,
      generated_by_user_id,
      bill_status,
      room_charges,
      food_charges,
      tax_amount,
      discount_amount,
      total_amount,
      table_ids,
      room_ids,
      guest_ids,
    } = req.body;

    // Basic validation
    if (!bill_type || !generated_by_user_id || total_amount == null) {
      return res.status(400).json({
        success: false,
        message:
          "bill_type, generated_by_user_id and total_amount are required",
      });
    }

    const billing = await prisma.billing.create({
      data: {
        customer_name: customer_name || null,

        payment_method: payment_method || null,

        table_number: Number(table_number) || null,

        room_number: Number(room_number) || null,

        bill_type,

        room_reservation_id: room_reservation_id || null,

        table_reservation_id: table_reservation_id || null,

        food_order_id: food_order_id || null,

        generated_by_user_id,

        bill_status: bill_status || "PENDING",

        room_charges: room_charges || 0,
        food_charges: food_charges || 0,
        tax_amount: tax_amount || 0,
        discount_amount: discount_amount || 0,

        total_amount,

        // Many-to-many relation with tables
        tables: table_ids?.length
          ? {
              connect: table_ids.map((id) => ({
                table_id: Number(id),
              })),
            }
          : undefined,

        rooms: room_ids?.length
          ? {
              connect: room_ids.map((id) => ({
                room_id: Number(id),
              })),
            }
          : undefined,

        // Many-to-many relation with guests
        guests: guest_ids?.length
          ? {
              connect: guest_ids.map((id) => ({
                guest_id: id,
              })),
            }
          : undefined,
      },

      include: {
        room_reservation: true,
        table_reservation: true,
        food_order: true,
        generated_by: true,
        payments: true,
        tables: true,
        rooms: true,
        guests: true,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Billing created successfully",
      data: billing,
    });
  } catch (error) {
    console.error("Create Billing Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create billing",
      error: error.message,
    });
  }
};

/**
 * GET ALL BILLINGS
 */
export const getAllBillings = async (req, res) => {
  try {
    const billings = await prisma.billing.findMany({
      include: {
        room_reservation: true,
        table_reservation: true,
        food_order: true,
        generated_by: true,
        payments: true,
        tables: true,
        rooms: true,
        guests: true,
      },

      orderBy: {
        created_at: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      count: billings.length,
      data: billings,
    });
  } catch (error) {
    console.error("Get Billings Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch billings",
      error: error.message,
    });
  }
};

/**
 * GET SINGLE BILLING
 */
export const getBillingById = async (req, res) => {
  try {
    const { id } = req.params;

    const billing = await prisma.billing.findUnique({
      where: {
        bill_id: Number(id),
      },

      include: {
        room_reservation: true,
        table_reservation: true,
        food_order: true,
        generated_by: true,
        payments: true,
        tables: true,
        rooms: true,
        guests: true,
      },
    });

    if (!billing) {
      return res.status(404).json({
        success: false,
        message: "Billing not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: billing,
    });
  } catch (error) {
    console.error("Get Billing Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch billing",
      error: error.message,
    });
  }
};
