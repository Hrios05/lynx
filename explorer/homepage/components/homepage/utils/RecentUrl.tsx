export interface RecentUrl {
    title: string;
    url: string;
    date: string;
}
export class RecentUrlsService {
    private static storage_key = 'lynx_recent_urls';
    private static max_recent_urls = 10;

    static getRecentUrls(): RecentUrl[] {
        const raw = localStorage.getItem(this.storage_key);
        if (!raw) return [];
        try {
            const arr = JSON.parse(raw) as RecentUrl[];
            return arr;
        } catch {
            return [];
        }
    }
    static addUrl(title: string, url: string): void {
        const urls = RecentUrlsService.getRecentUrls();
        const newItem: RecentUrl = {
            title,
            url,
            date: new Date().toISOString(),
        };
    const filtered = urls.filter(item => item.url !== url);
        filtered.unshift(newItem);
    const limited = filtered.slice(0, RecentUrlsService.max_recent_urls);
    localStorage.setItem(
            RecentUrlsService.storage_key,
            JSON.stringify(limited)
        );
    }

}