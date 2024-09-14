import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export interface IFilter {
  propertyType?: string;
  type?: string;
  minPrice?: string;
  maxPrice?: string;
  minArea?: string;
  maxArea?: string;
  rooms?: string[];
  page?: number;
}

export interface IAdvertisement {
  id: number;
  name: string;
  type: string;
  property_type: string;
  price: string;
  area: string;
  rooms: number;
  lat: number;
  lng: number;
  city: string;
  state: string;
  image: string;
}

export default function useFetchAds({ filter }: { filter: IFilter }) {
  return useQuery({
    queryKey: ['FETCH_ADS', filter],
    queryFn: async () => {
      const params: {
        propertyType?: string;
        type?: string;
        minPrice?: string;
        maxPrice?: string;
        minArea?: string;
        maxArea?: string;
        rooms?: string[];
        page?: number;
        limit?: number;
      } = {
        limit: 12,
      };

      if (filter.propertyType) {
        params.propertyType = filter.propertyType;
      }

      if (filter.type) {
        params.type = filter.type;
      }

      if (filter.minPrice) {
        params.minPrice = filter.minPrice;
      }

      if (filter.maxPrice) {
        params.maxPrice = filter.maxPrice;
      }

      if (filter.minArea) {
        params.minArea = filter.minArea;
      }

      if (filter.maxArea) {
        params.maxArea = filter.maxArea;
      }

      if (filter.rooms) {
        params.rooms = filter.rooms;
      }

      if (filter.page) {
        params.page = filter.page;
      }

      const res = await axios.get<{
        data: {
          totalItems: number;
          data: IAdvertisement[];
          totalPages: number;
          currentPage: number;
        };
      }>('/adv', { params });

      return res.data;
    },
    refetchOnWindowFocus: false,
  });
}
