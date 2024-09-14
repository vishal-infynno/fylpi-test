import { faker } from '@faker-js/faker';
import { Advertisment } from '../models/Advertisement';
import { connection } from './database';

const seed = async ({ count }: { count: number }) => {
  const arr = [];
  const type = ['kaufen', 'mieten'];
  const propertyType = [
    'wohnung',
    'haus',
    'doppelhaushalfte',
    'einzelhandelsimmobilie',
  ];

  for (let i = 0; i < count; i++) {
    arr.push({
      name: faker.lorem.words({ max: 6, min: 3 }),
      type: type[faker.number.int(type.length - 1)],
      property_type: propertyType[faker.number.int(propertyType.length - 1)],
      price: faker.finance.amount(),
      area: faker.finance.amount({ max: 500 }),
      rooms: faker.number.int({ max: 8 }),
      lat: faker.location.latitude(),
      lng: faker.location.longitude(),
      city: faker.location.city(),
      state: faker.location.state(),
      image: faker.image.url({
        width: 360,
        height: 240,
      }),
    });
  }

  await Advertisment.bulkCreate(arr);
};

(async () => {
  await connection.sync({ force: true });
  console.log('DB updated');

  seed({ count: 1000 });
})();
