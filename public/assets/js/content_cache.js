/**
 * FULL ARMOR ENTERPRISE - UI CONTENT CACHE WRAPPER (Gate 2 Compliance)
 * Caches Firestore-sourced dynamic text and configurations in localStorage to minimize read billing.
 */
const ContentCache = {
    // Save content to cache with an expiration window (default 1 hour = 3600000 ms)
    set: function (key, data, ttl = 3600000) {
        const item = {
            value: data,
            expiry: Date.now() + ttl
        };
        try {
            localStorage.setItem(key, JSON.stringify(item));
        } catch (e) {
            console.warn("LocalStorage caching limit exceeded or disabled: ", e);
        }
    },

    // Retrieve content from cache, checking for expiration
    get: function (key) {
        const itemStr = localStorage.getItem(key);
        if (!itemStr) return null;

        try {
            const item = JSON.parse(itemStr);
            if (Date.now() > item.expiry) {
                localStorage.removeItem(key); // Cache expired
                return null;
            }
            return item.value;
        } catch (e) {
            return null;
        }
    },

    // Clear specific keys or full cache
    clear: function (key) {
        if (key) {
            localStorage.removeItem(key);
        } else {
            localStorage.clear();
        }
    }
};
