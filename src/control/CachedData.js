class CachedData {
    static getName() {
        return this.getData().name;
    }

    static getEmail() {
        return this.getData.email;
    }

    static getData() {
        const data = JSON.parse(window.localStorage.getItem("register-data"));
        return data;
    }
}

export default CachedData;
