import type { Product } from '@/types/product';
import { ASSET_REGISTRY } from '@/config/assets';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-testo-natural-power-plus',
    slug: 'testo-natural-power-plus',
    sku: 'AP-TESTO-30V',
    name: 'TESTO Natural Power+ Capsules',
    subtitle: 'Known as Testosterone Booster Supplement',
    shortDescription: 'Synergistic dietary supplement formulated with high-potency botanical extracts including Ashwagandha, Gokhuru, Shilajit, Safed Musli, and Saffron to support natural vitality, stamina, and physical endurance.',
    description: `Arogya Path TESTO Natural Power+ Capsules represent a modern dietary supplement crafted to complement an active lifestyle. Integrating standardized extracts of traditional botanicals—Ashwagandha, Tribulus Terrestris (Gokhuru), Safed Musli, and Purified Shilajit—with essential nutrient catalysts like Saffron and Sea Buckthorn. 

Formulated in 100% vegetarian capsule shells (E 464) without medicinal synthetic hormones or undisclosed additives. Each batch is manufactured in ISO 9001:2015 & GMP certified facilities in compliance with FSSAI dietary supplement safety standards.`,
    category: 'Men\'s Wellness',
    collections: ['mens-wellness', 'vitality', 'best-sellers'],
    price: 999,
    compareAtPrice: 1499,
    currency: 'INR',
    stock: 250,
    packSize: '30 Vegetarian Capsules',
    servings: 30,
    capsuleCount: 30,

    variants: [
      {
        id: 'var-testo-1-pack',
        sku: 'AP-TESTO-30V-1',
        name: '1 Month Supply (1 Bottle - 30 Veg Caps)',
        packSize: '1 Bottle (30 Capsules)',
        capsuleCount: 30,
        price: 999,
        compareAtPrice: 1499,
        stock: 150,
        isDefault: true,
        savingsPercentage: 33,
      },
      {
        id: 'var-testo-2-pack',
        sku: 'AP-TESTO-30V-2',
        name: '2 Month Regimen (2 Bottles - 60 Veg Caps)',
        packSize: '2 Bottles (60 Capsules)',
        capsuleCount: 60,
        price: 1799,
        compareAtPrice: 2998,
        stock: 60,
        isDefault: false,
        savingsPercentage: 40,
      },
      {
        id: 'var-testo-3-pack',
        sku: 'AP-TESTO-30V-3',
        name: '3 Month Value Pack (3 Bottles - 90 Veg Caps)',
        packSize: '3 Bottles (90 Capsules)',
        capsuleCount: 90,
        price: 2399,
        compareAtPrice: 4497,
        stock: 40,
        isDefault: false,
        savingsPercentage: 47,
      },
    ],

    supplementFacts: {
      servingSize: '1 Capsule',
      servingsPerContainer: 30,
      ingredients: [
        {
          name: 'Ashwagandha',
          botanicalName: 'Withania somnifera',
          amount: '100mg',
          dailyValue: 'Daily value not established',
          description: 'Adaptogenic herb known for supporting stress resilience, vitality, and stamina.',
          approvedBenefit: 'Supports stress resilience and endurance.',
        },
        {
          name: 'Gokhuru / Tribulus',
          botanicalName: 'Tribulus terrestris',
          amount: '100mg',
          dailyValue: 'Daily value not established',
          description: 'Traditional botanical extract utilized for supporting stamina and male vigor.',
          approvedBenefit: 'Supports physical endurance and vigor.',
        },
        {
          name: 'Safed Musli',
          botanicalName: 'Chlorophytum borivilianum',
          amount: '50mg',
          dailyValue: 'Daily value not established',
          description: 'Rejuvenative herb supporting physical strength and overall well-being.',
          approvedBenefit: 'Supports physical strength and energy.',
        },
        {
          name: 'Sea Buckthorn',
          botanicalName: 'Hippophae rhamnoides',
          amount: '50mg',
          dailyValue: 'Daily value not established',
          description: 'Rich natural source of bioflavonoids and antioxidant fatty acids.',
          approvedBenefit: 'Antioxidant and cellular support.',
        },
        {
          name: 'Fenugreek',
          botanicalName: 'Trigonella foenum-graecum',
          amount: '30mg',
          dailyValue: 'Daily value not established',
          description: 'Standardized seed extract supporting metabolic health and vitality.',
          approvedBenefit: 'Supports metabolic energy and vitality.',
        },
        {
          name: 'Saffron',
          botanicalName: 'Crocus sativus',
          amount: '15mg',
          dailyValue: 'Daily value not established',
          description: 'Precious botanical catalyst traditional used to support mood and energy.',
          approvedBenefit: 'Supports mood balance and vitality.',
        },
      ],
      proprietaryBlend: {
        name: 'Synergistic Botanical Extract Blend',
        amount: '170mg',
        ingredients: [
          'Konch / Kaunch Beej (Mucuna pruriens)',
          'Purified Shilajit (Asphaltum)',
          'Talmakhana (Hygrophila spinosa)',
          'Ginger (Zingiber officinale)',
        ],
      },
      otherIngredients: [
        'Vegetarian Capsule Shell E (464)',
        'Approved food colors used in empty capsule shell',
      ],
    },

    directions: {
      labelInstruction: 'One capsule twice a day as directed by dietician.',
      suggestedUse: 'Swallow whole with lukewarm milk or water after a meal.',
      timing: 'Best taken post-breakfast and post-dinner.',
      bestResultsDuration: 'Recommended usage for 2–3 months alongside a balanced diet and regular exercise.',
    },

    warnings: [
      'DIETARY SUPPLEMENT, NOT FOR MEDICINAL USE.',
      'Capsule should be swallowed whole & not to be opened, chewed or crushed.',
      'Keep out of reach of children.',
      'This product is not intended to diagnose, treat, cure or prevent any disease.',
      'Consult your physician prior to use if taking prescription medication or under medical supervision.',
    ],
    storage: 'Store in a cool, dry & dark place away from direct sunlight.',
    disclaimer: 'The statements on this packaging have not been evaluated by the Food Safety and Standards Authority or medical authorities for therapeutic claims. This product is a food supplement intended to support general wellness.',

    images: {
      primary: ASSET_REGISTRY.products.testoNatural.front,
      label: ASSET_REGISTRY.products.testoNatural.label,
      render3d: ASSET_REGISTRY.products.testoNatural.render3d,
      gallery: [...ASSET_REGISTRY.products.testoNatural.gallery],
    },

    badges: ['FSSAI Approved', '100% Veg', 'ISO 9001:2015', 'GMP Certified'],
    rating: 4.8,
    reviewCount: 142,
    featured: true,
    bestSeller: true,
    newArrival: false,
    tags: ['testosterone support', 'stamina', 'ashwagandha', 'shilajit', 'mens wellness', 'ayurvedic science'],

    seo: {
      title: 'TESTO Natural Power+ Capsules (30 Veg Caps) | Arogya Path',
      description: 'Buy Arogya Path TESTO Natural Power+ Capsules. Synergistic formula with Ashwagandha, Gokhuru, Shilajit, Safed Musli, and Saffron for stamina and vitality.',
      ogImage: ASSET_REGISTRY.products.testoNatural.front,
    },

    regulatory: {
      fssaiLicense: '12118441000654',
      isVegetarian: true,
      certifications: ['ISO 9001:2015', 'ISO 22000:2018', 'GMP Certified'],
      marketedBy: 'AROGYAPATH MARKETING, Ashok Nagar, Logardaga',
      manufacturedBy: 'Streamline Pharma Private Limited, Kothe Aathchak, Jagraon - 142026',
      mrp: 999,
    },

    discrepancyNotices: [
      {
        field: 'daily_dosage',
        packagingValue: 'One capsule twice a day as directed by dietician',
        promotionalValue: 'Take one capsule a day',
        status: 'PENDING_BUSINESS_CONFIRMATION',
        note: 'Official physical packaging label takes precedence. Displaying 1-2 capsules daily per label recommendation pending final medical board review.',
      },
    ],
  },
];
