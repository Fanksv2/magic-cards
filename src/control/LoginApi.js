class LoginApi {
    static BASE_URL = "https://reqres.in/api";

    static POST = "POST";

    static REGISTER = "register";
    static LOGIN = "login";

    static OK = 200;

    static async registerUser(name, email, password) {
        const res = await this.request(this.POST, this.REGISTER, {
            name,
            email,
            password,
        });

        return res;
    }

    static async loginUser(email, password) {
        const res = await this.request(this.POST, this.LOGIN, {
            email,
            password,
        });

        return res;
    }

    static async request(method, url, data) {
        const params = {
            method,
            body: JSON.stringify({
                ...data,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        };

        let status;
        const res = await fetch(`${this.BASE_URL}/${url}`, params).then(
            async (res) => {
                status = res.status;
                return await res.json();
            }
        );

        return { ...res, status };
    }
}

export default LoginApi;
