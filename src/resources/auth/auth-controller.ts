import { Router, Request, Response, NextFunction } from "express";
import Controller from "@/utils/interfaces/controller.interface";
import { validateData, sendJsonResponse } from "@/middlewares/index";
import { registerSchema, loginSchema } from "@/resources/auth/auth-validation";
import { AuthService } from "@/resources/auth/auth-service";

export default class AuthController implements Controller {
    public path = "/auth";
    public router = Router();
    private authService = new AuthService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post(
            `${this.path}/register`,
            validateData(registerSchema),
            this.register,
        );
        // this.router.post(
        //   `${this.path}/login`,
        //   validateData(loginSchema.login),
        //   this.login,
        // );
    }

    private register = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const user = await this.authService.register(req.body);
            sendJsonResponse(res, 201, "Registration  successfully", user);
        } catch (error) {
            next(error);
        }
    };
}
