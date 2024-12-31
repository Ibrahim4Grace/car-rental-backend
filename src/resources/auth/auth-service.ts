import AuthModel from "@/resources/auth/auth-model";
import Auth from "@/resources/auth/auth-interface";

export class AuthService {
    private auth = AuthModel;
    public async register(data: any): Promise<Auth> {
        const user = await this.auth.create(data);
        return user;
    }
}
