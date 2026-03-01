import {
  registerService,
  loginService,
  refreshService,
  logoutService
} from "../services/auth.js";

const cookieOptionsAccess = {
  httpOnly: true,
  secure: false,       
  sameSite: "Lax",     
  maxAge: 15 * 60 * 1000
};

const cookieOptionsRefresh = {
  httpOnly: true,
  secure: false,
  sameSite: "Lax",
  maxAge: 7 * 24 * 60 * 60 * 1000
};

export const register = async (req, res) => {
  try {
    const result = await registerService(req.body);

    res.cookie("accessToken", result.accessToken, cookieOptionsAccess);
    res.cookie("refreshToken", result.refreshToken, cookieOptionsRefresh);

    res.status(201).json({ user: result.user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const result = await loginService(req.body);

    res.cookie("accessToken", result.accessToken, cookieOptionsAccess);
    res.cookie("refreshToken", result.refreshToken, cookieOptionsRefresh);

    res.json({ user: result.user });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

export const refresh = async (req, res) => {
  try {
    const result = await refreshService(req.cookies.refreshToken);

    res.cookie("accessToken", result.accessToken, cookieOptionsAccess);
    res.cookie("refreshToken", result.refreshToken, cookieOptionsRefresh);

    res.json({ message: "Token refreshed" });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

export const logout = async (req, res) => {
  try {
    await logoutService(req.cookies.refreshToken);

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    res.json({ message: "Logged out" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};