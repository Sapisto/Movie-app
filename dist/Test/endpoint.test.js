"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = require("../model/userModel");
const test_1 = require("./test");
const globals_1 = require("@jest/globals");
const globals_2 = require("@jest/globals");
const mongoose_1 = __importDefault(require("mongoose"));
const movieModel_1 = require("../model/movieModel");
(0, globals_1.beforeAll)(async () => await (0, test_1.dbConnect)());
(0, globals_1.afterAll)(async () => await (0, test_1.dbDisconnect)());
(0, globals_1.describe)("User Model Test Suite", () => {
    (0, globals_1.test)("should create a User data successfully", async () => {
        const UserData = {
            firstName: "Abdulazeez",
            lastName: "Alhassan",
            userName: "sapisto",
            email: "abdulazeezalasa@gmail.com",
            password: "12345",
        };
        const newUserData = new userModel_1.UserModel(UserData);
        await newUserData.save();
        (0, globals_2.expect)(newUserData._id).toBeDefined();
        (0, globals_2.expect)(newUserData.email).toBe(UserData.email);
        (0, globals_2.expect)(newUserData.firstName).toBe(UserData.firstName);
        (0, globals_2.expect)(newUserData.lastName).toBe(UserData.lastName);
        (0, globals_2.expect)(newUserData.userName).toBe(UserData.userName);
        (0, globals_2.expect)(newUserData.password).toBe(UserData.password);
    });
    (0, globals_1.test)("should fail for User data without email field", async () => {
        const invalidUserData = {
            userName: "Abdul",
            password: "12345"
        };
        try {
            const newUserData = new userModel_1.UserModel(invalidUserData);
            await newUserData.save();
        }
        catch (error) {
            const err = error;
            (0, globals_2.expect)(err.errors?.email).toBeDefined();
        }
    });
    (0, globals_1.test)("should fail for User data without username and password fields", async () => {
        const invalidUserData = {
            email: "abdulazeezalasa@gmail.com",
            firstName: "Abdulazeez",
        };
        try {
            const newUserData = new userModel_1.UserModel(invalidUserData);
            await newUserData.save();
        }
        catch (error) {
            const err = error;
            (0, globals_2.expect)(err.errors?.userName).toBeDefined();
            (0, globals_2.expect)(err.errors?.password).toBeDefined();
        }
    });
    (0, globals_1.test)("should fail for User data without firstname field", async () => {
        const invalidUserData = {
            email: "tozee@gmail.com",
            username: "Zee",
            password: "12345we",
        };
        try {
            const newUserData = new userModel_1.UserModel(invalidUserData);
            await newUserData.save();
        }
        catch (error) {
            const err = error;
            (0, globals_2.expect)(err.errors?.firstName).toBeDefined();
            (0, globals_2.expect)(err.errors?.email).toBeUndefined();
        }
    });
});
(0, globals_1.describe)("Movie Model Test Suite", () => {
    (0, globals_1.test)("should create a Movie data successfully", async () => {
        const MovieData = {
            userId: new mongoose_1.default.Types.ObjectId("643f09f8978e60f5de08fdc8"),
            title: "The Walking Dead",
            description: "It is very Interesting",
            image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwall.alphacoders.com%2Fby_sub_category.php%3Fid%3D146203%26name%3DThe%2BWalking%2BDead%2BWallpapers&psig=AOvVaw3eMkZB-xWZ9rTzrqAciy7J&ust=1682378335381000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCKj3mOqRwf4CFQAAAAAdAAAAABAJ",
            price: 2000,
        };
        const newMovieData = new movieModel_1.MovieModel({
            userId: new mongoose_1.default.Types.ObjectId(MovieData.userId),
            title: MovieData.title,
            description: MovieData.description,
            image: MovieData.image,
            price: MovieData.price,
        });
        await newMovieData.save();
        (0, globals_2.expect)(newMovieData._id).toBeDefined();
        (0, globals_2.expect)(newMovieData.userId).toEqual(MovieData.userId);
        (0, globals_2.expect)(newMovieData.title).toEqual(MovieData.title);
        (0, globals_2.expect)(newMovieData.description).toEqual(MovieData.description);
        (0, globals_2.expect)(newMovieData.image).toEqual(MovieData.image);
        (0, globals_2.expect)(newMovieData.price).toEqual(MovieData.price);
    });
    (0, globals_1.test)("should fail for Movie data without required fields", async () => {
        const invalidMovieData = {
            userId: new mongoose_1.default.Types.ObjectId("643f09f8978e60f5de08fdc8"),
            title: "The Walking Dead",
            description: "It is very Interesting",
            image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwall.alphacoders.com%2Fby_sub_category.php%3Fid%3D146203%26name%3DThe%2BWalking%2BDead%2BWallpapers&psig=AOvVaw3eMkZB-xWZ9rTzrqAciy7J&ust=1682378335381000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCKj3mOqRwf4CFQAAAAAdAAAAABAJ",
            price: 2000,
        };
        try {
            const newMovieData = new movieModel_1.MovieModel(invalidMovieData);
            await newMovieData.save();
        }
        catch (error) {
            const err = error;
            (0, globals_2.expect)(err.errors.userId).toBeDefined();
        }
    });
    (0, globals_1.test)("should update a Movie successfully", async () => {
        // Create a new Movie document
        const newMovieData = {
            userId: new mongoose_1.default.Types.ObjectId(),
            title: "The Walking Dead",
            description: "A thrilling TV show",
            image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwall.alphacoders.com%2Fby_sub_category.php%3Fid%3D146203%26name%3DThe%2BWalking%2BDead%2BWallpapers&psig=AOvVaw3eMkZB-xWZ9rTzrqAciy7J&ust=1682378335381000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCKj3mOqRwf4CFQAAAAAdAAAAABAJ",
            price: 2000,
        };
        const createdMovie = await movieModel_1.MovieModel.create(newMovieData);
        // Update the Movie document
        const updatedData = {
            title: "The Walking Dead - Updated",
            description: "Updated description",
            image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwall.alphacoders.com%2Fby_sub_category.php%3Fid%3D146203%26name%3DThe%2BWalking%2BDead%2BWallpapers&psig=AOvVaw3eMkZB-xWZ9rTzrqAciy7J&ust=1682378335381000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCKj3mOqRwf4CFQAAAAAdAAAAABAJ",
            price: 2500,
        };
        // Update the movie document by calling findByIdAndUpdate with the valid _id
        const updatedMovie = await movieModel_1.MovieModel.findByIdAndUpdate(createdMovie._id, updatedData, { new: true });
        // Assert that the Movie document was updated successfully
        (0, globals_2.expect)(updatedMovie).not.toBeNull();
        (0, globals_2.expect)(updatedMovie?.userId).toEqual(newMovieData.userId);
        (0, globals_2.expect)(updatedMovie?.title).toEqual(updatedData.title);
        (0, globals_2.expect)(updatedMovie?.description).toEqual(updatedData.description);
        (0, globals_2.expect)(updatedMovie?.image).toEqual(updatedData.image);
        (0, globals_2.expect)(updatedMovie?.price).toEqual(updatedData.price);
    });
    (0, globals_1.test)("should fail to update a non-existent Movie", async () => {
        const nonExistentMovieId = new mongoose_1.default.Types.ObjectId();
        const updatedData = {
            title: "The Walking Dead - Updated",
            description: "Updated description",
            image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwall.alphacoders.com%2Fby_sub_category.php%3Fid%3D146203%26name%3DThe%2BWalking%2BDead%2BWallpapers&psig=AOvVaw3eMkZB-xWZ9rTzrqAciy7J&ust=1682378335381000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCKj3mOqRwf4CFQAAAAAdAAAAABAJ",
            price: 2500,
        };
        const updatedMovie = await movieModel_1.MovieModel.findByIdAndUpdate(nonExistentMovieId, updatedData);
        (0, globals_2.expect)(updatedMovie).toBeNull();
    });
    (0, globals_1.test)("should delete a Movie successfully", async () => {
        const MovieData = {
            userId: new mongoose_1.default.Types.ObjectId("643f09f8978e60f5de08fdc8"),
            title: "The Walking Dead",
            description: "It is very Interesting",
            image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwall.alphacoders.com%2Fby_sub_category.php%3Fid%3D146203%26name%3DThe%2BWalking%2BDead%2BWallpapers&psig=AOvVaw3eMkZB-xWZ9rTzrqAciy7J&ust=1682378335381000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCKj3mOqRwf4CFQAAAAAdAAAAABAJ",
            price: 2000,
        };
        const newMovieData = new movieModel_1.MovieModel({
            userId: new mongoose_1.default.Types.ObjectId(MovieData.userId),
            title: MovieData.title,
            description: MovieData.description,
            image: MovieData.image,
            price: MovieData.price,
        });
        await newMovieData.save();
        const deleteResult = await movieModel_1.MovieModel.deleteOne({ _id: newMovieData._id });
        (0, globals_2.expect)(deleteResult.deletedCount).toEqual(1);
    });
    (0, globals_1.test)("should fail to delete a non-existent Movie", async () => {
        const nonExistentMovieId = new mongoose_1.default.Types.ObjectId();
        const deleteResult = await movieModel_1.MovieModel.deleteOne({ _id: nonExistentMovieId });
        (0, globals_2.expect)(deleteResult.deletedCount).toEqual(0);
    });
});
// import { describe, it, before, after } from 'mocha';
// import { expect } from "chai";
// import request from "supertest";
// import mongoose from "mongoose";
// import { MongoMemoryServer } from "mongodb-memory-server";
// import app from "../app";
// describe("Movie App Endpoints", () => {
//   let mongoServer: MongoMemoryServer;
//   before(async () => {
//     mongoServer = await MongoMemoryServer.create();
//     const uri = mongoServer.getUri();
//     await mongoose.connect(uri, {
//       useNewUrlParser: true,
//       useCreateIndex: true,
//       useUnifiedTopology: true,
//       useFindAndModify: false, // To avoid deprecation warnings for findOneAndUpdate and findOneAndDelete methods
//     } as any); // Cast to any to avoid the type error
//   });
//   after(async () => {
//     await mongoose.disconnect();
//     await mongoServer.stop();
//   });
//   describe("GET /", () => {
//     it("should return a 200 status code", (done) => {
//       request(app)
//         .get("/")
//         .expect(200, done);
//     });
//   });
//   describe("POST /dashboard", () => {
//     it("should create a new movie and return a 302 status code", (done) => {
//       request(app)
//         .post("/dashboard")
//         .send({
//           title: "Test Movie",
//           description: "This is a test movie",
//           image: "test.jpg",
//           price: 9.99,
//         })
//         .expect(302, done);
//     });
//   });
//   describe("GET /dashboard", () => {
//     it("should return a list of movies and a 200 status code", (done) => {
//       request(app)
//         .get("/dashboard")
//         .expect(200)
//         .end((err, res) => {
//           if (err) return done(err);
//           expect(res.body).to.be.an("array");
//           done();
//         });
//     });
//   });
//   describe("GET /dashboard/:id", () => {
//     it("should delete a movie and return a 302 status code", async () => {
//       const newMovie = await request(app)
//         .post("/dashboard")
//         .send({
//           title: "Test Movie",
//           description: "This is a test movie",
//           image: "test.jpg",
//           price: 9.99,
//         });
//       const id = newMovie.body._id;
//       request(app).get(`/dashboard/${id}`).expect(302);
//     });
//   });
// });
