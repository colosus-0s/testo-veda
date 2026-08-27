import type { Product } from '@/types/product';
import { ASSET_REGISTRY } from '@/config/assets';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-testo-natural-power-plus',
    slug: 'testo-natural-power-plus',
    sku: 'AP-TESTO-30V',
    name: 'TESTO Natural Power+ Capsules',
    subtitle: 'Botanical Dietary Supplement',
    shortDescription: 'Dietary supplement formulated with botanical extracts including Ashwagandha, Gokhuru, Shilajit, Safed Musli, and Saffron to support daily vitality and physical endurance.',
    description: `Arogya Path TESTO Natural Power+ Capsules represent a modern dietary supplement crafted to complement an active lifestyle. Integrating traditional botanicals—Ashwagandha, Tribulus Terrestris (Gokhuru), Safed Musli, and Purified Shilajit—with botanical extracts like Saffron and Sea Buckthorn. 
Formulated in 100% vegetarian capsule shells (E 464). Manufactured in ISO 9001:2015 & GMP certified facilities under FSSAI License No. 12118441000654.`,
    category: 'Men\'s Wellness',
    collections: ['mens-wellness', 'vitality'],
    price: 999,
    compareAtPrice: undefined,
    currency: 'INR',
    stock: 250,
    packSize: '30 Vegetarian Capsules',
    servings: 30,
    capsuleCount: 30,

    variants: [
      {
        id: 'var-testo-1-pack',
        sku: 'AP-TESTO-30V-1',
        name: '1 Bottle (30 Veg Caps)',
        packSize: '1 Bottle (30 Capsules)',
        capsuleCount: 30,
        price: 999,
        compareAtPrice: undefined,
        stock: 150,
        isDefault: true,
      },
      {
        id: 'var-testo-2-pack',
        sku: 'AP-TESTO-30V-2',
        name: '2 Bottles (60 Veg Caps)',
        packSize: '2 Bottles (60 Capsules)',
        capsuleCount: 60,
        price: 1998,
        compareAtPrice: undefined,
        stock: 60,
        isDefault: false,
      },
      {
        id: 'var-testo-3-pack',
        sku: 'AP-TESTO-30V-3',
        name: '3 Bottles (90 Veg Caps)',
        packSize: '3 Bottles (90 Capsules)',
        capsuleCount: 90,
        price: 2997,
        compareAtPrice: undefined,
        stock: 40,
        isDefault: false,
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
          description: 'Adaptogenic herb traditionally used for stress management and vitality.',
          approvedBenefit: 'Supports daily stamina and vitality.',
        },
        {
          name: 'Gokhuru / Tribulus',
          botanicalName: 'Tribulus terrestris',
          amount: '100mg',
          dailyValue: 'Daily value not established',
          description: 'Traditional botanical extract utilized for physical endurance.',
          approvedBenefit: 'Supports physical endurance.',
        },
        {
          name: 'Safed Musli',
          botanicalName: 'Chlorophytum borivilianum',
          amount: '50mg',
          dailyValue: 'Daily value not established',
          description: 'Rejuvenative herb supporting physical strength.',
          approvedBenefit: 'Supports physical strength.',
        },
        {
          name: 'Sea Buckthorn',
          botanicalName: 'Hippophae rhamnoides',
          amount: '50mg',
          dailyValue: 'Daily value not established',
          description: 'Berry extract rich in natural fatty acids and flavonoids.',
          approvedBenefit: 'Antioxidant support.',
        },
        {
          name: 'Fenugreek',
          botanicalName: 'Trigonella foenum-graecum',
          amount: '30mg',
          dailyValue: 'Daily value not established',
          description: 'Seed extract supporting metabolic wellness.',
          approvedBenefit: 'Supports metabolic energy.',
        },
        {
          name: 'Saffron',
          botanicalName: 'Crocus sativus',
          amount: '15mg',
          dailyValue: 'Daily value not established',
          description: 'Botanical stigma extract traditionally used for mood support.',
          approvedBenefit: 'Supports mood balance.',
        },
      ],
      proprietaryBlend: {
        name: 'Botanical Extract Blend',
        amount: '170mg',
        ingredients: [
          'Kaunch Beej (Mucuna pruriens)',
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
      timing: 'Taken after meals as directed.',
      bestResultsDuration: 'Consistent daily intake as directed by your healthcare dietician.',
    },

    warnings: [
      'DIETARY SUPPLEMENT, NOT FOR MEDICINAL USE.',
      'Capsule should be swallowed whole & not to be opened, chewed or crushed.',
      'Keep out of reach of children.',
      'This product is not intended to diagnose, treat, cure or prevent any disease.',
      'Consult your physician prior to use if taking prescription medication or under medical supervision.',
    ],
    storage: 'Store in a cool, dry & dark place away from direct sunlight.',
    disclaimer: 'The statements on this packaging have not been evaluated by FSSAI or medical authorities for therapeutic claims. This product is a food supplement intended to support general wellness.',

    images: {
      primary: ASSET_REGISTRY.products.testoNatural.front,
      label: ASSET_REGISTRY.products.testoNatural.label,
      render3d: ASSET_REGISTRY.products.testoNatural.render3d,
      gallery: [...ASSET_REGISTRY.products.testoNatural.gallery],
    },

    badges: ['FSSAI Lic. #12118441000654', '100% Veg', 'ISO 9001:2015', 'GMP Certified'],
    rating: 0,
    reviewCount: 0,
    featured: true,
    bestSeller: true,
    newArrival: false,
    tags: ['stamina', 'ashwagandha', 'shilajit', 'mens wellness', 'botanical supplement'],

    seo: {
      title: 'TESTO Natural Power+ Capsules (30 Veg Caps) | Arogya Path',
      description: 'Arogya Path TESTO Natural Power+ Capsules. Botanical formula with Ashwagandha, Gokhuru, Shilajit, Safed Musli, and Saffron for daily vitality.',
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
        note: 'Official physical packaging label takes precedence: "One capsule twice a day as directed by dietician."',
      },
    ],
  },
];
