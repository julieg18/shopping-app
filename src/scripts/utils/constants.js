const navCartBtnAmount = document.querySelector('.nav-bar__cart-amount');
const filterProductsLabels = Array.from(
  document.querySelectorAll('.filter-products__option-label'),
);
const filterProductsCheckboxInputs = Array.from(
  document.querySelectorAll('.filter-products__option-input'),
);
const searchBar = document.querySelector('.filter-products__search-bar');
const searchInput = searchBar.querySelector('.filter-products__search-input');

const productsInfo = [
  {
    id: '121',
    name: 'Almonds',
    price: '$1.25',
    size: '1.25oz bag',
    tags: ['salty', 'gluten-free', 'sugar-free'],
    description:
      'The almond is the edible kernel of the fruit of the sweet almond tree.',
    imageAttr: {
      artistHref:
        'https://unsplash.com/@inteligencia_eco?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
      artist: 'Ignacio F.',
    },
    imageSrc:
      'https://images.unsplash.com/photo-1563635707451-c427db1e1f9a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60',
  },
  {
    id: '123',
    name: 'Caramel Corn',
    price: '$1.50',
    size: '1oz bag',
    tags: ['sweet', 'gluten-free'],
    description:
      'Caramel corn or caramel popcorn is a confection made of popcorn coated with a sugar or molasses based caramel candy shell that is normally less than 0.1cm thick.',
    imageAttr: {
      artistHref:
        'https://unsplash.com/@rssemfam?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
      artist: 'Russ Ward',
    },
    imageSrc:
      'https://images.unsplash.com/photo-1566577405735-18f35aa6d79f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60',
  },
  {
    id: '125',
    name: 'Chocolate Bars',
    price: '$2.85',
    size: '3 pack',
    tags: ['sweet', 'gluten-free'],
    description:
      'A chocolate bar (Commonwealth English) or candy bar (some dialects of American English) is a confection in an oblong or rectangular form containing chocolate, which may also contain layerings or mixtures that include nuts, fruit, caramel, nougat, and wafers.',
    imageAttr: {
      artistHref:
        'https://unsplash.com/@charissek?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
      artist: 'Charisse Kenion',
    },
    imageSrc:
      'https://images.unsplash.com/photo-1511381878266-349693efb20d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60',
  },
  {
    id: '127',
    name: 'Chocolate Chip Cookies',
    price: '$2.50',
    size: '6 pack',
    tags: ['sweet'],
    description:
      'A chocolate chip cookie is a drop cookie that originated in the United States and features chocolate chips or chocolate morsels as its distinguishing ingredient.',
    imageAttr: {
      artistHref:
        'https://unsplash.com/@foodess?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText',
      artist: 'Food Photographer | Jennifer Pallian',
    },
    imageSrc:
      'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60',
  },
  {
    id: '130',
    name: 'Crackers',
    price: '$3.50',
    size: '18oz',
    tags: ['salty'],
    description:
      'A thin, crisp wafer often eaten with cheese or other savory toppings.',
    imageAttr: {
      artistHref:
        'https://unsplash.com/@gregjeanneau?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
      artist: 'Greg Jeanneau',
    },
    imageSrc:
      'https://images.unsplash.com/photo-1475585925456-280a1963b39f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=586&q=80',
  },
  {
    id: '128',
    name: 'Granola',
    price: '$4.95',
    size: '12oz',
    tags: ['sweet', 'salty', 'gluten-free'],
    description:
      'Granola is a breakfast food and snack food consisting of rolled oats, nuts, honey or other sweeteners such as brown sugar, and sometimes puffed rice, that is usually baked until it is crisp, toasted and golden brown.',
    imageAttr: {
      artistHref:
        'https://unsplash.com/@rachaelgorjestani?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
      artist: 'Rachael Gorjestani',
    },
    imageSrc:
      'https://images.unsplash.com/photo-1514946379532-90281f815889?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
  },
  {
    id: '126',
    name: 'Granola Bars',
    price: '$3.95',
    size: '3 pack',
    tags: ['sweet', 'gluten-free', 'salty'],
    description:
      'Granola bars consist of granola mixed with honey or other sweetened syrup, pressed and baked into a bar shape, resulting in the production of a more convenient snack.',
    imageAttr: {
      artistHref:
        'https://unsplash.com/@jadew?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
      artist: 'Jade Wulfraat',
    },
    imageSrc:
      'https://images.unsplash.com/photo-1464195157370-5b596406ff80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60',
  },
  {
    id: '122',
    name: 'Popcorn',
    price: '$1.00',
    size: '1oz bag',
    tags: ['gluten-free', 'salty', 'sugar-free'],
    description:
      'Popcorn, a variety of corn (maize), the kernels of which, when exposed to heat or microwaves, are exploded into large fluffy masses.',
    imageAttr: {
      artistHref:
        'https://unsplash.com/@georgiavagim?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
      artist: 'Georgia Vagim',
    },
    imageSrc:
      'https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60',
  },
  {
    id: '129',
    name: 'Soft Baked Pretzels',
    price: '$6.00',
    size: '4 pack',
    tags: ['salty', 'sugar-free'],
    description:
      'A soft or brittle glazed biscuit that is usually salted on the outside and baked in the form of a loose knot or stick.',
    imageAttr: {
      artistHref:
        'https://unsplash.com/@uncled?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
      artist: 'David Nuescheler',
    },
    imageSrc:
      'https://images.unsplash.com/photo-1540569222266-a08afebb00b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
  },
  {
    id: '124',
    name: 'Tortilla Chips',
    price: '$1.00',
    size: '1oz bag',
    tags: ['sugar-free', 'salty', 'sugar-free'],
    description:
      'A tortilla chip is a snack food made from corn tortillas, which are cut into triangles and then fried—or baked',
    imageAttr: {
      artistHref:
        'https://unsplash.com/@markuswinkler?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
      artist: 'Markus Winkler',
    },
    imageSrc:
      'https://images.unsplash.com/photo-1589357708707-6dac3c25a428?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60',
  },
];

export {
  navCartBtnAmount,
  filterProductsLabels,
  filterProductsCheckboxInputs,
  searchBar,
  searchInput,
  productsInfo,
};
