// src/controllers/menuItem.controller.js
import { prisma } from "../utils/prisma.js";

const VALID_STATUSES = ["Available", "Unavailable"];

// ─── Create Menu Item ─────────────────────────────────────────────────────────
export const createMenuItem = async (req, res, next) => {
  try {
    const { name, price, available_status, category_name } = req.body;

    if (!name || !price || !category_name) {
      return res
        .status(400)
        .json({ message: "name, price and category_name are required" });
    }

    const category = await prisma.menuCategory.findFirst({
      where: { name: category_name },
    });

    if (!category) {
      return res
        .status(404)
        .json({ message: `Category '${category_name}' not found` });
    }

    const menuItem = await prisma.menuItem.create({
      data: {
        name,
        price: Number(price),
        available_status: available_status || "Available",
        category: { connect: { category_id: category.category_id } },
      },
      include: { category: true },
    });

    return res.status(201).json({
      message: "Menu item created successfully",
      data: menuItem,
    });
  } catch (error) {
    next(error);
  }
};

// ─── Get All Menu Items ───────────────────────────────────────────────────────
export const getAllMenuItems = async (req, res, next) => {
  try {
    const { category_id } = req.query;

    const filters = {};
    if (category_id) filters.category_id = Number(category_id);

    const menuItems = await prisma.menuItem.findMany({
      where: filters,
      orderBy: { name: "asc" },
      include: { category: true },
    });

    if (menuItems.length === 0) {
      return res.status(200).json({
        message: "No menu items found",
        data: [],
      });
    }

    return res.status(200).json({
      message: "Menu items fetched successfully",
      data: menuItems,
    });
  } catch (error) {
    next(error);
  }
};

// ─── Get Menu Item By ID ──────────────────────────────────────────────────────
export const getMenuItemById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const menuItem = await prisma.menuItem.findUnique({
      where: { menu_item_id: Number(id) },
      include: { category: true },
    });

    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    return res.status(200).json({
      message: "Menu item fetched successfully",
      data: menuItem,
    });
  } catch (error) {
    next(error);
  }
};

// ─── Update Menu Item ─────────────────────────────────────────────────────────
export const updateMenuItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, price, available_status, category_id } = req.body;

    const existing = await prisma.menuItem.findUnique({
      where: { menu_item_id: Number(id) },
    });
    if (!existing) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    // If category is changing, verify the new one exists
    if (category_id && Number(category_id) !== existing.category_id) {
      const category = await prisma.menuCategory.findUnique({
        where: { category_id: Number(category_id) },
      });
      if (!category) {
        return res.status(404).json({ message: "Menu category not found" });
      }
    }

    const menuItem = await prisma.menuItem.update({
      where: { menu_item_id: Number(id) },
      data: {
        name: name ?? existing.name,
        price: price ? Number(price) : existing.price,
        category: category_id
          ? { connect: { category_id: Number(category_id) } }
          : undefined,
        available_status: available_status ?? existing.available_status,
      },
      include: { category: true },
    });

    return res.status(200).json({
      message: "Menu item updated successfully",
      data: menuItem,
    });
  } catch (error) {
    next(error);
  }
};

// ─── Delete Menu Item ─────────────────────────────────────────────────────────
export const deleteMenuItem = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existing = await prisma.menuItem.findUnique({
      where: { menu_item_id: Number(id) },
      include: { order_items: true },
    });
    if (!existing) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    if (existing.order_items.length > 0) {
      return res.status(400).json({
        message: "Cannot delete menu item linked to existing orders.",
      });
    }

    await prisma.menuItem.delete({ where: { menu_item_id: Number(id) } });

    return res.status(200).json({ message: "Menu item deleted successfully" });
  } catch (error) {
    next(error);
  }
};
