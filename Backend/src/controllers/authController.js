import { user } from "../model/user.js";

export const generateAccessAndRefreshToken = async (userId) => {
  try {
    const User = await user.findById(userId);
    const accessToken = User.generateAccessToken();
    const refreshToken = User.generateRefreshToken();

    User.refreshToken = refreshToken;
    User.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new Error("Something went wrong generating access and refresh token");
  }
};

export const register = async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    if (!fullname || !email || !password) {
      throw new Error("All fields are required");
    }

    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const newUser = await user.create({
      fullname,
      email,
      password,
    });
    await newUser.save();

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Registration failed", error });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    const User = await user.findOne({ email });
    if (!User) {
      throw new Error("Invalid email or password");
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
      throw new Error("Invalid user credentials");

      const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
        User._id
      );

      const loggedInUser = await user
        .findById(User._id)
        .select("-password -refreshToken");

      return res.status(201).json({
        message: "user logged in successfully",
        accessToken,
        refreshToken,
        newUser: loggedInUser,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "Login failed", error });
  }
};
