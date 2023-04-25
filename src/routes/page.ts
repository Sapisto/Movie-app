import express, { NextFunction, Response, Request } from "express";
import { auth } from "../middlewares/auth";
import { MovieModel } from "../model/movieModel";
import { UserModel } from "../model/userModel";
import { MovieUserSchema, updateMovieSchema, variables } from "../utils/utils";
//import { v4 as uuidv4 } from "uuid";

const router = express.Router();

router.get("/register", (req: Request, res: Response, next: NextFunction) => {
  res.render("Register");
});

router.get("/login", (req: Request, res: Response, next: NextFunction) => {
  res.render("Login");
});

// Landing page EJS
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1; // parse page number from query param or default to 1
    const limit = 4;
    const skip = (page - 1) * limit; // calculate number of movies to skip based on page and limit

    const movieCount = await MovieModel.countDocuments(); // get total number of movies in the collection
    const totalPages = Math.ceil(movieCount / limit); // calculate total number of pages

    const getAllMovies = await MovieModel.find({}).skip(skip).limit(limit); // retrieve movies for the current page

    return res.render("Home", {
      movieList: getAllMovies,
      currentPage: page,
      totalPages: totalPages,
    });
  } catch (error) {
    console.log(error);
  }
});

// Create Movie (Posting to Database) - Post Request EJS

router.post("/dashboard", auth, async (req: Request | any, res: Response) => {
  try {
    const verifiedUser = req.user;
    const { title, description, image, price } = req.body;
    const validationResult = MovieUserSchema.validate(req.body, variables);

    if (validationResult.error) {
      res.render("Dashboard", {
        error: validationResult.error.details[0].message,
      });
    }

    await MovieModel.create({
      title,
      description,
      image,
      price,
      userId: verifiedUser.id,
    });
    return res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
});

// Create movie (Consuming and displaying the created movie) - Get Request EJS

router.get("/dashboard", auth, async (req: Request | any, res: Response) => {
  try {
    const { id } = req.user;
    const movieList = await MovieModel.find({ userId: id })

    if (!movieList) {
      return res.render("Dashboard", { message: "No movies found" });
    }
    return res.render("Dashboard", { movieList });
  } catch (error) {
    console.log(error);
  }
});

// Get  all movies from the database
// router.get("/dashboard", auth, async (req: Request | any, res: Response) => {
//   try {
//     const { id } = req.user;

//     const user = await UserModel.findById(id).populate("movies");

//     if (!user || !user.movies || user.movies.length === 0) {
//       return res.render("Dashboard", { message: "No movies found" });
//     }

//     return res.render("Dashboard", { movieList: user.movies });
//   } catch (error) {
//     console.log(error);
//   }
// });

/*=======Update Movie Info===========*/

router.post("/update/:id", async (req: Request, res: Response) => {
  try {
    const { title, description, image, price } = req.body;
    const validationResult = updateMovieSchema.validate(req.body, variables);

    if (validationResult.error) {
      res.render("Dashboard", {
        error: validationResult.error.details[0].message,
      });
    }

    const movie = await MovieModel.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        image,
        price,
      },
      { new: true }
    );

    if (!movie) {
      res.status(404).render("error", { message: "Movie not found" });
    }

    // await movieList.update({ title, description, image, price });

    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
});

/*========Delete Movie EJS=========*/

router.get(
  "/dashboard/:id",
  auth,
  async (req: Request | any, res: Response) => {
    try {
      const { id } = req.params;
      const movieRecord = await MovieModel.findByIdAndRemove(id);
      if (!movieRecord) {
        return res.render("Dashboard", { Error: "Movie not found" });
      }
      return res.redirect("/dashboard");
    } catch (error) {
      console.log(error);
    }
  }
);

export default router;
