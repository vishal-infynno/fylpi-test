/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { queryClient } from '@/frontend/lib/api/react-query';
import CustomSelect from '@/frontend/lib/components/form/CustomSelect';
import CustomTextField from '@/frontend/lib/components/form/CustomTextField';
import BodyCopy from '@/frontend/lib/components/typography/BodyCopy';
import BodyCopySmall from '@/frontend/lib/components/typography/BodyCopySmall';
import SecondSubhead from '@/frontend/lib/components/typography/SecondSubhead';
import useFetchAds, {
  IAdvertisement,
  IFilter,
} from '@/frontend/lib/hooks/query/useFetchAds';
import {
  Autocomplete,
  Box,
  FormControl,
  Grid2,
  InputAdornment,
  InputLabel,
  MenuItem,
  Pagination,
  Popover,
  Skeleton,
  Stack,
} from '@mui/material';
import { QueryClientProvider } from '@tanstack/react-query';
import Image from 'next/image';
import { Dispatch, SetStateAction, useState } from 'react';
import styles from './page.module.scss';
const type = [
  {
    name: 'Kaufen',
    value: 'kaufen',
  },
  {
    name: 'Mieten',
    value: 'mieten',
  },
];

const propertyType = [
  { name: 'Wohnung', value: 'wohnung' },
  { name: 'Haus', value: 'haus' },
  { name: 'Doppelhaushalfte', value: 'doppelhaushalfte' },
  { name: 'Einzelhandelsimmobilie', value: 'einzelhandelsimmobilie' },
];

const places = [
  {
    name: 'Vienna',
    value: 'vienna',
  },
  {
    name: 'Graz',
    value: 'graz',
  },
  {
    name: 'Linz',
    value: 'linz',
  },
  {
    name: 'Salzburg',
    value: 'salzburg',
  },
  {
    name: 'Innsbruck',
    value: 'innsbruck',
  },
  {
    name: 'Klagenfurt',
    value: 'klagenfurt',
  },
  {
    name: 'Villach',
    value: 'villach',
  },
  {
    name: 'Wels',
    value: 'wels',
  },
  {
    name: 'St. Pölten',
    value: 'st poelten',
  },
  {
    name: 'Dornbirn',
    value: 'dornbirn',
  },
  {
    name: 'Steyr',
    value: 'steyr',
  },
  {
    name: 'Feldkirch',
    value: 'feldkirch',
  },
  {
    name: 'Bregenz',
    value: 'bregenz',
  },
  {
    name: 'Leonding',
    value: 'leonding',
  },
  {
    name: 'Klosterneuburg',
    value: 'klosterneuburg',
  },
  {
    name: 'Baden',
    value: 'baden',
  },
  {
    name: 'Wolfsberg',
    value: 'wolfsberg',
  },
  {
    name: 'Krems an der Donau',
    value: 'krems an der donau',
  },
  {
    name: 'Traun',
    value: 'traun',
  },
  {
    name: 'Amstetten',
    value: 'amstetten',
  },
  {
    name: 'Lustenau',
    value: 'lustenau',
  },
  {
    name: 'Kapfenberg',
    value: 'kapfenberg',
  },
  {
    name: 'Mödling',
    value: 'moedling',
  },
  {
    name: 'Hallein',
    value: 'hallein',
  },
  {
    name: 'Kufstein',
    value: 'kufstein',
  },
  {
    name: 'Traiskirchen',
    value: 'traiskirchen',
  },
  {
    name: 'Schwechat',
    value: 'schwechat',
  },
  {
    name: 'Saalfelden am Steinernen Meer',
    value: 'saalfelden am steinernen meer',
  },
  {
    name: 'Tulln an der Donau',
    value: 'tulln an der donau',
  },
  {
    name: 'Perchtoldsdorf',
    value: 'perchtoldsdorf',
  },
  {
    name: 'Hohenems',
    value: 'hohenems',
  },
  {
    name: 'Hard',
    value: 'hard',
  },
  {
    name: 'Spittal an der Drau',
    value: 'spittal an der drau',
  },
  {
    name: 'Stockerau',
    value: 'stockerau',
  },
  {
    name: 'Ansfelden',
    value: 'ansfelden',
  },
  {
    name: 'Telfs',
    value: 'telfs',
  },
  {
    name: 'Bludenz',
    value: 'bludenz',
  },
  {
    name: 'Marchtrenk',
    value: 'marchtrenk',
  },
  {
    name: 'Brunn am Gebirge',
    value: 'brunn am gebirge',
  },
  {
    name: 'Bad Ischl',
    value: 'bad ischl',
  },
  {
    name: 'Bruck an der Mur',
    value: 'bruck an der mur',
  },
  {
    name: 'Schwaz',
    value: 'schwaz',
  },
  {
    name: 'Lienz',
    value: 'lienz',
  },
  {
    name: 'Eisenstadt',
    value: 'eisenstadt',
  },
  {
    name: 'Neunkirchen',
    value: 'neunkirchen',
  },
  {
    name: 'Götzis',
    value: 'goetzis',
  },
  {
    name: 'Mistelbach',
    value: 'mistelbach',
  },
  {
    name: 'Zwettl',
    value: 'zwettl',
  },
  {
    name: 'Korneuburg',
    value: 'korneuburg',
  },
  {
    name: 'Vöcklabruck',
    value: 'voecklabruck',
  },
  {
    name: 'Enns',
    value: 'enns',
  },
  {
    name: 'Sankt Johann im Pongau',
    value: 'sankt johann im pongau',
  },
  {
    name: 'Bischofshofen',
    value: 'bischofshofen',
  },
  {
    name: 'Waidhofen an der Ybbs',
    value: 'waidhofen an der ybbs',
  },
  {
    name: 'Gmunden',
    value: 'gmunden',
  },
  {
    name: 'Hollabrunn',
    value: 'hollabrunn',
  },
  {
    name: 'Gänserndorf',
    value: 'gaenserndorf',
  },
  {
    name: 'Weiz',
    value: 'weiz',
  },
  {
    name: 'Deutschlandsberg',
    value: 'deutschlandsberg',
  },
  {
    name: 'Trofaiach',
    value: 'trofaiach',
  },
  {
    name: 'Knittelfeld',
    value: 'knittelfeld',
  },
  {
    name: 'Melk',
    value: 'melk',
  },
  {
    name: 'Baden bei Wien',
    value: 'baden bei wien',
  },
  {
    name: 'Bad Vöslau',
    value: 'bad voeslau',
  },
  {
    name: 'Neusiedl am See',
    value: 'neusiedl am see',
  },
  {
    name: 'Sankt Veit an der Glan',
    value: 'sankt veit an der glan',
  },
  {
    name: 'Hainburg an der Donau',
    value: 'hainburg an der donau',
  },
  {
    name: 'Sankt Valentin',
    value: 'sankt valentin',
  },
  {
    name: 'Freistadt',
    value: 'freistadt',
  },
  {
    name: 'Murau',
    value: 'murau',
  },
  {
    name: 'Mürzzuschlag',
    value: 'muerzzuschlag',
  },
  {
    name: 'Wolkersdorf im Weinviertel',
    value: 'wolkersdorf im weinviertel',
  },
  {
    name: 'Leibnitz',
    value: 'leibnitz',
  },
  {
    name: 'Eferding',
    value: 'eferding',
  },
  {
    name: 'Groß-Enzersdorf',
    value: 'gross enzersdorf',
  },
  {
    name: 'Purkersdorf',
    value: 'purkersdorf',
  },
  {
    name: 'Ybbs an der Donau',
    value: 'ybbs an der donau',
  },
  {
    name: 'Bad Aussee',
    value: 'bad aussee',
  },
  {
    name: 'Wörgl',
    value: 'woergl',
  },
  {
    name: 'Radenthein',
    value: 'radenthein',
  },
  {
    name: 'Zell am See',
    value: 'zell am see',
  },
  {
    name: 'Ried im Innkreis',
    value: 'ried im innkreis',
  },
  {
    name: 'Gleisdorf',
    value: 'gleisdorf',
  },
  {
    name: 'Fohnsdorf',
    value: 'fohnsdorf',
  },
  {
    name: 'Ebenfurth',
    value: 'ebenfurth',
  },
  {
    name: 'Langenlois',
    value: 'langenlois',
  },
  {
    name: 'Mank',
    value: 'mank',
  },
  {
    name: 'Bad Radkersburg',
    value: 'bad radkersburg',
  },
  {
    name: 'Baden bei Wien',
    value: 'baden bei wien',
  },
  {
    name: 'Neulengbach',
    value: 'neulengbach',
  },
  {
    name: 'Litschau',
    value: 'litschau',
  },
  {
    name: 'Feldbach',
    value: 'feldbach',
  },
  {
    name: 'Gerasdorf bei Wien',
    value: 'gerasdorf bei wien',
  },
  {
    name: 'Grein',
    value: 'grein',
  },
  {
    name: 'Blindenmarkt',
    value: 'blindenmarkt',
  },
  {
    name: 'Deutsch-Wagram',
    value: 'deutsch wagram',
  },
  {
    name: 'Bruck an der Leitha',
    value: 'bruck an der leitha',
  },
];

const PriceComponent = ({
  filter,
  setFilter,
}: {
  setFilter: Dispatch<SetStateAction<IFilter>>;
  filter: IFilter;
}) => {
  const [anchorElPrice, setAnchorElPrice] = useState<HTMLDivElement | null>(
    null,
  );
  const [tempFilter, setTempFilter] = useState<{
    minPrice?: string;
    maxPrice?: string;
  }>({
    minPrice: filter.minPrice,
    maxPrice: filter.maxPrice,
  });

  return (
    <>
      <Stack
        gap="6px"
        flexDirection="row"
        alignItems="center"
        className={styles.subMenu}
        onClick={(e) => {
          setAnchorElPrice(e.currentTarget);
        }}
      >
        <BodyCopy
          sx={{
            flex: 1,
            textOverflow: 'ellipsis',
            textWrap: 'nowrap',
            overflow: 'hidden',
          }}
        >
          {filter.minPrice || filter.maxPrice
            ? [filter.minPrice || '-', filter.maxPrice || '-'].join(' , ')
            : 'Preis'}
        </BodyCopy>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 15.5L12 8.5L19 15.5"
            stroke="#31393D"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Stack>
      <Popover
        open={!!anchorElPrice}
        anchorEl={anchorElPrice}
        onClose={() => {
          setAnchorElPrice(null);
          setFilter((old) => ({
            ...old,
            minPrice: tempFilter.minPrice,
            maxPrice: tempFilter.maxPrice,
            page: 0,
          }));
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Stack flexDirection="row" gap="6px" className={styles.popoverMenu}>
          <CustomTextField
            label="von"
            slotProps={{
              input: {
                endAdornment: <InputAdornment position="end">€</InputAdornment>,
              },
            }}
            value={tempFilter.minPrice}
            onChange={(e) => {
              setTempFilter((old) => ({
                ...old,
                minPrice: e.target.value,
              }));
            }}
          />
          <CustomTextField
            label="bis"
            slotProps={{
              input: {
                endAdornment: <InputAdornment position="end">€</InputAdornment>,
              },
            }}
            value={tempFilter.maxPrice}
            onChange={(e) => {
              setTempFilter((old) => ({
                ...old,
                maxPrice: e.target.value,
              }));
            }}
          />
        </Stack>
      </Popover>
    </>
  );
};

const AreaComponent = ({
  filter,
  setFilter,
}: {
  setFilter: Dispatch<SetStateAction<IFilter>>;
  filter: IFilter;
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const [tempFilter, setTempFilter] = useState<{
    minArea?: string;
    maxArea?: string;
  }>({
    minArea: filter.minArea,
    maxArea: filter.maxArea,
  });

  return (
    <>
      <Stack
        gap="6px"
        flexDirection="row"
        alignItems="center"
        className={styles.subMenu}
        onClick={(e) => {
          setAnchorEl(e.currentTarget);
        }}
      >
        <BodyCopy
          sx={{
            flex: 1,
            textOverflow: 'ellipsis',
            textWrap: 'nowrap',
            overflow: 'hidden',
          }}
        >
          {filter.minArea || filter.maxArea
            ? [filter.minArea || '-', filter.maxArea || '-'].join(' , ')
            : 'Fläche'}
        </BodyCopy>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 15.5L12 8.5L19 15.5"
            stroke="#31393D"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Stack>
      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={() => {
          setAnchorEl(null);
          setFilter((old) => ({
            ...old,
            minArea: tempFilter.minArea,
            maxArea: tempFilter.maxArea,
            page: 0,
          }));
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Stack flexDirection="row" gap="6px" className={styles.popoverMenu}>
          <CustomTextField
            label="von"
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">m²</InputAdornment>
                ),
              },
            }}
            value={tempFilter.minArea}
            onChange={(e) => {
              setTempFilter((old) => ({
                ...old,
                minArea: e.target.value,
              }));
            }}
          />
          <CustomTextField
            label="bis"
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">m²</InputAdornment>
                ),
              },
            }}
            value={tempFilter.maxArea}
            onChange={(e) => {
              setTempFilter((old) => ({
                ...old,
                maxArea: e.target.value,
              }));
            }}
          />
        </Stack>
      </Popover>
    </>
  );
};

const Card = ({ data }: { data: IAdvertisement }) => {
  return (
    <Box className={styles.card}>
      <Image src={data.image} width={360} height={240} alt="pic" />
      <Stack
        flexDirection="column"
        gap="12px"
        justifyContent="space-between"
        className={styles.content}
      >
        <BodyCopy className={styles.name}>{data.name}</BodyCopy>
        <Stack flexDirection="column" gap="6px" className={styles.info}>
          <BodyCopySmall>
            {[
              `ID: ${data.id}`,
              data.type,
              `${data.address}, ${data.city}`,
            ].join(' | ')}
          </BodyCopySmall>
          <BodyCopySmall>
            {[
              `${data.rooms} Zimmer`,
              `${data.area} m²`,
              data.property_type,
            ].join(' | ')}
          </BodyCopySmall>
        </Stack>
        <Stack flexDirection="row" justifyContent="space-between">
          <SecondSubhead>
            {Number(data.price).toLocaleString('de-DE')} €
          </SecondSubhead>
          <Stack flexDirection="row" alignItems="center" gap="6px">
            <BodyCopy className={styles.count}>171</BodyCopy>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.998 20.0712C15.703 20.0712 19.092 17.4072 21 12.9682C19.092 8.52923 15.703 5.86523 11.998 5.86523C8.297 5.86523 4.908 8.52923 3 12.9682C4.908 17.4092 8.297 20.0712 12.002 20.0712H11.998Z"
                stroke="#748790"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.0788 12.9735C15.0788 14.6715 13.7008 16.0495 12.0028 16.0495C10.3038 16.0495 8.92578 14.6715 8.92578 12.9735C8.92578 11.2745 10.3038 9.89648 12.0028 9.89648C13.7008 9.89648 15.0788 11.2745 15.0788 12.9735Z"
                stroke="#748790"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

function Home() {
  const [filter, setFilter] = useState<IFilter>({});

  const { data: ads, isPending: adsLoading } = useFetchAds({ filter });

  // NOTE: As I didn't have the api key to be used for test implementing simple city search
  // const { ref } = usePlacesWidget<HTMLInputElement>({
  //   apiKey: '',
  //   onPlaceSelected: (place) => {
  //     const city = place?.address_components
  //       ?.find((data: any) => data.types.includes('locality'))
  //       ?.long_name?.toLowerCase();

  //     if (city) {
  //       setFilter((old) => ({
  //         ...old,
  //         search: city,
  //       }));
  //     }
  //   },
  //   options: {
  //     types: ['establishment', 'locality'],
  //     // componentRestrictions: { country: 'at' },
  //   },
  // });

  return (
    <Stack
      flexDirection="column"
      gap="30px"
      justifyContent="flex-start"
      alignItems="flex-start"
      className={styles.page}
    >
      <Grid2 container spacing="12px" className={styles.filters}>
        <Grid2
          size={{
            xs: 12,
            sm: 4,
          }}
        >
          {/* <CustomTextField
            label="Bundesland, Ort oder Postleitzahl"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M14.7367 10.8064C14.7367 9.43255 13.6235 8.31934 12.2506 8.31934C10.8768 8.31934 9.76355 9.43255 9.76355 10.8064C9.76355 12.1792 10.8768 13.2924 12.2506 13.2924C13.6235 13.2924 14.7367 12.1792 14.7367 10.8064Z"
                        stroke="#31393D"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12.2497 21.25C12.2497 21.25 4.97379 16.5108 4.79046 10.5973C4.66173 6.44514 8.1295 2.75012 12.2497 2.75012C16.3698 2.75012 19.8367 6.44508 19.7098 10.5973C19.5254 16.632 12.2497 21.25 12.2497 21.25Z"
                        stroke="#31393D"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </InputAdornment>
                ),
                inputProps: {
                  ref: ref,
                  inputRef: ref,
                },
              },
            }}
          /> */}
          <Autocomplete
            options={places}
            getOptionLabel={(option) => option.name} // Display name in the input field
            onChange={(event, newValue) =>
              setFilter((old) => ({ ...old, search: newValue?.value, page: 0 }))
            }
            renderInput={(params) => (
              <CustomTextField
                {...params}
                label="Bundesland, Ort oder Postleitzahl"
              />
            )}
            isOptionEqualToValue={(option, value) =>
              option.name.toLowerCase() === value.value.toLowerCase()
            }
          />
        </Grid2>
        <Grid2
          size={{
            xs: 12,
            sm: 8,
          }}
        >
          <Stack
            gap="12px"
            flexDirection="row"
            alignItems="stretch"
            sx={(theme) => ({
              [theme.breakpoints.down('md')]: {
                flexWrap: 'wrap',
              },
            })}
          >
            <FormControl fullWidth>
              <InputLabel id="property-type">Immobilientyp</InputLabel>
              <CustomSelect
                labelId="property-type"
                label="Immobilientyp"
                value={filter.type}
                onChange={(e) => {
                  setFilter((old) => ({
                    ...old,
                    type: e.target.value as string,
                    page: 0,
                  }));
                }}
              >
                {type.map((type, index) => (
                  <MenuItem value={type.value} key={index}>
                    {type.name}
                  </MenuItem>
                ))}
              </CustomSelect>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="type">Typ</InputLabel>
              <CustomSelect
                labelId="type"
                label="Typ"
                value={filter.propertyType}
                onChange={(e) => {
                  setFilter((old) => ({
                    ...old,
                    propertyType: e.target.value as string,
                    page: 0,
                  }));
                }}
              >
                {propertyType.map((pType, index) => (
                  <MenuItem value={pType.value} key={index}>
                    {pType.name}
                  </MenuItem>
                ))}
              </CustomSelect>
            </FormControl>
            <PriceComponent filter={filter} setFilter={setFilter} />
            <AreaComponent filter={filter} setFilter={setFilter} />
            <FormControl fullWidth>
              <InputLabel id="rooms">Zimmer</InputLabel>
              <CustomSelect
                labelId="rooms"
                label="Zimmer"
                multiple
                value={filter.rooms ?? []}
                onChange={(e) => {
                  setFilter((old) => ({
                    ...old,
                    rooms: e.target.value as string[],
                    page: 0,
                  }));
                }}
              >
                {Array(8)
                  .fill(1)
                  .map((item, index) => ({
                    name: index + 1,
                    value: index + 1,
                  }))
                  .map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                      {item.name}
                    </MenuItem>
                  ))}
              </CustomSelect>
            </FormControl>
          </Stack>
        </Grid2>
      </Grid2>
      <Grid2 container spacing="40px" justifyContent="center">
        {adsLoading
          ? Array(12)
              .fill(1)
              .map((item, index) => (
                <Skeleton
                  variant="rectangular"
                  width={338}
                  height={408}
                  key={index}
                />
              ))
          : ads?.data.data.map((ad) => (
              <Grid2
                size={{
                  sm: 12,
                  md: 6,
                  lg: 4,
                }}
                key={ad.id}
              >
                <Card data={ad} />
              </Grid2>
            ))}
        {}
      </Grid2>
      <Stack alignItems="center" justifyContent="center" sx={{ width: '100%' }}>
        <Pagination
          count={ads?.data.totalPages ?? 0}
          page={(ads?.data.currentPage ?? 0) + 1}
          onChange={(_, page) => {
            setFilter((old) => ({
              ...old,
              page: page - 1,
            }));
          }}
          variant="outlined"
          shape="rounded"
        />
      </Stack>
    </Stack>
  );
}

export default function Component() {
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  );
}
