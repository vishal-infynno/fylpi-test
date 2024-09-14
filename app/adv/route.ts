/* eslint-disable @typescript-eslint/no-explicit-any */
import { Advertisment } from '@/backend/models/Advertisement';
import { NextRequest, NextResponse } from 'next/server';
import { Op } from 'sequelize';

const getPagination = (page?: number, size?: number) => {
  const limit = size ? +size : 10;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};

const formatPaginatedData = ({
  data,
  limit,
  page,
}: {
  data: { rows: Record<string, unknown>[]; count: number };
  page?: number;
  limit: number;
}) => {
  const { count, rows } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(count / limit);

  return { totalItems: count, data: rows, totalPages, currentPage };
};

export async function GET(req: NextRequest) {
  const query: {
    type?: string;
    propertyType?: string;
    minPrice?: string;
    maxPrice?: string;
    minArea?: string;
    maxArea?: string;
    rooms?: string;
    page?: number;
    limit?: number;
    search?: string;
  } = Object.fromEntries(req.nextUrl.searchParams);
  const condition: any = {};

  if (query.type) {
    condition.type = query.type;
  }

  if (query.propertyType) {
    condition.property_type = query.propertyType;
  }

  if (query.rooms) {
    const rooms = JSON.parse(query.rooms ?? '[]');
    if (rooms.length > 0) {
      condition.rooms = {
        [Op.in]: JSON.parse(query.rooms ?? '[]'),
      };
    }
  }

  if (query.minArea) {
    condition[Op.and] = [
      ...(condition[Op.and] ?? []),
      {
        area: {
          [Op.gte]: Number(query.minArea),
        },
      },
    ];
  }

  if (query.maxArea) {
    condition[Op.and] = [
      ...(condition[Op.and] ?? []),
      {
        area: {
          [Op.lte]: Number(query.maxArea),
        },
      },
    ];
  }

  if (query.minPrice) {
    condition[Op.and] = [
      ...(condition[Op.and] ?? []),
      {
        price: {
          [Op.gte]: Number(query.minPrice),
        },
      },
    ];
  }

  if (query.maxPrice) {
    condition[Op.and] = [
      ...(condition[Op.and] ?? []),
      {
        price: {
          [Op.lte]: Number(query.maxPrice),
        },
      },
    ];
  }

  if (query.search) {
    condition.city = {
      [Op.iLike]: query.search.toLowerCase(),
    };
  }

  const { limit, offset } = getPagination(query.page, query.limit);

  const data = await Advertisment.findAndCountAll<any>({
    where: condition,
    limit,
    offset,
  });

  return NextResponse.json({
    data: formatPaginatedData({
      data,
      limit,
      page: query.page,
    }),
  });
}
