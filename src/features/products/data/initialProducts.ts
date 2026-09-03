import type { Product } from '@/types/product';
import { ASSET_REGISTRY } from '@/config/assets';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    slug: 'testo-natural-power-plus',
    sku: 'AP-TESTO-30V',
    name: 'TESTO BOOSTER Capsules',
    subtitle: 'Support Overall Health and Vitality for Men',
    shortDescription: 'Botanical health supplement formulated with 10 classical plant extracts including Ashwagandha, Gokhuru, Shilajit, Safed Musli, and Saffron to support daily stamina and male vitality.',
    description: `Arogya Path TESTO BOOSTER Capsules represent an authentic botanical health supplement crafted to support overall health and vitality for men. Formulated with classical botanicals—Ashwagandha, Gokhuru, Safed Musli, Purified Shilajit, Saffron, and Sea Buckthorn. 100% vegetarian capsule shells (HPMC Vegetarian). Manufactured in ISO 9001:2015 & GMP certified facilities under active FSSAI License No. 12118441000654.`,
    category: 'Men\'s Wellness',
    collections: ['mens-wellness', 'vitality'],
    price: 1499,
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
        price: 1499,
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
        price: 2998,
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
        price: 4497,
        compareAtPrice: undefined,
        stock: 40,
        isDefault: false,
      },
    ],

    supplementFacts: {
      servingSize: '1 Vegetarian Capsule',
      servingsPerContainer: 30,
      ingredients: [
        {
          name: 'Ashwagandha Extract',
          botanicalName: 'Withania somnifera',
          amount: '100mg',
          dailyValue: 'Daily value not established',
          description: 'Adaptogenic root extract recognized for supporting stress resilience, stamina, and daily vigor.',
          approvedBenefit: 'Supports daily stamina and vitality.',
        },
        {
          name: 'Gokhuru Extract',
          botanicalName: 'Tribulus terrestris',
          amount: '100mg',
          dailyValue: 'Daily value not established',
          description: 'Bioactive fruit extract traditionally used for physical endurance.',
          approvedBenefit: 'Supports physical endurance.',
        },
        {
          name: 'Safed Musli Extract',
          botanicalName: 'Chlorophytum borivilianum',
          amount: '50mg',
          dailyValue: 'Daily value not established',
          description: 'Traditional Rasayana root prized for nourishing muscle tissue and physical strength.',
          approvedBenefit: 'Supports physical strength.',
        },
        {
          name: 'Sea Buckthorn Extract',
          botanicalName: 'Hippophae rhamnoides',
          amount: '50mg',
          dailyValue: 'Daily value not established',
          description: 'Berry extract rich in natural bioflavonoids and antioxidant fatty acids.',
          approvedBenefit: 'Antioxidant support.',
        },
        {
          name: 'Fenugreek Extract',
          botanicalName: 'Trigonella foenum-graecum',
          amount: '30mg',
          dailyValue: 'Daily value not established',
          description: 'Saponin-standardized seed extract that aids metabolic processes and vitality.',
          approvedBenefit: 'Supports metabolic energy.',
        },
        {
          name: 'Saffron Extract',
          botanicalName: 'Crocus sativus',
          amount: '15mg',
          dailyValue: 'Daily value not established',
          description: 'Precious crocin-rich stigma extract traditionally valued for mood balance and overall wellbeing.',
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
          'Ginger Extract (Zingiber officinale)',
        ],
      },
      otherIngredients: [
        'Excipients q.s.',
        'Capsule Shell: 100% Vegetarian HPMC (E 464)',
      ],
    },

    directions: {
      labelInstruction: 'One capsule twice a day or as directed by a Healthcare Professional.',
      suggestedUse: 'Swallow whole with lukewarm milk or water after a meal. Do not open, chew, or crush.',
      timing: 'Taken after meals as directed.',
      bestResultsDuration: 'Consistent daily usage as directed by your Healthcare Professional.',
    },

    warnings: [
      'HEALTH SUPPLEMENT, NOT FOR MEDICINAL USE.',
      'Advice: Not to exceed recommended daily usage.',
      'Capsule should be swallowed whole & not to be opened, chewed or crushed.',
      'Not recommended for children, pregnant or lactating women.',
      'Keep out of reach of children.',
      'This product is not intended to diagnose, treat, cure or prevent any disease.',
    ],
    storage: 'Store in a cool, dry & dark place away from direct sunlight.',
    disclaimer: 'The statements on this packaging have not been evaluated by FSSAI or medical authorities for therapeutic claims. This product is a health supplement intended to support overall health and vitality for men.',

    images: {
      primary: ASSET_REGISTRY.products.testoBooster.front,
      label: ASSET_REGISTRY.products.testoBooster.front,
      render3d: ASSET_REGISTRY.products.testoBooster.stillLife,
      gallery: [...ASSET_REGISTRY.products.testoBooster.gallery],
    },

    badges: ['FSSAI Lic. #12118441000654', '100% Veg', 'ISO 9001:2015', 'GMP Certified'],
    rating: 0,
    reviewCount: 0,
    featured: true,
    bestSeller: true,
    newArrival: false,
    tags: ['stamina', 'ashwagandha', 'shilajit', 'mens wellness', 'botanical supplement'],

    seo: {
      title: 'TESTO BOOSTER Capsules (30 Veg Caps) | Arogya Path',
      description: 'Arogya Path TESTO BOOSTER Capsules. Botanical formula with Ashwagandha, Gokhuru, Shilajit, Safed Musli, and Saffron for daily vitality.',
      ogImage: ASSET_REGISTRY.products.testoBooster.front,
    },

    regulatory: {
      fssaiLicense: '12118441000654',
      isVegetarian: true,
      certifications: ['ISO 9001:2015 22000:2005', 'GMP Certified'],
      marketedBy: 'AROGYA PATH MARKETING, Ashok Nagar, Lohardaga - 835302',
      manufacturedBy: 'STREAMLINE PHARMA PVT. LTD., KOTHE AATH CHAK-142026',
      mrp: 1499,
    },

    discrepancyNotices: [],
  },
];
