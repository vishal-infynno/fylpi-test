"use strict";

import { DataTypes } from "sequelize";
import { connection } from "../lib/database";

export const Advertisment = connection.define(
  "adviertisment",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("kaufen", "mieten"),
      allowNull: false,
    },
    property_type: {
      type: DataTypes.ENUM(
        "wohnung",
        "haus",
        "doppelhaushalfte",
        "einzelhandelsimmobilie"
      ),
      allowNull: false,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    area: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    rooms: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    lat: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lng: { type: DataTypes.STRING, allowNull: false },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
