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
  const cities = [
    'vienna',
    'graz',
    'linz',
    'salzburg',
    'innsbruck',
    'klagenfurt',
    'villach',
    'wels',
    'st poelten',
    'dornbirn',
    'steyr',
    'feldkirch',
    'bregenz',
    'leonding',
    'klosterneuburg',
    'baden',
    'wolfsberg',
    'krems an der donau',
    'traun',
    'amstetten',
    'lustenau',
    'kapfenberg',
    'moedling',
    'hallein',
    'kufstein',
    'traiskirchen',
    'schwechat',
    'saalfelden am steinernen meer',
    'tulln an der donau',
    'perchtoldsdorf',
    'hohenems',
    'hard',
    'spittal an der drau',
    'stockerau',
    'ansfelden',
    'telfs',
    'bludenz',
    'marchtrenk',
    'brunn am gebirge',
    'bad ischl',
    'bruck an der mur',
    'schwaz',
    'lienz',
    'eisenstadt',
    'neunkirchen',
    'goetzis',
    'mistelbach',
    'zwettl',
    'korneuburg',
    'voecklabruck',
    'enns',
    'sankt johann im pongau',
    'bischofshofen',
    'waidhofen an der ybbs',
    'gmunden',
    'hollabrunn',
    'gaenserndorf',
    'weiz',
    'deutschlandsberg',
    'trofaiach',
    'knittelfeld',
    'melk',
    'baden bei wien',
    'bad voeslau',
    'neusiedl am see',
    'sankt veit an der glan',
    'hainburg an der donau',
    'sankt valentin',
    'freistadt',
    'murau',
    'muerzzuschlag',
    'wolkersdorf im weinviertel',
    'leibnitz',
    'eferding',
    'gross enzersdorf',
    'purkersdorf',
    'ybbs an der donau',
    'bad aussee',
    'woergl',
    'radenthein',
    'zell am see',
    'ried im innkreis',
    'gleisdorf',
    'fohnsdorf',
    'ebenfurth',
    'langenlois',
    'mank',
    'bad radkersburg',
    'baden bei wien',
    'neulengbach',
    'litschau',
    'feldbach',
    'gerasdorf bei wien',
    'grein',
    'blindenmarkt',
    'deutsch wagram',
    'bruck an der leitha',
  ];

  for (let i = 0; i < count; i++) {
    const t = type[faker.number.int(type.length - 1)];

    arr.push({
      name: faker.lorem.words({ max: 6, min: 3 }),
      type: t,
      property_type: propertyType[faker.number.int(propertyType.length - 1)],
      price:
        t === 'kaufen'
          ? faker.finance.amount({ min: 100000, max: 900000 })
          : faker.finance.amount({ min: 700, max: 2500 }),
      area: faker.finance.amount({ max: 500 }),
      rooms: faker.number.int({ max: 8 }),
      lat: faker.location.latitude(),
      lng: faker.location.longitude(),
      city: cities[faker.number.int(cities.length - 1)],
      state: faker.location.state(),
      address: faker.location.streetAddress(),
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

  seed({ count: 50000 });
})();
