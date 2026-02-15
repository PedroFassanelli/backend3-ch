import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

const SALT_ROUNDS = 10;

export const generateMockUsers = (count = 1) => {
  const passwordHash = bcrypt.hashSync("coder123", SALT_ROUNDS);

  return Array.from({ length: count }, () => ({
    _id: new mongoose.Types.ObjectId(),
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email().toLowerCase(),
    password: passwordHash,
    role: faker.helpers.arrayElement(["user", "admin"]),
    pets: [],
    __v: 0,
  }));
};

export const generateMockPets = (count = 1) => {
  return Array.from({ length: count }, () => ({
    _id: new mongoose.Types.ObjectId(),
    name: faker.animal.petName(),
    specie: faker.helpers.arrayElement(["dog", "cat", "rabbit", "hamster"]),
    birthDate: faker.date.past({ years: 10 }),
    adopted: false,
    owner: null,
    image: null,
    __v: 0,
  }));
};