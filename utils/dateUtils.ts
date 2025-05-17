import { getStringData, storeStringData } from "./asyncUtils";

export const storeStartingDate = async () => {
    const now = new Date().toISOString();
    await storeStringData("start", now);
};

export const calculateDaysPassed = async (): Promise<number> => {
    const startDate = await getStringData("start");
    if (!startDate) {
        await storeStartingDate();
        return 0;
    }

    const start = new Date(startDate);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
};

export const formatDate = (
    date: Date | string,
    includeTime: boolean = true
): string => {
    const dateObj = typeof date === "string" ? new Date(date) : date;

    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };

    if (includeTime) {
        options.hour = "2-digit";
        options.minute = "2-digit";
    }

    return dateObj.toLocaleDateString("ko-KR", options);
};

export const getTimeAgo = (date: Date | string): string => {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - dateObj.getTime());
    const diffMinutes = Math.floor(diffTime / (1000 * 60));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffMinutes < 60) {
        return `${diffMinutes}분 전`;
    } else if (diffHours < 24) {
        return `${diffHours}시간 전`;
    } else {
        return `${diffDays}일 전`;
    }
};
