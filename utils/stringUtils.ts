export const getKoreanParticle = (name: string): string => {
    const lastChar = name.charAt(name.length - 1);
    const lastCharCode = lastChar.charCodeAt(0);

    if (lastCharCode >= 0xac00 && lastCharCode <= 0xd7a3) {
        const hasFinalConsonant = (lastCharCode - 0xac00) % 28 > 0;
        return hasFinalConsonant ? "이" : "가";
    }

    return "가";
};