class NinjaStore {

    constructor(data) {
        this.store = data || {};
    }

    get userInfo() {
        return this.store.userInfo || {};
    }

    set userInfo(userInfo) {
        this.store.userInfo = userInfo;
    }

    get authFeatures() {
        return this.store.authFeatures || [];
    }

    set authFeatures(authFeatures) {
        this.store.authFeatures = authFeatures;
    }

    get initialData() {
        return this.store.initialData || [];
    }

    set initialData(initialData) {
        this.store.initialData = initialData;
    }
}

export default NinjaStore;