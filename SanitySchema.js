export default {
    name: 'product',
    type: 'document',
    title: 'Product',
    fields: [
      {
        name: 'name',
        type: 'string',
        title: 'Product Name',
        validation: (Rule) =>
          Rule.required()
            .max(100)
            .error('Product name is required and cannot exceed 100 characters.'),
      },
      {
        name: 'slug',
        type: 'slug',
        title: 'Slug',
        description: 'URL-friendly identifier for the product.',
        options: {
          source: 'name',
          maxLength: 200,
        },
        validation: (Rule) =>
          Rule.required().error('Slug is required for product identification.'),
      },
      {
        name: 'description',
        type: 'text',
        title: 'Description',
        description: 'Detailed description of the product.',
        validation: (Rule) =>
          Rule.required()
            .min(20)
            .max(500)
            .error('Description must be between 20 and 500 characters.'),
      },
      {
        name: 'price',
        type: 'number',
        title: 'Product Price',
        validation: (Rule) =>
          Rule.required()
            .min(0)
            .error('Product price must be a positive value.'),
      },
      {
        name: 'discountPrice',
        type: 'number',
        title: 'Discounted Price',
        description: 'Discounted price for promotional offers.',
        validation: (Rule) =>
          Rule.min(0)
            .error('Discounted price must be a non-negative value.'),
      },
      {
        name: 'stock',
        type: 'number',
        title: 'Stock Quantity',
        description: 'Number of units available in stock.',
        validation: (Rule) =>
          Rule.required()
            .min(0)
            .error('Stock quantity must be a non-negative number.'),
      },
      {
        name: 'category',
        type: 'reference',
        title: 'Category',
        to: [{ type: 'category' }],
        description: 'Category this product belongs to (e.g., Electronics, Clothing).',
        validation: (Rule) =>
          Rule.required().error('Product category is required.'),
      },
      {
        name: 'tags',
        type: 'array',
        title: 'Tags',
        of: [{ type: 'string' }],
        options: {
          layout: 'tags',
        },
        description: 'Tags like "new arrival", "bestseller", or "on sale".',
      },
      {
        name: 'images',
        type: 'array',
        title: 'Product Images',
        of: [{ type: 'image' }],
        description: 'Upload multiple images for the product.',
        options: {
          hotspot: true,
        },
        validation: (Rule) =>
          Rule.required()
            .min(1)
            .error('At least one product image is required.'),
      },
      {
        name: 'rating',
        type: 'number',
        title: 'Rating',
        description: 'Average product rating (0-5).',
        validation: (Rule) =>
          Rule.min(0)
            .max(5)
            .precision(1)
            .error('Rating must be between 0 and 5.'),
      },
      {
        name: 'ratingCount',
        type: 'number',
        title: 'Rating Count',
        description: 'Number of users who have rated the product.',
        validation: (Rule) =>
          Rule.min(0)
            .error('Rating count must be a non-negative number.'),
      },
      {
        name: 'sizes',
        type: 'array',
        title: 'Available Sizes',
        of: [{ type: 'string' }],
        options: {
          layout: 'tags',
        },
        description: 'Available sizes (e.g., S, M, L, XL).',
      },
      {
        name: 'seoTitle',
        type: 'string',
        title: 'SEO Title',
        description: 'SEO-optimized title (max 60 characters).',
        validation: (Rule) =>
          Rule.max(60)
            .error('SEO title cannot exceed 60 characters.'),
      },
      {
        name: 'seoDescription',
        type: 'text',
        title: 'SEO Description',
        description: 'SEO-optimized description (max 160 characters).',
        validation: (Rule) =>
          Rule.max(160)
            .error('SEO description cannot exceed 160 characters.'),
      },
    ],
  };
  