import UsersDao from "../dao/Users.dao.js";
import PetsDao from "../dao/Pets.dao.js";

import UserRepository from "../repository/UserRepository.js";
import PetRepository from "../repository/PetRepository.js";

import { generateMockUsers, generateMockPets } from "../utils/mocking.js";

const userRepository = new UserRepository(new UsersDao());
const petRepository = new PetRepository(new PetsDao());

const mockingPets = async (req, res) => {
  try {
    const pets = generateMockPets(100);
    return res.status(200).json({ status: "success", payload: pets });
  } catch (err) {
    return res.status(500).json({ status: "error", error: err.message });
  }
};

const mockingUsers = async (req, res) => {
  try {
    const users = generateMockUsers(50);
    return res.status(200).json({ status: "success", payload: users });
  } catch (err) {
    return res.status(500).json({ status: "error", error: err.message });
  }
};

const generateData = async (req, res) => {
  try {
    const users = req.body.users ?? req.query.users;
    const pets = req.body.pets ?? req.query.pets;

    const usersQty = Number(users ?? 0);
    const petsQty = Number(pets ?? 0);

    if (Number.isNaN(usersQty) || Number.isNaN(petsQty) || usersQty < 0 || petsQty < 0) {
      return res.status(400).json({
        status: "error",
        error: "Parámetros inválidos. Enviá { users: <number>, pets: <number> } con valores >= 0",
      });
    }

    const mockUsersToInsert = generateMockUsers(usersQty).map(({ _id, __v, ...u }) => u);
    const mockPetsToInsert = generateMockPets(petsQty).map(({ _id, __v, ...p }) => p);

    const insertedUsers =
      usersQty > 0 ? await userRepository.insertMany(mockUsersToInsert) : [];
    const insertedPets =
      petsQty > 0 ? await petRepository.insertMany(mockPetsToInsert) : [];

    return res.status(201).json({
      status: "success",
      inserted: {
        users: insertedUsers.length,
        pets: insertedPets.length,
      },
    });
  } catch (err) {
    return res.status(500).json({ status: "error", error: err.message });
  }
};

export default { mockingPets, mockingUsers, generateData };