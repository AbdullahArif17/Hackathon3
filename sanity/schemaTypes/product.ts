import { defineType, defineField } from "sanity";

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
      description: "The name of the product. This will be used for search and display purposes.",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 200, // Adjust as needed
      },
      validation: (rule) => rule.required(),
      description: "A unique identifier for the product used in URLs.",
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Description",
      validation: (rule) => rule.required(),
      description: "A detailed description of the product.",
    }),
    defineField({
      name: "productImage",
      type: "image",
      title: "Product Image",
      validation: (rule) => rule.required(),
      options: {
        hotspot: true, // Enables image cropping and hotspot functionality
      },
      description: "The main image of the product.",
    }),
    defineField({
      name: "price",
      type: "number",
      title: "Price",
      validation: (rule) => rule.required().min(0),
      description: "The price of the product in USD.",
    }),
    defineField({
      name: "tags",
      type: "array",
      title: "Tags",
      of: [{ type: "string" }],
      description: "Tags to categorize the product for better searchability.",
    }),
    defineField({
      name: "discountPercentage",
      type: "number",
      title: "Discount Percentage",
      validation: (rule) => rule.min(0).max(100),
      description: "The discount percentage applied to the product (e.g., 10 for 10%).",
    }),
    defineField({
      name: "isNew",
      type: "boolean",
      title: "New Badge",
      description: "Enable this to display a 'New' badge on the product.",
    }),
  ],
});